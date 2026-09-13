const VERSION = "20260913-1";

const snippets = {
  neuron: String.raw`z = x1*w1 + x2*w2 + x3*w3 + b
output = activation(z)`,
  ticket: String.raw`x1 = has_ticket
x2 = has_id

z = x1*0.8 + x2*0.7 - 1`,
  trainLoop: String.raw`1. Receive data
2. Make a prediction
3. Calculate loss
4. Run backpropagation
5. Get gradients
6. Update weights
7. Repeat`,
  lr: String.raw`new_weight = current_weight - learning_rate * gradient`,
  activationExperiment: String.raw`Dataset: circles
Features: X1, X2
Hidden layers: 2
Neurons per layer: 4
Learning rate: 0.1

Try:
Linear
ReLU
Tanh
Sigmoid`,
  regularizationExperiment: String.raw`Dataset: spiral or circles
Noise: high
Hidden layers: 2 or 3
Neurons: several

First:
Regularization = None

Then:
Regularization = L2
Regularization rate = 0.01

Increase:
0.1
1`,
  tinyNetwork: String.raw`Dataset: circles
Features: X1, X2
Hidden layers: 1
Neurons: 1
Activation: ReLU
Learning rate: 0.1
Noise: 0
Regularization: None`,
};

const snippetsEs = {
  neuron: String.raw`z = x1*w1 + x2*w2 + x3*w3 + b
salida = activacion(z)`,
  ticket: String.raw`x1 = tiene_entrada
x2 = tiene_documento

z = x1*0.8 + x2*0.7 - 1`,
  trainLoop: String.raw`1. Recibe datos
2. Hace una predicción
3. Calcula la loss
4. Ejecuta backpropagation
5. Obtiene gradientes
6. Actualiza pesos
7. Repite`,
  lr: String.raw`peso_nuevo = peso_actual - learning_rate * gradiente`,
  activationExperiment: String.raw`Dataset: círculos
Features: X1, X2
Capas ocultas: 2
Neuronas por capa: 4
Learning rate: 0.1

Prueba:
Linear
ReLU
Tanh
Sigmoid`,
  regularizationExperiment: String.raw`Dataset: espiral o círculos
Noise: alto
Capas ocultas: 2 o 3
Neuronas: varias

Primero:
Regularization = None

Luego:
Regularization = L2
Regularization rate = 0.01

Aumenta:
0.1
1`,
  tinyNetwork: String.raw`Dataset: círculos
Features: X1, X2
Capas ocultas: 1
Neuronas: 1
Activation: ReLU
Learning rate: 0.1
Noise: 0
Regularization: None`,
};

const route = {
  en: [
    ["Play", "Open TensorFlow Playground and change one parameter at a time."],
    ["Observe", "Read the boundary, weights, training loss, and test loss."],
    ["Connect", "Relate visual changes to weights, activations, gradients, and optimization."],
    ["Decide", "Explain when the network is too simple, too complex, or well balanced."],
  ],
  es: [
    ["Experimentar", "Abrir TensorFlow Playground y cambiar un parámetro a la vez."],
    ["Observar", "Leer la frontera, los pesos, training loss y test loss."],
    ["Conectar", "Relacionar los cambios visuales con pesos, activaciones, gradientes y optimización."],
    ["Decidir", "Explicar cuándo la red es demasiado simple, demasiado compleja o equilibrada."],
  ],
};

const lessons = {
  en: [
    {
      id: "network",
      title: "The basic idea of a neural network",
      tag: "Network",
      body: [
        "A neural network receives inputs, combines them with weights, adds bias, applies activation functions, and produces a prediction.",
        "Training compares that prediction with the expected answer, measures the error, and adjusts the weights so the next attempts can improve.",
      ],
      diagram: "network",
      codeBlocks: [["Neuron computation", snippets.neuron]],
    },
    {
      id: "perceptron",
      title: "A perceptron is a small decision unit",
      tag: "Perceptron",
      body: [
        "A perceptron multiplies each input by a weight, sums those values, adds bias, and passes the result through an activation function.",
        "The bias works like a threshold. It shifts the decision so the neuron does not depend only on the input values.",
      ],
      diagram: "perceptron",
      codeBlocks: [["Entrance example", snippets.ticket]],
    },
    {
      id: "weights",
      title: "Weights show importance and direction",
      tag: "Weights",
      body: [
        "A large positive weight pushes the prediction in one direction. A large negative weight pushes it in the opposite direction.",
        "In TensorFlow Playground, line thickness and color help you see which connections are influencing the model the most.",
      ],
      table: [
        ["Feature", "Possible weight", "Interpretation"],
        ["Study hours", "0.90", "Strong signal"],
        ["Favorite color", "0.01", "Almost irrelevant"],
      ],
    },
    {
      id: "layers",
      title: "Hidden layers combine patterns",
      tag: "Architecture",
      body: [
        "A hidden layer transforms the inputs before the final output. More layers can combine simple patterns into more complex patterns.",
        "A deeper or wider network is not automatically better. It can be slower, harder to train, and more likely to overfit if the data do not support that complexity.",
      ],
      diagram: "layers",
    },
    {
      id: "epochs-learning-rate",
      title: "Epochs and learning rate control training",
      tag: "Training",
      body: [
        "An epoch is one full pass through the training data. Too few epochs may leave the network undertrained; too many can increase overfitting.",
        "Learning rate controls how large each weight update is. Very small values can learn slowly; very large values can overshoot and become unstable.",
      ],
      table: [
        ["Learning rate", "Typical behavior"],
        ["0.001", "Very slow"],
        ["0.01", "Slow and stable"],
        ["0.1", "Good starting point"],
        ["1", "Fast, sometimes unstable"],
        ["10", "Often too aggressive"],
      ],
      codeBlocks: [["Weight update", snippets.lr]],
    },
    {
      id: "activations",
      title: "Activation functions make nonlinear learning possible",
      tag: "Activation",
      body: [
        "Without nonlinear activation functions, stacking several linear transformations still behaves like a linear transformation.",
        "Sigmoid maps values to 0-1, Tanh maps values to -1-1, ReLU keeps positive values and turns negative values into 0, and Linear leaves the value unchanged.",
      ],
      diagram: "activations",
      table: [
        ["Activation", "Output", "Common use"],
        ["Sigmoid", "0 to 1", "Binary output"],
        ["Tanh", "-1 to 1", "Centered representations"],
        ["ReLU", "0 to infinity", "Hidden layers"],
        ["Linear", "Any value", "Regression output"],
      ],
      codeBlocks: [["Activation experiment", snippets.activationExperiment]],
    },
    {
      id: "loss",
      title: "Loss measures how wrong the network is",
      tag: "Loss",
      body: [
        "Loss is the numerical signal that tells the network how far its predictions are from the expected answers.",
        "Training loss is measured on data used for learning. Test loss is measured on data not used directly to update weights.",
      ],
      diagram: "loss",
      table: [
        ["Situation", "Training loss", "Test loss", "Meaning"],
        ["Balanced", "0.10", "0.12", "Low and similar"],
        ["Overfitting risk", "0.01", "0.50", "Memorizes training data"],
      ],
    },
    {
      id: "backprop",
      title: "Backpropagation moves the error backward",
      tag: "Backpropagation",
      body: [
        "After a prediction, the network calculates error and asks which weights contributed to that error.",
        "Backpropagation computes gradients. The optimizer then uses those gradients to update the weights.",
      ],
      diagram: "backprop",
      codeBlocks: [["Training cycle", snippets.trainLoop]],
    },
    {
      id: "regularization",
      title: "Regularization controls unnecessary complexity",
      tag: "Regularization",
      body: [
        "Regularization discourages exaggerated weights so the network focuses on patterns that generalize instead of memorizing noise.",
        "L1 tends to push some weights toward zero. L2 tends to keep many weights smaller without necessarily removing them.",
      ],
      diagram: "regularization",
      codeBlocks: [["Regularization experiment", snippets.regularizationExperiment]],
    },
    {
      id: "problem-types",
      title: "Classification and regression ask different questions",
      tag: "Problem type",
      body: [
        "Classification predicts a class, such as spam or not spam. Regression predicts a number, such as a price, temperature, or delivery time.",
        "In Playground, classification focuses on decision boundaries. Regression focuses on estimating continuous values.",
      ],
      table: [
        ["Question", "Type"],
        ["Is it fraud?", "Classification"],
        ["How much money will be lost?", "Regression"],
        ["Did the student pass?", "Classification"],
        ["What score will the student get?", "Regression"],
      ],
    },
    {
      id: "features-noise",
      title: "Features and noise shape what the model can learn",
      tag: "Data",
      body: [
        "Features are the variables the network receives. For circular patterns, adding X1² and X2² can make the relationship easier to represent.",
        "Noise makes patterns less clean. Real data usually contain noise, so a model that only works on perfect data may be fragile.",
      ],
      diagram: "features",
    },
    {
      id: "generalization",
      title: "The goal is generalization, not memorization",
      tag: "Generalization",
      body: [
        "Underfitting happens when the model is too simple or has not learned enough. Training loss and test loss are both high.",
        "Overfitting happens when the model learns the training data too specifically. Training loss can be very low while test loss becomes much worse.",
      ],
      diagram: "fit",
    },
  ],
  es: [
    {
      id: "network",
      title: "La idea básica de una red neuronal",
      tag: "Red",
      body: [
        "Una red neuronal recibe entradas, las combina con pesos, suma un bias, aplica funciones de activación y produce una predicción.",
        "El entrenamiento compara esa predicción con la respuesta esperada, mide el error y ajusta los pesos para que los siguientes intentos puedan mejorar.",
      ],
      diagram: "network",
      codeBlocks: [["Cálculo de una neurona", snippetsEs.neuron]],
    },
    {
      id: "perceptron",
      title: "Un perceptrón es una pequeña unidad de decisión",
      tag: "Perceptrón",
      body: [
        "Un perceptrón multiplica cada entrada por un peso, suma esos valores, agrega bias y pasa el resultado por una función de activación.",
        "El bias funciona como un umbral. Desplaza la decisión para que la neurona no dependa solamente de los valores de entrada.",
      ],
      diagram: "perceptron",
      codeBlocks: [["Ejemplo de entrada", snippetsEs.ticket]],
    },
    {
      id: "weights",
      title: "Los pesos muestran importancia y dirección",
      tag: "Pesos",
      body: [
        "Un peso positivo grande empuja la predicción en una dirección. Un peso negativo grande la empuja en la dirección contraria.",
        "En TensorFlow Playground, el grosor y el color de las líneas ayudan a ver qué conexiones influyen más en el modelo.",
      ],
      table: [
        ["Variable", "Peso posible", "Interpretación"],
        ["Horas de estudio", "0.90", "Señal fuerte"],
        ["Color favorito", "0.01", "Casi irrelevante"],
      ],
    },
    {
      id: "layers",
      title: "Las capas ocultas combinan patrones",
      tag: "Arquitectura",
      body: [
        "Una capa oculta transforma las entradas antes de la salida final. Más capas pueden combinar patrones simples en patrones más complejos.",
        "Una red más profunda o más ancha no es automáticamente mejor. Puede ser más lenta, más difícil de entrenar y más propensa al overfitting si los datos no justifican esa complejidad.",
      ],
      diagram: "layers",
    },
    {
      id: "epochs-learning-rate",
      title: "Epochs y learning rate controlan el entrenamiento",
      tag: "Entrenamiento",
      body: [
        "Una epoch es un recorrido completo por los datos de entrenamiento. Muy pocas epochs pueden dejar la red sin aprender suficiente; demasiadas pueden aumentar el overfitting.",
        "El learning rate controla qué tan grande es cada actualización de pesos. Valores muy pequeños pueden aprender lento; valores muy grandes pueden saltarse buenas soluciones y volverse inestables.",
      ],
      table: [
        ["Learning rate", "Comportamiento típico"],
        ["0.001", "Muy lento"],
        ["0.01", "Lento y estable"],
        ["0.1", "Buen punto de partida"],
        ["1", "Rápido, a veces inestable"],
        ["10", "Frecuentemente demasiado agresivo"],
      ],
      codeBlocks: [["Actualización de peso", snippetsEs.lr]],
    },
    {
      id: "activations",
      title: "Las activaciones permiten aprendizaje no lineal",
      tag: "Activación",
      body: [
        "Sin funciones de activación no lineales, apilar varias transformaciones lineales sigue comportándose como una transformación lineal.",
        "Sigmoid mapea valores a 0-1, Tanh a -1-1, ReLU conserva positivos y convierte negativos en 0, y Linear deja el valor sin cambiar.",
      ],
      diagram: "activations",
      table: [
        ["Activación", "Salida", "Uso frecuente"],
        ["Sigmoid", "0 a 1", "Salida binaria"],
        ["Tanh", "-1 a 1", "Representaciones centradas"],
        ["ReLU", "0 a infinito", "Capas ocultas"],
        ["Linear", "Cualquier valor", "Salida de regresión"],
      ],
      codeBlocks: [["Experimento de activaciones", snippetsEs.activationExperiment]],
    },
    {
      id: "loss",
      title: "La loss mide qué tan equivocada está la red",
      tag: "Loss",
      body: [
        "La loss es la señal numérica que le dice a la red qué tan lejos están sus predicciones de los valores objetivo.",
        "Training loss se mide sobre datos usados para aprender. Test loss se mide sobre datos que no se usaron directamente para actualizar pesos.",
      ],
      diagram: "loss",
      table: [
        ["Situación", "Training loss", "Test loss", "Lectura"],
        ["Equilibrada", "0.10", "0.12", "Bajas y parecidas"],
        ["Riesgo de overfitting", "0.01", "0.50", "Memoriza datos de entrenamiento"],
      ],
    },
    {
      id: "backprop",
      title: "Backpropagation mueve el error hacia atrás",
      tag: "Backpropagation",
      body: [
        "Después de una predicción, la red calcula el error y pregunta qué pesos contribuyeron a ese error.",
        "Backpropagation calcula gradientes. Luego el optimizador usa esos gradientes para actualizar los pesos.",
      ],
      diagram: "backprop",
      codeBlocks: [["Ciclo de entrenamiento", snippetsEs.trainLoop]],
    },
    {
      id: "regularization",
      title: "La regularización controla complejidad innecesaria",
      tag: "Regularización",
      body: [
        "La regularización desincentiva pesos exagerados para que la red se enfoque en patrones que generalizan en lugar de memorizar ruido.",
        "L1 tiende a empujar algunos pesos hacia cero. L2 tiende a mantener muchos pesos más pequeños sin necesariamente eliminarlos.",
      ],
      diagram: "regularization",
      codeBlocks: [["Experimento de regularización", snippetsEs.regularizationExperiment]],
    },
    {
      id: "problem-types",
      title: "Clasificación y regresión hacen preguntas distintas",
      tag: "Tipo de problema",
      body: [
        "Clasificación predice una clase, como spam o no spam. Regresión predice un número, como precio, temperatura o tiempo de entrega.",
        "En Playground, clasificación se centra en fronteras de decisión. Regresión se centra en estimar valores continuos.",
      ],
      table: [
        ["Pregunta", "Tipo"],
        ["¿Es fraude?", "Clasificación"],
        ["¿Cuánto dinero se perderá?", "Regresión"],
        ["¿Aprobó el estudiante?", "Clasificación"],
        ["¿Qué nota obtendrá?", "Regresión"],
      ],
    },
    {
      id: "features-noise",
      title: "Features y noise moldean lo que el modelo puede aprender",
      tag: "Datos",
      body: [
        "Las features son las variables que recibe la red. Para patrones circulares, agregar X1² y X2² puede facilitar representar la relación.",
        "El noise hace que los patrones sean menos limpios. Los datos reales normalmente tienen ruido, así que un modelo que solo funciona con datos perfectos puede ser frágil.",
      ],
      diagram: "features",
    },
    {
      id: "generalization",
      title: "La meta es generalizar, no memorizar",
      tag: "Generalización",
      body: [
        "Underfitting ocurre cuando el modelo es demasiado simple o no ha aprendido suficiente. Training loss y test loss son altas.",
        "Overfitting ocurre cuando el modelo aprende demasiado específicamente los datos de entrenamiento. Training loss puede ser muy baja mientras test loss empeora bastante.",
      ],
      diagram: "fit",
    },
  ],
};

const experiments = {
  en: [
    {
      title: "Smallest useful network",
      setup: snippetsEs.tinyNetwork,
      observe: "Try 1, 2, 3, and 4 neurons. Find the smallest network that solves the circles dataset reasonably well.",
    },
    {
      title: "Activation power",
      setup: "Keep the same architecture and compare Linear, Sigmoid, Tanh, and ReLU.",
      observe: "Compare learning speed, decision boundary, training loss, and test loss.",
    },
    {
      title: "Learning rate",
      setup: "Test 0.001, 0.01, 0.1, 1, and 10 with the same network.",
      observe: "Identify which value learns too slowly, which is stable, and which starts oscillating.",
    },
    {
      title: "Real-world noise",
      setup: "Start with Noise = 0. Then test 10, 20, and 40.",
      observe: "Check whether the same architecture still generalizes.",
    },
    {
      title: "Overfitting and regularization",
      setup: "Build a large network, add noise, then compare None, L1, and L2 with different rates.",
      observe: "Watch weights, boundary, training loss, and test loss. The best model is not just the one with the lowest training loss.",
    },
  ],
  es: [
    {
      title: "La red útil más pequeña",
      setup: snippets.tinyNetwork,
      observe: "Prueba 1, 2, 3 y 4 neuronas. Encuentra la red más pequeña que resuelve razonablemente el dataset de círculos.",
    },
    {
      title: "El poder de la activación",
      setup: "Mantén la misma arquitectura y compara Linear, Sigmoid, Tanh y ReLU.",
      observe: "Compara velocidad de aprendizaje, frontera de decisión, training loss y test loss.",
    },
    {
      title: "Learning rate",
      setup: "Prueba 0.001, 0.01, 0.1, 1 y 10 con la misma red.",
      observe: "Identifica cuál valor aprende demasiado lento, cuál es estable y cuál empieza a oscilar.",
    },
    {
      title: "Ruido del mundo real",
      setup: "Empieza con Noise = 0. Luego prueba 10, 20 y 40.",
      observe: "Revisa si la misma arquitectura todavía generaliza.",
    },
    {
      title: "Overfitting y regularización",
      setup: "Construye una red grande, agrega ruido y compara None, L1 y L2 con tasas distintas.",
      observe: "Observa pesos, frontera, training loss y test loss. El mejor modelo no es simplemente el de menor training loss.",
    },
  ],
};

const checkpoints = {
  en: [
    "What does an artificial neuron calculate?",
    "What do weights and bias represent?",
    "Why do neural networks need nonlinear activation functions?",
    "What is the difference between training loss and test loss?",
    "What does backpropagation calculate?",
    "Why can a very large network perform worse on new data?",
    "When would you try regularization?",
    "How do classification and regression differ?",
    "Why can better features be more useful than a bigger network?",
    "How would you recognize underfitting and overfitting in Playground?",
  ],
  es: [
    "¿Qué calcula una neurona artificial?",
    "¿Qué representan los pesos y el bias?",
    "¿Por qué las redes neuronales necesitan funciones de activación no lineales?",
    "¿Cuál es la diferencia entre training loss y test loss?",
    "¿Qué calcula backpropagation?",
    "¿Por qué una red muy grande puede funcionar peor con datos nuevos?",
    "¿Cuándo probarías regularización?",
    "¿En qué se diferencian clasificación y regresión?",
    "¿Por qué mejores features pueden ser más útiles que una red más grande?",
    "¿Cómo reconocerías underfitting y overfitting en Playground?",
  ],
};

const text = {
  en: {
    pageTitle: "Class 03 | Neural Networks with TensorFlow Playground",
    navHome: "Home",
    navRoute: "Route",
    navNotebook: "Notebook",
    navExperiments: "Experiments",
    navCheckpoint: "Checkpoint",
    classLabel: "Class 03",
    heroTitle: "How does a neural network learn?",
    heroText:
      "Use TensorFlow Playground to see how data, weights, layers, activations, loss, and regularization shape a neural network.",
    openPlayground: "Open Playground",
    startExperiments: "Start experiments",
    lossChip: "loss",
    outcomeLabel: "Session goal",
    outcomeTitle: "Learn by changing the model",
    competencyText:
      "Explain how a neural network learns by connecting data, weights, bias, activations, hidden layers, loss, backpropagation, optimization, regularization, and generalization.",
    routeLabel: "Notebook route",
    routeTitle: "From visual experiment to training logic",
    notebookLabel: "Student notebook",
    notebookTitle: "Neural networks with TensorFlow Playground",
    indexTitle: "Jump to",
    experimentsLabel: "Playground lab",
    experimentsTitle: "Run controlled changes",
    checkpointLabel: "Checkpoint",
    checkpointTitle: "What you should be able to explain",
    footerText: "Generative AI course notebook",
    setup: "Setup",
    observe: "Observe",
    copy: "Copy",
    copied: "Copied",
  },
  es: {
    pageTitle: "Clase 03 | Redes neuronales con TensorFlow Playground",
    navHome: "Inicio",
    navRoute: "Ruta",
    navNotebook: "Cuaderno",
    navExperiments: "Experimentos",
    navCheckpoint: "Cierre",
    classLabel: "Clase 03",
    heroTitle: "¿Cómo aprende una red neuronal?",
    heroText:
      "Usa TensorFlow Playground para ver cómo datos, pesos, capas, activaciones, loss y regularización moldean una red neuronal.",
    openPlayground: "Abrir Playground",
    startExperiments: "Iniciar experimentos",
    lossChip: "loss",
    outcomeLabel: "Meta de la sesión",
    outcomeTitle: "Aprender cambiando el modelo",
    competencyText:
      "Explicar cómo aprende una red neuronal al conectar datos, pesos, bias, activaciones, capas ocultas, loss, backpropagation, optimización, regularización y generalización.",
    routeLabel: "Ruta del notebook",
    routeTitle: "Del experimento visual a la lógica de entrenamiento",
    notebookLabel: "Cuaderno del estudiante",
    notebookTitle: "Redes neuronales con TensorFlow Playground",
    indexTitle: "Ir a",
    experimentsLabel: "Laboratorio Playground",
    experimentsTitle: "Ejecuta cambios controlados",
    checkpointLabel: "Cierre",
    checkpointTitle: "Lo que deberías poder explicar",
    footerText: "Cuaderno del curso de IA Generativa",
    setup: "Configuración",
    observe: "Observa",
    copy: "Copiar",
    copied: "Copiado",
  },
};

const diagramText = {
  en: {
    input: "Input",
    hidden: "Hidden layer",
    output: "Prediction",
    weights: "weights",
    activation: "activation",
    error: "error",
    gradients: "gradients",
    optimizer: "optimizer",
    training: "Training data",
    test: "Test data",
    generalization: "Generalization",
    tooSimple: "too simple",
    balanced: "balanced",
    tooComplex: "too complex",
    features: "features",
    noise: "noise",
    pattern: "pattern",
  },
  es: {
    input: "Entrada",
    hidden: "Capa oculta",
    output: "Predicción",
    weights: "pesos",
    activation: "activación",
    error: "error",
    gradients: "gradientes",
    optimizer: "optimizador",
    training: "Datos train",
    test: "Datos test",
    generalization: "Generalización",
    tooSimple: "muy simple",
    balanced: "equilibrado",
    tooComplex: "muy complejo",
    features: "features",
    noise: "noise",
    pattern: "patrón",
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svg(width, height, content) {
  return `<svg class="concept-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">${content}</svg>`;
}

function node(x, y, label, klass = "") {
  return `<rect class="svg-node ${klass}" x="${x}" y="${y}" width="126" height="48" rx="8"></rect><text x="${x + 63}" y="${y + 29}" text-anchor="middle">${label}</text>`;
}

function diagram(kind, lang) {
  const t = diagramText[lang];
  if (kind === "network") {
    return svg(560, 230, `
      ${node(34, 84, t.input)}
      ${node(218, 84, t.hidden, "node-alt")}
      ${node(400, 84, t.output, "node-good")}
      <path class="svg-line" d="M 162 108 L 216 108 M 346 108 L 398 108"></path>
      <text class="svg-muted" x="189" y="94" text-anchor="middle">${t.weights}</text>
      <text class="svg-muted" x="373" y="94" text-anchor="middle">${t.activation}</text>
      <path class="svg-line line-alt" d="M 463 136 C 420 190, 126 190, 96 136"></path>
      <text class="svg-muted" x="280" y="198" text-anchor="middle">${t.error}</text>
    `);
  }
  if (kind === "perceptron") {
    return svg(560, 230, `
      ${["x1", "x2", "x3"].map((label, i) => `<circle class="svg-dot" cx="76" cy="${58 + i * 56}" r="24"></circle><text x="76" y="${63 + i * 56}" text-anchor="middle">${label}</text>`).join("")}
      <circle class="svg-dot node-alt" cx="286" cy="114" r="40"></circle><text x="286" y="110" text-anchor="middle">Σ + b</text><text class="svg-muted" x="286" y="132" text-anchor="middle">${t.activation}</text>
      <circle class="svg-dot node-good" cx="474" cy="114" r="30"></circle><text x="474" y="119" text-anchor="middle">ŷ</text>
      <path class="svg-line" d="M 102 58 L 246 104 M 102 114 L 244 114 M 102 170 L 246 124 M 328 114 L 442 114"></path>
    `);
  }
  if (kind === "layers") {
    return svg(560, 230, `
      ${[68, 142].map((y) => `<circle class="svg-dot" cx="70" cy="${y}" r="22"></circle>`).join("")}
      ${[50, 112, 174].map((y) => `<circle class="svg-dot node-alt" cx="230" cy="${y}" r="22"></circle>`).join("")}
      ${[70, 150].map((y) => `<circle class="svg-dot node-alt" cx="360" cy="${y}" r="22"></circle>`).join("")}
      <circle class="svg-dot node-good" cx="500" cy="112" r="24"></circle>
      <path class="svg-line" d="M 94 68 L 206 50 M 94 68 L 206 112 M 94 68 L 206 174 M 94 142 L 206 50 M 94 142 L 206 112 M 94 142 L 206 174 M 254 50 L 336 70 M 254 112 L 336 70 M 254 174 L 336 150 M 384 70 L 476 112 M 384 150 L 476 112"></path>
      <text class="svg-muted" x="70" y="210" text-anchor="middle">${t.input}</text>
      <text class="svg-muted" x="295" y="210" text-anchor="middle">${t.hidden}</text>
      <text class="svg-muted" x="500" y="210" text-anchor="middle">${t.output}</text>
    `);
  }
  if (kind === "activations") {
    return `<div class="activation-grid">
      <article><strong>Sigmoid</strong><span>0 → 1</span><div class="curve sigmoid"></div></article>
      <article><strong>Tanh</strong><span>-1 → 1</span><div class="curve tanh"></div></article>
      <article><strong>ReLU</strong><span>max(0, x)</span><div class="curve relu"></div></article>
      <article><strong>Linear</strong><span>f(x) = x</span><div class="curve linear"></div></article>
    </div>`;
  }
  if (kind === "loss") {
    return svg(560, 230, `
      ${node(44, 62, t.training)}
      ${node(44, 134, t.test)}
      ${node(390, 98, t.generalization, "node-good")}
      <path class="svg-line" d="M 172 86 C 250 58, 320 82, 388 112 M 172 158 C 250 188, 320 146, 388 124"></path>
      <text class="svg-muted" x="280" y="74" text-anchor="middle">0.10</text>
      <text class="svg-muted" x="280" y="174" text-anchor="middle">0.12</text>
    `);
  }
  if (kind === "backprop") {
    return svg(560, 230, `
      ${node(40, 42, t.input)}
      ${node(218, 42, t.hidden, "node-alt")}
      ${node(394, 42, t.output, "node-good")}
      ${node(394, 140, t.error)}
      ${node(218, 140, t.gradients, "node-alt")}
      ${node(40, 140, t.optimizer, "node-good")}
      <path class="svg-line" d="M 168 66 L 216 66 M 346 66 L 392 66 M 456 92 L 456 138"></path>
      <path class="svg-line line-alt" d="M 392 164 L 346 164 M 216 164 L 168 164"></path>
    `);
  }
  if (kind === "regularization") {
    return `<div class="regularization-compare">
      <article><strong>L1</strong><span class="weight-line wide"></span><span class="weight-line off"></span><span class="weight-line slim"></span></article>
      <article><strong>L2</strong><span class="weight-line mid"></span><span class="weight-line slim"></span><span class="weight-line mid"></span></article>
    </div>`;
  }
  if (kind === "features") {
    return svg(560, 230, `
      ${node(44, 62, "X1")}
      ${node(44, 134, "X2")}
      ${node(220, 62, "X1²", "node-alt")}
      ${node(220, 134, "X2²", "node-alt")}
      ${node(394, 98, t.pattern, "node-good")}
      <path class="svg-line" d="M 172 86 L 218 86 M 172 158 L 218 158 M 348 86 L 392 112 M 348 158 L 392 122"></path>
      <text class="svg-muted" x="280" y="204" text-anchor="middle">${t.features} + ${t.noise}</text>
    `);
  }
  if (kind === "fit") {
    return `<div class="fit-grid">
      <article><strong>${t.tooSimple}</strong><span class="boundary under"></span></article>
      <article><strong>${t.balanced}</strong><span class="boundary good"></span></article>
      <article><strong>${t.tooComplex}</strong><span class="boundary over"></span></article>
    </div>`;
  }
  return "";
}

function renderCodeBlock(title, source, dictionary) {
  return `
    <div class="code-block">
      <div class="code-title">
        <span>${title}</span>
        <button type="button" class="copy-button" data-copy="${encodeURIComponent(source)}">${dictionary.copy}</button>
      </div>
      <pre><code>${escapeHtml(source)}</code></pre>
    </div>
  `;
}

function renderTable(rows) {
  const [head, ...body] = rows;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderLesson(section, index, lang) {
  const dictionary = text[lang];
  return `
    <article class="lesson-section story-section" id="${section.id}">
      <div>
        <span class="topic-number">${String(index + 1).padStart(2, "0")} / ${lessons[lang].length}</span>
        <h3>${section.title}</h3>
        ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
      <div class="diagram-panel story-panel">
        <span class="scope-tag">${section.tag}</span>
        ${section.diagram ? diagram(section.diagram, lang) : ""}
        ${section.table ? renderTable(section.table) : ""}
        ${section.codeBlocks ? section.codeBlocks.map(([title, source]) => renderCodeBlock(title, source, dictionary)).join("") : ""}
      </div>
    </article>
  `;
}

function renderExperiment(item, index, dictionary) {
  return `
    <article class="experiment-card">
      <span class="topic-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <div class="experiment-copy">
        <strong>${dictionary.setup}</strong>
        ${item.setup.includes("\n") ? renderCodeBlock(item.title, item.setup, dictionary) : `<p>${item.setup}</p>`}
        <strong>${dictionary.observe}</strong>
        <p>${item.observe}</p>
      </div>
    </article>
  `;
}

function render(lang) {
  const dictionary = text[lang];
  document.documentElement.lang = lang;
  document.title = dictionary.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dictionary[node.dataset.i18n];
    if (value) node.textContent = value;
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  document.getElementById("routeGrid").innerHTML = route[lang]
    .map(([title, summary]) => `<article><strong>${title}</strong><p>${summary}</p></article>`)
    .join("");

  document.getElementById("classIndex").innerHTML = lessons[lang]
    .map((section, index) => `<a href="#${section.id}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>`)
    .join("");

  document.getElementById("lessonSections").innerHTML = lessons[lang]
    .map((section, index) => renderLesson(section, index, lang))
    .join("");

  document.getElementById("experimentGrid").innerHTML = experiments[lang]
    .map((item, index) => renderExperiment(item, index, dictionary))
    .join("");

  document.getElementById("checkpointList").innerHTML = checkpoints[lang]
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = decodeURIComponent(button.dataset.copy);
      await navigator.clipboard.writeText(value);
      button.textContent = dictionary.copied;
      window.setTimeout(() => {
        button.textContent = dictionary.copy;
      }, 1400);
    });
  });
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    localStorage.setItem("genai-language", lang);
    render(lang);
  });
});

render(localStorage.getItem("genai-language") || "en");

console.info(`Class 03 assets version ${VERSION}`);
