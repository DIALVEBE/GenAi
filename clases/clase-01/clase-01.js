const VERSION = "20260809-1";

const route = {
  en: [
    ["0-8 min", "Surprise", "We are hiring someone who does not exist.", "Curiosity"],
    ["8-18 min", "Hypotheses", "What happened behind Laura?", "Activate prior ideas"],
    ["18-35 min", "Classification", "AI / ML / Generative AI / Not sure", "Create conceptual tension"],
    ["35-50 min", "Conceptualization I", "What is AI?", "Build foundations"],
    ["50-53 min", "Pause", "Cognitive reset", "Recover attention"],
    ["53-70 min", "Conceptualization II", "How does a machine learn?", "Understand ML"],
    ["70-88 min", "Experience", "What changes with Generative AI?", "Build the concept"],
    ["88-103 min", "Applications", "Real cases by domain", "Transfer"],
    ["103-114 min", "Consolidation", "Forbidden words", "Active verbalization"],
    ["114-120 min", "Exit", "Exit ticket", "Metacognition"],
  ],
  es: [
    ["0-8 min", "Sorpresa", "Vamos a contratar a alguien que no existe.", "Curiosidad"],
    ["8-18 min", "Hipótesis", "¿Qué ocurrió detrás de Laura?", "Activar ideas previas"],
    ["18-35 min", "Clasificación", "IA / ML / IA Generativa / No estoy seguro", "Crear tensión conceptual"],
    ["35-50 min", "Conceptualización I", "¿Qué es IA?", "Construir fundamentos"],
    ["50-53 min", "Pausa", "Reseteo cognitivo", "Recuperar atención"],
    ["53-70 min", "Conceptualización II", "¿Cómo aprende una máquina?", "Comprender ML"],
    ["70-88 min", "Experiencia", "¿Qué cambia con IA Generativa?", "Construir el concepto"],
    ["88-103 min", "Aplicaciones", "Casos reales por dominio", "Transferencia"],
    ["103-114 min", "Consolidación", "Palabras prohibidas", "Verbalización activa"],
    ["114-120 min", "Cierre", "Ticket de salida", "Metacognición"],
  ],
};

const lessons = {
  en: [
    {
      id: "laura",
      time: "0-8 min",
      title: "Laura looks real. Laura does not exist.",
      body: [
        "The class begins with a candidate profile: Laura Méndez, 24 years old, software developer. You see a professional photo, a short résumé, a voice sample, and a small piece of software work.",
        "The first question is practical: would you interview her for a developer vacancy? The evidence looks familiar, credible, and human.",
        "Then the central clue appears: there is no Laura. The person in the photo does not exist, the voice was not recorded by her, the résumé was produced, and the code was also produced.",
      ],
      callout: "The question is not “which tool did it?” The question is: if a machine can produce something we associate with human creation, what is it actually doing?",
      visual: "candidate",
    },
    {
      id: "hypotheses",
      time: "8-18 min",
      title: "Four hypotheses stay open",
      body: [
        "Before using definitions, build possible explanations. Maybe the system copied, searched, learned, invented, mixed examples, predicted, or followed instructions.",
        "An early explanation does not have to be perfect. It becomes evidence for investigation: what do we need to know in order to explain the case better?",
      ],
      listTitle: "Questions to keep visible",
      list: ["Did it copy?", "Did it search?", "Did it learn?", "Did it create?"],
      visual: "questions",
    },
    {
      id: "classification",
      time: "18-35 min",
      title: "Classify systems before receiving definitions",
      body: [
        "Now test your criteria. For each system, choose one option: AI, Machine Learning, Generative AI, or Not sure.",
        "The important move is not guessing the label. The important move is explaining the criterion you used.",
      ],
      table: {
        headers: ["System", "Initial discussion"],
        rows: [
          ["Calculator", "Not necessarily AI"],
          ["Credit approval rules", "Depends on the design"],
          ["Expert system based on rules", "AI, not necessarily ML"],
          ["Spam filter trained with emails", "ML"],
          ["Movie recommender", "ML"],
          ["Face recognition", "ML / Deep Learning"],
          ["House price prediction", "ML"],
          ["ChatGPT drafting an email", "Generative AI"],
          ["Image generator", "Generative AI"],
          ["Assistant producing code", "Generative AI"],
        ],
      },
      callout: "When the group disagrees, the disagreement reveals the real problem: we still need better criteria.",
    },
    {
      id: "what-is-ai",
      time: "35-50 min",
      title: "What is Artificial Intelligence?",
      body: [
        "Artificial Intelligence is the field that studies and develops systems capable of performing tasks associated with capabilities we consider intelligent.",
        "Those capabilities include perceiving, reasoning, deciding, solving problems, interpreting language, planning, learning, and acting.",
        "AI is not the same as Machine Learning. A system can be considered AI without having learned from data, for example when it uses explicit rules, search, or knowledge representation.",
      ],
      visual: "aiMap",
    },
    {
      id: "how-ml-learns",
      time: "53-70 min",
      title: "How does a machine learn?",
      body: [
        "Imagine 10,000 emails. Some are marked as spam and others as not spam. With traditional programming, you could write rules such as: if it contains “you won money,” mark it as suspicious.",
        "But exceptions appear quickly. Machine Learning changes the strategy: instead of writing every rule, examples are used so an algorithm can discover useful patterns.",
        "Training is the moment when the model adjusts its parameters using data. Inference is the moment when a trained model receives a new input and produces an output.",
      ],
      visual: "mlFlow",
    },
    {
      id: "generative-ai",
      time: "70-88 min",
      title: "What changes with Generative AI?",
      body: [
        "A spam filter classifies an existing email. A price model predicts a number. A recommender orders options. A generative system produces a new instance of content.",
        "Generative AI includes models capable of producing new content from patterns learned during training and from the conditions or instructions they receive.",
        "It can produce text, images, audio, video, code, designs, or synthetic data. Generating is not the same as searching for information.",
      ],
      callout: "A generative system can produce a very convincing answer without that answer being true.",
      visual: "genCompare",
    },
    {
      id: "applications",
      time: "88-103 min",
      title: "Where is Generative AI already being used?",
      body: [
        "Move the Laura case to other domains. In each case, identify what the system could produce, which real need it could address, and what could go wrong.",
        "A useful example does not start with “use AI.” It starts with a need, a type of output, and a risk that must be managed.",
      ],
      cards: [
        ["Education", "Practice questions, feedback, summaries", "Wrong explanations or dependency"],
        ["Software engineering", "Code, tests, prototypes", "Insecure or hard-to-maintain code"],
        ["Marketing", "Campaign copy, images, variants", "Misleading or generic content"],
        ["Medicine", "Draft reports, patient explanations", "Unsafe recommendations"],
        ["Entertainment", "Characters, stories, game assets", "Copyright or originality issues"],
        ["Design", "Mockups, media, style variations", "Low-quality or biased outputs"],
      ],
    },
    {
      id: "forbidden-words",
      time: "103-114 min",
      title: "Explain it without circular definitions",
      body: [
        "A strong explanation can survive restrictions. Try explaining the differences without relying on the most obvious words.",
        "This forces you to use concepts such as data, patterns, training, model, prediction, output, examples, and criteria.",
      ],
      cards: [
        ["Round 1", "Explain the difference between AI and Machine Learning.", "Forbidden: intelligence, learn, machine"],
        ["Round 2", "Explain the difference between Machine Learning and Generative AI.", "Forbidden: generate, create, content"],
      ],
    },
    {
      id: "thread",
      time: "Class thread",
      title: "The narrative of the two hours",
      body: [
        "Laura seems real. Laura does not exist. How could she have been produced? Is every complex system AI? Does every AI system learn? What does it mean to learn from data?",
        "Then the key distinction appears: classifying, predicting, and recommending are not the same as producing a new instance of content.",
      ],
      listTitle: "Final evidence",
      list: [
        "This belongs to AI because...",
        "It uses Machine Learning because...",
        "It is not Generative AI because its main objective is to classify or predict, not produce a new content instance.",
      ],
    },
  ],
  es: [
    {
      id: "laura",
      time: "0-8 min",
      title: "Laura parece real. Laura no existe.",
      body: [
        "La clase comienza con el perfil de una candidata: Laura Méndez, 24 años, desarrolladora de software. Ves una fotografía profesional, una hoja de vida breve, una muestra de voz y una pequeña evidencia de trabajo en software.",
        "La primera pregunta es práctica: ¿la entrevistarías para una vacante de desarrollo? La evidencia parece familiar, creíble y humana.",
        "Luego aparece la pista central: Laura no existe. La persona de la fotografía no existe, la voz no fue grabada por ella, la hoja de vida fue producida y el código también fue producido.",
      ],
      callout: "La pregunta no es “¿qué herramienta lo hizo?”. La pregunta es: si una máquina puede producir algo que asociamos con la creación humana, ¿qué está haciendo realmente?",
      visual: "candidate",
    },
    {
      id: "hypotheses",
      time: "8-18 min",
      title: "Cuatro hipótesis quedan abiertas",
      body: [
        "Antes de usar definiciones, construye explicaciones posibles. Tal vez el sistema copió, buscó, aprendió, inventó, mezcló ejemplos, predijo o siguió instrucciones.",
        "Una explicación inicial no tiene que ser perfecta. Se convierte en evidencia para investigar: ¿qué necesitamos saber para explicar mejor el caso?",
      ],
      listTitle: "Preguntas para mantener visibles",
      list: ["¿Copió?", "¿Buscó?", "¿Aprendió?", "¿Creó?"],
      visual: "questions",
    },
    {
      id: "classification",
      time: "18-35 min",
      title: "Clasifica sistemas antes de recibir definiciones",
      body: [
        "Ahora pon a prueba tus criterios. Para cada sistema, elige una opción: IA, Machine Learning, IA Generativa o No estoy seguro.",
        "El movimiento importante no es adivinar la etiqueta. Lo importante es explicar el criterio que utilizaste.",
      ],
      table: {
        headers: ["Sistema", "Discusión inicial"],
        rows: [
          ["Calculadora", "No necesariamente IA"],
          ["Reglas para aprobar créditos", "Depende del diseño"],
          ["Sistema experto basado en reglas", "IA, no necesariamente ML"],
          ["Filtro de spam entrenado con correos", "ML"],
          ["Recomendador de películas", "ML"],
          ["Reconocimiento de rostros", "ML / Deep Learning"],
          ["Predicción del precio de una vivienda", "ML"],
          ["ChatGPT redactando un correo", "IA Generativa"],
          ["Generador de imágenes", "IA Generativa"],
          ["Asistente que produce código", "IA Generativa"],
        ],
      },
      callout: "Cuando el grupo no está de acuerdo, el desacuerdo revela el problema real: todavía necesitamos mejores criterios.",
    },
    {
      id: "what-is-ai",
      time: "35-50 min",
      title: "¿Qué es la Inteligencia Artificial?",
      body: [
        "La Inteligencia Artificial es el campo que estudia y desarrolla sistemas capaces de realizar tareas asociadas con capacidades que consideramos inteligentes.",
        "Esas capacidades incluyen percibir, razonar, decidir, resolver problemas, interpretar lenguaje, planificar, aprender y actuar.",
        "IA no es lo mismo que Machine Learning. Un sistema puede considerarse IA sin haber aprendido de datos, por ejemplo cuando usa reglas explícitas, búsqueda o representación de conocimiento.",
      ],
      visual: "aiMap",
    },
    {
      id: "how-ml-learns",
      time: "53-70 min",
      title: "¿Cómo aprende una máquina?",
      body: [
        "Imagina 10.000 correos electrónicos. Algunos están marcados como spam y otros como no spam. Con programación tradicional podrías escribir reglas como: si contiene “ganaste dinero”, marcarlo como sospechoso.",
        "Pero las excepciones aparecen rápidamente. Machine Learning cambia la estrategia: en lugar de escribir cada regla, se usan ejemplos para que un algoritmo descubra patrones útiles.",
        "Entrenamiento es el momento en que el modelo ajusta sus parámetros usando datos. Inferencia es el momento en que un modelo entrenado recibe una entrada nueva y produce una salida.",
      ],
      visual: "mlFlow",
    },
    {
      id: "generative-ai",
      time: "70-88 min",
      title: "¿Qué cambia con la IA Generativa?",
      body: [
        "Un filtro de spam clasifica un correo existente. Un modelo de precio predice un número. Un recomendador ordena opciones. Un sistema generativo produce una nueva instancia de contenido.",
        "La IA Generativa incluye modelos capaces de producir contenido nuevo a partir de patrones aprendidos durante el entrenamiento y de las condiciones o instrucciones que reciben.",
        "Puede producir texto, imágenes, audio, video, código, diseños o datos sintéticos. Generar no es lo mismo que buscar información.",
      ],
      callout: "Un sistema generativo puede producir una respuesta muy convincente sin que esa respuesta sea verdadera.",
      visual: "genCompare",
    },
    {
      id: "applications",
      time: "88-103 min",
      title: "¿Dónde se usa ya la IA Generativa?",
      body: [
        "Traslada el caso de Laura a otros dominios. En cada caso, identifica qué podría producir el sistema, qué necesidad real podría atender y qué podría salir mal.",
        "Un ejemplo útil no empieza con “usar IA”. Empieza con una necesidad, un tipo de salida y un riesgo que debe gestionarse.",
      ],
      cards: [
        ["Educación", "Preguntas de práctica, retroalimentación, resúmenes", "Explicaciones incorrectas o dependencia"],
        ["Ingeniería de software", "Código, pruebas, prototipos", "Código inseguro o difícil de mantener"],
        ["Marketing", "Textos de campaña, imágenes, variantes", "Contenido engañoso o genérico"],
        ["Medicina", "Borradores de reportes, explicaciones para pacientes", "Recomendaciones inseguras"],
        ["Entretenimiento", "Personajes, historias, recursos para videojuegos", "Problemas de derechos u originalidad"],
        ["Diseño", "Mockups, medios, variaciones de estilo", "Salidas de baja calidad o sesgadas"],
      ],
    },
    {
      id: "forbidden-words",
      time: "103-114 min",
      title: "Explícalo sin definiciones circulares",
      body: [
        "Una explicación fuerte sobrevive a restricciones. Intenta explicar las diferencias sin depender de las palabras más obvias.",
        "Esto te obliga a usar conceptos como datos, patrones, entrenamiento, modelo, predicción, salida, ejemplos y criterios.",
      ],
      cards: [
        ["Ronda 1", "Explica la diferencia entre IA y Machine Learning.", "Prohibidas: inteligencia, aprender, máquina"],
        ["Ronda 2", "Explica la diferencia entre Machine Learning e IA Generativa.", "Prohibidas: generar, crear, contenido"],
      ],
    },
    {
      id: "thread",
      time: "Hilo de la clase",
      title: "La narrativa de las dos horas",
      body: [
        "Laura parece real. Laura no existe. ¿Cómo pudo producirse? ¿Todo sistema complejo es IA? ¿Toda IA aprende? ¿Qué significa aprender de datos?",
        "Luego aparece la distinción clave: clasificar, predecir y recomendar no es lo mismo que producir una nueva instancia de contenido.",
      ],
      listTitle: "Evidencia final",
      list: [
        "Esto pertenece a IA porque...",
        "Utiliza Machine Learning porque...",
        "No es IA Generativa porque su objetivo principal es clasificar o predecir, no producir una nueva instancia de contenido.",
      ],
    },
  ],
};

const text = {
  en: {
    pageTitle: "Class 01 | What can a machine create?",
    navHome: "Home",
    navRoute: "Route",
    navNotebook: "Notebook",
    navTicket: "Ticket",
    classLabel: "Class 01",
    heroTitle: "What does it mean for a machine to create?",
    heroText:
      "Start with a person who seems real, test explanations, and build criteria for Artificial Intelligence, Machine Learning, and Generative AI.",
    startCase: "Meet Laura",
    viewMap: "View concept map",
    candidateLabel: "Opening case",
    candidateName: "Laura Méndez",
    candidateRole: "24 years old · Software developer",
    signalPhoto: "Photo",
    signalCv: "CV",
    signalVoice: "Voice",
    signalCode: "Code",
    outcomeLabel: "Session goal",
    outcomeTitle: "Build criteria, not memorized labels",
    competencyText:
      "Distinguish Artificial Intelligence, Machine Learning, and Generative AI by analyzing real systems and applications, explaining what characterizes each approach, and arguing why a solution belongs or does not belong to a category.",
    routeLabel: "120-minute route",
    routeTitle: "From surprise to explanation",
    notebookLabel: "Student notebook",
    notebookTitle: "The question that organizes the class",
    indexTitle: "Jump to",
    mapLabel: "Concept map",
    mapTitle: "Reconstruct this map from the examples",
    mapAI: "Artificial Intelligence",
    mapRules: "Rules · search · knowledge",
    mapML: "Machine Learning",
    mapDL: "Deep Learning",
    mapClassic: "Classify · predict · recommend",
    mapGen: "Generative models",
    contentText: "Text",
    contentImage: "Image",
    contentAudio: "Audio",
    contentCode: "Code",
    contentVideo: "Video",
    ticketLabel: "Exit ticket",
    ticketTitle: "Show what changed in your explanation",
    ticket1:
      "A system analyzes 500,000 transactions and determines which ones look fraudulent. Is it AI, ML, or Generative AI? Explain why.",
    ticket2:
      "A system receives a text description and produces an image that did not exist before. What changes compared with the previous system?",
    ticket3:
      "Complete: “Before, I thought Generative AI was _____. Now I understand that _____.”",
    ticket4: "Complete: “What I still do not understand is _____.”",
    footerText: "Generative AI course notebook",
    labels: {
      time: "Time",
      activity: "Central activity",
      purpose: "Purpose",
      options: "Options",
      need: "Need",
      risk: "Risk",
    },
  },
  es: {
    pageTitle: "Clase 01 | ¿Qué puede crear una máquina?",
    navHome: "Inicio",
    navRoute: "Ruta",
    navNotebook: "Cuaderno",
    navTicket: "Ticket",
    classLabel: "Clase 01",
    heroTitle: "¿Qué significa que una máquina pueda crear?",
    heroText:
      "Empieza con una persona que parece real, pon a prueba explicaciones y construye criterios para Inteligencia Artificial, Machine Learning e IA Generativa.",
    startCase: "Conocer a Laura",
    viewMap: "Ver mapa conceptual",
    candidateLabel: "Caso inicial",
    candidateName: "Laura Méndez",
    candidateRole: "24 años · Desarrolladora de software",
    signalPhoto: "Foto",
    signalCv: "CV",
    signalVoice: "Voz",
    signalCode: "Código",
    outcomeLabel: "Meta de la sesión",
    outcomeTitle: "Construir criterios, no memorizar etiquetas",
    competencyText:
      "Distinguir Inteligencia Artificial, Machine Learning e IA Generativa mediante el análisis de sistemas y aplicaciones reales, explicando qué caracteriza a cada enfoque y argumentando por qué una solución pertenece o no a una categoría.",
    routeLabel: "Ruta de 120 minutos",
    routeTitle: "De la sorpresa a la explicación",
    notebookLabel: "Cuaderno del estudiante",
    notebookTitle: "La pregunta que organiza la clase",
    indexTitle: "Ir a",
    mapLabel: "Mapa conceptual",
    mapTitle: "Reconstruye este mapa desde los ejemplos",
    mapAI: "Inteligencia Artificial",
    mapRules: "Reglas · búsqueda · conocimiento",
    mapML: "Machine Learning",
    mapDL: "Deep Learning",
    mapClassic: "Clasificar · predecir · recomendar",
    mapGen: "Modelos generativos",
    contentText: "Texto",
    contentImage: "Imagen",
    contentAudio: "Audio",
    contentCode: "Código",
    contentVideo: "Video",
    ticketLabel: "Ticket de salida",
    ticketTitle: "Muestra qué cambió en tu explicación",
    ticket1:
      "Un sistema analiza 500.000 transacciones y determina cuáles parecen fraudulentas. ¿Es IA, ML o IA Generativa? Explica por qué.",
    ticket2:
      "Un sistema recibe una descripción textual y produce una imagen que no existía previamente. ¿Qué cambia frente al sistema anterior?",
    ticket3:
      "Completa: “Antes pensaba que la IA Generativa era _____. Ahora entiendo que _____.”",
    ticket4: "Completa: “Lo que todavía no entiendo es _____.”",
    footerText: "Cuaderno del curso de IA Generativa",
    labels: {
      time: "Tiempo",
      activity: "Actividad central",
      purpose: "Propósito",
      options: "Opciones",
      need: "Necesidad",
      risk: "Riesgo",
    },
  },
};

function cardVisual(kind, lang) {
  if (kind === "candidate") {
    return `
      <div class="artifact-stack" aria-hidden="true">
        <div><span>${lang === "es" ? "Foto" : "Photo"}</span></div>
        <div><span>CV</span></div>
        <div><span>${lang === "es" ? "Voz" : "Voice"}</span></div>
        <div><span>${lang === "es" ? "Código" : "Code"}</span></div>
      </div>`;
  }
  if (kind === "questions") {
    const qs = lang === "es" ? ["¿Copió?", "¿Buscó?", "¿Aprendió?", "¿Creó?"] : ["Did it copy?", "Did it search?", "Did it learn?", "Did it create?"];
    return `<div class="question-grid">${qs.map((q) => `<span>${q}</span>`).join("")}</div>`;
  }
  if (kind === "aiMap") {
    return `
      <div class="scope-map compact-map">
        <div class="scope-card scope-ai"><strong>${lang === "es" ? "Inteligencia Artificial" : "Artificial Intelligence"}</strong></div>
        <div class="map-split">
          <div class="scope-card">${lang === "es" ? "Reglas · búsqueda · conocimiento" : "Rules · search · knowledge"}</div>
          <div class="scope-card scope-ml">Machine Learning</div>
        </div>
        <div class="scope-card scope-dl">Deep Learning</div>
      </div>`;
  }
  if (kind === "mlFlow") {
    const steps = lang === "es" ? ["Datos", "Entrenamiento", "Modelo", "Nuevo dato", "Predicción"] : ["Data", "Training", "Model", "New input", "Prediction"];
    return `<div class="pipeline">${steps.map((step) => `<span>${step}</span>`).join("")}</div>`;
  }
  if (kind === "genCompare") {
    const rows = lang === "es"
      ? [["Clasificador", "Esto es spam"], ["Predictor", "El precio será 300 millones"], ["Recomendador", "Probablemente te guste esta película"], ["Generativo", "Produce contenido nuevo"]]
      : [["Classifier", "This is spam"], ["Predictor", "The price will be 300 million"], ["Recommender", "You will probably like this movie"], ["Generative", "Produces new content"]];
    return `<div class="compare-list">${rows.map(([a, b]) => `<div><strong>${a}</strong><span>${b}</span></div>`).join("")}</div>`;
  }
  return "";
}

function renderLesson(section, index, lang) {
  return `
    <article class="lesson-section story-section" id="${section.id}">
      <div>
        <span class="topic-number">${section.time}</span>
        <h3>${section.title}</h3>
        ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.callout ? `<div class="callout">${section.callout}</div>` : ""}
      </div>
      <div class="diagram-panel story-panel">
        ${section.visual ? cardVisual(section.visual, lang) : ""}
        ${section.list ? `<strong class="panel-title">${section.listTitle}</strong><ul>${section.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
        ${section.table ? `<div class="table-wrap"><table><thead><tr>${section.table.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${section.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
        ${section.cards ? `<div class="activity-cards">${section.cards.map((card) => `<article><strong>${card[0]}</strong><p>${card[1]}</p><span>${card[2]}</span></article>`).join("")}</div>` : ""}
        ${section.id === "classification" ? `<div class="choice-row"><span>AI</span><span>ML</span><span>${lang === "es" ? "IAG" : "GenAI"}</span><span>${lang === "es" ? "No estoy seguro" : "Not sure"}</span></div>` : ""}
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
    .map(([time, moment, activity, purpose]) => `
      <article>
        <span>${time}</span>
        <strong>${moment}</strong>
        <p>${activity}</p>
        <em>${purpose}</em>
      </article>
    `)
    .join("");

  document.getElementById("classIndex").innerHTML = lessons[lang]
    .map((section, index) => `<a href="#${section.id}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>`)
    .join("");

  document.getElementById("lessonSections").innerHTML = lessons[lang]
    .map((section, index) => renderLesson(section, index, lang))
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

console.info(`Class 01 assets version ${VERSION}`);
