import numpy as np


class NeuralNetwork:
    def __init__(self, hidden=(12, 8), learning_rate=0.01):
        """Create an MLP; hidden sets units per hidden layer and learning_rate sets update size."""
        # Five recent moves x three one-hot values = 15 inputs; three output classes.
        sizes = [15, *hidden, 3]

        self.learning_rate = learning_rate
        self.rng = np.random.default_rng(42)  # Fixed seed: repeatable initialization and mini-batches.
        self.weights = []
        self.biases = []
        self.steps = 0

        # He initialization scales random weights to help ReLU layers start with useful signals.
        for i in range(len(sizes) - 1):
            w = self.rng.standard_normal((sizes[i], sizes[i + 1])) * np.sqrt(
                2 / sizes[i]
            )

            b = np.zeros((1, sizes[i + 1]))

            self.weights.append(w)
            self.biases.append(b)

        # Zero output weights and biases make the initial Softmax uniform (1/3 per move).
        self.weights[-1][:] = 0

    def softmax(self, z):
        """Convert a batch of three logits (z) into probabilities; axis=1 is the class axis."""
        # Subtracting the row maximum keeps exponentials numerically stable.
        z = z - np.max(z, axis=1, keepdims=True)
        exp = np.exp(z)
        return exp / np.sum(exp, axis=1, keepdims=True)

    def forward(self, x):
        """Run inputs x (batch x 15) through hidden ReLU layers and the 3-class output."""
        # Keep each layer output because backpropagation needs these intermediate activations.
        activations = [x]

        for w, b in zip(self.weights[:-1], self.biases[:-1]):
            x = np.maximum(0, x @ w + b)  # ReLU
            activations.append(x)

        # The output layer returns probabilities for rock, paper, and scissors.
        x = self.softmax(x @ self.weights[-1] + self.biases[-1])
        activations.append(x)

        return activations

    def predict(self, x):
        """Infer probabilities for one 15-value history vector; do not update parameters."""
        x = np.asarray(x, dtype=float).reshape(1, -1)
        return self.forward(x)[-1][0]

    def train(self, examples, epochs=30, batch_size=16):
        """Update from (history, label) pairs; epochs is updates here, not full dataset passes."""
        if not examples:
            return None

        for _ in range(epochs):
            # Sample up to batch_size examples without replacement for this gradient update.
            count = min(batch_size, len(examples))
            indices = self.rng.choice(len(examples), size=count, replace=False)

            x = np.array([examples[i][0] for i in indices])
            y = np.array([examples[i][1] for i in indices])

            activations = self.forward(x)
            probs = activations[-1]

            # Softmax + cross-entropy gradient: predicted probabilities minus one-hot targets.
            delta = probs.copy()
            delta[np.arange(count), y] -= 1
            delta /= count

            grad_w = [None] * len(self.weights)
            grad_b = [None] * len(self.biases)

            # Backpropagate the error through each weight matrix and ReLU activation.
            for layer in reversed(range(len(self.weights))):
                grad_w[layer] = activations[layer].T @ delta
                grad_b[layer] = np.sum(delta, axis=0, keepdims=True)

                if layer > 0:
                    delta = delta @ self.weights[layer].T
                    delta *= activations[layer] > 0

            # Gradient descent: learning_rate controls each parameter step's scale.
            for layer in range(len(self.weights)):
                self.weights[layer] -= self.learning_rate * grad_w[layer]
                self.biases[layer] -= self.learning_rate * grad_b[layer]

            self.steps += 1

        return self.loss(examples)

    def loss(self, examples):
        """Return mean cross-entropy across examples; this is training loss, not test loss."""
        if not examples:
            return None

        x = np.array([sample[0] for sample in examples])
        y = np.array([sample[1] for sample in examples])

        probs = self.forward(x)[-1]
        selected = probs[np.arange(len(y)), y]

        return float(-np.mean(np.log(selected + 1e-12)))
