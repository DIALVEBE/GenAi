import numpy as np


class NeuralNetwork:
    def __init__(self, hidden=(12, 8), learning_rate=0.01):
        """Crea un MLP; hidden define neuronas por capa y learning_rate el tamaño de actualización."""
        # Cinco jugadas recientes x tres valores one-hot = 15 entradas; tres clases de salida.
        sizes = [15, *hidden, 3]

        self.learning_rate = learning_rate
        self.rng = np.random.default_rng(42)  # Semilla fija: inicialización y minilotes reproducibles.
        self.weights = []
        self.biases = []
        self.steps = 0

        # He escala los pesos aleatorios para iniciar con señales útiles en capas ReLU.
        for i in range(len(sizes) - 1):
            w = self.rng.standard_normal((sizes[i], sizes[i + 1])) * np.sqrt(
                2 / sizes[i]
            )

            b = np.zeros((1, sizes[i + 1]))

            self.weights.append(w)
            self.biases.append(b)

        # Pesos y sesgo de salida en cero: Softmax inicia uniforme (1/3 por jugada).
        self.weights[-1][:] = 0

    def softmax(self, z):
        """Convierte un lote de tres logits (z) en probabilidades; axis=1 son las clases."""
        # Restar el máximo de cada fila mejora la estabilidad numérica de la exponencial.
        z = z - np.max(z, axis=1, keepdims=True)
        exp = np.exp(z)
        return exp / np.sum(exp, axis=1, keepdims=True)

    def forward(self, x):
        """Propaga entradas x (lote x 15) por capas ReLU y una salida de tres clases."""
        # Se guardan las salidas intermedias de cada capa para la retropropagación.
        activations = [x]

        for w, b in zip(self.weights[:-1], self.biases[:-1]):
            x = np.maximum(0, x @ w + b)  # ReLU
            activations.append(x)

        # La capa final devuelve probabilidades para piedra, papel y tijera.
        x = self.softmax(x @ self.weights[-1] + self.biases[-1])
        activations.append(x)

        return activations

    def predict(self, x):
        """Calcula probabilidades para un historial de 15 valores, sin modificar parámetros."""
        x = np.asarray(x, dtype=float).reshape(1, -1)
        return self.forward(x)[-1][0]

    def train(self, examples, epochs=30, batch_size=16):
        """Actualiza con pares (historial, etiqueta); aquí epochs cuenta pasos, no recorridos completos."""
        if not examples:
            return None

        for _ in range(epochs):
            # El lote usa hasta batch_size ejemplos, muestreados sin reemplazo.
            count = min(batch_size, len(examples))
            indices = self.rng.choice(len(examples), size=count, replace=False)

            x = np.array([examples[i][0] for i in indices])
            y = np.array([examples[i][1] for i in indices])

            activations = self.forward(x)
            probs = activations[-1]

            # Gradiente Softmax + entropía cruzada: probabilidad estimada menos etiqueta one-hot.
            delta = probs.copy()
            delta[np.arange(count), y] -= 1
            delta /= count

            grad_w = [None] * len(self.weights)
            grad_b = [None] * len(self.biases)

            # La retropropagación lleva el error por las matrices de pesos y las activaciones ReLU.
            for layer in reversed(range(len(self.weights))):
                grad_w[layer] = activations[layer].T @ delta
                grad_b[layer] = np.sum(delta, axis=0, keepdims=True)

                if layer > 0:
                    delta = delta @ self.weights[layer].T
                    delta *= activations[layer] > 0

            # Descenso de gradiente: learning_rate regula el tamaño de cada actualización.
            for layer in range(len(self.weights)):
                self.weights[layer] -= self.learning_rate * grad_w[layer]
                self.biases[layer] -= self.learning_rate * grad_b[layer]

            self.steps += 1

        return self.loss(examples)

    def loss(self, examples):
        """Calcula entropía cruzada media del historial de entrenamiento, no de prueba."""
        if not examples:
            return None

        x = np.array([sample[0] for sample in examples])
        y = np.array([sample[1] for sample in examples])

        probs = self.forward(x)[-1]
        selected = probs[np.arange(len(y)), y]

        return float(-np.mean(np.log(selected + 1e-12)))
