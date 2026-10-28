from pathlib import Path

import numpy as np
import pygame

from neural import NeuralNetwork


# --------------------------------------------------
# SETTINGS
# --------------------------------------------------

# Window width/height are pixels; these coordinates also position every panel and button.
WIDTH, HEIGHT = 1040, 750
FPS = 60  # Maximum redraw rate; clock.tick(FPS) limits the main loop.

HIDDEN_LAYERS = (12, 8)  # Units in each hidden layer: the full network is 15 -> 12 -> 8 -> 3.
LEARNING_RATE = 0.01  # Multiplier for each gradient update; UP/DOWN changes it during play.
TRAIN_EPOCHS = 30  # Mini-batch updates per round (not 30 complete passes over all examples).
HISTORY_SIZE = 5  # Recent human moves used as input; 5 x 3 one-hot values = 15 features.

# Array positions 0/1/2 must match the one-hot encoding and counter_move() IDs.
NAMES = ["ROCK", "PAPER", "SCISSORS"]
COLORS = [(65, 190, 242), (164, 139, 255), (255, 172, 98)]  # RGB color per move, same order.

BG = (14, 22, 36)
PANEL = (25, 37, 57)
CARD = (37, 54, 79)
WHITE = (242, 247, 255)
MUTED = (158, 177, 201)
GREEN = (74, 220, 157)

ASSETS = Path(__file__).parent / "assets"  # Folder for the three generated or supplied PNG icons.
ASSETS.mkdir(exist_ok=True)


pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Neural Arcade - Rock Paper Scissors")
clock = pygame.time.Clock()

# Font sizes are pixel heights; bold is enabled only for emphasis.
font_title = pygame.font.SysFont("arial", 29, bold=True)
font_big = pygame.font.SysFont("arial", 38, bold=True)
font_normal = pygame.font.SysFont("arial", 21, bold=True)
font_small = pygame.font.SysFont("arial", 17)
font_tiny = pygame.font.SysFont("arial", 14)


# --------------------------------------------------
# USER INTERFACE DRAWING
# --------------------------------------------------


def text(message, x, y, font=font_small, color=WHITE):
    """Draw message at the top-left pixel position (x, y), using the chosen font and color."""
    image = font.render(str(message), True, color)
    screen.blit(image, (x, y))


def centered(message, center_x, y, font=font_small, color=WHITE):
    """Draw message centered on center_x; y is its top pixel coordinate."""
    image = font.render(str(message), True, color)
    screen.blit(image, (center_x - image.get_width() // 2, y))


def panel(rect, color=PANEL, radius=18):
    """Draw a rounded rectangle; rect is (x, y, width, height), radius is corner size."""
    pygame.draw.rect(screen, color, rect, border_radius=radius)


def bar(x, y, width, value, color):
    """Draw a probability bar; value is clamped to 0..1 and width is measured in pixels."""
    value = max(0.0, min(1.0, float(value)))
    panel((x, y, width, 13), CARD, 6)

    filled = round(width * value)
    if filled:
        panel((x, y, filled, 13), color, 6)


# --------------------------------------------------
# IMAGES
# --------------------------------------------------


def create_default_image(index, path):
    """Create a fallback PNG: index selects rock/paper/scissors and path is its output file."""
    surface = pygame.Surface((200, 200), pygame.SRCALPHA)
    color = COLORS[index]

    if index == 0:
        # Rock: irregular silhouette.
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
        # Paper: sheet with lines.
        rect = pygame.Rect(49, 28, 102, 147)
        pygame.draw.rect(surface, color, rect, border_radius=9)
        pygame.draw.rect(surface, WHITE, rect, 5, border_radius=9)

        for y in (74, 100, 126):
            pygame.draw.line(surface, (51, 63, 90), (68, y), (131, y), 5)

    else:
        # Scissors: circular handles and two blades.
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
# NEURAL NETWORK INPUT DATA
# --------------------------------------------------


def encode_history(history):
    """
    Convert the last HISTORY_SIZE moves into HISTORY_SIZE * 3 numeric features.

    Rock     = [1, 0, 0]
    Paper    = [0, 1, 0]
    Scissors = [0, 0, 1]

    Missing history slots use [1/3, 1/3, 1/3] as a neutral placeholder.
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
    """Return the move that beats predicted (0=rock, 1=paper, 2=scissors)."""
    return (predicted + 1) % 3


def evaluate(human, ai):
    """Compare integer move IDs (0, 1, 2) and return the round outcome."""
    if human == ai:
        return "DRAW"

    if (human - ai) % 3 == 1:
        return "YOU WIN"

    return "AI WINS"


# --------------------------------------------------
# GAME STATE
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
        "result": "CHOOSE YOUR FIRST MOVE",
    }


game = new_game()


def play(human_move):
    """Play one round for human_move (0=rock, 1=paper, 2=scissors), then train and predict."""
    network = game["network"]

    # 1. Save the prediction made BEFORE seeing the player's choice.
    probs = game["probabilities"].copy()
    predicted = int(np.argmax(probs))

    # 2. The game policy counters the most likely human move.
    ai_move = counter_move(predicted)

    # 3. Evaluate the round.
    result = evaluate(human_move, ai_move)

    if result == "YOU WIN":
        game["human_score"] += 1
    elif result == "AI WINS":
        game["ai_score"] += 1
    else:
        game["draws"] += 1

    if predicted == human_move:
        game["correct_predictions"] += 1

    # 4. Store the observed move as a supervised training target.
    x = encode_history(game["history"])
    game["examples"].append((x, human_move))
    game["history"].append(human_move)

    # 5. Train on accumulated examples, including this round.
    game["loss"] = network.train(game["examples"], epochs=TRAIN_EPOCHS)

    # 6. Predict the NEXT human move.
    next_x = encode_history(game["history"])
    game["probabilities"] = network.predict(next_x)

    game["last_human"] = human_move
    game["last_ai"] = ai_move
    game["last_prediction"] = predicted
    game["last_probs"] = probs
    game["result"] = result


# --------------------------------------------------
# GAME BUTTONS
# --------------------------------------------------

# Each pygame.Rect is (left, top, width, height) in window pixels, matching move IDs 0..2.
BUTTONS = [
    pygame.Rect(55, 518, 180, 168),
    pygame.Rect(260, 518, 180, 168),
    pygame.Rect(465, 518, 180, 168),
]


def draw_game():
    """Redraw the current scores, prediction, training metrics, and clickable move cards."""
    screen.fill(BG)

    # Header.
    text("NEURAL ARCADE", 40, 20, font_tiny, GREEN)
    text("ROCK  ·  PAPER  ·  SCISSORS", 40, 42, font_title)

    text("R: reset  |  Arrows: learning rate", 650, 51, font_tiny, MUTED)

    # Scoreboard.
    panel((40, 100, 640, 100))

    centered("PLAYER", 195, 112, font_small, MUTED)
    centered(str(game["human_score"]), 195, 139, font_big)

    centered("IA", 510, 112, font_small, MUTED)
    centered(str(game["ai_score"]), 510, 139, font_big)

    # Human-move predictions.
    panel((700, 100, 300, 288))

    text("NEXT MOVE", 718, 115, font_normal)
    text("Estimated probability of your move", 718, 146, font_tiny, MUTED)

    for i, prob in enumerate(game["probabilities"]):
        y = 184 + i * 63

        text(NAMES[i], 718, y, font_small)
        text(f"{prob * 100:.1f}%", 928, y, font_small, COLORS[i])
        bar(718, y + 27, 262, prob, COLORS[i])

    # Most recent round.
    panel((40, 217, 640, 285))

    centered(game["result"], 360, 233, font_normal, GREEN)

    if game["last_human"] is not None:
        human = game["last_human"]
        ai = game["last_ai"]

        screen.blit(images[human], (142, 279))
        screen.blit(images[ai], (447, 279))

        centered("YOU", 204, 415, font_small, MUTED)
        centered("AI", 509, 415, font_small, MUTED)

        centered(NAMES[human], 204, 446, font_normal)
        centered(NAMES[ai], 509, 446, font_normal)

        predicted = game["last_prediction"]
        confidence = game["last_probs"][predicted] * 100

        centered(
            f"AI predicted: {NAMES[predicted]} ({confidence:.1f}%)",
            360,
            477,
            font_tiny,
            MUTED,
        )
    else:
        centered("CAN THE AI LEARN YOUR PATTERN?", 360, 335, font_normal)

    # Move selection.
    text("CHOOSE YOUR MOVE", 55, 494, font_small)

    mouse = pygame.mouse.get_pos()

    for i, rect in enumerate(BUTTONS):
        hovered = rect.collidepoint(mouse)
        color = (49, 70, 100) if hovered else CARD

        panel(rect, color)
        screen.blit(images[i], (rect.x + 27, rect.y + 5))

        centered(NAMES[i], rect.centerx, rect.y + 129, font_small)

    # Training metrics.
    panel((700, 405, 300, 281))

    text("TRAINING", 718, 423, font_normal)

    rounds = len(game["history"])
    accuracy = 100 * game["correct_predictions"] / rounds if rounds else 0

    loss = f"{game['loss']:.4f}" if game["loss"] is not None else "---"

    rows = [
        ("Rounds", str(rounds)),
        ("Prediction accuracy", f"{accuracy:.1f}%" if rounds else "---"),
        ("Draws", str(game["draws"])),
        ("Loss", loss),
        ("Updates", str(game["network"].steps)),
        ("Learning rate", f"{game['network'].learning_rate:.4f}"),
    ]

    for i, (label, value) in enumerate(rows):
        y = 467 + i * 32
        text(label, 718, y, font_small, MUTED)
        text(value, 907, y, font_small)

    # Footer: architecture and keyboard shortcuts.
    text(
        f"Network: 15 -> {' -> '.join(map(str, HIDDEN_LAYERS))} -> 3",
        55,
        708,
        font_tiny,
        MUTED,
    )
    text("1: Rock   2: Paper   3: Scissors", 700, 708, font_tiny, MUTED)

    pygame.display.flip()


# --------------------------------------------------
# MAIN LOOP
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
                # Multiply the learning rate by 1.5, capped at 1.0.
                network = game["network"]
                network.learning_rate = min(network.learning_rate * 1.5, 1.0)

            elif event.key == pygame.K_DOWN:
                # Divide by 1.5, with a floor of 0.0001 to avoid a zero-sized update.
                network = game["network"]
                network.learning_rate = max(network.learning_rate / 1.5, 0.0001)

    draw_game()
    clock.tick(FPS)

pygame.quit()
