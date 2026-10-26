"""Pixel: a small convolution lab built with NumPy and Pygame."""
import numpy as np
import pygame

WIDTH, HEIGHT, FPS = 1160, 720, 30
BG, WHITE, MUTED, CYAN = (13, 20, 34), (235, 241, 250), (157, 175, 198), (55, 210, 222)

KERNELS = {
    "vertical": np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=float),
    "horizontal": np.array([[-1, -1, -1], [0, 0, 0], [1, 1, 1]], dtype=float),
    "blur": np.ones((3, 3), dtype=float) / 9,
    "sharpen": np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]], dtype=float),
}
TEXT = {
    "en": {
        "shapes": ("Square", "Cross", "Diagonal", "Circle"),
        "kernels": ("Vertical", "Horizontal", "Blur", "Sharpen"),
        "title": "PIXEL: LEARNS TO SEE", "subtitle": "A filter transforms pixels into a feature map",
        "image": "INPUT IMAGE", "convolution": "CONVOLUTION (before ReLU)", "relu_pool": "ReLU + POOLING", "relu": "ReLU (no pooling)",
        "position": "Output position", "value": "Value", "size": "Output size", "shape": "Shape", "kernel": "Kernel", "stride": "Stride", "padding": "Padding",
        "noise_yes": "ON", "noise_no": "OFF", "pool_yes": "ON", "pool_no": "OFF", "scan_yes": "RUNNING", "scan_no": "PAUSED",
        "controls1": "1-4 shape   K kernel   S stride   P padding   N noise   M pooling   L language",
        "controls2": "SPACE pause   Arrows step   ESC quit", "noise": "Noise", "pooling": "Pooling", "scan": "Scan", "lang": "Language",
    },
    "es": {
        "shapes": ("Cuadrado", "Cruz", "Diagonal", "Círculo"),
        "kernels": ("Vertical", "Horizontal", "Desenfoque", "Realce"),
        "title": "PIXEL: APRENDE A VER", "subtitle": "Un filtro transforma píxeles en un mapa de características",
        "image": "IMAGEN DE ENTRADA", "convolution": "CONVOLUCIÓN (antes de ReLU)", "relu_pool": "ReLU + POOLING", "relu": "ReLU (sin pooling)",
        "position": "Posición de salida", "value": "Valor", "size": "Tamaño de salida", "shape": "Figura", "kernel": "Kernel", "stride": "Stride", "padding": "Padding",
        "noise_yes": "SÍ", "noise_no": "NO", "pool_yes": "SÍ", "pool_no": "NO", "scan_yes": "EN MARCHA", "scan_no": "EN PAUSA",
        "controls1": "1-4 figura   K kernel   S stride   P padding   N ruido   M pooling   L idioma",
        "controls2": "ESPACIO pausa   Flechas paso a paso   ESC salir", "noise": "Ruido", "pooling": "Pooling", "scan": "Recorrido", "lang": "Idioma",
    },
}


def make_image(name, noisy):
    """Build a 16 x 16 grayscale shape without an external dataset."""
    image = np.zeros((16, 16), dtype=float)
    yy, xx = np.indices(image.shape)
    if name == "Square":
        image[4:12, 4:12] = 1.0
    elif name == "Cross":
        image[3:13, 7:9] = 1.0
        image[7:9, 3:13] = 1.0
    elif name == "Diagonal":
        image[np.abs(yy - xx) <= 1] = 1.0
    elif name == "Circle":
        distance = (xx - 7.5) ** 2 + (yy - 7.5) ** 2
        image[(distance >= 16) & (distance <= 29)] = 1.0
    if noisy:
        image = np.clip(image + np.random.default_rng(42).normal(0, 0.22, image.shape), 0, 1)
    return image


def convolve(image, kernel, stride, padding):
    """Apply cross-correlation, the convention commonly called convolution in deep learning."""
    padded = np.pad(image, padding, mode="constant")
    rows = (padded.shape[0] - 3) // stride + 1
    cols = (padded.shape[1] - 3) // stride + 1
    result = np.zeros((rows, cols), dtype=float)
    for row in range(rows):
        for col in range(cols):
            patch = padded[row * stride:row * stride + 3, col * stride:col * stride + 3]
            result[row, col] = np.sum(patch * kernel)
    return result


def max_pool(image):
    """Apply max pooling with a 2 x 2 window and stride 2."""
    rows, cols = image.shape
    output = np.zeros((rows // 2, cols // 2), dtype=float)
    for row in range(rows // 2):
        for col in range(cols // 2):
            output[row, col] = np.max(image[row * 2:row * 2 + 2, col * 2:col * 2 + 2])
    return output


def write(surface, text, x, y, font, color=WHITE):
    surface.blit(font.render(text, True, color), (x, y))


def draw_grid(surface, matrix, x, y, size=305, signed=False):
    """Normalize signed values for color display only; calculations remain unchanged."""
    rows, cols = matrix.shape
    cell = min(size / cols, size / rows)
    scale = max(float(np.max(np.abs(matrix))), 1e-9) if signed else 1.0
    for row in range(rows):
        for col in range(cols):
            value = float(matrix[row, col])
            if signed:
                strength = min(abs(value) / scale, 1.0)
                color = ((int(30 + 210 * strength), int(51 + 100 * (1 - strength)), 85)
                         if value < 0 else (20, int(50 + 175 * strength), int(72 + 165 * strength)))
            else:
                strength = float(np.clip(value, 0, 1))
                color = (int(27 + 140 * strength), int(44 + 178 * strength), int(68 + 180 * strength))
            rect = pygame.Rect(round(x + col * cell), round(y + row * cell), max(1, round(cell) - 1), max(1, round(cell) - 1))
            pygame.draw.rect(surface, color, rect)
    pygame.draw.rect(surface, MUTED, (x - 1, y - 1, round(cols * cell) + 2, round(rows * cell) + 2), 1)
    return cell


def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    title_font = pygame.font.SysFont("dejavusans", 29, bold=True)
    font = pygame.font.SysFont("dejavusans", 18)
    small = pygame.font.SysFont("dejavusans", 15)
    shape_idx, kernel_idx, stride, padding = 0, 0, 1, 0
    noisy, pooling, show_scan, running, language = False, True, True, True, "en"
    step = frames = 0

    while running:
        text = TEXT[language]
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif event.key in (pygame.K_1, pygame.K_2, pygame.K_3, pygame.K_4):
                    shape_idx, step = event.key - pygame.K_1, 0
                elif event.key == pygame.K_k:
                    kernel_idx = (kernel_idx + 1) % len(KERNELS)
                elif event.key == pygame.K_s:
                    stride = 2 if stride == 1 else 1
                elif event.key == pygame.K_p:
                    padding = 1 if padding == 0 else 0
                elif event.key == pygame.K_n:
                    noisy = not noisy
                elif event.key == pygame.K_m:
                    pooling = not pooling
                elif event.key == pygame.K_l:
                    language = "es" if language == "en" else "en"
                elif event.key == pygame.K_SPACE:
                    show_scan = not show_scan
                elif event.key == pygame.K_RIGHT:
                    step += 1
                elif event.key == pygame.K_LEFT:
                    step -= 1

        shape_names = text["shapes"]
        kernel_names = text["kernels"]
        shape_name = shape_names[shape_idx]
        kernel_name = tuple(KERNELS)[kernel_idx]
        image = make_image(("Square", "Cross", "Diagonal", "Circle")[shape_idx], noisy)
        features = convolve(image, KERNELS[kernel_name], stride, padding)
        activated = np.maximum(features, 0)
        result = max_pool(activated) if pooling else activated
        rows, cols = features.shape
        frames += 1
        if show_scan and frames % 12 == 0:
            step += 1
        step %= rows * cols
        scan_row, scan_col = divmod(step, cols)

        screen.fill(BG)
        write(screen, text["title"], 28, 17, title_font, CYAN)
        write(screen, text["subtitle"], 30, 59, small, MUTED)
        labels = [(text["image"], 28), (text["convolution"], 415), (text["relu_pool"] if pooling else text["relu"], 802)]
        for label, x in labels:
            write(screen, label, x, 115, small)
        cell = draw_grid(screen, image, 28, 151)
        draw_grid(screen, features, 415, 151, signed=True)
        draw_grid(screen, result, 802, 151)
        top_row, top_col = scan_row * stride, scan_col * stride
        left = 28 + (top_col - padding) * cell
        top = 151 + (top_row - padding) * cell
        pygame.draw.rect(screen, (255, 194, 65), (round(left), round(top), round(3 * cell), round(3 * cell)), 3)
        write(screen, f"{text['position']}: ({scan_row}, {scan_col})", 30, 475, small, MUTED)
        write(screen, f"{text['value']}: {features[scan_row, scan_col]:.2f}", 416, 475, small, MUTED)
        write(screen, f"{text['size']}: {result.shape[0]} × {result.shape[1]}", 804, 475, small, MUTED)
        pygame.draw.line(screen, (66, 88, 112), (28, 514), (1130, 514), 1)
        write(screen, f"{text['shape']}: {shape_name} | {text['kernel']}: {kernel_names[kernel_idx]} | {text['stride']}: {stride} | {text['padding']}: {padding}", 29, 531, font)
        noise_state = text["noise_yes"] if noisy else text["noise_no"]
        pool_state = text["pool_yes"] if pooling else text["pool_no"]
        scan_state = text["scan_yes"] if show_scan else text["scan_no"]
        write(screen, f"{text['noise']}: {noise_state} | {text['pooling']}: {pool_state} | {text['scan']}: {scan_state} | {text['lang']}: {language.upper()}", 29, 565, font)
        write(screen, text["controls1"], 30, 615, small, CYAN)
        write(screen, text["controls2"], 30, 647, small, CYAN)
        pygame.display.flip()
        clock.tick(FPS)
    pygame.quit()


if __name__ == "__main__":
    main()
