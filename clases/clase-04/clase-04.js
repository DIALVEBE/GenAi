const VERSION = "20261025-1";

const copy = {
  en: {
    navHome: "Home", navConcepts: "Concepts", navControls: "Pixel lab", navCode: "Code",
    pixelVisualLabel: "A pixel grid with a convolution filter highlighting image features",
    heroLabel: "Computer vision · Pixel laboratory", heroTitle: "Pixel learns to see",
    heroText: "Discover how convolutional neural networks transform pixels into patterns, features, and spatial representations.",
    exploreConcepts: "Explore the concepts", openCode: "Get the Python lab", featureMapLabel: "FEATURE MAP",
    goalLabel: "Learning goal", goalTitle: "Connect each operation to the information it preserves",
    goalText: "Explain how a CNN processes an image by relating local filters, feature maps, stride, padding, ReLU, pooling, and noise, and distinguish fixed filters from weights learned during training.",
    notebookLabel: "Learning notebook", conceptTitle: "From pixels to visual features", indexTitle: "Jump to",
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
      { id: "pixels", title: "An image is structured data", paragraphs: ["A grayscale image is a matrix with height H and width W. Each cell stores a pixel intensity; this lab uses values from 0 (dark) to 1 (light). Color images commonly have red, green, and blue channels. Pixel begins with one channel so each operation is easy to inspect.", "The program creates a square, a cross, a diagonal, or a circle as a 16 × 16 matrix. No downloaded image dataset is needed."], bullets: ["Pixel: the value at one image location.", "Channel: one kind of value stored at each location.", "Pattern: a local arrangement such as an edge, line, corner, or shape.", "Feature map: the result of applying a filter to an image or earlier map."], diagram: "matrix" },
      { id: "cnn", title: "What a convolutional neural network does", paragraphs: ["A convolutional neural network (CNN) processes data with spatial structure, especially images. A small filter examines a local region, and the same weights are reused at different positions. This local connectivity and parameter sharing make it possible to detect a pattern in more than one location.", "Early learned filters may respond to simple patterns; later layers can combine features into more complex representations. A neuron does not have a fixed human-readable meaning: useful representations emerge through training."], diagram: "pipeline", note: "Pixel demonstrates fixed filtering, feature maps, ReLU, and optional pooling. It does not train weights, add later layers, or classify shapes." },
      { id: "convolution", title: "A filter scans local neighborhoods", paragraphs: ["A kernel is a small matrix of coefficients. For each output position, the program multiplies the image window and kernel element by element, then sums the products. Pixel uses 3 × 3 kernels.", "The vertical-edge example compares left and right sides. A strong positive response indicates one transition direction; the opposite direction can produce a negative response. Inspect the convolution map before ReLU to see both signs."], diagram: "operation", note: "The implementation uses cross-correlation: it does not flip the kernel first. Deep-learning libraries commonly use the word convolution for this operation." },
      { id: "filters", title: "Different kernels emphasize different patterns", paragraphs: ["Press K in Pixel to cycle through four fixed kernels. The input image remains the same; only the operation changes."], diagram: "kernels", bullets: ["Vertical edge: compares right and left intensities; responds to vertical transitions.", "Horizontal edge: compares lower and upper intensities; responds to horizontal transitions.", "Blur: averages the nine values and softens local variation; fine details may also be smoothed.", "Sharpen: emphasizes some local differences; it can amplify noise as well as details."], note: "A trained CNN can learn filter weights through backpropagation. Pixel keeps these four explanatory kernels fixed." },
      { id: "stride-padding", title: "Stride and padding control the spatial map", paragraphs: ["Stride is the number of pixels the kernel moves at each step. A larger stride calculates fewer positions and reduces the output dimensions, but can skip small patterns. Padding adds values around the image so the kernel can also cover border locations."], diagram: "stride", formula: "Lout = floor((Lin + 2P - K) / S) + 1", note: "For a 16 × 16 image and a 3 × 3 kernel, stride 1 with no padding gives 14 × 14; stride 1 with padding 1 preserves 16 × 16. Zero padding does not add real image information and affects responses near the border." },
      { id: "noise", title: "Noise can look like a feature", paragraphs: ["Noise represents unwanted variation from sensors, lighting, or digital perturbations. Pixel adds reproducible Gaussian noise with a fixed random seed and clips values to the interval [0, 1].", "Edge filters can respond to both the shape and noise. Blur can attenuate some local fluctuations while softening edges. Sharpen can make noise more prominent. This lab does not train a robustness strategy."], diagram: "noise" },
      { id: "relu-pooling", title: "ReLU and pooling transform the feature map", paragraphs: ["ReLU keeps positive values and maps negative values to zero: ReLU(x) = max(0, x). A negative edge response may therefore appear in the center map and disappear from the map on the right.", "Max pooling summarizes each 2 × 2 region by keeping its largest value. It reduces spatial dimensions and discards the other values. This can provide some tolerance to small local shifts, but the exact locations of responses become less precise."], diagram: "pooling", note: "The convolution stride controls how the kernel moves. Pooling is a separate operation with its own step; their effects on output size accumulate. Some CNNs use strided convolutions or other reduction methods instead of max pooling." },
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
    notebookLabel: "Cuaderno de aprendizaje", conceptTitle: "De los píxeles a las características visuales", indexTitle: "Ir a",
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
      { id: "pixels", title: "Una imagen es información estructurada", paragraphs: ["Una imagen en escala de grises es una matriz de alto H y ancho W. Cada celda guarda la intensidad de un píxel; este laboratorio utiliza valores de 0 (oscuro) a 1 (claro). Las imágenes a color suelen tener canales rojo, verde y azul. Pixel comienza con un canal para que cada operación sea fácil de observar.", "El programa crea un cuadrado, una cruz, una diagonal o un círculo como una matriz de 16 × 16. No es necesario descargar un conjunto de imágenes."], bullets: ["Píxel: valor de una ubicación de la imagen.", "Canal: tipo de valor almacenado en cada ubicación.", "Patrón: organización local, como un borde, una línea, una esquina o una forma.", "Mapa de características: resultado de aplicar un filtro a una imagen o a un mapa anterior."], diagram: "matrix" },
      { id: "cnn", title: "Qué hace una red neuronal convolucional", paragraphs: ["Una red neuronal convolucional (CNN) procesa datos con estructura espacial, especialmente imágenes. Un filtro pequeño examina una región local y reutiliza los mismos pesos en distintas posiciones. Esta conectividad local y la compartición de parámetros permiten detectar un patrón sin importar exactamente dónde aparezca.", "Los primeros filtros aprendidos pueden responder a patrones simples; las capas posteriores combinan características en representaciones más complejas. Una neurona no tiene un significado humano fijo: las representaciones útiles surgen durante el entrenamiento."], diagram: "pipeline", note: "Pixel demuestra filtros fijos, mapas de características, ReLU y pooling opcional. No entrena pesos, no añade capas posteriores ni clasifica figuras." },
      { id: "convolution", title: "Un filtro recorre vecindades locales", paragraphs: ["Un kernel es una matriz pequeña de coeficientes. En cada posición de salida, el programa multiplica elemento a elemento la ventana de la imagen y el kernel, y después suma los productos. Pixel utiliza kernels de 3 × 3.", "El ejemplo de borde vertical compara los lados izquierdo y derecho. Una respuesta positiva intensa indica una dirección de transición; la dirección opuesta puede producir un valor negativo. Observa el mapa de convolución antes de ReLU para ver ambos signos."], diagram: "operation", note: "La implementación utiliza correlación cruzada: no invierte el kernel antes de aplicarlo. Las bibliotecas de aprendizaje profundo suelen llamar convolución a esta operación." },
      { id: "filters", title: "Cada kernel resalta patrones distintos", paragraphs: ["Pulsa K en Pixel para recorrer cuatro kernels fijos. La imagen de entrada permanece igual; solo cambia la operación."], diagram: "kernels", bullets: ["Borde vertical: compara intensidades de derecha e izquierda; responde a transiciones verticales.", "Borde horizontal: compara intensidades inferiores y superiores; responde a transiciones horizontales.", "Desenfoque: promedia los nueve valores y suaviza variaciones locales; también puede suavizar detalles finos.", "Realce: enfatiza algunas diferencias locales; puede amplificar tanto el ruido como los detalles."], note: "Una CNN entrenable puede aprender los pesos de sus filtros mediante backpropagation. Pixel mantiene fijos estos cuatro kernels explicativos." },
      { id: "stride-padding", title: "Stride y padding controlan el mapa espacial", paragraphs: ["Stride es la cantidad de píxeles que avanza el kernel en cada paso. Un stride mayor calcula menos posiciones y reduce las dimensiones de salida, pero puede omitir patrones pequeños. Padding añade valores alrededor de la imagen para que el kernel también cubra las zonas del borde."], diagram: "stride", formula: "Lsalida = piso((Lentrada + 2P - K) / S) + 1", note: "Para una imagen de 16 × 16 y un kernel de 3 × 3, stride 1 sin padding produce 14 × 14; stride 1 con padding 1 conserva 16 × 16. El padding con ceros no añade información real y afecta las respuestas cerca de los bordes." },
      { id: "noise", title: "El ruido puede confundirse con una característica", paragraphs: ["El ruido representa variaciones no deseadas de sensores, iluminación o perturbaciones digitales. Pixel añade ruido gaussiano reproducible mediante una semilla aleatoria fija y limita los valores al intervalo [0, 1].", "Los filtros de bordes pueden responder tanto a la figura como al ruido. El desenfoque puede atenuar algunas fluctuaciones locales, pero suaviza los bordes. El realce puede hacer más visible el ruido. Este laboratorio no entrena una estrategia de robustez."], diagram: "noise" },
      { id: "relu-pooling", title: "ReLU y pooling transforman el mapa de características", paragraphs: ["ReLU conserva los valores positivos y convierte los negativos en cero: ReLU(x) = max(0, x). Por eso, una respuesta negativa de borde puede aparecer en el mapa central y desaparecer del mapa de la derecha.", "Max pooling resume cada región de 2 × 2 al conservar su valor máximo. Reduce las dimensiones espaciales y descarta los demás valores. Esto puede tolerar pequeños desplazamientos locales, pero disminuye la precisión de las posiciones exactas de las respuestas."], diagram: "pooling", note: "El stride de la convolución determina cómo se desplaza el kernel. Pooling es una operación distinta con su propio paso; ambos efectos sobre el tamaño se acumulan. Algunas CNN usan convoluciones con stride u otros métodos de reducción en vez de max pooling." },
      { id: "read-maps", title: "Interpreta los tres paneles en conjunto", paragraphs: ["El panel izquierdo muestra la imagen original de 16 × 16, con ruido o sin él. El central muestra las respuestas con signo de la convolución, antes de ReLU. El derecho muestra ReLU, seguida opcionalmente por max pooling.", "Los colores del panel central solo se normalizan para visualizarlos; los cálculos conservan sus valores. Compara qué patrones destacan, el signo de las respuestas, las dimensiones espaciales y la información que se conserva o descarta."], diagram: "panels" },
      { id: "fixed-learned", title: "Los filtros fijos no son pesos aprendidos", paragraphs: ["Pixel demuestra operaciones que pueden aparecer dentro de una CNN, pero no tiene función de pérdida, backpropagation, entrenamiento ni predicción de clases. Sus cuatro kernels están definidos manualmente.", "Una CNN entrenable compara predicciones con objetivos, calcula una pérdida y utiliza gradientes y un optimizador para actualizar sus parámetros aprendibles. Así puede aprender filtros adecuados para una tarea."], diagram: "learned", table: [["Laboratorio Pixel", "CNN entrenable"], ["Figuras generadas", "Datos de entrenamiento y evaluación"], ["Cuatro kernels fijos", "Pesos actualizados durante el entrenamiento"], ["Convolución, ReLU, pooling opcional", "Convolución y activaciones/reducciones elegidas"], ["Sin pérdida ni backpropagation", "Pérdida, gradientes y optimización"], ["Sin predicción de clases", "Predicción si está diseñada para clasificar"]] },
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
  operation: (d) => `<div class="matrix-wrap"><div class="compare-side"><strong>${d.region}</strong><div class="mini-grid">${[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0].map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.kernel}</strong><div class="kernel-matrix">${[-1,0,1,-1,0,1,-1,0,1].map((n) => `<span>${n}</span>`).join("")}</div><p class="equation">0×−1 + 0×0 + 1×1<br>repeated across 3 rows<br><strong>= 3</strong></p></div></div>`,
  kernels: (d) => `<div class="kernel-grid">${d.kernels.map(([name, values, caption]) => `<article class="kernel-card"><h4>${name}</h4><div class="kernel-matrix">${values.map((n) => `<span>${n}</span>`).join("")}</div><p>${caption}</p></article>`).join("")}</div>`,
  stride: (d) => `<div class="flow-diagram two-flow">${d.strides.map(([a,b]) => `<div class="flow-step"><strong>${a}</strong><small>${b}</small></div>`).join("")}</div><div class="padding-visual"><div><p><strong>${d.paddingTitle}</strong></p><div class="padding-grid">${[0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0].map((n,i) => `<span class="${i%5===0||i%5===4||i<5||i>=20 ? "is-padding" : ""}">${n}</span>`).join("")}</div></div><div><p>${d.outputTitle}</p><table class="size-table"><thead><tr>${d.sizeHeaders.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${d.sizeRows.map((row) => `<tr>${row.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`,
  pooling: (d) => `<div class="compare-visual"><div class="compare-side"><strong>${d.before}</strong><div class="mini-grid pool-input">${[1,2,0,1,3,4,2,3,0,1,5,2,2,0,1,4].map((n) => `<span>${n}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.after}</strong><div class="mini-grid pool-grid">${[4,3,2,5].map((n) => `<span>${n}</span>`).join("")}</div><p class="equation">${d.reluExample}</p></div></div>`,
  panels: (d) => `<div class="flow-diagram">${d.panels.map(([title, sub]) => `<div class="flow-step"><strong>${title}</strong><small>${sub}</small></div>`).join("")}</div>`,
  noise: (d) => `<div class="compare-visual"><div class="compare-side"><strong>${d.clean}</strong><div class="mini-grid">${Array.from({length:25},(_,i)=>`<span class="${[6,7,8,11,12,13,16,17,18].includes(i)?"is-lit":"zero"}">${[6,7,8,11,12,13,16,17,18].includes(i)?1:0}</span>`).join("")}</div></div><div class="compare-side"><strong>${d.noisy}</strong><div class="mini-grid">${[0,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0].map((n)=>`<span class="${n?"is-lit":"zero"}">${n}</span>`).join("")}</div></div></div><p class="equation">I<sub>noisy</sub> = clip(I + ε, 0, 1), &nbsp; ε ~ N(0, 0.22²)</p>`,
  learned: (d) => `<div class="flow-diagram">${d.flow.map(([title, sub]) => `<div class="flow-step"><strong>${title}</strong><small>${sub}</small></div>`).join("")}</div>`,
};

const diagramText = {
  en: {
    matrixCaption: "A bright 3 × 3 region stored as pixel values.", matrixShape: "height, width, channels", matrixAria: "5 by 5 grayscale pixel matrix",
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
      p.textContent = paragraph;
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
      const figure = document.createElement("div");
      figure.className = "diagram-panel";
      figure.setAttribute("role", "group");
      figure.setAttribute("aria-label", section.title);
      figure.innerHTML = renderDiagram(section.diagram);
      article.append(figure);
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
