from pathlib import Path

import numpy as np
import pygame

from neural import NeuralNetwork


# --------------------------------------------------
# CONFIGURACIÓN
# --------------------------------------------------

# Ancho y alto de la ventana en píxeles; también determinan posiciones de paneles y botones.
WIDTH, HEIGHT = 1040, 750
FPS = 60  # Máximo de redibujados por segundo; clock.tick(FPS) limita el bucle principal.

HIDDEN_LAYERS = (12, 8)  # Neuronas por capa oculta: la red completa es 15 -> 12 -> 8 -> 3.
LEARNING_RATE = 0.01  # Multiplica cada gradiente; las flechas arriba/abajo lo modifican.
TRAIN_EPOCHS = 30  # Actualizaciones por minilote y ronda; no son 30 recorridos completos.
HISTORY_SIZE = 5  # Jugadas recientes de entrada: 5 x 3 valores one-hot = 15 características.

# Las posiciones 0/1/2 deben coincidir con el one-hot y con los ID de counter_move().
NAMES = ["PIEDRA", "PAPEL", "TIJERA"]
COLORS = [(65, 190, 242), (164, 139, 255), (255, 172, 98)]  # Color RGB por jugada, mismo orden.

BG = (14, 22, 36)
PANEL = (25, 37, 57)
CARD = (37, 54, 79)
WHITE = (242, 247, 255)
MUTED = (158, 177, 201)
GREEN = (74, 220, 157)

ASSETS = Path(__file__).parent / "assets"  # Carpeta para los tres iconos PNG generados o suministrados.
ASSETS.mkdir(exist_ok=True)


pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Neural Arcade - Piedra, papel o tijera")
clock = pygame.time.Clock()

# El tamaño de fuente se expresa en píxeles; bold activa la negrita para dar énfasis.
font_title = pygame.font.SysFont("arial", 29, bold=True)
font_big = pygame.font.SysFont("arial", 38, bold=True)
font_normal = pygame.font.SysFont("arial", 21, bold=True)
font_small = pygame.font.SysFont("arial", 17)
font_tiny = pygame.font.SysFont("arial", 14)


# --------------------------------------------------
# DIBUJO DE LA INTERFAZ
# --------------------------------------------------


def text(message, x, y, font=font_small, color=WHITE):
    """Dibuja message desde la esquina superior izquierda (x, y), con fuente y color elegidos."""
    image = font.render(str(message), True, color)
    screen.blit(image, (x, y))


def centered(message, center_x, y, font=font_small, color=WHITE):
    """Centra message en center_x; y indica su coordenada superior en píxeles."""
    image = font.render(str(message), True, color)
    screen.blit(image, (center_x - image.get_width() // 2, y))


def panel(rect, color=PANEL, radius=18):
    """Dibuja un rectángulo redondeado; rect es (x, y, ancho, alto) y radius es el redondeo."""
    pygame.draw.rect(screen, color, rect, border_radius=radius)


def bar(x, y, width, value, color):
    """Dibuja una barra; limita value al intervalo 0..1 y mide width en píxeles."""
    value = max(0.0, min(1.0, float(value)))
    panel((x, y, width, 13), CARD, 6)

    filled = round(width * value)
    if filled:
        panel((x, y, filled, 13), color, 6)


# --------------------------------------------------
# IMÁGENES
# --------------------------------------------------


def create_default_image(index, path):
    """Crea un PNG de respaldo: index elige piedra/papel/tijera y path es el archivo de salida."""
    surface = pygame.Surface((200, 200), pygame.SRCALPHA)
    color = COLORS[index]

    if index == 0:
        # Piedra: silueta irregular.
        points = [
            (42, 109),
            (59, 59),
            (101, 37),
            (151, 60),
            (170, 111),
            (137, 157),
            (78, 161),
        ]
        pygame.draw.polygon(surface, color, points)
        pygame.draw.polygon(surface, (245, 247, 255), points, 5)

    elif index == 1:
        # Papel: hoja con líneas.
        rect = pygame.Rect(49, 28, 102, 147)
        pygame.draw.rect(surface, color, rect, border_radius=9)
        pygame.draw.rect(surface, WHITE, rect, 5, border_radius=9)

        for y in (74, 100, 126):
            pygame.draw.line(surface, (51, 63, 90), (68, y), (131, y), 5)

    else:
        # Tijeras: mangos circulares y dos hojas.
        pygame.draw.circle(surface, color, (61, 135), 23, 8)
        pygame.draw.circle(surface, color, (128, 135), 23, 8)

        pygame.draw.line(surface, WHITE, (75, 119), (151, 33), 12)
        pygame.draw.line(surface, WHITE, (113, 119), (39, 33), 12)
        pygame.draw.circle(surface, color, (94, 100), 9)

    pygame.image.save(surface, str(path))


def load_images():
    images = []

    for i, name in enumerate(("piedra", "papel", "tijera")):
        path = ASSETS / f"{name}.png"

        if not path.exists():
            create_default_image(i, path)

        image = pygame.image.load(str(path)).convert_alpha()
        image = pygame.transform.smoothscale(image, (125, 125))
        images.append(image)

    return images


images = load_images()


# --------------------------------------------------
# DATOS PARA LA RED NEURONAL
# --------------------------------------------------


def encode_history(history):
    """
    Convierte las últimas HISTORY_SIZE jugadas en HISTORY_SIZE * 3 características numéricas.

    Piedra = [1, 0, 0]
    Papel  = [0, 1, 0]
    Tijera = [0, 0, 1]

    Las posiciones sin historial usan [1/3, 1/3, 1/3].
    """
    result = []

    recent = history[-HISTORY_SIZE:]
    missing = HISTORY_SIZE - len(recent)

    for _ in range(missing):
        result.extend([1 / 3] * 3)

    for move in recent:
        vector = [0.0, 0.0, 0.0]
        vector[move] = 1.0
        result.extend(vector)

    return np.array(result, dtype=float)


def counter_move(predicted):
    """Devuelve la jugada que vence a predicted; 0=piedra, 1=papel y 2=tijera.

    Piedra (0) -> Papel (1)
    Papel  (1) -> Tijera (2)
    Tijera (2) -> Piedra (0)
    """
    return (predicted + 1) % 3


def evaluate(human, ai):
    """Compara identificadores enteros de jugada (0, 1, 2) y devuelve el resultado."""
    if human == ai:
        return "EMPATE"

    if (human - ai) % 3 == 1:
        return "GANASTE"

    return "GANÓ LA IA"


# --------------------------------------------------
# ESTADO DE LA PARTIDA
# --------------------------------------------------


def new_game():
    network = NeuralNetwork(hidden=HIDDEN_LAYERS, learning_rate=LEARNING_RATE)

    return {
        "network": network,
        "history": [],
        "examples": [],
        "probabilities": np.array([1 / 3] * 3),
        "human_score": 0,
        "ai_score": 0,
        "draws": 0,
        "correct_predictions": 0,
        "loss": None,
        "last_human": None,
        "last_ai": None,
        "last_prediction": None,
        "last_probs": None,
        "result": "ELIGE TU PRIMERA JUGADA",
    }


game = new_game()


def play(human_move):
    """Juega una ronda para human_move (0=piedra, 1=papel, 2=tijera), entrena y predice."""
    network = game["network"]

    # 1. Guardar la predicción hecha ANTES de conocer
    # la elección del jugador.
    probs = game["probabilities"].copy()
    predicted = int(np.argmax(probs))

    # 2. La IA selecciona la jugada que contrarresta
    # la opción humana más probable.
    ai_move = counter_move(predicted)

    # 3. Evaluar la partida.
    result = evaluate(human_move, ai_move)

    if result == "GANASTE":
        game["human_score"] += 1
    elif result == "GANÓ LA IA":
        game["ai_score"] += 1
    else:
        game["draws"] += 1

    if predicted == human_move:
        game["correct_predictions"] += 1

    # 4. Registrar lo observado para el entrenamiento.
    x = encode_history(game["history"])
    game["examples"].append((x, human_move))
    game["history"].append(human_move)

    # 5. Entrenar usando ejemplos anteriores y actuales.
    game["loss"] = network.train(game["examples"], epochs=TRAIN_EPOCHS)

    # 6. Predecir la SIGUIENTE jugada.
    next_x = encode_history(game["history"])
    game["probabilities"] = network.predict(next_x)

    game["last_human"] = human_move
    game["last_ai"] = ai_move
    game["last_prediction"] = predicted
    game["last_probs"] = probs
    game["result"] = result


# --------------------------------------------------
# BOTONES DEL JUEGO
# --------------------------------------------------

# Cada pygame.Rect usa (izquierda, arriba, ancho, alto) en píxeles y corresponde a jugadas 0..2.
BUTTONS = [
    pygame.Rect(55, 518, 180, 168),
    pygame.Rect(260, 518, 180, 168),
    pygame.Rect(465, 518, 180, 168),
]


def draw_game():
    """Redibuja marcador, predicción, métricas de entrenamiento y botones de jugada."""
    screen.fill(BG)

    # Encabezado.
    text("NEURAL ARCADE", 40, 20, font_tiny, GREEN)
    text("PIEDRA  ·  PAPEL  ·  TIJERA", 40, 42, font_title)

    text("R: reiniciar  |  Flechas: learning rate", 650, 51, font_tiny, MUTED)

    # Marcador.
    panel((40, 100, 640, 100))

    centered("JUGADOR", 195, 112, font_small, MUTED)
    centered(str(game["human_score"]), 195, 139, font_big)

    centered("IA", 510, 112, font_small, MUTED)
    centered(str(game["ai_score"]), 510, 139, font_big)

    # Predicciones.
    panel((700, 100, 300, 288))

    text("PRÓXIMA JUGADA", 718, 115, font_normal)
    text("Probabilidad estimada de tu elección", 718, 146, font_tiny, MUTED)

    for i, prob in enumerate(game["probabilities"]):
        y = 184 + i * 63

        text(NAMES[i], 718, y, font_small)
        text(f"{prob * 100:.1f}%", 928, y, font_small, COLORS[i])
        bar(718, y + 27, 262, prob, COLORS[i])

    # Resultado de la última partida.
    panel((40, 217, 640, 285))

    centered(game["result"], 360, 233, font_normal, GREEN)

    if game["last_human"] is not None:
        human = game["last_human"]
        ai = game["last_ai"]

        screen.blit(images[human], (142, 279))
        screen.blit(images[ai], (447, 279))

        centered("TU", 204, 415, font_small, MUTED)
        centered("IA", 509, 415, font_small, MUTED)

        centered(NAMES[human], 204, 446, font_normal)
        centered(NAMES[ai], 509, 446, font_normal)

        predicted = game["last_prediction"]
        confidence = game["last_probs"][predicted] * 100

        centered(
            f"La IA esperaba: {NAMES[predicted]} ({confidence:.1f}%)",
            360,
            477,
            font_tiny,
            MUTED,
        )
    else:
        centered("¿PODRÁ LA IA APRENDER TU PATRÓN?", 360, 335, font_normal)

    # Panel para seleccionar la jugada.
    text("SELECCIONA TU JUGADA", 55, 494, font_small)

    mouse = pygame.mouse.get_pos()

    for i, rect in enumerate(BUTTONS):
        hovered = rect.collidepoint(mouse)
        color = (49, 70, 100) if hovered else CARD

        panel(rect, color)
        screen.blit(images[i], (rect.x + 27, rect.y + 5))

        centered(NAMES[i], rect.centerx, rect.y + 129, font_small)

    # Panel de datos de entrenamiento.
    panel((700, 405, 300, 281))

    text("ENTRENAMIENTO", 718, 423, font_normal)

    rounds = len(game["history"])
    accuracy = 100 * game["correct_predictions"] / rounds if rounds else 0

    loss = f"{game['loss']:.4f}" if game["loss"] is not None else "---"

    rows = [
        ("Rondas", str(rounds)),
        ("Acierto predictivo", f"{accuracy:.1f}%" if rounds else "---"),
        ("Empates", str(game["draws"])),
        ("Loss", loss),
        ("Actualizaciones", str(game["network"].steps)),
        ("Learning rate", f"{game['network'].learning_rate:.4f}"),
    ]

    for i, (label, value) in enumerate(rows):
        y = 467 + i * 32
        text(label, 718, y, font_small, MUTED)
        text(value, 907, y, font_small)

    # Pie informativo.
    text(
        f"Red: 15 -> {' -> '.join(map(str, HIDDEN_LAYERS))} -> 3",
        55,
        708,
        font_tiny,
        MUTED,
    )
    text("1: Piedra   2: Papel   3: Tijera", 700, 708, font_tiny, MUTED)

    pygame.display.flip()


# --------------------------------------------------
# BUCLE PRINCIPAL
# --------------------------------------------------

running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 1:
                for i, rect in enumerate(BUTTONS):
                    if rect.collidepoint(event.pos):
                        play(i)
                        break

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_1:
                play(0)

            elif event.key == pygame.K_2:
                play(1)

            elif event.key == pygame.K_3:
                play(2)

            elif event.key == pygame.K_r:
                game = new_game()

            elif event.key == pygame.K_UP:
                # Multiplica la tasa de aprendizaje por 1,5, con límite superior de 1,0.
                network = game["network"]
                network.learning_rate = min(network.learning_rate * 1.5, 1.0)

            elif event.key == pygame.K_DOWN:
                # Divide por 1,5; el mínimo 0,0001 evita actualizaciones de tamaño cero.
                network = game["network"]
                network.learning_rate = max(network.learning_rate / 1.5, 0.0001)

    draw_game()
    clock.tick(FPS)

pygame.quit()
