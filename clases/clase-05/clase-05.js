const VERSION = "20261027-1";

const copy = {
  en: {
    navHome: "Home", navNotebook: "Notebook", navCode: "Code", navAria: "Class navigation", languageSwitch: "Language switch", contentsAria: "Notebook contents",
    heroLabel: "Neural networks · Rock-paper-scissors", heroTitle: "Can a neural network predict your next move?",
    heroText: "Follow a small neural network as it reads a player's recent choices, estimates the next one, and updates from each new round.",
    visualLabel: "A neural network maps five past moves to probabilities for the next move", visualCaption: "5 recent moves → 3 estimated probabilities",
    explore: "Explore the model", getCode: "Get the Python files", goalLabel: "Learning goal",
    goalTitle: "Separate prediction, decision, and learning",
    goalText: "Explain how the game encodes recent moves, produces three probabilities, selects a counter-move, and trains on the human move only after that move is known.",
    notebookLabel: "Student notebook", notebookTitle: "A neural network learns a short pattern",
    notebookLead: "The model predicts the human player's next move. The game then uses a separate rule to choose a move that beats the most likely option.",
    contentsTitle: "In this page", codeLabel: "Runnable project", codeTitle: "Run the neural arcade",
    codeLead: "Download both Python files into the same folder. The comments explain the model settings and function parameters in the selected language.",
    setupTitle: "Install and run", copy: "Copy", download: "Download", copied: "Copied.", copyFailed: "Copy failed. Select the code and copy it.",
    loadError: "Could not load this source file.", checkLabel: "Check your understanding",
    checkTitle: "Explain what the model can and cannot learn", footerText: "Generative AI course notebook",
    examplesHeading: "Work through the idea", tableHeading: "Reference table", codeMapHeading: "Where each idea appears in code",
    loadingCode: "Loading source code…",
    setupCode: "python -m pip install numpy pygame\npython main.py",
    checks: [
      "Why does the model receive 15 values when there are only three possible moves?",
      "What is the difference between the predicted move and the move the computer plays?",
      "Why does training happen after the human move is observed?",
      "Why is the reported loss not proof that the model generalizes to future rounds?",
      "What is unusual about the code's epochs parameter?"
    ],
    sections: [
      { id: "two-tasks", title: "Two different tasks: prediction and decision", paragraphs: [
        "Rock-paper-scissors has three possible human choices. The network does not directly choose its own move: it estimates a probability distribution over the human player's next choice. A separate game rule then selects a counter-move.",
        "This distinction matters. A prediction can be correct while the game policy still ties or loses, and a winning move does not prove that the predicted human choice was correct. The current policy takes the most likely human move and chooses the option that beats it."
      ], diagram: "cycle", blocks: [
        ["Prediction", "Estimate P(rock), P(paper), and P(scissors) from recent human moves."],
        ["Decision", "Choose the counter-move for the most probable category. This argmax policy is written in the game, not learned by the network."]
      ], table: [["Human move predicted", "Computer counter-move"], ["Rock", "Paper"], ["Paper", "Scissors"], ["Scissors", "Rock"]] },
      { id: "artificial-neuron", title: "An artificial neuron: inputs, weights, and bias", paragraphs: [
        "A neuron receives numeric inputs, multiplies each by a weight, adds the results and a bias, then applies an activation function. The weights control the influence of inputs; the bias shifts the value before activation. Training adjusts these parameters using examples and an error signal.",
        "The neuron does not understand the word “rock.” Its input values have meaning because the program defines an encoding for the three moves. Different data encodings would change how the network can use the information."
      ], formula: "z = w₁x₁ + w₂x₂ + … + wₙxₙ + b     a = f(z)", table: [["Symbol", "Meaning"], ["x", "Numeric input feature"], ["w", "Learnable weight for an input"], ["b", "Learnable bias"], ["z", "Weighted sum before activation"], ["f(z)", "Activation function output"]] },
      { id: "architecture", title: "The network: 15 → 12 → 8 → 3", paragraphs: [
        "The model is a feed-forward multilayer perceptron. Its 15 inputs encode five previous moves with three values per move. The two hidden layers contain 12 and 8 neurons. The output has three values, one per possible next human move.",
        "Every neuron in one layer connects to every neuron in the next. A weight belongs to each connection, and each non-input neuron has a bias. The model therefore has 180 + 96 + 24 = 300 weights and 12 + 8 + 3 = 23 biases: 323 trainable parameters in total."
      ], diagram: "architecture", table: [["Layer transition", "Weights", "Biases"], ["15 → 12", "15 × 12 = 180", "12"], ["12 → 8", "12 × 8 = 96", "8"], ["8 → 3", "8 × 3 = 24", "3"], ["Total", "300", "23"]], note: "The network has 323 trainable parameters: 300 weights and 23 biases. Several layers make it a small deep model, but depth alone does not guarantee useful learning." },
      { id: "encode-history", title: "Represent five moves as 15 numbers", paragraphs: [
        "A neural network operates on numbers, so each category is represented with one-hot encoding: one position is 1 and the other two are 0. The order stays fixed: rock, paper, scissors. Five move vectors are concatenated into one 15-value input.",
        "At the beginning of a game, the history may contain fewer than five moves. The program fills each missing slot with [1/3, 1/3, 1/3]. This is a placeholder for an unobserved position, not a move and not an earlier prediction. The model sees only the most recent five moves; it has no recurrent memory of the entire game."
      ], diagram: "encoding", table: [["Move", "One-hot vector"], ["Rock", "[1, 0, 0]"], ["Paper", "[0, 1, 0]"], ["Scissors", "[0, 0, 1]"]], note: "The same move sequence in another order produces a different vector. Order is part of the input signal." },
      { id: "forward", title: "Forward propagation: from history to scores", paragraphs: [
        "Forward propagation carries an input through each layer. Each layer multiplies by its weight matrix, adds its bias, and applies an activation. The hidden layers use ReLU; the output layer applies Softmax to produce three probabilities.",
        "For one example, X has shape 1 × 15. Multiplying by W₁ (15 × 12) gives A₁ (1 × 12); W₂ (12 × 8) gives A₂ (1 × 8); W₃ (8 × 3) produces three output scores. These dimensions must line up for matrix multiplication."
      ], formula: "Z = XW + b     A = f(Z)", table: [["Value", "Shape for one history"], ["X", "1 × 15"], ["W₁ → A₁", "15 × 12 → 1 × 12"], ["W₂ → A₂", "12 × 8 → 1 × 8"], ["W₃ → output", "8 × 3 → 1 × 3"]] },
      { id: "relu", title: "ReLU adds nonlinearity in hidden layers", paragraphs: [
        "The hidden layers apply the Rectified Linear Unit: ReLU(z) = max(0, z). Negative values become zero; positive values pass through. This inexpensive operation adds nonlinearity, allowing stacked layers to represent relationships that a single linear transformation could not.",
        "ReLU's gradient is 1 for positive values and 0 for negative values. If a neuron stays negative for almost every example, it may receive no useful gradient and become inactive (a “dying ReLU”). The activation does not give a neuron a fixed human-readable meaning; its behavior depends on learned parameters and data."
      ], formula: "ReLU(−2) = 0     ReLU(0) = 0     ReLU(1.5) = 1.5", blocks: [
        ["Before activation", "A weighted sum can be negative, zero, or positive."],
        ["After ReLU", "Only positive values continue into the next hidden layer; negative values are clipped to zero."]
      ] },
      { id: "softmax", title: "Softmax turns output scores into probabilities", paragraphs: [
        "The three final scores (logits) can have any real value. Softmax exponentiates them and normalizes by their sum, producing nonnegative values that add to 1. Each position corresponds to rock, paper, or scissors.",
        "For example, [0.60, 0.25, 0.15] means the model assigns 60% to rock, 25% to paper, and 15% to scissors. It is an estimate, not certainty, and the values are not guaranteed to be calibrated probabilities. The game currently uses argmax, then counters that most likely category. It does not calculate the move with the highest expected score across the entire distribution."
      ], formula: "P(class i) = exp(zᵢ) / Σ exp(zⱼ)", table: [["Estimated human move", "Probability"], ["Rock", "60%"], ["Paper", "25%"], ["Scissors", "15%"], ["Total", "100%"]], note: "At initialization, output weights and biases are zero, so Softmax is uniform. If argmax sees a tie, NumPy returns the first category: rock. The game then counters with paper." },
      { id: "learning-cycle", title: "Learning happens after the human move", paragraphs: [
        "At the start of a round, the game already has the previous history and the probabilities computed for it. It saves those probabilities and chooses its counter-move before the new human choice is revealed. Only after the player chooses does the game know the target label for that round.",
        "The program then pairs the history that existed before the move with the observed move, adds that example to its training history, updates the network, and predicts the following round. This is supervised learning because each example has a known target. It is not reinforcement learning: the network is trained to predict the human move, not directly to maximize game wins from rewards."
      ], diagram: "training", table: [["Stage", "What happens"], ["1 · Before choice", "Encode recent moves and use the current prediction."], ["2 · Decision", "The game selects a counter-move."], ["3 · Observation", "The human chooses; this reveals the target class."], ["4 · Update", "Store (previous history, observed move) and train."], ["5 · Next round", "Use the updated model to estimate the next move."]] },
      { id: "loss-backprop", title: "Loss and backpropagation measure and reduce error", paragraphs: [
        "Categorical cross-entropy penalizes the probability assigned to the true move. For a single example, loss is −log(P(true class)). A confident correct prediction has small loss; assigning a very low probability to the actual move produces a large penalty.",
        "Backpropagation applies the chain rule to calculate how each weight and bias contributed to the loss. With Softmax and cross-entropy, the output-logit gradient simplifies to predicted probabilities minus the one-hot target. Gradient descent then subtracts learning_rate × gradient from each parameter."
      ], formula: "L = −log(P(true class))     parameter ← parameter − η · gradient", table: [["Probability assigned to true move", "Cross-entropy loss"], ["0.90", "0.105"], ["0.60", "0.511"], ["1/3", "≈ 1.099"], ["0.10", "2.303"]], blocks: [
        ["Backpropagation", "Computes gradients by tracing the loss backward through the output and hidden layers."],
        ["Gradient descent", "Uses those gradients to update weights and biases. The learning rate η controls the step size."],
        ["Numerical update", "If w = 0.50, gradient = 0.20, and η = 0.01, the new weight is 0.50 − 0.01 × 0.20 = 0.498."]
      ] },
      { id: "training-settings", title: "Learning rate, mini-batches, and the epochs setting", paragraphs: [
        "The learning rate scales every gradient update. A very small value can make progress slow; an excessively large value can cause unstable jumps. The Up and Down arrows change it during the game, multiplying or dividing it by 1.5 within set bounds.",
        "Each call to train performs 30 update steps. Each step samples up to 16 examples without replacement within that mini-batch. When fewer than 16 examples exist, all available examples are used. The code names the step count epochs, but one step is not a full pass through the dataset; “mini-batch updates” is more precise.",
        "The hidden sizes (12, 8) set the number of units in the two hidden layers. A larger network has more capacity and more parameters, but with a short game history it may fit noise rather than a repeatable pattern. More neurons do not automatically improve future predictions."
      ], table: [["Setting", "Value", "Effect"], ["hidden", "(12, 8)", "Units in each hidden layer"], ["learning_rate", "0.01", "Scale of each parameter update"], ["epochs", "30", "Mini-batch updates each time train() is called"], ["batch_size", "16", "Maximum examples sampled for one update"], ["seed", "42", "Makes initialization and sampling repeatable"]], note: "Within each sampled batch, indices are not repeated. Across separate update steps, the same example may be selected again." },
      { id: "metrics", title: "Read the game metrics carefully", paragraphs: [
        "Prediction accuracy counts rounds in which the most probable human move matched the actual move. Loss is the mean cross-entropy over the accumulated examples after training. The update counter counts gradient steps; the score counts game outcomes. They measure different things.",
        "The displayed loss is measured on examples the network trains on, not a held-out test set. A falling training loss shows fit to observed history; it does not prove that the player has a stable pattern or that future predictions will be accurate. Prediction accuracy and win rate are also different: a correct forecast is not itself a win."
      ], table: [["Metric", "What it measures", "What it does not establish"], ["Prediction accuracy", "How often argmax matched the human move", "That the computer won"], ["Loss", "Average training cross-entropy", "Generalization to unseen rounds"], ["Updates", "Gradient steps performed", "Quality of each step"], ["Score", "Rounds won, lost, or tied", "Whether the forecast was correct"]] },
      { id: "patterns", title: "Patterns, random choices, and overfitting", paragraphs: [
        "A player who always chooses rock creates a simple, learnable pattern. A player who alternates rock and paper creates a short dependency that can fit inside the five-move window. If choices are independent and equally likely, however, the history contains no reliable signal about the next move; expected accuracy for a three-class guess is about 1/3.",
        "With only a few rounds, a model may appear to discover a pattern in random choices. This is overfitting: it learns details of the sample that do not persist. A player may also change behavior, creating distribution shift. Because this game retains all examples, older behavior can slow adaptation to a new pattern. A separate test set or fresh future rounds are needed for an independent evaluation."
      ], blocks: [
        ["Stable behavior", "Repeated choices provide a regularity the model may learn."],
        ["Random behavior", "If the next choice is independent of history, more training cannot extract a predictive signal that is not there."],
        ["Changed behavior", "A new pattern may differ from accumulated examples, so earlier observations can become less representative."]
      ] },
      { id: "limits-code", title: "Model limits and where concepts appear in code", paragraphs: [
        "This project is a compact learning model, not a mind-reading system. It sees five recent moves, has no recurrent memory, needs examples, and cannot reliably predict genuinely random choices. It learns to classify the next human move; the game policy separately selects a counter-move. Its probabilities may be poorly calibrated, especially early in a game.",
        "The runnable project uses NumPy for matrix calculations and Pygame for the interface. Keep main.py and neural.py in the same folder. The downloads include comments in the selected language explaining settings and function parameters."
      ], table: [["Concept", "Code location"], ["Architecture, weights, biases", "NeuralNetwork.__init__()"], ["One-hot history", "encode_history() in main.py"], ["ReLU, Softmax, forward pass", "forward() and softmax()"], ["Inference", "predict()"], ["Cross-entropy, gradients, updates", "loss() and train()"], ["Counter-move rule", "counter_move() in main.py"], ["Training examples", "game[\"examples\"]"]], note: "Here, the input is a short sequence of categories rather than an image. Choose a network architecture that fits the structure of the data and the task." }
    ]
  },
  es: {
    navHome: "Inicio", navNotebook: "Cuaderno", navCode: "Código", navAria: "Navegación de la clase", languageSwitch: "Selector de idioma", contentsAria: "Contenido del cuaderno",
    heroLabel: "Redes neuronales · Piedra, papel o tijera", heroTitle: "¿Puede una red neuronal anticipar tu jugada?",
    heroText: "Observa una red neuronal pequeña mientras analiza las elecciones recientes, estima la siguiente y se actualiza con cada ronda.",
    visualLabel: "Una red neuronal transforma cinco jugadas anteriores en probabilidades para la siguiente", visualCaption: "5 jugadas recientes → 3 probabilidades estimadas",
    explore: "Explorar el modelo", getCode: "Obtener los archivos Python", goalLabel: "Objetivo de aprendizaje",
    goalTitle: "Distingue predicción, decisión y aprendizaje",
    goalText: "Explica cómo el juego codifica jugadas recientes, produce tres probabilidades, elige una contrajugada y entrena con la elección humana solo después de conocerla.",
    notebookLabel: "Cuaderno del estudiante", notebookTitle: "Una red neuronal aprende un patrón corto",
    notebookLead: "El modelo predice la siguiente jugada humana. Después, el juego aplica una regla independiente para escoger la jugada que vence a la opción más probable.",
    contentsTitle: "Contenido de la página", codeLabel: "Proyecto ejecutable", codeTitle: "Ejecuta el arcade neuronal",
    codeLead: "Descarga los dos archivos Python en una misma carpeta. Los comentarios explican los ajustes del modelo y los parámetros de las funciones en el idioma seleccionado.",
    setupTitle: "Instalación y ejecución", copy: "Copiar", download: "Descargar", copied: "Copiado.", copyFailed: "No se pudo copiar. Selecciona el código y cópialo.",
    loadError: "No se pudo cargar este archivo fuente.", checkLabel: "Comprueba tu comprensión",
    checkTitle: "Explica qué puede y qué no puede aprender el modelo", footerText: "Cuaderno del curso de IA Generativa",
    examplesHeading: "Analiza la idea", tableHeading: "Tabla de referencia", codeMapHeading: "Dónde aparece cada idea en el código",
    loadingCode: "Cargando código fuente…",
    setupCode: "python -m pip install numpy pygame\npython main.py",
    checks: [
      "¿Por qué el modelo recibe 15 valores si solo existen tres jugadas posibles?",
      "¿Qué diferencia hay entre la jugada predicha y la que hace la computadora?",
      "¿Por qué el entrenamiento ocurre después de observar la jugada humana?",
      "¿Por qué la pérdida mostrada no demuestra que el modelo generalice a rondas futuras?",
      "¿Qué tiene de particular el parámetro epochs de este código?"
    ],
    sections: [
      { id: "two-tasks", title: "Dos tareas distintas: predicción y decisión", paragraphs: [
        "Piedra, papel o tijera tiene tres posibles elecciones humanas. La red no decide directamente qué jugada hará ella: estima una distribución de probabilidades para la siguiente elección de la persona. Una regla separada del juego selecciona después una contrajugada.",
        "La diferencia importa. Una predicción puede ser correcta aunque la política del juego empate o pierda, y una jugada ganadora no demuestra que se haya anticipado la elección humana. La política actual toma la jugada humana más probable y elige la que la vence."
      ], diagram: "cycle", blocks: [
        ["Predicción", "Estimar P(piedra), P(papel) y P(tijera) a partir de elecciones humanas recientes."],
        ["Decisión", "Elegir la contrajugada de la categoría más probable. Esta política argmax está escrita en el juego; la red no la aprende."]
      ], table: [["Jugada humana predicha", "Contrajugada de la computadora"], ["Piedra", "Papel"], ["Papel", "Tijera"], ["Tijera", "Piedra"]] },
      { id: "artificial-neuron", title: "Neurona artificial: entradas, pesos y sesgo", paragraphs: [
        "Una neurona recibe entradas numéricas, multiplica cada una por un peso, suma los resultados y un sesgo, y luego aplica una función de activación. Los pesos controlan la influencia de las entradas; el sesgo desplaza el valor antes de la activación. El entrenamiento ajusta esos parámetros con ejemplos y una señal de error.",
        "La neurona no entiende la palabra «piedra». Los valores de entrada tienen significado porque el programa define una codificación para las tres jugadas. Otra codificación cambiaría la forma en que la red puede utilizar esa información."
      ], formula: "z = w₁x₁ + w₂x₂ + … + wₙxₙ + b     a = f(z)", table: [["Símbolo", "Significado"], ["x", "Característica numérica de entrada"], ["w", "Peso aprendible asociado a una entrada"], ["b", "Sesgo aprendible"], ["z", "Suma ponderada antes de la activación"], ["f(z)", "Salida de la función de activación"]] },
      { id: "architecture", title: "La red: 15 → 12 → 8 → 3", paragraphs: [
        "El modelo es un perceptrón multicapa de propagación hacia adelante. Sus 15 entradas codifican cinco jugadas anteriores con tres valores por jugada. Las dos capas ocultas tienen 12 y 8 neuronas. La salida tiene tres valores, uno por cada posible jugada humana siguiente.",
        "Cada neurona de una capa se conecta con todas las neuronas de la siguiente. Cada conexión tiene un peso y cada neurona que no es de entrada tiene un sesgo. El modelo suma 180 + 96 + 24 = 300 pesos y 12 + 8 + 3 = 23 sesgos: 323 parámetros entrenables en total."
      ], diagram: "architecture", table: [["Transición entre capas", "Pesos", "Sesgos"], ["15 → 12", "15 × 12 = 180", "12"], ["12 → 8", "12 × 8 = 96", "8"], ["8 → 3", "8 × 3 = 24", "3"], ["Total", "300", "23"]], note: "La red tiene 323 parámetros entrenables: 300 pesos y 23 sesgos. Sus varias capas la hacen una red profunda pequeña, pero la profundidad por sí sola no garantiza aprendizaje útil." },
      { id: "encode-history", title: "Representa cinco jugadas con 15 números", paragraphs: [
        "Una red neuronal opera con números, así que cada categoría se representa mediante codificación one-hot: una posición vale 1 y las otras dos valen 0. El orden se mantiene fijo: piedra, papel, tijera. Se concatenan cinco vectores de jugada para formar una entrada de 15 valores.",
        "Al inicio, el historial puede tener menos de cinco jugadas. El programa completa cada posición faltante con [1/3, 1/3, 1/3]. Es un marcador para una posición todavía no observada, no una jugada ni una predicción previa. El modelo ve solo las cinco jugadas más recientes; no tiene memoria recurrente de toda la partida."
      ], diagram: "encoding", table: [["Jugada", "Vector one-hot"], ["Piedra", "[1, 0, 0]"], ["Papel", "[0, 1, 0]"], ["Tijera", "[0, 0, 1]"]], note: "La misma secuencia en otro orden produce un vector distinto. El orden es parte de la señal de entrada." },
      { id: "forward", title: "Propagación hacia adelante: del historial a los puntajes", paragraphs: [
        "La propagación hacia adelante lleva una entrada por cada capa. Cada capa multiplica por su matriz de pesos, suma su sesgo y aplica una activación. Las capas ocultas usan ReLU; la capa de salida aplica Softmax para producir tres probabilidades.",
        "Para un ejemplo, X tiene forma 1 × 15. Al multiplicar por W₁ (15 × 12) se obtiene A₁ (1 × 12); W₂ (12 × 8) produce A₂ (1 × 8); W₃ (8 × 3) genera tres puntajes de salida. Las dimensiones deben coincidir para realizar la multiplicación matricial."
      ], formula: "Z = XW + b     A = f(Z)", table: [["Valor", "Forma para un historial"], ["X", "1 × 15"], ["W₁ → A₁", "15 × 12 → 1 × 12"], ["W₂ → A₂", "12 × 8 → 1 × 8"], ["W₃ → salida", "8 × 3 → 1 × 3"]] },
      { id: "relu", title: "ReLU introduce no linealidad en las capas ocultas", paragraphs: [
        "Las capas ocultas aplican la unidad lineal rectificada: ReLU(z) = max(0, z). Los valores negativos se convierten en cero y los positivos pasan. Esta operación económica añade no linealidad y permite que varias capas representen relaciones que una sola transformación lineal no podría modelar.",
        "El gradiente de ReLU es 1 para valores positivos y 0 para los negativos. Si una neurona permanece negativa casi siempre, puede dejar de recibir gradientes útiles y quedar inactiva («ReLU muerta»). La activación no asigna por sí sola un significado legible a la neurona: su comportamiento depende de los parámetros aprendidos y de los datos."
      ], formula: "ReLU(−2) = 0     ReLU(0) = 0     ReLU(1,5) = 1,5", blocks: [
        ["Antes de activar", "Una suma ponderada puede ser negativa, cero o positiva."],
        ["Después de ReLU", "Los valores positivos pasan a la siguiente capa oculta; los negativos se recortan a cero."]
      ] },
      { id: "softmax", title: "Softmax convierte puntajes en probabilidades", paragraphs: [
        "Los tres puntajes finales (logits) pueden tener cualquier valor real. Softmax los eleva a una exponencial y los normaliza por su suma, para obtener valores no negativos que suman 1. Cada posición corresponde a piedra, papel o tijera.",
        "Por ejemplo, [0,60, 0,25, 0,15] significa que el modelo asigna 60 % a piedra, 25 % a papel y 15 % a tijera. Es una estimación, no una certeza, y no se garantiza que sean probabilidades calibradas. El juego usa argmax y contrarresta esa categoría; no calcula la jugada con mayor puntaje esperado considerando toda la distribución."
      ], formula: "P(clase i) = exp(zᵢ) / Σ exp(zⱼ)", table: [["Jugada humana estimada", "Probabilidad"], ["Piedra", "60 %"], ["Papel", "25 %"], ["Tijera", "15 %"], ["Total", "100 %"]], note: "Al iniciar, los pesos y sesgos de salida valen cero, por lo que Softmax es uniforme. Si argmax encuentra un empate, NumPy devuelve la primera categoría: piedra. El juego la contrarresta con papel." },
      { id: "learning-cycle", title: "El aprendizaje ocurre después de la jugada humana", paragraphs: [
        "Al inicio de una ronda, el juego ya tiene el historial anterior y las probabilidades calculadas a partir de este. Guarda esas probabilidades y elige su contrajugada antes de conocer la nueva elección humana. Solo después de que la persona juega, el sistema conoce la etiqueta objetivo de esa ronda.",
        "Luego empareja el historial previo a la jugada con la elección observada, agrega el ejemplo al historial de entrenamiento, actualiza la red y predice la ronda siguiente. Es aprendizaje supervisado porque cada ejemplo tiene una respuesta conocida. No es aprendizaje por refuerzo: la red predice la jugada humana, no aprende directamente a maximizar victorias mediante recompensas."
      ], diagram: "training", table: [["Etapa", "Qué ocurre"], ["1 · Antes de elegir", "Codificar jugadas recientes y usar la predicción actual."], ["2 · Decisión", "El juego escoge una contrajugada."], ["3 · Observación", "La persona elige; así se conoce la clase objetivo."], ["4 · Actualización", "Guardar (historial anterior, jugada observada) y entrenar."], ["5 · Ronda siguiente", "El modelo actualizado estima la jugada futura."]] },
      { id: "loss-backprop", title: "Pérdida y retropropagación miden y reducen el error", paragraphs: [
        "La entropía cruzada categórica penaliza la probabilidad asignada a la jugada verdadera. Para un ejemplo, la pérdida es −log(P(clase verdadera)). Una predicción correcta y segura tiene una pérdida pequeña; asignar una probabilidad muy baja a la jugada real produce una penalización grande.",
        "La retropropagación aplica la regla de la cadena para calcular cuánto contribuyó cada peso y sesgo a la pérdida. Con Softmax y entropía cruzada, el gradiente respecto a los logits de salida se simplifica como probabilidades estimadas menos objetivo one-hot. Después, el descenso de gradiente resta learning_rate × gradiente a cada parámetro."
      ], formula: "L = −log(P(clase verdadera))     parámetro ← parámetro − η · gradiente", table: [["Probabilidad asignada a la jugada verdadera", "Pérdida de entropía cruzada"], ["0,90", "0,105"], ["0,60", "0,511"], ["1/3", "≈ 1,099"], ["0,10", "2,303"]], blocks: [
        ["Retropropagación", "Calcula gradientes al rastrear la pérdida hacia atrás por las capas de salida y ocultas."],
        ["Descenso de gradiente", "Usa esos gradientes para actualizar pesos y sesgos. La tasa de aprendizaje η regula el tamaño del paso."],
        ["Actualización numérica", "Si w = 0,50, gradiente = 0,20 y η = 0,01, el peso nuevo es 0,50 − 0,01 × 0,20 = 0,498."]
      ] },
      { id: "training-settings", title: "Tasa de aprendizaje, minilotes y el ajuste epochs", paragraphs: [
        "La tasa de aprendizaje escala cada actualización del gradiente. Un valor muy pequeño puede hacer lento el progreso; uno excesivamente grande puede causar saltos inestables. Las flechas arriba y abajo lo cambian durante la partida, multiplicándolo o dividiéndolo por 1,5 dentro de límites establecidos.",
        "Cada llamada a train ejecuta 30 pasos de actualización. En cada paso toma al azar hasta 16 ejemplos, sin repetirlos dentro de ese minilote. Si hay menos de 16 ejemplos, utiliza todos los disponibles. El código llama epochs a la cantidad de pasos, pero cada uno no recorre todo el conjunto; «actualizaciones por minilote» es una descripción más precisa.",
        "El tamaño oculto (12, 8) define la cantidad de neuronas de las dos capas internas. Una red grande tiene más capacidad y más parámetros, pero con pocas rondas puede ajustarse al ruido en vez de a un patrón repetible. Agregar neuronas no mejora automáticamente las predicciones futuras."
      ], table: [["Ajuste", "Valor", "Efecto"], ["hidden", "(12, 8)", "Neuronas de cada capa oculta"], ["learning_rate", "0,01", "Escala de cada actualización de parámetros"], ["epochs", "30", "Actualizaciones por minilote en cada llamada a train()"], ["batch_size", "16", "Máximo de ejemplos por actualización"], ["seed", "42", "Permite repetir la inicialización y el muestreo"]], note: "Un ejemplo no se repite dentro de un minilote, pero puede volver a seleccionarse en otro paso." },
      { id: "metrics", title: "Interpreta con cuidado las métricas del juego", paragraphs: [
        "El acierto predictivo cuenta las rondas en que la jugada humana más probable coincidió con la real. La pérdida es la entropía cruzada media de los ejemplos acumulados después de entrenar. El contador de actualizaciones mide pasos de gradiente; el marcador cuenta resultados del juego. Son indicadores distintos.",
        "La pérdida mostrada se calcula con ejemplos usados para entrenar, no con un conjunto de prueba separado. Una pérdida de entrenamiento que disminuye muestra ajuste al historial observado, pero no demuestra que la persona tenga un patrón estable ni que las predicciones futuras sean acertadas. El acierto predictivo y las victorias tampoco son lo mismo."
      ], table: [["Métrica", "Qué mide", "Qué no demuestra"], ["Acierto predictivo", "Veces que argmax coincide con la jugada humana", "Que la computadora ganó"], ["Loss", "Entropía cruzada media de entrenamiento", "Generalización a rondas no observadas"], ["Actualizaciones", "Pasos de gradiente ejecutados", "La calidad de cada paso"], ["Marcador", "Rondas ganadas, perdidas o empatadas", "Si la predicción fue correcta"]] },
      { id: "patterns", title: "Patrones, elecciones aleatorias y sobreajuste", paragraphs: [
        "Una persona que siempre elige piedra genera un patrón sencillo que se puede aprender. Alternar piedra y papel introduce una dependencia corta que cabe en la ventana de cinco jugadas. Sin embargo, si las elecciones son independientes y equiprobables, el historial no contiene una señal confiable para anticipar la siguiente; el acierto esperado de una clasificación entre tres opciones es aproximadamente 1/3.",
        "Con pocas rondas, el modelo puede parecer descubrir un patrón en elecciones aleatorias. Eso es sobreajuste: aprende detalles de la muestra que no persisten. También puede cambiar el comportamiento de la persona, lo que produce un cambio de distribución. Como el juego conserva todos los ejemplos, las decisiones antiguas pueden retrasar la adaptación al nuevo patrón. Para una evaluación independiente hacen falta datos separados o rondas futuras nuevas."
      ], blocks: [
        ["Comportamiento estable", "Las elecciones repetidas aportan regularidad que el modelo podría aprender."],
        ["Comportamiento aleatorio", "Si la elección siguiente no depende del historial, más entrenamiento no puede extraer una señal predictiva inexistente."],
        ["Comportamiento cambiante", "El patrón nuevo puede diferir de los ejemplos acumulados y hacer que observaciones antiguas sean menos representativas."]
      ] },
      { id: "limits-code", title: "Límites del modelo y ubicación de los conceptos en el código", paragraphs: [
        "Este proyecto es un modelo pequeño para aprender, no un sistema que lea la mente. Solo observa cinco jugadas recientes, no tiene memoria recurrente, necesita ejemplos y no puede anticipar de forma confiable elecciones realmente aleatorias. Aprende a clasificar la siguiente jugada humana; la política del juego escoge la contrajugada por separado. Sus probabilidades pueden estar mal calibradas, sobre todo al comienzo.",
        "El proyecto usa NumPy para cálculos matriciales y Pygame para la interfaz. Descarga main.py y neural.py en una misma carpeta. Los archivos incluyen comentarios en el idioma elegido que explican los ajustes y parámetros de las funciones."
      ], table: [["Concepto", "Ubicación en el código"], ["Arquitectura, pesos y sesgos", "NeuralNetwork.__init__()"], ["Historial one-hot", "encode_history() en main.py"], ["ReLU, Softmax y propagación", "forward() y softmax()"], ["Inferencia", "predict()"], ["Entropía cruzada, gradientes y actualizaciones", "loss() y train()"], ["Regla de contrajugada", "counter_move() en main.py"], ["Ejemplos de entrenamiento", "game[\"examples\"]"]], note: "Aquí la entrada es una secuencia breve de categorías, no una imagen. La arquitectura debe ajustarse a la estructura de los datos y a la tarea." }
    ]
  }
};

const visuals = {
  architecture: (labels) => `<div class="network-diagram" role="img" aria-label="${labels.aria}">${labels.layers.map(([name, count, width]) => `<div class="network-layer"><strong>${name}</strong><div class="neuron-stack" style="--neurons:${count}">${Array.from({ length: count }, () => "<i></i>").join("")}</div><small>${labels.units.replace("{n}", count)}</small><small class="layer-width">${width}</small></div>`).join("<span class=\"diagram-arrow\" aria-hidden=\"true\">→</span>")}</div>`,
  encoding: (labels) => `<div class="encoding-diagram"><div class="move-sequence">${labels.moves.map(([move, vector]) => `<div><strong>${move}</strong><code>${vector}</code></div>`).join("")}</div><p>${labels.output}</p></div>`,
  cycle: (labels) => `<div class="cycle-diagram">${labels.steps.map(([title, body]) => `<div class="cycle-step"><strong>${title}</strong><span>${body}</span></div>`).join("")}</div>`,
  training: (labels) => `<div class="cycle-diagram training-diagram">${labels.steps.map(([title, body]) => `<div class="cycle-step"><strong>${title}</strong><span>${body}</span></div>`).join("")}</div>`
};

const visualCopy = {
  en: {
    architecture: { aria: "A neural network with 15 input values, hidden layers of 12 and 8 neurons, and 3 output probabilities", units: "{n} units", layers: [["Input", 15, "15 features"], ["Hidden 1 · ReLU", 12, "12 neurons"], ["Hidden 2 · ReLU", 8, "8 neurons"], ["Output · Softmax", 3, "3 classes"]] },
    encoding: { moves: [["Rock", "[1, 0, 0]"], ["Paper", "[0, 1, 0]"], ["Scissors", "[0, 0, 1]"]], output: "Five move vectors are concatenated → 15 input values. Example: rock → paper → scissors → rock → paper becomes [1,0,0, 0,1,0, 0,0,1, 1,0,0, 0,1,0]." },
    cycle: { steps: [["Recent history", "5 human moves"], ["Network", "Estimate 3 probabilities"], ["Game policy", "Select a counter-move"]] },
    training: { steps: [["History", "Encode previous moves"], ["Predict", "Save probabilities"], ["Choose", "Play counter-move"], ["Observe", "Human reveals target"], ["Train", "Update weights"], ["Repeat", "Predict next round"]] }
  },
  es: {
    architecture: { aria: "Red neuronal con 15 valores de entrada, capas ocultas de 12 y 8 neuronas y 3 probabilidades de salida", units: "{n} unidades", layers: [["Entrada", 15, "15 características"], ["Oculta 1 · ReLU", 12, "12 neuronas"], ["Oculta 2 · ReLU", 8, "8 neuronas"], ["Salida · Softmax", 3, "3 clases"]] },
    encoding: { moves: [["Piedra", "[1, 0, 0]"], ["Papel", "[0, 1, 0]"], ["Tijera", "[0, 0, 1]"]], output: "Se concatenan cinco vectores → 15 valores de entrada. Ejemplo: piedra → papel → tijera → piedra → papel se convierte en [1,0,0, 0,1,0, 0,0,1, 1,0,0, 0,1,0]." },
    cycle: { steps: [["Historial reciente", "5 jugadas humanas"], ["Red neuronal", "Estimar 3 probabilidades"], ["Política del juego", "Elegir una contrajugada"]] },
    training: { steps: [["Historial", "Codificar jugadas previas"], ["Predecir", "Guardar probabilidades"], ["Elegir", "Jugar una contrajugada"], ["Observar", "La persona revela la clase"], ["Entrenar", "Actualizar pesos"], ["Repetir", "Predecir la ronda siguiente"]] }
  }
};

let lang = localStorage.getItem("genai-language") || "en";
const sourceFiles = { main: "main.py", neural: "neural.py" };
let codeText = {};

function renderVisual(type) {
  return visuals[type]?.(visualCopy[lang][type]) || "";
}

function renderSections() {
  const data = copy[lang];
  const content = document.querySelector("#lessonSections");
  const links = [];
  content.replaceChildren();

  data.sections.forEach((section) => {
    const article = document.createElement("article");
    article.className = "lesson-section rps-section";
    article.id = section.id;
    const heading = document.createElement("h3");
    heading.textContent = section.title;
    article.append(heading);
    links.push(`<a href="#${section.id}">${section.title}</a>`);

    section.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      article.append(paragraph);
    });
    if (section.formula) {
      const formula = document.createElement("p");
      formula.className = "rps-formula";
      formula.textContent = section.formula;
      article.append(formula);
    }
    if (section.diagram) {
      const diagram = document.createElement("div");
      diagram.className = `rps-diagram ${section.diagram}-panel`;
      diagram.innerHTML = renderVisual(section.diagram);
      article.append(diagram);
    }
    if (section.blocks) {
      const grid = document.createElement("div");
      grid.className = "idea-grid";
      section.blocks.forEach(([titleText, bodyText]) => {
        const block = document.createElement("article");
        block.className = "idea-block";
        const blockTitle = document.createElement("h4");
        blockTitle.textContent = titleText;
        const blockBody = document.createElement("p");
        blockBody.textContent = bodyText;
        block.append(blockTitle, blockBody);
        grid.append(block);
      });
      article.append(grid);
    }
    if (section.table) {
      const table = document.createElement("table");
      table.className = "rps-table";
      section.table.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        row.forEach((value) => {
          const cell = document.createElement(rowIndex === 0 ? "th" : "td");
          cell.textContent = value;
          tr.append(cell);
        });
        table.append(tr);
      });
      article.append(table);
    }
    if (section.note) {
      const note = document.createElement("p");
      note.className = "rps-note";
      note.textContent = section.note;
      article.append(note);
    }
    content.append(article);
  });
  document.querySelector("#classIndex").innerHTML = links.join("");
}

async function loadCode() {
  const requestedLang = lang;
  codeText = {};
  document.querySelector("#mainSource").textContent = copy[requestedLang].loadingCode;
  document.querySelector("#neuralSource").textContent = copy[requestedLang].loadingCode;
  const files = Object.entries(sourceFiles);
  const results = await Promise.all(files.map(async ([key, filename]) => {
    const response = await fetch(`code/${requestedLang}/${filename}?v=${VERSION}`);
    if (!response.ok) throw new Error(filename);
    return [key, await response.text()];
  }));
  if (requestedLang !== lang) return;
  codeText = Object.fromEntries(results);
  document.querySelector("#mainSource").textContent = codeText.main;
  document.querySelector("#neuralSource").textContent = codeText.neural;
  document.querySelector("#downloadMain").href = `code/${lang}/main.py`;
  document.querySelector("#downloadNeural").href = `code/${lang}/neural.py`;
  document.querySelectorAll("[data-copy=main], [data-copy=neural]").forEach((button) => { button.disabled = false; });
  document.querySelectorAll(".copy-status").forEach((node) => { node.textContent = ""; });
}

function render() {
  const data = copy[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = data[node.dataset.i18n] || node.textContent;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", data[node.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.title = lang === "es" ? "¿Puede una red neuronal anticipar tu jugada? | IA Generativa" : "Can a Neural Network Predict Your Next Move? | Generative AI";
  document.querySelector("#downloadMain").href = `code/${lang}/main.py`;
  document.querySelector("#downloadNeural").href = `code/${lang}/neural.py`;
  document.querySelectorAll("[data-copy=main], [data-copy=neural]").forEach((button) => { button.disabled = true; });
  document.querySelector("#setupCode").textContent = data.setupCode;
  document.querySelector("#checkpointList").replaceChildren(...data.checks.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  renderSections();
  loadCode().catch(() => {
    if (data !== copy[lang]) return;
    document.querySelector("#mainSource").textContent = data.loadError;
    document.querySelector("#neuralSource").textContent = data.loadError;
  });
}

async function copyText(text, status) {
  let succeeded = true;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    succeeded = document.execCommand("copy");
    area.remove();
  }
  status.textContent = succeeded ? copy[lang].copied : copy[lang].copyFailed;
}

document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => {
  lang = button.dataset.lang;
  localStorage.setItem("genai-language", lang);
  render();
}));

document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", () => {
  const key = button.dataset.copy;
  const text = key === "setup" ? copy[lang].setupCode : codeText[key];
  const status = key === "setup" ? button.closest(".setup-panel").querySelector(".copy-status") : document.querySelector(`#${key}Status`);
  copyText(text || "", status);
}));

render();
