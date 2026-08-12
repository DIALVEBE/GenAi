const VERSION = "20260811-1";

const ui = {
  en: {
    navTopics: "Topics",
    navClasses: "Classes",
    courseLabel: "Course notebook",
    heroTitle: "Generative AI",
    heroText:
      "A student-facing path through neural networks, modern generative models, language systems, and responsible project work.",
    startLearning: "Start learning",
    viewMap: "View study map",
    mapLabel: "Notebook route",
    mapTitle: "From foundations to responsible generative projects",
    map1Title: "Model foundations",
    map1Text:
      "AI, ML, perceptrons, activation functions, optimization, and first neural networks.",
    map2Title: "Architectures",
    map2Text:
      "CNNs, RNNs, autoencoders, VAEs, GANs, and transformer-based language models.",
    map3Title: "Practice and judgment",
    map3Text:
      "Examples, mental models, checks for understanding, bias analysis, and project reflection.",
    topicsLabel: "Course modules",
    topicsTitle: "Student notebook",
    classesLabel: "Weekly notebook",
    classesTitle: "Class pages",
    class01Number: "Class 01",
    class01Title: "What does it mean for a machine to create?",
    class01Text:
      "A case-driven route through AI, Machine Learning, Generative AI, real applications, and risks.",
    class02Number: "Class 02",
    class02Title: "Where is my burger?",
    class02Text:
      "Linear regression with delivery data, model evaluation, preprocessing, and pipelines.",
    indexTitle: "Jump to",
    footerText: "Generative AI course notebook",
    labels: {
      keyIdeas: "Key ideas",
      mentalModel: "Mental model",
      example: "Example",
      studyCheck: "Study check",
      practicalNote: "Practical note",
    },
  },
  es: {
    navTopics: "Temas",
    navClasses: "Clases",
    courseLabel: "Cuaderno del curso",
    heroTitle: "IA Generativa",
    heroText:
      "Una ruta para estudiantes sobre redes neuronales, modelos generativos modernos, sistemas de lenguaje y proyectos responsables.",
    startLearning: "Empezar",
    viewMap: "Ver mapa",
    mapLabel: "Ruta del cuaderno",
    mapTitle: "De los fundamentos a proyectos generativos responsables",
    map1Title: "Fundamentos de modelos",
    map1Text:
      "IA, aprendizaje automático, perceptrones, funciones de activación, optimización y primeras redes neuronales.",
    map2Title: "Arquitecturas",
    map2Text:
      "CNN, RNN, autoencoders, VAE, GAN y modelos de lenguaje basados en transformers.",
    map3Title: "Práctica y criterio",
    map3Text:
      "Ejemplos, modelos mentales, comprobaciones de estudio, análisis de sesgos y reflexión de proyectos.",
    topicsLabel: "Módulos del curso",
    topicsTitle: "Cuaderno del estudiante",
    classesLabel: "Cuaderno semanal",
    classesTitle: "Páginas de clase",
    class01Number: "Clase 01",
    class01Title: "¿Qué significa que una máquina pueda crear?",
    class01Text:
      "Una ruta basada en casos sobre IA, Machine Learning, IA Generativa, aplicaciones reales y riesgos.",
    class02Number: "Clase 02",
    class02Title: "¿Dónde está mi hamburguesa?",
    class02Text:
      "Regresión lineal con datos de entregas, evaluación del modelo, preprocesamiento y pipelines.",
    indexTitle: "Ir a",
    footerText: "Cuaderno del curso de IA Generativa",
    labels: {
      keyIdeas: "Ideas clave",
      mentalModel: "Modelo mental",
      example: "Ejemplo",
      studyCheck: "Comprobación",
      practicalNote: "Nota práctica",
    },
  },
};

const topics = [
  {
    id: "foundations",
    visual: "foundations",
    en: {
      title: "AI, Machine Learning, and Generative AI",
      summary:
        "Artificial intelligence is the broad goal; machine learning is one way to reach it; generative AI is the family of models that creates new content from learned patterns.",
      deep:
        "A model learns statistical structure from examples, then uses that structure to classify, predict, recommend, or generate. Generative AI differs because the output is not only a label or score. It can be text, image, code, audio, video, molecules, or designs that resemble the training domain while still being new.",
      ideas: [
        "AI includes reasoning, perception, planning, and language tasks.",
        "Machine learning improves behavior from data instead of only hand-written rules.",
        "Generative systems sample from learned representations, so input instructions and data quality matter.",
      ],
      example:
        "A discriminative model may decide whether an image contains a cat. A generative model can create a new cat image or describe the scene in words.",
      mental:
        "Think of ML as learning a map from examples. Generative AI learns a creative space and then navigates it from an instruction or condition.",
      check:
        "Name one task where a generated output is useful and one task where a simple prediction is enough.",
      note:
        "Popular tools include Python, notebooks, TensorFlow, Keras, PyTorch, Hugging Face, LangChain-style orchestration, and cloud GPU runtimes.",
    },
    es: {
      title: "IA, aprendizaje automático e IA generativa",
      summary:
        "La inteligencia artificial es el objetivo amplio; el aprendizaje automático es una forma de alcanzarlo; la IA generativa es la familia de modelos que crea contenido nuevo a partir de patrones aprendidos.",
      deep:
        "Un modelo aprende estructura estadística desde ejemplos y luego usa esa estructura para clasificar, predecir, recomendar o generar. La IA generativa se diferencia porque la salida no es solo una etiqueta o un puntaje. Puede producir texto, imagen, código, audio, video, moléculas o diseños que se parecen al dominio de entrenamiento sin ser simples copias.",
      ideas: [
        "La IA incluye tareas de razonamiento, percepción, planeación y lenguaje.",
        "El aprendizaje automático mejora su comportamiento desde datos, no solo desde reglas escritas a mano.",
        "Los sistemas generativos muestrean representaciones aprendidas, por eso importan las instrucciones de entrada y la calidad de los datos.",
      ],
      example:
        "Un modelo discriminativo puede decidir si una imagen contiene un gato. Un modelo generativo puede crear una nueva imagen de un gato o describir la escena con palabras.",
      mental:
        "Piensa en el aprendizaje automático como aprender un mapa desde ejemplos. La IA generativa aprende un espacio creativo y luego lo recorre desde una instrucción o condición.",
      check:
        "Nombra una tarea donde una salida generada sea útil y otra donde baste una predicción simple.",
      note:
        "Herramientas populares: Python, notebooks, TensorFlow, Keras, PyTorch, Hugging Face, orquestación tipo LangChain y entornos con GPU en la nube.",
    },
  },
  {
    id: "perceptrons",
    visual: "perceptron",
    en: {
      title: "Perceptrons and Simple Neural Networks",
      summary:
        "A perceptron combines inputs with weights, adds a bias, passes the result through an activation function, and produces an output.",
      deep:
        "Neural networks stack many simple computations. Training compares predictions with target answers through a loss function, then backpropagation distributes blame across weights. Optimizers such as stochastic gradient descent or Adam update the parameters so future predictions improve.",
      ideas: [
        "Weights control how strongly each input influences the output.",
        "Activation functions let networks model nonlinear relationships.",
        "Backpropagation computes gradients; optimization uses them to update parameters.",
      ],
      example:
        "A tiny network can learn to estimate whether a student passes from study hours, attendance, and practice quiz scores.",
      mental:
        "A network is a set of adjustable knobs. Training turns the knobs based on the error signal.",
      check:
        "Why would a network without activation functions behave like a mostly linear model, even with many layers?",
      note:
        "Keras is friendly for first models; PyTorch exposes the training loop more directly and is common in research.",
    },
    es: {
      title: "Perceptrones y redes neuronales simples",
      summary:
        "Un perceptrón combina entradas con pesos, suma un sesgo, pasa el resultado por una función de activación y produce una salida.",
      deep:
        "Las redes neuronales apilan muchos cálculos simples. El entrenamiento compara predicciones con respuestas objetivo mediante una función de pérdida; luego, la retropropagación reparte el error entre los pesos. Optimizadores como descenso de gradiente estocástico o Adam actualizan los parámetros para mejorar predicciones futuras.",
      ideas: [
        "Los pesos controlan cuánto influye cada entrada en la salida.",
        "Las funciones de activación permiten modelar relaciones no lineales.",
        "La retropropagación calcula gradientes; la optimización los usa para actualizar parámetros.",
      ],
      example:
        "Una red pequeña puede aprender a estimar si un estudiante aprueba usando horas de estudio, asistencia y puntajes de prácticas.",
      mental:
        "Una red es un conjunto de perillas ajustables. El entrenamiento gira las perillas según la señal de error.",
      check:
        "¿Por qué una red sin funciones de activación se comportaría como un modelo casi lineal, aunque tenga muchas capas?",
      note:
        "Keras es amigable para primeros modelos; PyTorch expone el ciclo de entrenamiento con más claridad y es común en investigación.",
    },
  },
  {
    id: "cnns",
    visual: "cnn",
    en: {
      title: "Convolutional Neural Networks",
      summary:
        "CNNs learn local visual patterns such as edges, textures, shapes, and object parts by sliding filters across an image.",
      deep:
        "A convolution filter reuses the same weights across many image locations. Early layers detect simple patterns; deeper layers combine them into richer features. Pooling, strides, and normalization help control size and stability. CNNs remain important for classification, detection, segmentation, and image generators that use convolutional blocks.",
      ideas: [
        "Local receptive fields make CNNs efficient for images.",
        "Feature maps show where a learned pattern appears.",
        "Depth turns pixels into concepts through repeated composition.",
      ],
      example:
        "A CNN for medical images may first find contrast edges, then tissue textures, then regions that suggest a diagnosis.",
      mental:
        "Imagine a set of transparent stencils moving across an image, each stencil lighting up when it sees its pattern.",
      check:
        "What changes when a filter has a larger kernel size?",
      note:
        "In generative AI, convolutional blocks often appear inside decoders, image autoencoders, diffusion U-Nets, and GAN generators.",
    },
    es: {
      title: "Redes neuronales convolucionales",
      summary:
        "Las CNN aprenden patrones visuales locales como bordes, texturas, formas y partes de objetos al deslizar filtros sobre una imagen.",
      deep:
        "Un filtro convolucional reutiliza los mismos pesos en muchas posiciones de la imagen. Las primeras capas detectan patrones simples; las capas profundas los combinan en características más ricas. El pooling, los saltos y la normalización ayudan a controlar tamaño y estabilidad. Las CNN siguen siendo importantes en clasificación, detección, segmentación y generadores de imágenes que usan bloques convolucionales.",
      ideas: [
        "Los campos receptivos locales hacen eficientes a las CNN para imágenes.",
        "Los mapas de características muestran dónde aparece un patrón aprendido.",
        "La profundidad convierte píxeles en conceptos mediante composición repetida.",
      ],
      example:
        "Una CNN para imágenes médicas puede encontrar primero bordes de contraste, luego texturas de tejido y después regiones que sugieren un diagnóstico.",
      mental:
        "Imagina plantillas transparentes que se mueven sobre una imagen; cada plantilla se ilumina cuando ve su patrón.",
      check:
        "¿Qué cambia cuando un filtro tiene un tamaño de kernel más grande?",
      note:
        "En IA generativa, los bloques convolucionales aparecen en decodificadores, autoencoders de imagen, U-Nets de difusión y generadores GAN.",
    },
  },
  {
    id: "rnns",
    visual: "rnn",
    en: {
      title: "Recurrent Neural Networks",
      summary:
        "RNNs process sequences one step at a time while carrying a hidden state that summarizes previous information.",
      deep:
        "Before transformers became dominant, RNNs were a standard tool for text, time series, and speech. The hidden state acts as memory, but long sequences can cause gradients to vanish or explode. LSTM and GRU units add gates that decide what to remember, forget, and expose.",
      ideas: [
        "Sequence order is part of the input signal.",
        "Hidden state connects the current step with previous steps.",
        "Gates improve memory control in LSTMs and GRUs.",
      ],
      example:
        "A character-level RNN can generate text by predicting the next character from the previous characters.",
      mental:
        "Read a sentence with a small notebook in your hand. At each word, you update the notebook before reading the next word.",
      check:
        "Why can very long context be difficult for a basic RNN?",
      note:
        "RNNs are still useful for compact sequence models and for understanding why attention changed language modeling.",
    },
    es: {
      title: "Redes neuronales recurrentes",
      summary:
        "Las RNN procesan secuencias paso a paso mientras mantienen un estado oculto que resume información previa.",
      deep:
        "Antes del dominio de los transformers, las RNN eran una herramienta estándar para texto, series de tiempo y voz. El estado oculto funciona como memoria, pero las secuencias largas pueden hacer que los gradientes desaparezcan o exploten. Las unidades LSTM y GRU agregan compuertas que deciden qué recordar, olvidar y exponer.",
      ideas: [
        "El orden de la secuencia es parte de la señal de entrada.",
        "El estado oculto conecta el paso actual con pasos anteriores.",
        "Las compuertas mejoran el control de memoria en LSTM y GRU.",
      ],
      example:
        "Una RNN a nivel de caracteres puede generar texto al predecir el siguiente carácter desde los caracteres anteriores.",
      mental:
        "Lee una oración con una libreta pequeña en la mano. En cada palabra actualizas la libreta antes de leer la siguiente.",
      check:
        "¿Por qué un contexto muy largo puede ser difícil para una RNN básica?",
      note:
        "Las RNN siguen siendo útiles para modelos secuenciales compactos y para entender por qué la atención cambió el modelado del lenguaje.",
    },
  },
  {
    id: "generative-models",
    visual: "generative",
    en: {
      title: "Generative Models and Autoencoders",
      summary:
        "Generative models learn how data is distributed so they can create plausible new samples, while discriminative models learn boundaries between labels.",
      deep:
        "A discriminative model asks: which class fits this input? A generative model asks: what could a realistic example look like? Autoencoders introduce the encoder-latent-decoder pattern: compress an input into a representation and reconstruct it. This makes them a bridge between representation learning and generation.",
      ideas: [
        "Generative modeling focuses on the data distribution.",
        "Latent spaces store compressed factors of variation.",
        "Reconstruction loss teaches an autoencoder what information matters.",
      ],
      example:
        "An autoencoder trained on handwritten digits can compress each digit into a small vector and reconstruct it from that vector.",
      mental:
        "An encoder writes a dense summary; a decoder tries to redraw the original from that summary.",
      check:
        "What might happen if the latent representation is too small?",
      note:
        "Autoencoders are useful for denoising, anomaly detection, compression, and as building blocks in larger generative systems.",
    },
    es: {
      title: "Modelos generativos y autoencoders",
      summary:
        "Los modelos generativos aprenden cómo se distribuyen los datos para crear muestras nuevas plausibles, mientras que los modelos discriminativos aprenden fronteras entre etiquetas.",
      deep:
        "Un modelo discriminativo pregunta: ¿qué clase corresponde a esta entrada? Un modelo generativo pregunta: ¿cómo podría verse un ejemplo realista? Los autoencoders introducen el patrón codificador-espacio latente-decodificador: comprimen una entrada en una representación y la reconstruyen. Por eso conectan el aprendizaje de representaciones con la generación.",
      ideas: [
        "El modelado generativo se enfoca en la distribución de los datos.",
        "Los espacios latentes guardan factores comprimidos de variación.",
        "La pérdida de reconstrucción enseña al autoencoder qué información importa.",
      ],
      example:
        "Un autoencoder entrenado con dígitos escritos a mano puede comprimir cada dígito en un vector pequeño y reconstruirlo desde ese vector.",
      mental:
        "Un codificador escribe un resumen denso; un decodificador intenta redibujar el original desde ese resumen.",
      check:
        "¿Qué podría pasar si la representación latente es demasiado pequeña?",
      note:
        "Los autoencoders sirven para eliminación de ruido, detección de anomalías, compresión y como bloques en sistemas generativos más grandes.",
    },
  },
  {
    id: "vaes",
    visual: "vae",
    en: {
      title: "Autoencoders and Variational Autoencoders",
      summary:
        "VAEs turn the latent space into a probability space, making it easier to sample smooth new variations.",
      deep:
        "A regular autoencoder maps an input to a latent code. A VAE maps it to a distribution, usually described by a mean and variance. During training, the model balances reconstruction quality with a regularization term that keeps the latent space organized. This makes nearby points decode into related outputs.",
      ideas: [
        "VAEs learn distributions, not only fixed codes.",
        "The reparameterization trick lets sampling work with backpropagation.",
        "A regularized latent space supports interpolation and generation.",
      ],
      example:
        "A VAE trained on faces can move smoothly between features such as smile, angle, or lighting by walking through latent space.",
      mental:
        "Instead of storing one address for an image, a VAE stores a small cloud of possible addresses.",
      check:
        "Why does a VAE need both reconstruction and regularization objectives?",
      note:
        "VAE outputs can look softer than GAN outputs, but their latent spaces are often easier to explore.",
    },
    es: {
      title: "Autoencoders y autoencoders variacionales",
      summary:
        "Los VAE convierten el espacio latente en un espacio probabilístico, lo que facilita muestrear variaciones nuevas y suaves.",
      deep:
        "Un autoencoder regular mapea una entrada a un código latente. Un VAE la mapea a una distribución, normalmente descrita por una media y una varianza. Durante el entrenamiento, el modelo equilibra la calidad de reconstrucción con un término de regularización que mantiene organizado el espacio latente. Así, puntos cercanos se decodifican como salidas relacionadas.",
      ideas: [
        "Los VAE aprenden distribuciones, no solo códigos fijos.",
        "El truco de reparametrización permite muestrear y usar retropropagación.",
        "Un espacio latente regularizado permite interpolación y generación.",
      ],
      example:
        "Un VAE entrenado con rostros puede moverse suavemente entre rasgos como sonrisa, ángulo o iluminación al recorrer el espacio latente.",
      mental:
        "En lugar de guardar una sola dirección para una imagen, un VAE guarda una pequeña nube de direcciones posibles.",
      check:
        "¿Por qué un VAE necesita objetivos de reconstrucción y de regularización?",
      note:
        "Las salidas de un VAE pueden verse más suaves que las de una GAN, pero sus espacios latentes suelen ser más fáciles de explorar.",
    },
  },
  {
    id: "gans",
    visual: "gan",
    en: {
      title: "Generative Adversarial Networks",
      summary:
        "GANs train a generator and a discriminator in competition: one creates samples, the other judges whether they look real.",
      deep:
        "The generator starts from random noise and tries to produce realistic data. The discriminator receives real and generated samples and learns to distinguish them. Their adversarial game can produce sharp images, but training can be unstable because both models keep changing their strategies.",
      ideas: [
        "The generator learns through feedback from the discriminator.",
        "The discriminator is a learned critic, not a human judge.",
        "Mode collapse happens when the generator produces too little variety.",
      ],
      example:
        "A basic GAN can learn to generate digit images that resemble the training set even though it never copies a single exact example.",
      mental:
        "One model makes counterfeit samples; the other learns to detect them. Both improve as the game continues.",
      check:
        "Why is balance important between generator and discriminator strength?",
      note:
        "GANs are historically important for high-quality image synthesis and remain useful for style transfer, super-resolution, and data augmentation.",
    },
    es: {
      title: "Redes generativas adversarias",
      summary:
        "Las GAN entrenan un generador y un discriminador en competencia: uno crea muestras y el otro juzga si parecen reales.",
      deep:
        "El generador parte de ruido aleatorio e intenta producir datos realistas. El discriminador recibe muestras reales y generadas, y aprende a distinguirlas. Este juego adversario puede producir imágenes nítidas, pero el entrenamiento puede ser inestable porque ambos modelos cambian sus estrategias constantemente.",
      ideas: [
        "El generador aprende a partir de la retroalimentación del discriminador.",
        "El discriminador es un crítico aprendido, no un juez humano.",
        "El colapso de modos ocurre cuando el generador produce poca variedad.",
      ],
      example:
        "Una GAN básica puede aprender a generar imágenes de dígitos parecidas al conjunto de entrenamiento sin copiar un ejemplo exacto.",
      mental:
        "Un modelo fabrica muestras falsas; el otro aprende a detectarlas. Ambos mejoran mientras el juego continúa.",
      check:
        "¿Por qué es importante equilibrar la fuerza del generador y del discriminador?",
      note:
        "Las GAN son históricamente importantes para síntesis de imágenes de alta calidad y siguen siendo útiles en transferencia de estilo, superresolución y aumento de datos.",
    },
  },
  {
    id: "advanced-gans",
    visual: "advancedGan",
    en: {
      title: "Advanced GANs",
      summary:
        "Advanced GAN designs improve control, resolution, stability, and the ability to condition generation on labels or examples.",
      deep:
        "Conditional GANs add class labels or other signals to guide output. StyleGAN separates high-level style from stochastic detail and made latent-space editing more practical. Wasserstein objectives, spectral normalization, progressive training, and better architectures reduce common training failures.",
      ideas: [
        "Conditioning gives the generator a target, such as class, pose, or style.",
        "Latent editing changes generated attributes by moving in learned directions.",
        "Stability techniques reshape the adversarial game so gradients stay useful.",
      ],
      example:
        "A conditional GAN can generate a shoe image from a category label, while a style-based GAN can vary texture and shape independently.",
      mental:
        "Advanced GANs add steering controls to the adversarial engine.",
      check:
        "How does conditioning change the question asked of the generator?",
      note:
        "When evaluating GANs, inspect both realism and diversity. A beautiful sample grid can hide missing modes.",
    },
    es: {
      title: "GAN avanzadas",
      summary:
        "Los diseños avanzados de GAN mejoran control, resolución, estabilidad y la capacidad de condicionar la generación con etiquetas o ejemplos.",
      deep:
        "Las GAN condicionales agregan etiquetas de clase u otras señales para guiar la salida. StyleGAN separa el estilo de alto nivel del detalle estocástico y facilitó la edición en el espacio latente. Objetivos Wasserstein, normalización espectral, entrenamiento progresivo y mejores arquitecturas reducen fallas comunes de entrenamiento.",
      ideas: [
        "El condicionamiento da al generador un objetivo, como clase, pose o estilo.",
        "La edición latente cambia atributos generados al moverse en direcciones aprendidas.",
        "Las técnicas de estabilidad reformulan el juego adversario para mantener gradientes útiles.",
      ],
      example:
        "Una GAN condicional puede generar una imagen de zapato desde una etiqueta de categoría; una GAN basada en estilos puede variar textura y forma de manera más independiente.",
      mental:
        "Las GAN avanzadas agregan controles de dirección al motor adversario.",
      check:
        "¿Cómo cambia el condicionamiento la pregunta que se le hace al generador?",
      note:
        "Al evaluar GAN, revisa realismo y diversidad. Una cuadrícula de muestras bella puede ocultar modos faltantes.",
    },
  },
  {
    id: "transformers",
    visual: "transformer",
    en: {
      title: "Language Models and Transformers",
      summary:
        "Transformers use attention to compare tokens with other tokens, making them effective for language, code, images, audio, and multimodal learning.",
      deep:
        "Self-attention computes relationships inside a sequence. Positional information tells the model where tokens occur. Stacked transformer blocks create contextual representations that can support translation, summarization, retrieval, reasoning-like behavior, and generation. Their parallel training made scaling much more practical than recurrent designs.",
      ideas: [
        "Tokens are model-readable pieces of text, code, image patches, or audio units.",
        "Attention lets each token gather information from relevant tokens.",
        "Scale improves capability but also raises cost, safety, and data concerns.",
      ],
      example:
        "In the sentence 'the model updated its weights,' attention helps connect 'its' with 'model' rather than with another noun.",
      mental:
        "Each token asks: which other tokens should I listen to before deciding my next representation?",
      check:
        "Why is positional information necessary if attention compares all tokens at once?",
      note:
        "Transformers are architecture; GPT-style systems are one generative use of that architecture.",
    },
    es: {
      title: "Modelos de lenguaje y transformers",
      summary:
        "Los transformers usan atención para comparar tokens con otros tokens, lo que los hace eficaces en lenguaje, código, imágenes, audio y aprendizaje multimodal.",
      deep:
        "La autoatención calcula relaciones dentro de una secuencia. La información posicional indica dónde aparece cada token. Bloques de transformer apilados crean representaciones contextuales que pueden servir para traducción, resumen, recuperación, comportamientos parecidos al razonamiento y generación. Su entrenamiento paralelo hizo el escalamiento mucho más práctico que en diseños recurrentes.",
      ideas: [
        "Los tokens son piezas legibles por el modelo: texto, código, parches de imagen o unidades de audio.",
        "La atención permite que cada token recoja información de tokens relevantes.",
        "La escala mejora capacidades, pero también aumenta costos y preocupaciones de seguridad y datos.",
      ],
      example:
        "En la frase 'el modelo actualizó sus pesos', la atención ayuda a conectar 'sus' con 'modelo' y no con otro sustantivo.",
      mental:
        "Cada token pregunta: ¿a qué otros tokens debo escuchar antes de decidir mi siguiente representación?",
      check:
        "¿Por qué se necesita información posicional si la atención compara todos los tokens a la vez?",
      note:
        "Transformer es una arquitectura; los sistemas tipo GPT son un uso generativo de esa arquitectura.",
    },
  },
  {
    id: "gpt",
    visual: "gpt",
    en: {
      title: "GPT and Generative Language Models",
      summary:
        "GPT-style models learn to predict the next token, then use that learned distribution to generate text, code, plans, and structured outputs.",
      deep:
        "Autoregressive generation repeats a simple loop: read the context, estimate next-token probabilities, choose a token, append it, and continue. Instruction tuning, preference optimization, retrieval, tool use, and system constraints turn a base language model into a more useful assistant or application component.",
      ideas: [
        "The next-token objective can produce surprisingly broad behavior.",
        "Sampling settings influence creativity, consistency, and risk.",
        "Designing model instructions is interface design: it shapes context, constraints, and evaluation.",
      ],
      example:
        "A GPT model can draft a study plan, explain code, generate quiz questions, or transform notes into a structured summary.",
      mental:
        "The model is not searching a database by default; it is continuing a pattern under constraints.",
      check:
        "How would you reduce hallucination risk in a student-facing GPT application?",
      note:
        "For reliable systems, combine input instructions with retrieval, validation, evaluation sets, logging, and clear user-facing uncertainty.",
    },
    es: {
      title: "GPT y modelos de lenguaje generativos",
      summary:
        "Los modelos tipo GPT aprenden a predecir el siguiente token y usan esa distribución aprendida para generar texto, código, planes y salidas estructuradas.",
      deep:
        "La generación autorregresiva repite un ciclo simple: leer el contexto, estimar probabilidades del siguiente token, elegir un token, agregarlo y continuar. El ajuste por instrucciones, la optimización por preferencias, la recuperación de información, el uso de herramientas y las restricciones del sistema convierten un modelo base en un asistente o componente de aplicación más útil.",
      ideas: [
        "El objetivo de predecir el siguiente token puede producir comportamientos sorprendentemente amplios.",
        "Los parámetros de muestreo influyen en creatividad, consistencia y riesgo.",
        "Diseñar instrucciones para el modelo es diseñar la interfaz: define contexto, restricciones y evaluación.",
      ],
      example:
        "Un modelo GPT puede redactar un plan de estudio, explicar código, generar preguntas de repaso o transformar notas en un resumen estructurado.",
      mental:
        "El modelo no consulta una base de datos por defecto; continúa un patrón bajo restricciones.",
      check:
        "¿Cómo reducirías el riesgo de alucinaciones en una aplicación GPT para estudiantes?",
      note:
        "Para sistemas confiables, combina instrucciones de entrada con recuperación, validación, conjuntos de evaluación, registros e incertidumbre visible para el usuario.",
    },
  },
  {
    id: "ethics",
    visual: "ethics",
    en: {
      title: "Bias, Ethics, Responsibility, and Regulation",
      summary:
        "Generative models can amplify bias, produce misleading content, expose private data, and shift responsibility across builders, deployers, and users.",
      deep:
        "Ethical work begins before deployment. It includes dataset review, impact assessment, user transparency, consent, privacy controls, evaluation across groups, misuse planning, and accountability. Regulation is evolving, but responsible practice does not wait for a law to name every failure mode.",
      ideas: [
        "Bias can enter through data, labels, objectives, deployment context, or feedback loops.",
        "Synthetic content can affect trust, authorship, labor, and public discourse.",
        "Responsibility requires documentation, monitoring, escalation paths, and limits.",
      ],
      example:
        "A chatbot that gives career advice must be checked for gender, socioeconomic, language, and disability-related bias.",
      mental:
        "Treat a generative system as a socio-technical system: model behavior plus people, incentives, data, and consequences.",
      check:
        "Who could be harmed if this model is wrong, biased, or overtrusted?",
      note:
        "Case studies are stronger when they identify stakeholders, harms, mitigations, and what evidence would change the decision.",
    },
    es: {
      title: "Sesgos, ética, responsabilidad y regulación",
      summary:
        "Los modelos generativos pueden amplificar sesgos, producir contenido engañoso, exponer datos privados y desplazar responsabilidades entre quienes construyen, despliegan y usan el sistema.",
      deep:
        "El trabajo ético empieza antes del despliegue. Incluye revisión de datos, evaluación de impacto, transparencia para usuarios, consentimiento, controles de privacidad, evaluación entre grupos, planificación contra usos indebidos y rendición de cuentas. La regulación evoluciona, pero la práctica responsable no espera a que una ley nombre cada modo de falla.",
      ideas: [
        "El sesgo puede entrar por datos, etiquetas, objetivos, contexto de despliegue o ciclos de retroalimentación.",
        "El contenido sintético afecta confianza, autoría, trabajo y conversación pública.",
        "La responsabilidad exige documentación, monitoreo, rutas de escalamiento y límites.",
      ],
      example:
        "Un chatbot que da orientación profesional debe revisarse por sesgos de género, nivel socioeconómico, idioma y discapacidad.",
      mental:
        "Trata un sistema generativo como un sistema sociotécnico: comportamiento del modelo más personas, incentivos, datos y consecuencias.",
      check:
        "¿Quién podría verse afectado si este modelo se equivoca, presenta sesgos o se usa con exceso de confianza?",
      note:
        "Los casos de estudio son más sólidos cuando identifican actores, daños, mitigaciones y qué evidencia cambiaría la decisión.",
    },
  },
  {
    id: "projects",
    visual: "project",
    en: {
      title: "Generative AI Projects and Social Impact",
      summary:
        "A strong generative AI project connects a real need, a suitable model, careful evaluation, and a clear reflection on social impact.",
      deep:
        "Project development is not only model selection. Students should define the user, input, output, success criteria, risk boundaries, and feedback loop. A prototype should be tested with realistic examples and failure cases. The final reflection should explain benefits, limitations, tradeoffs, and who must remain in control.",
      ideas: [
        "Start from a problem, not from a trendy model.",
        "Prototype with small data and measurable expectations.",
        "Evaluate quality, safety, usability, and impact together.",
      ],
      example:
        "A study assistant can generate practice questions, but it should cite references, mark uncertainty, and avoid replacing the student's own reasoning.",
      mental:
        "A project is a loop: need, data, model, interface, evaluation, reflection, revision.",
      check:
        "What evidence would show that your generative system helps users without creating unacceptable harm?",
      note:
        "Good demos show the happy path and the limits. A model that refuses or asks for clarification at the right time is often stronger.",
    },
    es: {
      title: "Proyectos de IA generativa e impacto social",
      summary:
        "Un buen proyecto de IA generativa conecta una necesidad real, un modelo adecuado, evaluación cuidadosa y una reflexión clara sobre impacto social.",
      deep:
        "El desarrollo de proyectos no es solo escoger un modelo. Los estudiantes deben definir usuario, entrada, salida, criterios de éxito, límites de riesgo y ciclo de retroalimentación. Un prototipo debe probarse con ejemplos realistas y casos de falla. La reflexión final debe explicar beneficios, limitaciones, compensaciones y quién debe conservar el control.",
      ideas: [
        "Empieza desde un problema, no desde un modelo de moda.",
        "Prototipa con datos pequeños y expectativas medibles.",
        "Evalúa calidad, seguridad, usabilidad e impacto en conjunto.",
      ],
      example:
        "Un asistente de estudio puede generar preguntas de práctica, pero debería citar material fuente, marcar incertidumbre y no reemplazar el razonamiento del estudiante.",
      mental:
        "Un proyecto es un ciclo: necesidad, datos, modelo, interfaz, evaluación, reflexión y revisión.",
      check:
        "¿Qué evidencia mostraría que tu sistema generativo ayuda a los usuarios sin crear daños inaceptables?",
      note:
        "Las buenas demostraciones muestran el camino ideal y los límites. Un modelo que se niega o pide aclaración en el momento correcto suele ser más sólido.",
    },
  },
];

const diagramTemplates = {
  foundations: () => flow(["AI", "ML", "Deep Learning", "Generative AI"], ["scope", "learns", "layers", "creates"]),
  perceptron: () => network(["x1", "x2", "x3"], ["h1", "h2"], ["ŷ"], "weights + activation"),
  cnn: () => stack(["pixels", "filters", "feature maps", "classifier"], "sliding kernels"),
  rnn: () => sequence(["t-1", "t", "t+1"], "hidden state"),
  generative: () => split("Discriminative", "Generative", "label boundary", "new sample"),
  vae: () => latent("encoder", "mu + sigma", "sample z", "decoder"),
  gan: () => duel("noise", "generator", "fake sample", "discriminator"),
  advancedGan: () => control("condition", "style", "latent edit", "generated output"),
  transformer: () => attention(),
  gpt: () => loop(["context", "next token", "append", "repeat"]),
  ethics: () => balance(["data", "model", "users", "impact"]),
  project: () => loop(["need", "prototype", "evaluate", "reflect"]),
};

function flow(items, labels) {
  const x = [56, 166, 306, 476];
  return svg(560, 230, `
    ${items.map((item, i) => `<rect class="node ${i === 3 ? "node-good" : ""}" x="${x[i] - 48}" y="74" width="96" height="58" rx="8"/><text x="${x[i]}" y="108" text-anchor="middle">${item}</text>`).join("")}
    ${x.slice(0, -1).map((value, i) => `<path class="line" d="M ${value + 50} 103 L ${x[i + 1] - 54} 103"/><text class="muted" x="${(value + x[i + 1]) / 2}" y="88" text-anchor="middle">${labels[i + 1]}</text>`).join("")}
    <circle class="node-alt" cx="280" cy="176" r="28"/><text class="muted" x="280" y="181" text-anchor="middle">data</text>
  `);
}

function network(inputs, hidden, outputs, caption) {
  const nodes = [
    ...inputs.map((v, i) => [88, 58 + i * 52, v, "node"]),
    ...hidden.map((v, i) => [280, 84 + i * 62, v, "node-alt"]),
    ...outputs.map((v, i) => [466, 115 + i * 52, v, "node-good"]),
  ];
  const lines = inputs.flatMap((_, i) => hidden.map((__, j) => [108, 58 + i * 52, 260, 84 + j * 62]))
    .concat(hidden.flatMap((_, i) => outputs.map((__, j) => [300, 84 + i * 62, 446, 115 + j * 52])));
  return svg(560, 230, `
    ${lines.map((l) => `<path class="line" d="M ${l[0]} ${l[1]} L ${l[2]} ${l[3]}"/>`).join("")}
    ${nodes.map(([x, y, text, klass]) => `<circle class="${klass}" cx="${x}" cy="${y}" r="24"/><text x="${x}" y="${y + 5}" text-anchor="middle">${text}</text>`).join("")}
    <text class="muted" x="280" y="210" text-anchor="middle">${caption}</text>
  `);
}

function stack(items, caption) {
  return svg(560, 230, `
    ${items.map((item, i) => `<rect class="node ${i % 2 ? "node-alt" : ""}" x="${58 + i * 116}" y="${88 - i * 8}" width="92" height="${58 + i * 10}" rx="8"/><text x="${104 + i * 116}" y="${124}" text-anchor="middle">${item}</text>`).join("")}
    <path class="line" d="M 78 180 C 168 210, 368 210, 486 164"/>
    <text class="muted" x="280" y="204" text-anchor="middle">${caption}</text>
  `);
}

function sequence(items, caption) {
  return svg(560, 230, `
    ${items.map((item, i) => `<rect class="node" x="${78 + i * 156}" y="70" width="86" height="60" rx="8"/><text x="${121 + i * 156}" y="105" text-anchor="middle">${item}</text>`).join("")}
    <path class="line" d="M 166 100 L 232 100 M 322 100 L 388 100"/>
    <path class="line line-alt" d="M 121 132 C 160 184, 398 184, 431 132"/>
    <text class="muted" x="280" y="174" text-anchor="middle">${caption}</text>
  `);
}

function split(a, b, la, lb) {
  return svg(560, 230, `
    <rect class="node" x="56" y="54" width="190" height="122" rx="8"/><text x="151" y="92" text-anchor="middle">${a}</text><path class="line" d="M 92 146 C 126 94, 178 196, 216 132"/><text class="muted" x="151" y="162" text-anchor="middle">${la}</text>
    <rect class="node node-good" x="314" y="54" width="190" height="122" rx="8"/><text x="409" y="92" text-anchor="middle">${b}</text><circle class="node-alt" cx="409" cy="136" r="24"/><text class="muted" x="409" y="162" text-anchor="middle">${lb}</text>
  `);
}

function latent(a, b, c, d) {
  return svg(560, 230, `
    <rect class="node" x="40" y="82" width="106" height="54" rx="8"/><text x="93" y="114" text-anchor="middle">${a}</text>
    <ellipse class="node-alt" cx="230" cy="110" rx="58" ry="38"/><text x="230" y="114" text-anchor="middle">${b}</text>
    <circle class="node-good" cx="356" cy="110" r="30"/><text x="356" y="114" text-anchor="middle">${c}</text>
    <rect class="node" x="438" y="82" width="96" height="54" rx="8"/><text x="486" y="114" text-anchor="middle">${d}</text>
    <path class="line" d="M 148 109 L 170 109 M 290 109 L 324 109 M 388 109 L 436 109"/>
  `);
}

function duel(a, b, c, d) {
  return svg(560, 230, `
    <circle class="node" cx="78" cy="112" r="30"/><text x="78" y="116" text-anchor="middle">${a}</text>
    <rect class="node node-good" x="160" y="78" width="116" height="68" rx="8"/><text x="218" y="116" text-anchor="middle">${b}</text>
    <rect class="node-alt" x="330" y="78" width="120" height="68" rx="8"/><text x="390" y="107" text-anchor="middle">${c}</text><text x="390" y="126" text-anchor="middle">${d}</text>
    <path class="line" d="M 110 112 L 158 112 M 278 112 L 328 112"/>
    <path class="line line-alt" d="M 390 150 C 342 198, 226 198, 218 150"/>
  `);
}

function control(a, b, c, d) {
  return svg(560, 230, `
    <rect class="node-alt" x="42" y="50" width="110" height="48" rx="8"/><text x="97" y="79" text-anchor="middle">${a}</text>
    <rect class="node" x="42" y="130" width="110" height="48" rx="8"/><text x="97" y="159" text-anchor="middle">${b}</text>
    <rect class="node-good" x="224" y="88" width="124" height="58" rx="8"/><text x="286" y="122" text-anchor="middle">${c}</text>
    <rect class="node" x="414" y="88" width="106" height="58" rx="8"/><text x="467" y="113" text-anchor="middle">generated</text><text x="467" y="130" text-anchor="middle">output</text>
    <path class="line" d="M 154 74 L 222 110 M 154 154 L 222 126 M 350 117 L 412 117"/>
  `);
}

function attention() {
  return svg(560, 230, `
    ${["token A", "token B", "token C", "token D"].map((t, i) => `<rect class="node" x="${48 + i * 122}" y="58" width="88" height="44" rx="8"/><text x="${92 + i * 122}" y="84" text-anchor="middle">${t}</text>`).join("")}
    ${[92, 214, 336, 458].map((x) => `<circle class="node-alt" cx="${x}" cy="160" r="24"/>`).join("")}
    <path class="line" d="M 92 104 C 160 144, 274 144, 336 104 M 214 104 C 242 138, 304 138, 336 104 M 458 104 C 386 145, 290 145, 214 104"/>
    <text class="muted" x="280" y="204" text-anchor="middle">self-attention links context</text>
  `);
}

function loop(items) {
  return svg(560, 230, `
    ${items.map((item, i) => {
      const pos = [[90, 62], [358, 62], [358, 142], [90, 142]][i];
      return `<rect class="node ${i === 1 ? "node-good" : ""}" x="${pos[0]}" y="${pos[1]}" width="112" height="48" rx="8"/><text x="${pos[0] + 56}" y="${pos[1] + 29}" text-anchor="middle">${item}</text>`;
    }).join("")}
    <path class="line" d="M 204 86 L 356 86 M 414 112 L 414 140 M 356 166 L 204 166 M 146 140 L 146 112"/>
  `);
}

function balance(items) {
  return svg(560, 230, `
    <path class="line" d="M 280 52 L 280 178 M 160 92 L 400 92"/>
    <polygon class="node-alt" points="130,94 190,94 160,154"/><text x="160" y="176" text-anchor="middle">${items[0]}</text>
    <polygon class="node-good" points="370,94 430,94 400,154"/><text x="400" y="176" text-anchor="middle">${items[3]}</text>
    <circle class="node" cx="280" cy="52" r="28"/><text x="280" y="57" text-anchor="middle">${items[1]}</text>
    <text class="muted" x="280" y="210" text-anchor="middle">${items[2]} and accountability</text>
  `);
}

function svg(width, height, inner) {
  return `<svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">${inner}</svg>`;
}

function topicCard(topic, index, lang) {
  const t = topic[lang];
  const labels = ui[lang].labels;
  return `
    <article class="topic-card" id="${topic.id}">
      <div class="topic-top">
        <div>
          <div class="topic-number">${String(index + 1).padStart(2, "0")} / 12</div>
          <h3>${t.title}</h3>
          <p class="topic-summary">${t.summary}</p>
          <p class="topic-deep">${t.deep}</p>
        </div>
        <div class="visual-card">${diagramTemplates[topic.visual]()}</div>
      </div>
      <div class="detail-grid">
        <div class="detail-card">
          <span class="label">${labels.keyIdeas}</span>
          <ul>${t.ideas.map((idea) => `<li>${idea}</li>`).join("")}</ul>
        </div>
        <div class="detail-card">
          <span class="label">${labels.example}</span>
          <p>${t.example}</p>
          <strong>${labels.mentalModel}</strong>
          <p>${t.mental}</p>
        </div>
        <div class="detail-card">
          <span class="label">${labels.studyCheck}</span>
          <p>${t.check}</p>
          <strong>${labels.practicalNote}</strong>
          <p>${t.note}</p>
        </div>
      </div>
    </article>
  `;
}

function render(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = ui[lang][node.dataset.i18n];
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  document.getElementById("topicIndex").innerHTML = topics
    .map((topic, index) => `<a href="#${topic.id}"><span>${String(index + 1).padStart(2, "0")}</span>${topic[lang].title}</a>`)
    .join("");

  document.getElementById("topicList").innerHTML = topics
    .map((topic, index) => topicCard(topic, index, lang))
    .join("");
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    localStorage.setItem("genai-language", lang);
    render(lang);
  });
});

render(localStorage.getItem("genai-language") || "en");

console.info(`Generative AI notebook assets version ${VERSION}`);
