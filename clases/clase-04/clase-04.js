const VERSION = "20261025-3";

const copy = {
  en: {
    navHome: "Home", navConcepts: "Concepts", navControls: "Pixel lab", navCode: "Code",
    pixelVisualLabel: "A pixel grid with a convolution filter highlighting image features",
    heroLabel: "Computer vision · Pixel laboratory", heroTitle: "Pixel learns to see",
    heroText: "Discover how convolutional neural networks transform pixels into patterns, features, and spatial representations.",
    exploreConcepts: "Explore the concepts", openCode: "Get the Python lab", featureMapLabel: "FEATURE MAP",
    goalLabel: "Learning goal", goalTitle: "Connect each operation to the information it preserves",
    goalText: "Explain how a CNN processes an image by relating local filters, feature maps, stride, padding, ReLU, pooling, and noise, and distinguish fixed filters from weights learned during training.",
    notebookLabel: "Learning notebook", conceptTitle: "From pixels to visual features", contentsTitle: "In this page",
    examplesHeading: "Examples beyond this laboratory", labHeading: "In Pixel",
    controlsLabel: "Pixel laboratory", controlsTitle: "Explore one change at a time",
    controlsLead: "The program generates four geometric images locally. Use the controls to connect each setting with the maps you observe.",
    codeLabel: "Runnable project", codeTitle: "Run Pixel on your computer",
    codeLead: "The lab uses Python, NumPy, and Pygame. It runs on CPU and creates its images without an external dataset. Opening the Pygame window requires a graphical desktop session.",
    fullSourceLabel: "Complete source code", copyCode: "Copy code", loadingCode: "Loading the complete program…",
    codeStatus: "The complete student-ready source is included with this page.", checkpointLabel: "Check your understanding",
    checkpointTitle: "Explain what changed and what was lost", footerText: "Generative AI learning notebook",
    copyReady: "Code copied.", copyWait: "The program is still loading.",
    codeUnavailable: "The source could not be loaded. Open main.py directly.", download: "Download main.py", copyShort: "Copy",
    sections: [
      { id: "cnn-foundations", title: "CNN foundations", paragraphs: ["A convolutional neural network is designed for data where nearby values have a meaningful relationship, such as neighboring pixels in an image or neighboring time-frequency values in an audio spectrogram. Unlike a dense layer that can connect every input value to every output unit, a convolution examines a local receptive field. The same set of weights is reused as it moves across the input; this is parameter sharing.", "A CNN usually builds a sequence of representations. Early layers can respond to simple contrasts, edges, or color changes. Later layers combine earlier responses into textures, parts, and task-relevant patterns. The receptive field is the portion of the original input that can influence one activation; it generally grows as layers are stacked or downsampled.", "An image tensor is often written H × W × C: height, width, and channels. A color image has at least three channels; a convolution may read all input channels and produce many output feature maps. A CNN is an architecture, not a guarantee of learning: training data, loss, optimizer, and objective are needed to learn useful weights."], bullets: ["Local connectivity limits each operation to a neighborhood.", "Parameter sharing applies the same detector at many positions.", "A feature map records where a learned or fixed pattern responds.", "CNNs can support classification, detection, segmentation, restoration, or other tasks."], diagram: ["matrix", "pipeline"], examplesTitle: "Examples beyond this laboratory", examples: [["Manufacturing inspection", "A camera system can detect scratches on a metal sheet. Local patterns matter, and deeper layers can combine small edge responses into a defect region."], ["Satellite imagery", "A model can combine texture, color, and spatial context to distinguish roads, water, and vegetation. The task may require a label for every pixel rather than one label for the whole image."], ["Medical imaging", "A CNN may help identify candidate structures in an X-ray or retinal scan. Its output still needs validation against representative, correctly labeled data and clinical context."]], labText: "Pixel makes the input structure visible: it creates one-channel 16 × 16 matrices for four geometric shapes. It demonstrates a few operations, but it has no training loop or classification output. The pipeline diagram includes later layers as general CNN stages, not as functions implemented by Pixel." },
      { id: "kernel", title: "Kernel (K): the local pattern detector", paragraphs: ["A kernel (also called a filter) is a small array of coefficients. At one position, each input value in the window is multiplied by its matching coefficient; the products are summed, often with a bias. Moving the window produces one value at each output position, forming a feature map. A positive, negative, or near-zero response depends on both the local pattern and the learned coefficients.", "For a multi-channel image, a convolutional filter normally has dimensions Kh × Kw × Cin and combines information across all input channels. A layer can contain Cout different filters, producing Cout feature maps. During training, backpropagation and an optimizer adjust these coefficients to reduce the task's loss. Hand-designed edge filters are useful for explanation, but modern CNN filters are usually learned rather than selected one by one.", "Most deep-learning libraries implement cross-correlation: coefficients are applied in their stored order rather than mathematically flipped. The term convolution is still commonly used for the layer. With a 3 × 3 averaging kernel, a noisy thermal patch containing eight values of 10 and one isolated value of 250 produces (8 × 10 + 250) / 9 = 36.7 at that location. The average reduces the isolated spike, while also softening any genuine tiny hot feature."], examplesTitle: "Examples beyond this laboratory", examples: [["Document scanning", "A filter can emphasize dark-to-light transitions so printed character strokes separate from the paper background."], ["Microscopy", "A learned filter can respond to repeated textures or boundaries that help a later layer identify a cell structure."], ["Audio spectrograms", "A small two-dimensional filter can respond to short frequency-time patterns, such as a rising tone or a brief onset."]], diagram: "operation", labTitle: "In Pixel", labText: "The K key cycles through four fixed 3 × 3 kernels: vertical edge, horizontal edge, blur, and sharpen. The input does not change when K is pressed; only the coefficients applied to each window change. These kernels illustrate filtering and are not learned during this experiment.", labDiagram: "kernels" },
      { id: "stride", title: "Stride (S): how far the kernel moves", paragraphs: ["Stride is the horizontal and vertical step, measured in input positions, between consecutive applications of a kernel. With stride 1, neighboring windows overlap heavily. With stride 2, the kernel skips one position between evaluations. Stride changes the sampling density and the spatial size of the output; it does not change the kernel's coefficients or the values inside a window.", "For one dimension, the output length is floor((L + 2P - K) / S) + 1, where L is input length, P is padding per side, K is kernel width, and S is stride. For an input of length 7, kernel 3, and no padding, stride 1 gives 5 positions while stride 2 gives 3. A larger stride reduces computation because fewer windows are evaluated, but fine or narrowly located patterns can fall between sampled positions."], formula: "Lout = floor((Lin + 2P - K) / S) + 1", diagram: "stride", examplesTitle: "Examples beyond this laboratory", examples: [["Large image classification", "A model may use larger strides in early layers to reduce a high-resolution image before processing deeper features."], ["Small object detection", "An aggressive stride can make a tiny object occupy too few feature-map cells, reducing the chance that later layers preserve its location."], ["Dense segmentation", "A model may keep a fine spatial map, or later upsample a smaller map, because the output must locate boundaries pixel by pixel."]], labTitle: "In Pixel", labText: "The S key toggles stride 1 and 2 in both dimensions. With a 16 × 16 input, 3 × 3 kernel, and padding 0, the convolution map changes from 14 × 14 to 7 × 7. Compare the maps while holding the shape, kernel, padding, and noise constant; otherwise, several causes change at once.", labDiagram: "stride" },
      { id: "padding", title: "Padding (P): what happens at image borders", paragraphs: ["A kernel near an edge would extend beyond the original image. Padding defines what values, if any, are treated as existing outside that boundary before the kernel is applied. With valid convolution (P = 0), only windows fully inside the image are evaluated, so the spatial dimensions shrink. With zero padding, extra rows and columns of zeros are added around the image; this lets border locations participate and can preserve dimensions for selected kernel and stride combinations.", "Zero padding is not new evidence about the scene. It creates an artificial transition at the boundary and can change edge responses. Other padding modes use reflected or replicated border values; they may reduce some artificial discontinuities, but they also encode assumptions about what continues beyond the image. Padding affects output size and border behavior, not the learned meaning of a kernel."], formula: "Lout = floor((Lin + 2P - K) / S) + 1", diagram: "padding", examplesTitle: "Examples beyond this laboratory", examples: [["A cropped object", "If an object touches the edge of a crop, zero padding can introduce a strong artificial boundary. Reflection padding instead mirrors nearby pixels, which may make the transition less abrupt."], ["Repeated image tiles", "Circular padding wraps values from one edge to the opposite edge. It can suit periodic textures, but would be a poor assumption for most ordinary photographs."], ["Shape-preserving layers", "A model can choose padding and stride so several convolution layers do not shrink a small input too quickly." ]], labTitle: "In Pixel", labText: "The P key toggles between no padding and one row/column of zeros around the 16 × 16 image. At stride 1 with a 3 × 3 kernel, the convolution output is 14 × 14 without padding and 16 × 16 with padding 1. The yellow window can extend outside the original pixels to visualize those padded positions.", labDiagram: "padding" },
      { id: "noise", title: "Noise (N): variation that is not the signal", paragraphs: ["Noise is unwanted variation in measured or stored data. It can arise from sensor electronics, low light, transmission errors, compression, or deliberate perturbations. Noise is not one single pattern: Gaussian noise adds small random changes; salt-and-pepper noise creates isolated dark or bright pixels; speckle is multiplicative and appears in some imaging systems. Real data can also contain structured artifacts that are not well described by a simple random model.", "Noise can create false edges, hide a weak feature, or change a model's prediction. A useful distinction is signal versus noise relative to a task: a small texture may be irrelevant for one task but important for another. Robustness can be studied with representative training examples, augmentation, denoising, or evaluation under controlled corruption. A blur filter may reduce some high-frequency noise, but it can also erase narrow structures; no filter can know automatically which detail matters."], diagram: "noise", examplesTitle: "Examples beyond this laboratory", examples: [["Night photography", "Sensor noise becomes more visible in dark regions. Denoising may clean the image, but excessive smoothing can erase hair, stars, or fine lettering."], ["Dead or hot sensor pixels", "An isolated pixel much brighter or darker than its neighbors resembles salt-and-pepper noise and may create a false local feature."], ["Ultrasound", "Speckle is a granular pattern linked to the imaging process. Treating it as ordinary additive Gaussian noise can be an inadequate model."]], labTitle: "In Pixel", labText: "The N key adds reproducible Gaussian noise with standard deviation 0.22, clips intensities into [0, 1], and uses a fixed seed so comparisons are repeatable. Compare filters on the same shape with noise off and on. Pixel illustrates sensitivity; it does not train a denoiser or a noise-robust CNN.", labDiagram: "noise" },
      { id: "pooling", title: "Pooling (M): summarizing local activations", paragraphs: ["Pooling downsamples a feature map by summarizing values inside non-overlapping or overlapping windows. Max pooling keeps the largest activation in each region; average pooling keeps the mean. A 2 × 2 window with stride 2 turns each four-value region into one value, reducing both height and width. Pooling has no learned coefficients in its standard form, although the choice of window and stride changes what information survives.", "The summary can retain evidence that a feature appeared nearby even when its exact position shifts slightly. That can lower computation and provide limited local translation tolerance. The trade-off is lost detail: max pooling discards non-maximum values and precise coordinates. It is not a universal requirement for CNNs; strided convolutions, blur-based downsampling, or global average pooling may be used instead."], diagram: "pooling-example", examplesTitle: "Examples beyond this laboratory", examples: [["Small translation", "If a recognized texture shifts by one pixel inside a pooling window, max pooling may keep a similar strong activation."], ["Fine boundary localization", "Pooling can be harmful when a task needs exact boundaries, such as outlining a narrow vessel or road."], ["Global average pooling", "A classifier can average each final feature map to one number per channel, reducing a large dense head and summarizing how strongly each feature appears overall."]], labTitle: "In Pixel", labText: "The M key toggles max pooling after ReLU. Pixel uses a 2 × 2 window with stride 2 and keeps the maximum from each window. If a dimension is odd, its final unpaired row or column is discarded; compare the final size and notice which local values disappear.", labDiagram: "pooling" },
      { id: "relu", title: "ReLU: a nonlinear activation", paragraphs: ["The Rectified Linear Unit is f(x) = max(0, x): negative inputs become zero, while nonnegative inputs pass through unchanged. Applied after a convolution, it clips negative responses and keeps positive ones. Its piecewise-linear shape is inexpensive to compute and introduces nonlinearity; without nonlinear activations, stacking linear layers would still be equivalent to one linear transformation and would have limited expressive power.", "For positive x, ReLU's derivative is 1; for negative x, it is 0. This helps gradients pass through active units, but a unit that remains negative for all examples can stop receiving useful updates, a problem often called a dying ReLU. Leaky ReLU keeps a small negative slope; sigmoid and tanh squash values into bounded ranges; GELU is another smooth activation used in many modern networks. The best choice depends on the architecture and task."], formula: "ReLU(x) = max(0, x)", diagram: "relu", examplesTitle: "Examples beyond this laboratory", examples: [["Hidden image features", "A filter may respond negatively to one contrast direction; ReLU removes that response before a later layer combines activations."], ["Sparse activations", "After ReLU, many values can be exactly zero. This can simplify the pattern passed to the next layer, though sparsity is not guaranteed to improve every model."], ["Training behavior", "If a unit is inactive for nearly all training samples, its zero gradient can make recovery difficult; activation choice and learning rate can affect this behavior."]], labTitle: "In Pixel", labText: "ReLU is always applied in Pixel; there is no key to turn it off. The center panel shows convolution values before ReLU, including negatives. The right panel shows nonnegative values, optionally followed by pooling. A negative response disappearing from the right panel means ReLU clipped it, not that the kernel failed to detect the pattern." },
      { id: "read-maps", title: "Read the three views together", paragraphs: ["The left panel shows the original 16 × 16 image, with or without noise. The center panel shows signed convolution responses before ReLU. The right panel shows ReLU, optionally followed by max pooling.", "Colors in the center panel are normalized only for display; the underlying calculations retain their values. Compare which patterns stand out, the signs of responses, the spatial dimensions, and information that is kept or discarded."], diagram: "panels" },
      { id: "fixed-learned", title: "Fixed filters are not learned weights", paragraphs: ["Pixel demonstrates the operations that can appear inside a CNN, but it has no loss function, backpropagation, training, or class prediction. Its four kernels are manually specified.", "A trainable CNN compares predictions with targets, computes a loss, and uses gradients and an optimizer to update its learnable parameters. This makes it possible to learn filters suited to a task."], diagram: "learned", table: [["Pixel laboratory", "Trainable CNN"], ["Generated geometric images", "Training and evaluation datasets"], ["Four fixed kernels", "Weights updated during training"], ["Convolution, ReLU, optional pooling", "Convolution and selected activations/reduction"], ["No loss or backpropagation", "Loss, gradients, optimization"], ["No class prediction", "Prediction when designed for classification"]] },
    ],
    controls: [["1–4", "Choose a shape", "Square, cross, diagonal, or circle."], ["K", "Change the kernel", "Cycle through vertical, horizontal, blur, and sharpen."], ["S", "Change stride", "Toggle between steps of 1 and 2."], ["P", "Change padding", "Toggle between 0 and 1 zero-padding."], ["N", "Toggle noise", "Add or remove reproducible Gaussian noise."], ["M", "Toggle max pooling", "Show ReLU alone or ReLU followed by pooling."], ["L", "Change language", "Switch the lab controls between English and Spanish."], ["Space", "Pause or resume", "Control the moving convolution window."], ["← / →", "Step through positions", "Inspect the previous or next output location."], ["Esc", "Close the program", "Exit the Pygame window."]],
    setupTitle: ["Create a project folder", "Install dependencies", "Run the lab"],
    setupCode: ["mkdir pixel-cnn\ncd pixel-cnn\nuv init --bare", "uv add numpy pygame", "uv run main.py"],
    checks: ["Why can a filter produce a negative value before ReLU?", "How do stride and padding change the output dimensions?", "What does max pooling preserve, and what does it discard?", "Why can blur reduce noise while also smoothing an edge?", "Which parts of Pixel are fixed, and what would a trainable CNN learn?"]
  },
  es: {
    navHome: "Inicio", navConcepts: "Conceptos", navControls: "Laboratorio Pixel", navCode: "Código",
    pixelVisualLabel: "Cuadrícula de píxeles con un filtro convolucional que resalta características de la imagen",
    heroLabel: "Visión por computador · Laboratorio Pixel", heroTitle: "Pixel aprende a ver",
    heroText: "Descubre cómo las redes neuronales convolucionales transforman píxeles en patrones, características y representaciones espaciales.",
    exploreConcepts: "Explorar los conceptos", openCode: "Obtener el laboratorio en Python", featureMapLabel: "MAPA DE CARACTERÍSTICAS",
    goalLabel: "Objetivo de aprendizaje", goalTitle: "Relaciona cada operación con la información que conserva",
    goalText: "Explica cómo una CNN procesa una imagen al relacionar filtros locales, mapas de características, stride, padding, ReLU, pooling y ruido; distingue los filtros fijos de los pesos aprendidos durante el entrenamiento.",
    notebookLabel: "Cuaderno de aprendizaje", conceptTitle: "De los píxeles a las características visuales", contentsTitle: "Contenido de la página",
    examplesHeading: "Ejemplos distintos al laboratorio", labHeading: "En Pixel",
    controlsLabel: "Laboratorio Pixel", controlsTitle: "Explora un cambio a la vez",
    controlsLead: "El programa genera localmente cuatro imágenes geométricas. Usa los controles para relacionar cada ajuste con los mapas que observas.",
    codeLabel: "Proyecto ejecutable", codeTitle: "Ejecuta Pixel en tu computador",
    codeLead: "El laboratorio utiliza Python, NumPy y Pygame. Funciona en CPU y crea sus imágenes sin un conjunto de datos externo. Para abrir la ventana de Pygame necesitas una sesión gráfica de escritorio.",
    fullSourceLabel: "Código fuente completo", copyCode: "Copiar código", loadingCode: "Cargando el programa completo…",
    codeStatus: "El código completo, listo para estudiantes, está incluido en esta página.", checkpointLabel: "Comprueba tu comprensión",
    checkpointTitle: "Explica qué cambió y qué información se perdió", footerText: "Cuaderno de aprendizaje de IA Generativa",
    copyReady: "Código copiado.", copyWait: "El programa todavía se está cargando.",
    codeUnavailable: "No se pudo cargar el código. Abre main.py directamente.", download: "Descargar main.py", copyShort: "Copiar",
    sections: [
      { id: "cnn-foundations", title: "Fundamentos de CNN", paragraphs: ["Una red neuronal convolucional se diseña para datos en los que los valores cercanos tienen una relación significativa: por ejemplo, píxeles vecinos de una imagen o valores próximos en tiempo y frecuencia de un espectrograma. A diferencia de una capa densa, que puede conectar cada entrada con cada unidad de salida, una convolución examina un campo receptivo local. Después reutiliza los mismos pesos al desplazarse por la entrada; esto se llama compartición de parámetros.", "Una CNN suele construir representaciones en secuencia. Las primeras capas pueden responder a contrastes, bordes o cambios de color sencillos. Las siguientes combinan esas respuestas en texturas, partes y patrones útiles para la tarea. El campo receptivo es la región de la entrada original que puede influir en una activación; normalmente crece al apilar capas o reducir dimensiones.", "Un tensor de imagen suele expresarse como H × W × C: alto, ancho y canales. Una imagen a color tiene al menos tres canales. Una convolución puede leer todos los canales de entrada y producir muchos mapas de características de salida. CNN es una arquitectura, pero no aprende por sí sola: hacen falta datos de entrenamiento, una función de pérdida, un optimizador y un objetivo."], bullets: ["La conectividad local restringe cada operación a una vecindad.", "La compartición de parámetros aplica el mismo detector en distintas posiciones.", "Un mapa de características registra dónde responde un patrón aprendido o fijo.", "Las CNN pueden apoyar clasificación, detección, segmentación, restauración y otras tareas."], diagram: ["matrix", "pipeline"], examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Inspección industrial", "Una cámara puede detectar rayones en una lámina metálica. Importan los patrones locales, y las capas posteriores pueden combinar respuestas de bordes en una región defectuosa."], ["Imágenes satelitales", "Un modelo puede combinar textura, color y contexto espacial para distinguir vías, agua y vegetación. La salida puede asignar una etiqueta a cada píxel en vez de una sola etiqueta a toda la imagen."], ["Imágenes médicas", "Una CNN puede ayudar a localizar estructuras candidatas en una radiografía o una imagen de retina. El resultado requiere validación con datos representativos, etiquetas confiables y contexto clínico."]], labText: "Pixel hace visible la estructura de la entrada: crea matrices de un canal y de 16 × 16 para cuatro figuras geométricas. Demuestra algunas operaciones, pero no tiene ciclo de entrenamiento ni clasifica las figuras. El diagrama muestra etapas generales que Pixel todavía no implementa." },
      { id: "kernel", title: "Kernel (K): detector de patrones locales", paragraphs: ["Un kernel (también llamado filtro) es una matriz pequeña de coeficientes. En una posición, cada valor de la ventana de entrada se multiplica por su coeficiente correspondiente; luego se suman los productos, a menudo con un sesgo. Al desplazar la ventana se obtiene un valor en cada posición y se forma un mapa de características. La respuesta puede ser positiva, negativa o cercana a cero según el patrón local y los coeficientes.", "En una imagen con varios canales, un filtro convolucional suele tener dimensiones Kh × Kw × Centrada y combina información de todos los canales de entrada. Una capa puede tener Csalida filtros diferentes y producir Csalida mapas de características. Durante el entrenamiento, backpropagation y el optimizador ajustan los coeficientes para reducir la pérdida de la tarea. Los filtros de bordes definidos a mano sirven para explicar la operación, pero en una CNN moderna normalmente los pesos se aprenden.", "La mayoría de bibliotecas de aprendizaje profundo implementa correlación cruzada: aplica los coeficientes en el orden almacenado, sin invertirlos como en la definición matemática estricta de convolución. Aun así, es común llamar convolución a la capa. Con un kernel de promedio 3 × 3, una región térmica ruidosa con ocho valores 10 y un pico aislado de 250 produce (8 × 10 + 250) / 9 = 36,7. El promedio reduce ese pico, pero también suaviza una característica real muy pequeña."], examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Digitalización de documentos", "Un filtro puede enfatizar las transiciones entre trazos oscuros y papel claro para separar las letras del fondo."], ["Microscopía", "Un filtro aprendido puede responder a texturas o límites repetidos que una capa posterior combine para identificar estructuras celulares."], ["Espectrogramas de audio", "Un filtro bidimensional pequeño puede responder a patrones breves en tiempo y frecuencia, como un tono ascendente o el inicio de un sonido."]], diagram: "operation", labTitle: "En Pixel", labText: "La tecla K recorre cuatro kernels fijos de 3 × 3: borde vertical, borde horizontal, desenfoque y realce. Al pulsar K, la imagen de entrada no cambia; cambian los coeficientes aplicados a cada ventana. Estos kernels ilustran el filtrado y no se aprenden durante este experimento.", labDiagram: "kernels" },
      { id: "stride", title: "Stride (S): cuánto avanza el kernel", paragraphs: ["Stride es el paso, en posiciones de entrada, entre dos aplicaciones consecutivas del kernel, tanto horizontal como verticalmente. Con stride 1, las ventanas vecinas se superponen mucho. Con stride 2, el kernel salta una posición entre evaluaciones. El stride cambia la densidad del muestreo y el tamaño espacial de la salida; no cambia los coeficientes del kernel ni los valores dentro de cada ventana.", "Para una dimensión, la longitud de salida es piso((L + 2P - K) / S) + 1, donde L es el tamaño de entrada, P el padding por lado, K el ancho del kernel y S el stride. Para una entrada de longitud 7, kernel 3 y sin padding, stride 1 produce 5 posiciones y stride 2 produce 3. Un paso mayor reduce el cálculo porque se evalúan menos ventanas, pero patrones finos pueden quedar entre las posiciones muestreadas."], formula: "Lsalida = piso((Lentrada + 2P - K) / S) + 1", diagram: "stride", examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Clasificación de imágenes grandes", "Una red puede usar strides mayores en capas iniciales para reducir una imagen de alta resolución antes de procesar características más profundas."], ["Detección de objetos pequeños", "Un stride agresivo puede representar un objeto diminuto en muy pocas celdas del mapa y dificultar que las capas siguientes conserven su ubicación."], ["Segmentación detallada", "Si la salida debe trazar límites píxel por píxel, el modelo necesita preservar una resolución espacial fina o recuperar resolución más adelante."]], labTitle: "En Pixel", labText: "La tecla S alterna stride 1 y 2 en ambas dimensiones. Con una entrada 16 × 16, kernel 3 × 3 y padding 0, el mapa de convolución cambia de 14 × 14 a 7 × 7. Mantén fija la figura, el kernel, el padding y el ruido al comparar; de lo contrario, cambiarán varias causas a la vez.", labDiagram: "stride" },
      { id: "padding", title: "Padding (P): qué ocurre en los bordes", paragraphs: ["Cerca de un borde, el kernel se extendería fuera de la imagen original. El padding define qué valores se consideran fuera de ese límite antes de aplicar el kernel. Con convolución válida (P = 0), solo se evalúan ventanas contenidas por completo y las dimensiones espaciales se reducen. Con padding de ceros se agregan filas y columnas de ceros; así también se calculan posiciones cercanas al borde y, con ciertas combinaciones de kernel y stride, se conserva el tamaño.", "El padding con ceros no aporta evidencia nueva sobre la escena. Crea una transición artificial en el contorno y puede alterar las respuestas de borde. Otros modos reflejan o replican los valores existentes; pueden reducir algunas discontinuidades artificiales, aunque también suponen algo sobre lo que habría fuera de la imagen. Padding afecta el tamaño de salida y el comportamiento en los bordes, no el significado aprendido del kernel."], formula: "Lsalida = piso((Lentrada + 2P - K) / S) + 1", diagram: "padding", examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Objeto recortado", "Si un objeto toca el límite del recorte, el padding con ceros puede producir un borde artificial intenso. El padding reflectante refleja los píxeles vecinos y puede suavizar esa transición."], ["Texturas que se repiten", "El padding circular conecta un borde con el opuesto. Puede servir para texturas periódicas, pero suele ser una mala suposición para una fotografía común."], ["Capas que conservan la forma", "Un modelo puede elegir padding y stride para que varias convoluciones no reduzcan demasiado pronto una entrada pequeña."]], labTitle: "En Pixel", labText: "La tecla P alterna entre ningún padding y una fila/columna de ceros alrededor de la imagen 16 × 16. Con stride 1 y kernel 3 × 3, la salida de convolución es 14 × 14 sin padding y 16 × 16 con padding 1. La ventana amarilla puede sobresalir de los píxeles originales para mostrar esas posiciones completadas con ceros.", labDiagram: "padding" },
      { id: "noise", title: "Ruido (N): variación que no es señal", paragraphs: ["El ruido es una variación no deseada en los datos medidos o almacenados. Puede originarse en los componentes electrónicos del sensor, poca iluminación, errores de transmisión, compresión o perturbaciones deliberadas. No existe un único tipo de ruido: el gaussiano suma cambios aleatorios pequeños; el impulsivo o sal y pimienta crea píxeles aislados muy oscuros o claros; el speckle es multiplicativo y aparece en algunos sistemas de imagen. Los datos reales también pueden contener artefactos estructurados que un modelo aleatorio simple no describe bien.", "El ruido puede crear bordes falsos, ocultar una característica débil o modificar una predicción. La diferencia entre señal y ruido depende de la tarea: una textura puede ser irrelevante en un problema e importante en otro. La robustez se estudia con ejemplos representativos, aumento de datos, eliminación de ruido y pruebas bajo corrupciones controladas. Un filtro de desenfoque puede reducir parte del ruido de alta frecuencia, pero también borrar estructuras delgadas; el filtro no sabe por sí solo qué detalle importa."], diagram: "noise", examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Fotografía nocturna", "El ruido del sensor se nota más en zonas oscuras. Reducirlo limpia la imagen, pero un suavizado excesivo borra cabello, estrellas o letras finas."], ["Píxeles defectuosos", "Un píxel aislado mucho más claro u oscuro que sus vecinos se parece al ruido sal y pimienta y puede crear una característica local falsa."], ["Ecografía", "El speckle produce un patrón granular asociado al proceso de formación de imagen. Modelarlo como ruido gaussiano aditivo puede ser insuficiente."]], labTitle: "En Pixel", labText: "La tecla N añade ruido gaussiano reproducible con desviación estándar 0,22, limita las intensidades al intervalo [0, 1] y usa una semilla fija para repetir las comparaciones. Compara los filtros con la misma figura, primero sin ruido y luego con ruido. Pixel ilustra sensibilidad; no entrena un sistema de eliminación de ruido ni una CNN robusta.", labDiagram: "noise" },
      { id: "pooling", title: "Pooling (M): resumir activaciones locales", paragraphs: ["Pooling reduce un mapa de características al resumir los valores de ventanas locales. Max pooling conserva la activación mayor de cada región; average pooling conserva el promedio. Una ventana 2 × 2 con stride 2 transforma cada grupo de cuatro valores en uno y reduce alto y ancho. El pooling estándar no tiene coeficientes aprendibles, aunque el tamaño de ventana y el paso determinan qué información sobrevive.", "El resumen puede conservar evidencia de que una característica apareció cerca de una zona aunque se desplace ligeramente. Esto puede reducir cálculo y aportar una tolerancia local limitada a pequeños desplazamientos. El costo es la pérdida de detalle: max pooling descarta los valores que no son máximos y la posición precisa. No todas las CNN lo necesitan; también se utilizan convoluciones con stride, reducción con desenfoque o global average pooling."], diagram: "pooling-example", examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Pequeño desplazamiento", "Si una textura reconocida se mueve un píxel dentro de la ventana de pooling, max pooling puede conservar una activación similar."], ["Ubicación precisa de bordes", "Pooling puede perjudicar tareas que requieren límites exactos, como delinear un vaso sanguíneo delgado o una carretera."], ["Global average pooling", "Un clasificador puede promediar cada mapa final en un solo valor por canal, reducir una capa densa grande y resumir cuánto aparece cada característica en general."]], labTitle: "En Pixel", labText: "La tecla M activa o desactiva max pooling después de ReLU. Pixel usa una ventana 2 × 2 con stride 2 y conserva el valor máximo de cada ventana. Si una dimensión es impar, descarta la última fila o columna sin pareja; compara el tamaño final y observa cuáles valores locales desaparecen.", labDiagram: "pooling" },
      { id: "relu", title: "ReLU: una función de activación no lineal", paragraphs: ["La unidad lineal rectificada se define como f(x) = max(0, x): las entradas negativas pasan a cero y las no negativas se conservan. Después de una convolución, ReLU recorta las respuestas negativas y mantiene las positivas. Su forma lineal por tramos es barata de calcular e introduce no linealidad; sin activaciones no lineales, apilar capas lineales equivaldría a una sola transformación lineal y limitaría lo que la red puede representar.", "Para x positivo, la derivada de ReLU es 1; para x negativo, es 0. Esto facilita que el gradiente pase por unidades activas, pero una unidad que permanezca negativa para todos los ejemplos puede dejar de recibir actualizaciones útiles; este problema se conoce como ReLU muerta. Leaky ReLU mantiene una pendiente negativa pequeña; sigmoid y tanh comprimen las salidas a rangos acotados; GELU es otra activación suave usada en redes modernas. La elección depende de la arquitectura y la tarea."], formula: "ReLU(x) = max(0, x)", diagram: "relu", examplesTitle: "Ejemplos distintos al laboratorio", examples: [["Características visuales ocultas", "Un filtro puede responder negativamente a una dirección de contraste; ReLU elimina esa respuesta antes de que otra capa combine activaciones."], ["Activaciones dispersas", "Después de ReLU muchos valores pueden ser exactamente cero. Esto puede simplificar el patrón que recibe la capa siguiente, aunque no garantiza mejorar todos los modelos."], ["Comportamiento del entrenamiento", "Si una unidad permanece inactiva casi siempre, su gradiente cero puede dificultar que se recupere; la activación y la tasa de aprendizaje influyen en este comportamiento."]], labTitle: "En Pixel", labText: "ReLU siempre se aplica en Pixel; no hay una tecla para desactivarla. El panel central muestra los valores de convolución antes de ReLU, incluidos los negativos. El panel derecho muestra valores no negativos y, opcionalmente, pooling después. Si una respuesta negativa desaparece a la derecha, ReLU la convirtió en cero; eso no significa que el kernel no detectara el patrón." },
      { id: "read-maps", title: "Interpreta los tres paneles en conjunto", paragraphs: ["El panel izquierdo muestra la imagen original de 16 × 16, con ruido o sin él. El central muestra las respuestas con signo de la convolución, antes de ReLU. El derecho muestra ReLU, seguida opcionalmente por max pooling.", "Los colores del panel central solo se normalizan para visualizarlos; los cálculos conservan sus valores. Compara qué patrones destacan, el signo de las respuestas, las dimensiones espaciales y la información que se conserva o descarta."], diagram: "panels" },
      { id: "fixed-learned", title: "Filtros fijos y pesos aprendidos", paragraphs: ["Pixel demuestra operaciones que pueden aparecer dentro de una CNN, pero no tiene función de pérdida, backpropagation, entrenamiento ni predicción de clases. Sus cuatro kernels están definidos manualmente.", "Una CNN entrenable compara predicciones con objetivos, calcula una pérdida y utiliza gradientes y un optimizador para actualizar sus parámetros aprendibles. Así puede aprender filtros adecuados para una tarea."], diagram: "learned", table: [["Laboratorio Pixel", "CNN entrenable"], ["Figuras generadas", "Datos de entrenamiento y evaluación"], ["Cuatro kernels fijos", "Pesos actualizados durante el entrenamiento"], ["Convolución, ReLU, pooling opcional", "Convolución y activaciones/reducciones elegidas"], ["Sin pérdida ni backpropagation", "Pérdida, gradientes y optimización"], ["Sin predicción de clases", "Predicción si está diseñada para clasificar"]] },
    ],
    controls: [["1–4", "Elegir una figura", "Cuadrado, cruz, diagonal o círculo."], ["K", "Cambiar el kernel", "Recorrer borde vertical, horizontal, desenfoque y realce."], ["S", "Cambiar stride", "Alternar entre pasos de 1 y 2."], ["P", "Cambiar padding", "Alternar entre padding con ceros de 0 y 1."], ["N", "Activar o quitar ruido", "Añadir o quitar ruido gaussiano reproducible."], ["M", "Activar o quitar max pooling", "Mostrar ReLU sola o ReLU seguida de pooling."], ["L", "Cambiar el idioma", "Alternar los controles del laboratorio entre inglés y español."], ["Espacio", "Pausar o reanudar", "Controlar el movimiento de la ventana de convolución."], ["← / →", "Avanzar posiciones", "Inspeccionar la ubicación de salida anterior o siguiente."], ["Esc", "Cerrar el programa", "Salir de la ventana de Pygame."]],
    setupTitle: ["Crear una carpeta", "Instalar dependencias", "Ejecutar el laboratorio"],
    setupCode: ["mkdir pixel-cnn\ncd pixel-cnn\nuv init --bare", "uv add numpy pygame", "uv run main.py"],
    checks: ["¿Por qué un filtro puede producir un valor negativo antes de ReLU?", "¿Cómo cambian stride y padding las dimensiones de salida?", "¿Qué conserva max pooling y qué descarta?", "¿Por qué el desenfoque puede reducir ruido y también suavizar un borde?", "¿Qué partes de Pixel son fijas y qué aprendería una CNN entrenable?"]
  }
};

const diagrams = {
  pipeline: (d) => `<div class="flow-diagram pipeline-flow">${d.map(([title, sub]) => `<div class="flow-step"><strong>${title}</strong><small>${sub}</small></div>`).join("")}</div>`,
  matrix: (d) => `<div class="matrix-wrap"><div class="matrix-visual" aria-label="${d.matrixAria}">${[0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0].map((v) => `<span class="${v ? "is-lit" : ""}">${v}</span>`).join("")}</div><div class="matrix-copy"><p>${d.matrixCaption}</p><p><strong>H × W × C</strong> · ${d.matrixShape}</p></div></div>`,
  operation: (d) => `<div class="matrix-wrap"><div class="compare-side"><strong>${d.region}</strong><div class="mini-grid kernel-patch">${d.operationPatch.map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.kernel}</strong><div class="kernel-matrix">${d.operationKernel.map((n) => `<span>${n}</span>`).join("")}</div><p class="equation">${d.operationMath}</p></div></div>`,
  kernels: (d) => `<div class="kernel-grid">${d.kernels.map(([name, values, caption]) => `<article class="kernel-card"><h4>${name}</h4><div class="kernel-matrix">${values.map((n) => `<span>${n}</span>`).join("")}</div><p>${caption}</p></article>`).join("")}</div>`,
  stride: (d) => `<div class="stride-examples">${d.strideMaps.map(([title, cells, columns]) => `<div class="compare-side"><strong>${title}</strong><div class="stride-map" style="--map-columns:${columns}">${cells.map((n) => `<span>${n}</span>`).join("")}</div></div>`).join("")}</div>`,
  padding: (d) => `<div class="padding-visual"><div><p><strong>${d.paddingTitle}</strong></p><div class="padding-grid">${d.paddingCells.map((n,i) => `<span class="${i%5===0||i%5===4||i<5||i>=20 ? "is-padding" : ""}">${n}</span>`).join("")}</div></div><p>${d.paddingCaption}</p></div>`,
  "pooling-example": (d) => `<div class="compare-visual"><div class="compare-side"><strong>${d.poolInputTitle}</strong><div class="mini-grid pool-input">${d.poolInput.map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.poolOutputTitle}</strong><div class="mini-grid pool-grid">${d.poolOutput.map((n) => `<span>${n}</span>`).join("")}</div><p class="equation">${d.poolCaption}</p></div></div>`,
  pooling: (d) => `<div class="compare-visual"><div class="compare-side"><strong>${d.before}</strong><div class="mini-grid pool-input">${[1,2,0,1,3,4,2,3,0,1,5,2,2,0,1,4].map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.after}</strong><div class="mini-grid pool-grid">${[4,3,2,5].map((n) => `<span>${n}</span>`).join("")}</div><p class="equation">${d.reluExample}</p></div></div>`,
  relu: (d) => `<div class="relu-example"><div class="compare-side"><strong>${d.reluInputTitle}</strong><div class="relu-values">${d.reluInput.map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.reluOutputTitle}</strong><div class="relu-values">${d.reluOutput.map((n) => `<span>${n}</span>`).join("")}</div></div></div>`,
  panels: (d) => `<div class="flow-diagram">${d.panels.map(([title, sub]) => `<div class="flow-step"><strong>${title}</strong><small>${sub}</small></div>`).join("")}</div>`,
  noise: (d) => `<div class="compare-visual"><div class="compare-side"><strong>${d.clean}</strong><div class="mini-grid">${Array.from({length:25},(_,i)=>`<span class="${[6,7,8,11,12,13,16,17,18].includes(i)?"is-lit":"zero"}">${[6,7,8,11,12,13,16,17,18].includes(i)?1:0}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.noisy}</strong><div class="mini-grid">${[0,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0].map((n)=>`<span class="${n?"is-lit":"zero"}">${n}</span>`).join("")}</div></div></div><p class="equation">I<sub>noisy</sub> = clip(I + ε, 0, 1), &nbsp; ε ~ N(0, 0.22²)</p>`,
  learned: (d) => `<div class="flow-diagram">${d.flow.map(([title, sub]) => `<div class="flow-step"><strong>${title}</strong><small>${sub}</small></div>`).join("")}</div>`,
};

const diagramText = {
  en: {
    matrixCaption: "A bright 3 × 3 region stored as pixel values.", matrixShape: "height, width, channels", matrixAria: "5 by 5 grayscale pixel matrix",
    operationPatch: [1,2,4,0,3,5,2,4,6], operationKernel: [1,1,1,1,1,1,1,1,1], operationMath: "(1 + 2 + 4 + 0 + 3 + 5 + 2 + 4 + 6) / 9 = 3",
    strideMaps: [["Stride 1 · 5 × 5 input",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],5],["Stride 2 · sampled positions",[1,3,5,11,13,15,21,23,25],3]],
    paddingTitle: "Zero padding around the image", paddingCells: [0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0], paddingCaption: "The highlighted outer ring contains added zeros; the original 3 × 3 image remains in the center.",
    poolInputTitle: "Feature map · 4 × 4", poolOutputTitle: "Max pooling · 2 × 2", poolInput: [1,3,2,0,4,6,1,2,0,2,5,1,3,1,2,4], poolOutput: [3,6,5,4], poolCaption: "Each 2 × 2 region is replaced by its maximum.",
    reluInputTitle: "Before ReLU", reluOutputTitle: "After ReLU", reluInput: ["−3", "−1", "0", "2", "4"], reluOutput: ["0", "0", "0", "2", "4"],
    region: "Image window X", kernel: "Vertical kernel K",
    kernels: [["Vertical edge",[-1,0,1,-1,0,1,-1,0,1],"Compare left and right."],["Horizontal edge",[-1,-1,-1,0,0,0,1,1,1],"Compare top and bottom."],["Blur",["1/9","1/9","1/9","1/9","1/9","1/9","1/9","1/9","1/9"],"Average nearby values."],["Sharpen",[0,-1,0,-1,5,-1,0,-1,0],"Emphasize local differences."]],
    strides:[["Stride = 1","Adjacent windows; more output positions."],["Stride = 2","Wider jumps; fewer positions and lower resolution."]], paddingTitle:"Zero padding around the image", outputTitle:"Example output dimensions", sizeHeaders:["Stride","Padding","Convolution","After pooling"], sizeRows:[["1","0","14 × 14","7 × 7"],["1","1","16 × 16","8 × 8"],["2","0","7 × 7","3 × 3"],["2","1","8 × 8","4 × 4"]],
    before:"After ReLU", after:"Max pooling 2 × 2", reluExample:"Each 2 × 2 region keeps only its maximum.",
    panels:[["Input image","16 × 16 pixels"],["Convolution","Signed filter response"],["ReLU","Negative values become zero"],["Pooling (optional)","Keep local maxima"],["Feature map","Spatial representation"]],
    clean:"Clean shape", noisy:"Shape with noise",
    flowPipeline:[["Input image","Pixels"],["Convolution","Local filters"],["Feature maps","Patterns"],["ReLU","Nonlinear activation"],["Pooling (optional)","Spatial reduction"],["Later layers","Combine features"],["Output","Prediction"]],
    flow:[["Image + targets","Examples"],["Convolution layers","Learn features"],["Prediction","Task output"],["Loss + gradients","Measure and trace error"],["Optimizer","Update weights"]]
  },
  es: {
    matrixCaption: "Una región clara de 3 × 3 guardada como valores de píxeles.", matrixShape: "alto, ancho y canales", matrixAria: "Matriz de píxeles en escala de grises de 5 por 5",
    operationPatch: [1,2,4,0,3,5,2,4,6], operationKernel: [1,1,1,1,1,1,1,1,1], operationMath: "(1 + 2 + 4 + 0 + 3 + 5 + 2 + 4 + 6) / 9 = 3",
    strideMaps: [["Stride 1 · entrada 5 × 5",[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],5],["Stride 2 · posiciones muestreadas",[1,3,5,11,13,15,21,23,25],3]],
    paddingTitle: "Padding con ceros alrededor", paddingCells: [0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0], paddingCaption: "El borde resaltado contiene ceros añadidos; la imagen original de 3 × 3 queda en el centro.",
    poolInputTitle: "Mapa de características · 4 × 4", poolOutputTitle: "Max pooling · 2 × 2", poolInput: [1,3,2,0,4,6,1,2,0,2,5,1,3,1,2,4], poolOutput: [3,6,5,4], poolCaption: "Cada región de 2 × 2 se reemplaza por su valor máximo.",
    reluInputTitle: "Antes de ReLU", reluOutputTitle: "Después de ReLU", reluInput: ["−3", "−1", "0", "2", "4"], reluOutput: ["0", "0", "0", "2", "4"],
    region: "Ventana de imagen X", kernel: "Kernel vertical K",
    kernels:[["Borde vertical",[-1,0,1,-1,0,1,-1,0,1],"Compara izquierda y derecha."],["Borde horizontal",[-1,-1,-1,0,0,0,1,1,1],"Compara arriba y abajo."],["Desenfoque",["1/9","1/9","1/9","1/9","1/9","1/9","1/9","1/9","1/9"],"Promedia valores cercanos."],["Realce",[0,-1,0,-1,5,-1,0,-1,0],"Enfatiza diferencias locales."]],
    strides:[["Stride = 1","Ventanas próximas; más posiciones de salida."],["Stride = 2","Saltos mayores; menos posiciones y menor resolución."]], paddingTitle:"Padding con ceros alrededor", outputTitle:"Ejemplo de dimensiones de salida", sizeHeaders:["Stride","Padding","Convolución","Después del pooling"], sizeRows:[["1","0","14 × 14","7 × 7"],["1","1","16 × 16","8 × 8"],["2","0","7 × 7","3 × 3"],["2","1","8 × 8","4 × 4"]],
    before:"Después de ReLU", after:"Max pooling 2 × 2", reluExample:"Cada región de 2 × 2 conserva solo su máximo.",
    panels:[["Imagen de entrada","16 × 16 píxeles"],["Convolución","Respuesta con signo"],["ReLU","Los negativos pasan a cero"],["Pooling (opcional)","Conservar máximos locales"],["Mapa de características","Representación espacial"]],
    clean:"Figura sin ruido", noisy:"Figura con ruido",
    flowPipeline:[["Imagen de entrada","Píxeles"],["Convolución","Filtros locales"],["Mapas de características","Patrones"],["ReLU","Activación no lineal"],["Pooling (opcional)","Reducción espacial"],["Capas posteriores","Combinar características"],["Salida","Predicción"]],
    flow:[["Imágenes + objetivos","Ejemplos"],["Capas convolucionales","Aprender características"],["Predicción","Salida de la tarea"],["Pérdida + gradientes","Medir y rastrear el error"],["Optimizador","Actualizar pesos"]]
  }
};

let lang = localStorage.getItem("genai-language") || "en";
let mainSource = "";

function renderDiagram(type) {
  const d = diagramText[lang];
  if (type === "pipeline") return diagrams.pipeline(d.flowPipeline);
  if (type === "matrix") return diagrams.matrix(d);
  if (type === "operation") return diagrams.operation(d);
  if (type === "kernels") return diagrams.kernels(d);
  if (type === "stride") return diagrams.stride(d);
  if (type === "padding") return diagrams.padding(d);
  if (type === "pooling-example") return diagrams["pooling-example"](d);
  if (type === "relu") return diagrams.relu(d);
  if (type === "noise") return diagrams.noise(d);
  if (type === "pooling") return diagrams.pooling(d);
  if (type === "panels") return diagrams.panels(d);
  if (type === "learned") return diagrams.learned(d);
  return "";
}

function renderSections() {
  const data = copy[lang];
  const labels = [];
  document.querySelector("#cnnSections").replaceChildren();
  data.sections.forEach((section) => {
    labels.push(`<a href="#${section.id}">${section.title}</a>`);
    const article = document.createElement("article");
    article.className = "lesson-section cnn-section";
    article.id = section.id;
    const title = document.createElement("h3");
    title.textContent = section.title;
    article.append(title);
    section.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = lang === "es"
        ? paragraph.replace("Kh × Kw × Centrada", "alto × ancho × canales de entrada (Cin)").replaceAll("Csalida", "Cout (canales de salida)")
        : paragraph;
      article.append(p);
    });
    if (section.bullets) {
      const ul = document.createElement("ul");
      section.bullets.forEach((text) => { const li = document.createElement("li"); li.textContent = text; ul.append(li); });
      article.append(ul);
    }
    if (section.formula) {
      const formula = document.createElement("p");
      formula.className = "formula-line";
      formula.textContent = section.formula;
      article.append(formula);
    }
    if (section.diagram) {
      const types = Array.isArray(section.diagram) ? section.diagram : [section.diagram];
      types.forEach((type) => {
        const figure = document.createElement("div");
        figure.className = "diagram-panel";
        figure.setAttribute("role", "group");
        figure.setAttribute("aria-label", section.title);
        figure.innerHTML = renderDiagram(type);
        article.append(figure);
      });
    }
    if (section.examples) {
      const examples = document.createElement("section");
      examples.className = "theory-examples";
      const heading = document.createElement("h4");
      heading.textContent = section.examplesTitle || data.examplesHeading;
      examples.append(heading);
      const grid = document.createElement("div");
      grid.className = "theory-example-grid";
      section.examples.forEach(([name, description]) => {
        const item = document.createElement("article");
        item.className = "theory-example";
        const itemTitle = document.createElement("h5");
        itemTitle.textContent = name;
        const itemBody = document.createElement("p");
        itemBody.textContent = description;
        item.append(itemTitle, itemBody);
        grid.append(item);
      });
      examples.append(grid);
      article.append(examples);
    }
    if (section.labText) {
      const lab = document.createElement("aside");
      lab.className = "lab-application";
      const heading = document.createElement("h4");
      heading.textContent = section.labTitle || data.labHeading;
      const body = document.createElement("p");
      body.textContent = section.labText;
      lab.append(heading, body);
      if (section.labDiagram) {
        const figure = document.createElement("div");
        figure.className = "diagram-panel";
        figure.innerHTML = renderDiagram(section.labDiagram);
        lab.append(figure);
      }
      article.append(lab);
    }
    if (section.table) {
      const table = document.createElement("table");
      table.className = "size-table comparison-table";
      section.table.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => { const el = document.createElement(rowIndex === 0 ? "th" : "td"); el.textContent = cell; tr.append(el); });
        table.append(tr);
      });
      article.append(table);
    }
    if (section.note) {
      const note = document.createElement("p");
      note.className = "student-note";
      note.textContent = section.note;
      article.append(note);
    }
    document.querySelector("#cnnSections").append(article);
  });
  document.querySelector("#cnnIndex").innerHTML = labels.join("");
}

function renderControls() {
  document.querySelector("#controlGrid").innerHTML = copy[lang].controls.map(([key, title, body]) => `<article class="control-card"><kbd>${key}</kbd><strong>${title}</strong><p>${body}</p></article>`).join("");
}

function renderSetup() {
  const titles = copy[lang].setupTitle;
  document.querySelector("#setupGrid").innerHTML = copy[lang].setupCode.map((code, i) => `<article class="code-panel-shell"><div class="code-heading"><div><span class="code-dot"></span><strong>${titles[i]}</strong></div><button class="copy-button setup-copy" type="button" data-code="${encodeURIComponent(code)}">${copy[lang].copyShort}</button></div><pre><code>${code.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code></pre></article>`).join("");
  document.querySelectorAll(".setup-copy").forEach((button) => button.addEventListener("click", () => copyText(decodeURIComponent(button.dataset.code), button)));
}

function renderChecks() {
  document.querySelector("#checkpointList").innerHTML = copy[lang].checks.map((text) => `<li>${text}</li>`).join("");
}

function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = copy[lang][node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const value = copy[lang][node.dataset.i18nAria];
    if (value) node.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.title = lang === "es" ? "Pixel aprende a ver | IA Generativa" : "Pixel Learns to See | Generative AI";
  renderSections();
  renderControls();
  renderSetup();
  renderChecks();
  document.querySelector("#mainCode").textContent = mainSource || copy[lang].codeUnavailable;
  document.querySelector("#codeStatus").textContent = mainSource ? copy[lang].codeStatus : copy[lang].codeUnavailable;
}

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  const previous = button.textContent;
  button.textContent = copy[lang].copyReady;
  document.querySelector("#codeStatus").textContent = copy[lang].copyReady;
  window.setTimeout(() => { button.textContent = previous; }, 1800);
}

document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => {
  lang = button.dataset.lang;
  localStorage.setItem("genai-language", lang);
  render();
}));

document.querySelector("#copyMain").addEventListener("click", (event) => {
  if (mainSource) copyText(mainSource, event.currentTarget);
  else document.querySelector("#codeStatus").textContent = copy[lang].copyWait;
});

fetch("main.py?v=" + VERSION)
  .then((response) => { if (!response.ok) throw new Error("source unavailable"); return response.text(); })
  .then((source) => { mainSource = source; render(); })
  .catch(() => { document.querySelector("#codeStatus").textContent = copy[lang].codeUnavailable; });

render();
