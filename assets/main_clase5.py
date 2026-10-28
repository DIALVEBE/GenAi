"""Pixel clase 2: CNN entrenable, figuras sintéticas y prueba con datos inéditos."""

import math
import numpy as np
import pygame
import torch
from torch import nn

# Reproducible initialization; all examples are generated locally.
# Inicialización reproducible; todos los ejemplos se generan localmente.
torch.manual_seed(7)
# Keep training on CPU; no dedicated GPU is required.
DEVICE = "cpu"
# Window dimensions in pixels: width, height.
SIZE = (1180, 760)
BG = (13, 20, 34)
FG = (236, 244, 252)
MUTED = (151, 174, 202)
CYAN = (64, 218, 224)
YELLOW = (250, 195, 84)
RED = (255, 116, 126)
GREEN = (104, 221, 157)
# Choose "en" or "es" to change the arcade interface language.
LANGUAGE = "en"
TEXT = {
    "en": {
        "caption": "Pixel | CNN shape-classification arcade", "title": "PIXEL: learning to see",
        "subtitle": "A CNN learns filters from labeled examples", "test": "FINAL TEST",
        "validation": "VALIDATION", "example": "Sample", "real": "Actual: ",
        "prediction": "Prediction: ", "noise": "N: extra noise ", "yes": "ON", "no": "OFF",
        "filter": "LEARNED FEATURE MAP", "activation": "Channel 1 activation (ReLU)",
        "probabilities": "Class probabilities", "training": "TRAINING", "epoch": "Epoch",
        "validation_accuracy": "Validation accuracy (%)", "legend": "Green: train   Blue: validation",
        "final_test": "Final test: ", "reserved": "RESERVED (E)", "clean_test": "Final test uses clean images",
        "controls": "CONTROLS", "keys1": "T = train/pause      R = reset model      Arrows = change image",
        "keys2": "N = add challenge noise      E = evaluate test set      ESC = quit",
    },
    "es": {
        "caption": "Pixel | Arcade CNN para clasificar figuras", "title": "PIXEL: aprende a ver",
        "subtitle": "Una CNN aprende filtros con ejemplos etiquetados", "test": "PRUEBA FINAL",
        "validation": "VALIDACIÓN", "example": "Ejemplo", "real": "Real: ",
        "prediction": "Predicción: ", "noise": "N: ruido extra ", "yes": "SÍ", "no": "NO",
        "filter": "MAPA DE CARACTERÍSTICAS APRENDIDO", "activation": "Activación del canal 1 (ReLU)",
        "probabilities": "Probabilidades por clase", "training": "ENTRENAMIENTO", "epoch": "Época",
        "validation_accuracy": "Exactitud de validación (%)", "legend": "Verde: train   Azul: validación",
        "final_test": "Prueba final: ", "reserved": "RESERVADA (E)", "clean_test": "Prueba final sin ruido extra",
        "controls": "CONTROLES", "keys1": "T = entrenar/pausar      R = reiniciar modelo      Flechas = cambiar imagen",
        "keys2": "N = agregar ruido de desafío      E = evaluar prueba      ESC = salir",
    },
}
# Class labels match integer targets 0 through 3 in each language.
NAMES = {"en": ["Square", "Cross", "Diagonal", "Circle"], "es": ["Cuadrado", "Cruz", "Diagonal", "Círculo"]}[LANGUAGE]
UI = TEXT[LANGUAGE]
# Maximum full passes through the training split, and examples per update.
MAX_EPOCHS = 25
BATCH = 32


def image_of(kind, rng, noise=0.11):
    """Create a 16x16 sample. kind selects the class; rng controls variation; noise sets intensity.

    Genera una muestra de 16x16. kind elige la clase; rng controla variaciones; noise fija intensidad.
    """
    y, x = np.mgrid[:16, :16]
    cx = 7.5 + rng.integers(-2, 3)
    cy = 7.5 + rng.integers(-2, 3)
    radius = rng.integers(3, 6)
    width = rng.integers(1, 3)
    if kind == 0:
        mask = (abs(x - cx) <= radius) & (abs(y - cy) <= radius)
    elif kind == 1:
        mask = ((abs(x - cx) <= width) & (abs(y - cy) <= radius + 1)) | (
            (abs(y - cy) <= width) & (abs(x - cx) <= radius + 1)
        )
    elif kind == 2:
        # Segmento diagonal de izquierda superior a derecha inferior.
        mask = (abs((x - cx) - (y - cy)) <= width) & (abs(x - cx) <= radius)
    else:
        dist = (x - cx) ** 2 + (y - cy) ** 2
        mask = (dist >= (radius - width) ** 2) & (dist <= radius**2)
    pixels = mask.astype("float32")
    pixels = np.clip(pixels + rng.normal(0, noise, (16, 16)), 0, 1)
    return pixels.astype("float32")


def dataset(n, seed, noise=0.11):
    """Create n balanced samples; seed makes a split reproducible; noise perturbs pixels.

    Crea n muestras balanceadas; seed reproduce una división; noise agrega perturbación a píxeles.
    """
    rng = np.random.default_rng(seed)
    labels = np.tile(np.arange(4), math.ceil(n / 4))[:n]
    rng.shuffle(labels)
    images = np.stack([image_of(int(k), rng, noise) for k in labels])
    return torch.from_numpy(images[:, None]), torch.from_numpy(labels.astype("int64"))


class PixelCNN(nn.Module):
    """Two convolutional feature layers and a four-class output layer."""

    def __init__(self):
        super().__init__()
        # Conv2d arguments: input channels, output filters, kernel width, and padding.
        self.conv1 = nn.Conv2d(1, 8, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(8, 16, kernel_size=3, padding=1)
        # A 2x2 max operation halves each feature map's width and height.
        self.pool = nn.MaxPool2d(2)
        # 16 channels x 4 x 4 positions -> 4 class logits.
        self.fc = nn.Linear(16 * 4 * 4, 4)

    def forward(self, x):
        # x is (batch, channels, height, width); cada dimensión representa lote, canales y píxeles.
        x = self.pool(torch.relu(self.conv1(x)))  # 16x16 -> 8x8
        x = self.pool(torch.relu(self.conv2(x)))  # 8x8 -> 4x4
        return self.fc(
            x.flatten(1)
        )  # logits: no aplicar softmax antes de CrossEntropyLoss


def evaluate(model, data):
    """Measure accuracy for model on data=(images, labels), without updating weights.

    Mide la exactitud de model sobre data=(imagenes, etiquetas), sin actualizar pesos.
    """
    model.eval()
    with torch.no_grad():
        x, y = data
        prediction = model(x).argmax(1)
        return 100 * (prediction == y).float().mean().item()


def train_epoch(model, optimizer, criterion, data, seed):
    """Train one pass: optimizer updates weights, criterion measures loss, seed shuffles batches.

    Entrena una epoca: optimizer actualiza pesos, criterion mide perdida y seed ordena los lotes.
    """
    model.train()
    x, y = data
    indices = torch.randperm(len(x), generator=torch.Generator().manual_seed(seed))
    total = 0.0
    for group in indices.split(BATCH):
        optimizer.zero_grad()
        logits = model(x[group])
        loss = criterion(logits, y[group])
        loss.backward()
        optimizer.step()
        total += float(loss.item()) * len(group)
    return total / len(x)


def text(surface, value, x, y, font, color=FG):
    """Draw value on surface at pixel coordinates (x, y), using font and color.

    Dibuja value en surface en (x, y), con font y color.
    """
    surface.blit(font.render(str(value), True, color), (x, y))


def panel(surface, rect):
    """Draw a framed panel; rect is the pygame rectangle (x, y, width, height).

    Dibuja un panel; rect contiene (x, y, ancho, alto) en píxeles.
    """
    pygame.draw.rect(surface, (23, 34, 52), rect, border_radius=12)
    pygame.draw.rect(surface, (49, 68, 90), rect, 1, border_radius=12)


def grid(surface, mat, x, y, side):
    """Render matrix mat at (x, y) inside a square with side-length side pixels.

    Renderiza mat en (x, y) dentro de una cuadrícula cuadrada de side píxeles por lado.
    """
    mat = np.asarray(mat)
    rows, cols = mat.shape
    step = side / max(rows, cols)
    lo, hi = float(mat.min()), float(mat.max())
    norm = (mat - lo) / (hi - lo + 1e-8) if hi > lo else np.zeros_like(mat)
    for r in range(rows):
        for c in range(cols):
            val = float(norm[r, c])
            color = (int(26 + 25 * val), int(44 + 164 * val), int(68 + 170 * val))
            pygame.draw.rect(
                surface,
                color,
                (
                    round(x + c * step),
                    round(y + r * step),
                    max(1, round(step) - 1),
                    max(1, round(step) - 1),
                ),
            )
    pygame.draw.rect(surface, (105, 135, 158), (x - 1, y - 1, side + 2, side + 2), 1)


def plot(surface, rect, values, color, maximum=None):
    """Draw values in rect; maximum fixes the vertical scale when supplied.

    Dibuja values en rect; maximum fija la escala vertical cuando se especifica.
    """
    if len(values) < 2:
        return
    top = maximum if maximum is not None else max(1.0, max(values))
    coords = [
        (
            rect.left + i * (rect.width / (MAX_EPOCHS - 1)),
            rect.bottom - 5 - min(v / top, 1) * (rect.height - 10),
        )
        for i, v in enumerate(values)
    ]
    pygame.draw.lines(surface, color, False, coords, 2)


def main():
    """Build the datasets, train on key presses, and render the interactive arcade.

    Prepara los datos, entrena con el teclado y muestra el arcade interactivo.
    """
    pygame.init()
    torch.set_num_threads(min(2, torch.get_num_threads()))
    screen = pygame.display.set_mode(SIZE)
    pygame.display.set_caption(UI["caption"])
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("dejavusans", 18)
    small = pygame.font.SysFont("dejavusans", 15)
    title = pygame.font.SysFont("dejavusans", 29, bold=True)

    # Separate seeds create independent train/validation/test image samples.
    # Diferentes semillas generan muestras independientes para train/validación/prueba.
    train_set = dataset(400, 10)
    val_set = dataset(120, 20)
    test_set = dataset(120, 30)
    model = PixelCNN().to(DEVICE)
    # lr is the learning rate: it scales each parameter update.
    optimizer = torch.optim.Adam(model.parameters(), lr=0.003)
    loss_function = nn.CrossEntropyLoss()
    epoch = 0
    history_loss, history_train, history_val = [], [], []
    training = False
    test_revealed = False
    sample_index = 0
    noisy_test = False
    test_accuracy = None
    running = True

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif (
                    event.key == pygame.K_t and epoch < MAX_EPOCHS and not test_revealed
                ):
                    training = not training
                elif event.key == pygame.K_RIGHT:
                    sample_index = (sample_index + 1) % len(test_set[0])
                elif event.key == pygame.K_LEFT:
                    sample_index = (sample_index - 1) % len(test_set[0])
                elif event.key == pygame.K_n:
                    noisy_test = not noisy_test
                elif event.key == pygame.K_e and not training and epoch == MAX_EPOCHS:
                    # La prueba se consulta al final. Evitar usarla repetidamente para ajustar el modelo.
                    test_accuracy = evaluate(model, test_set)
                    test_revealed = True
                elif event.key == pygame.K_r:
                    torch.manual_seed(7)
                    model = PixelCNN().to(DEVICE)
                    # Reset both learned weights and optimizer state with the same settings.
                    optimizer = torch.optim.Adam(model.parameters(), lr=0.003)
                    epoch = 0
                    history_loss, history_train, history_val = [], [], []
                    training = False
                    test_revealed = False
                    test_accuracy = None

        if training and epoch < MAX_EPOCHS:
            loss = train_epoch(model, optimizer, loss_function, train_set, epoch + 99)
            epoch += 1
            history_loss.append(loss)
            history_train.append(evaluate(model, train_set))
            history_val.append(evaluate(model, val_set))
            if epoch == MAX_EPOCHS:
                training = False

        # Mientras no se revele la prueba, solo se muestran ejemplos de validación.
        display_set = test_set if test_revealed else val_set
        x = display_set[0][sample_index : sample_index + 1].clone()
        if noisy_test:
            rng = np.random.default_rng(500 + sample_index)
            extra = torch.from_numpy(rng.normal(0, 0.25, x.shape).astype("float32"))
            x = torch.clamp(x + extra, 0, 1)
        true_label = int(display_set[1][sample_index])
        model.eval()
        with torch.no_grad():
            logits = model(x)
            probabilities = torch.softmax(logits, 1)[0].numpy()
            predicted = int(probabilities.argmax())
            features = torch.relu(model.conv1(x))[0, 0].numpy()

        screen.fill(BG)
        text(screen, UI["title"], 30, 17, title, CYAN)
        text(
            screen,
            UI["subtitle"],
            31,
            59,
            small,
            MUTED,
        )
        panel(screen, (25, 96, 380, 500))
        panel(screen, (419, 96, 350, 500))
        panel(screen, (783, 96, 372, 500))
        text(screen, UI["test"] if test_revealed else UI["validation"], 45, 115, font)
        grid(screen, x[0, 0].numpy(), 75, 158, 280)
        text(
            screen,
            f"{UI['example']} {sample_index + 1} / {len(display_set[0])}",
            45,
            465,
            small,
            MUTED,
        )
        text(screen, UI["real"] + NAMES[true_label], 45, 490, font)
        color = GREEN if predicted == true_label else RED
        text(screen, UI["prediction"] + NAMES[predicted], 45, 520, font, color)
        text(
            screen,
            UI["noise"] + (UI["yes"] if noisy_test else UI["no"]),
            45,
            561,
            small,
            MUTED,
        )
        text(screen, UI["filter"], 439, 115, font)
        grid(screen, features, 447, 157, 290)
        text(screen, UI["activation"], 439, 465, small, MUTED)
        text(screen, UI["probabilities"], 439, 503, font)
        for i, name in enumerate(NAMES):
            y = 537 + i * 14
            pygame.draw.rect(screen, (48, 65, 83), (555, y, 174, 9), border_radius=3)
            pygame.draw.rect(
                screen,
                CYAN if i == predicted else (87, 129, 171),
                (555, y, int(174 * probabilities[i]), 9),
                border_radius=3,
            )
            text(screen, name[:8], 440, y - 5, small, MUTED)
        text(screen, UI["training"], 803, 115, font)
        text(screen, f"{UI['epoch']}: {epoch}/{MAX_EPOCHS}", 803, 159, font, YELLOW)
        text(
            screen,
            f"Loss: {history_loss[-1]:.3f}" if history_loss else "Loss: ---",
            803,
            196,
            font,
        )
        text(
            screen,
            f"Train: {history_train[-1]:.1f}%" if history_train else "Train: ---",
            803,
            231,
            font,
            GREEN,
        )
        text(
            screen,
            f"{UI['validation']}: {history_val[-1]:.1f}%" if history_val else f"{UI['validation']}: ---",
            803,
            266,
            font,
            CYAN,
        )
        text(screen, UI["validation_accuracy"], 803, 320, small, MUTED)
        pygame.draw.rect(screen, (48, 65, 83), (806, 350, 320, 113), 1)
        plot(screen, pygame.Rect(810, 354, 310, 103), history_train, GREEN, 100)
        plot(screen, pygame.Rect(810, 354, 310, 103), history_val, CYAN, 100)
        text(screen, UI["legend"], 803, 474, small, MUTED)
        text(
            screen,
            UI["final_test"] + (f"{test_accuracy:.1f}%" if test_revealed else UI["reserved"]),
            803,
            531,
            font,
            YELLOW,
        )
        text(screen, UI["clean_test"], 803, 563, small, MUTED)
        panel(screen, (25, 609, 1130, 123))
        text(screen, UI["controls"], 45, 620, font, CYAN)
        text(
            screen,
            UI["keys1"],
            45,
            653,
            font,
        )
        text(
            screen,
            UI["keys2"],
            45,
            686,
            font,
        )
        pygame.display.flip()
        clock.tick(30)
    pygame.quit()


if __name__ == "__main__":
    main()
