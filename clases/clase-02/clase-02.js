const VERSION = "20260811-1";

const code = {
  install: String.raw`!pip -q install kagglehub

import kagglehub

path = kagglehub.dataset_download(
    "denkuznetz/food-delivery-time-prediction"
)

print("Path to dataset files:", path)`,
  load: String.raw`from pathlib import Path
import pandas as pd
import numpy as np

dataset_dir = Path(path)
csv_files = list(dataset_dir.rglob("*.csv"))

csv_path = csv_files[0]
df = pd.read_csv(csv_path)

df.head()`,
  inspect: String.raw`df.shape
df.columns
df.info()
df.describe()
df.describe(include="all").T
df.isnull().sum()
df.duplicated().sum()
df.nunique()`,
  visualize: String.raw`import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(9, 5))
sns.histplot(
    data=df,
    x="Delivery_Time_min",
    kde=True
)
plt.title("Delivery time distribution")
plt.xlabel("Delivery time (min)")
plt.ylabel("Frequency")
plt.show()

plt.figure(figsize=(9, 6))
sns.scatterplot(
    data=df,
    x="Distance_km",
    y="Delivery_Time_min"
)
plt.title("Distance vs. delivery time")
plt.xlabel("Distance (km)")
plt.ylabel("Delivery time (min)")
plt.show()

df[["Distance_km", "Delivery_Time_min"]].corr()`,
  variables: String.raw`numeric_features = [
    "Distance_km",
    "Preparation_Time_min",
    "Courier_Experience_yrs"
]

categorical_features = [
    "Weather",
    "Traffic_Level",
    "Time_of_Day",
    "Vehicle_Type"
]

features = numeric_features + categorical_features

X = df[features]
y = df["Delivery_Time_min"]

print("X:", X.shape)
print("y:", y.shape)`,
  splitSimple: String.raw`from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

X_train_simple = X_train[["Distance_km"]]
X_test_simple = X_test[["Distance_km"]]

model_simple = LinearRegression()
model_simple.fit(X_train_simple, y_train)

m = model_simple.coef_[0]
b = model_simple.intercept_

print(f"Estimated time = {m:.2f} · Distance + {b:.2f}")`,
  simplePlot: String.raw`pred_line = model_simple.predict(X_test_simple)
order = np.argsort(X_test_simple["Distance_km"].values)

plt.figure(figsize=(9, 6))
plt.scatter(
    X_test_simple["Distance_km"],
    y_test,
    label="Real values"
)
plt.plot(
    X_test_simple["Distance_km"].values[order],
    pred_line[order],
    linewidth=3,
    label="Linear regression"
)
plt.xlabel("Distance (km)")
plt.ylabel("Delivery time (min)")
plt.title("Line learned by the model")
plt.legend()
plt.show()`,
  metrics: String.raw`from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

def evaluate_model(y_real, y_pred):
    mae = mean_absolute_error(y_real, y_pred)
    mse = mean_squared_error(y_real, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_real, y_pred)

    return {
        "MAE": mae,
        "RMSE": rmse,
        "R2": r2
    }

y_pred_simple = model_simple.predict(X_test_simple)
metrics_simple = evaluate_model(y_test, y_pred_simple)
metrics_simple`,
  preprocess: String.raw`from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

numeric_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="median"))
    ]
)

categorical_transformer = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore"))
    ]
)

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)`,
  fullModel: String.raw`full_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("regression", LinearRegression())
    ]
)

full_model.fit(X_train, y_train)

y_pred_full = full_model.predict(X_test)
metrics_full = evaluate_model(y_test, y_pred_full)

comparison = pd.DataFrame([
    {"Model": "Distance only", **metrics_simple},
    {"Model": "Full model", **metrics_full}
])

comparison`,
  errors: String.raw`results = pd.DataFrame({
    "Real": y_test.values,
    "Predicted": y_pred_full
})

results["Error"] = results["Real"] - results["Predicted"]
results["Absolute_error"] = results["Error"].abs()

results.sort_values(
    "Absolute_error",
    ascending=False
).head(10)

error_analysis = X_test.copy()
error_analysis["Real_time"] = y_test
error_analysis["Predicted_time"] = y_pred_full
error_analysis["Absolute_error"] = np.abs(
    error_analysis["Real_time"] - error_analysis["Predicted_time"]
)

error_analysis.sort_values(
    "Absolute_error",
    ascending=False
).head(10)`,
  predictOrder: String.raw`new_order = pd.DataFrame([
    {
        "Distance_km": 8.5,
        "Weather": "Rainy",
        "Traffic_Level": "High",
        "Time_of_Day": "Evening",
        "Vehicle_Type": "Scooter",
        "Preparation_Time_min": 18,
        "Courier_Experience_yrs": 1
    }
])

prediction = full_model.predict(new_order)

print(f"Estimated time: {prediction[0]:.1f} minutes")`,
  experiment: String.raw`drone_order = new_order.copy()
drone_order["Vehicle_Type"] = "Drone"

full_model.predict(drone_order)

feature_names = (
    full_model
    .named_steps["preprocessor"]
    .get_feature_names_out()
)

feature_names`,
};

const route = {
  en: [
    ["Problem", "Estimate delivery time from known order data."],
    ["Data", "Download and inspect the Kaggle dataset."],
    ["Explore", "Visualize delivery time, distance, and correlation."],
    ["Baseline", "Train a one-feature linear regression model."],
    ["Evaluate", "Read MAE, RMSE, and R2 without calling them accuracy."],
    ["Improve", "Preprocess numeric and categorical variables."],
    ["Pipeline", "Train a complete model with ColumnTransformer and Pipeline."],
    ["Interpret", "Analyze errors and decide when to trust predictions."],
  ],
  es: [
    ["Problema", "Estimar tiempo de entrega desde datos conocidos del pedido."],
    ["Datos", "Descargar e inspeccionar el dataset de Kaggle."],
    ["Explorar", "Visualizar tiempo de entrega, distancia y correlación."],
    ["Base", "Entrenar una regresión lineal con una sola característica."],
    ["Evaluar", "Leer MAE, RMSE y R2 sin llamarlos precisión."],
    ["Mejorar", "Preprocesar variables numéricas y categóricas."],
    ["Pipeline", "Entrenar un modelo completo con ColumnTransformer y Pipeline."],
    ["Interpretar", "Analizar errores y decidir cuándo confiar en predicciones."],
  ],
};

const lessons = {
  en: [
    {
      id: "problem",
      title: "The delivery question",
      tag: "Problem",
      body: [
        "When a delivery app says “your order will arrive in about 37 minutes,” that number is an estimate, not magic.",
        "The model may use distance, traffic, weather, time of day, vehicle type, restaurant preparation time, and courier experience.",
        "Regression is the Machine Learning task we use when the target is numeric. In this class, the target is Delivery_Time_min.",
      ],
      diagram: "order",
      table: [
        ["Distance", "8.5 km"],
        ["Weather", "Rainy"],
        ["Traffic", "High"],
        ["Time of day", "Evening"],
        ["Vehicle", "Scooter"],
        ["Preparation", "18 min"],
        ["Courier experience", "1 year"],
      ],
    },
    {
      id: "dataset",
      title: "Download and load the dataset",
      tag: "Data",
      body: [
        "The dataset is Food Delivery Time Prediction from Kaggle. Start in Google Colab and use kagglehub to download the latest version.",
        "Do not assume the CSV name. Inspect the downloaded directory, find the CSV file, and load it with pandas.",
      ],
      codeBlocks: [
        ["Install and download", code.install],
        ["Find CSV and load", code.load],
      ],
    },
    {
      id: "inspect",
      title: "Understand data before changing it",
      tag: "Inspection",
      body: [
        "A row represents one historical order. A column represents information associated with that delivery.",
        "Before training, inspect shape, columns, types, descriptive statistics, missing values, duplicates, and uniqueness.",
        "Order_ID identifies a record. It exists in the table, but it should not be used as a predictive feature.",
      ],
      codeBlocks: [["Inspection checklist", code.inspect]],
    },
    {
      id: "visualize",
      title: "Explore delivery time and distance",
      tag: "Exploration",
      body: [
        "Tables show values; visualizations reveal patterns. Start with the distribution of delivery times and then test the first hypothesis: longer distance tends to mean longer delivery time.",
        "A scatter plot will not form a perfect line. Similar distances can still produce different delivery times because other variables matter.",
        "Correlation helps summarize a linear relationship, but it is not causality and it does not prove that one variable is enough.",
      ],
      codeBlocks: [["Visual exploration", code.visualize]],
    },
    {
      id: "linear-idea",
      title: "The idea behind linear regression",
      tag: "Model idea",
      body: [
        "A line can be written as y = m·x + b. In the first model, x is distance and y is estimated delivery time.",
        "The slope tells us how much time changes when distance increases. The intercept is the estimated value when distance is zero.",
        "Real data will not fall perfectly on the line. The distance between the real value and the estimated value is prediction error.",
      ],
      diagram: "line",
    },
    {
      id: "simple-model",
      title: "Model 1: distance only",
      tag: "Baseline",
      body: [
        "First, build a deliberately simple model using only Distance_km. A weak baseline is useful because it gives us something to compare against.",
        "Split the dataset into train and test. The model learns from train data and is evaluated on test data it did not use to fit the line.",
      ],
      codeBlocks: [
        ["Features, target, split, and fit", code.variables + "\n\n" + code.splitSimple],
        ["Visualize the learned line", code.simplePlot],
      ],
    },
    {
      id: "metrics",
      title: "Evaluate errors with MAE, RMSE, and R2",
      tag: "Evaluation",
      body: [
        "MAE tells us the average absolute error in minutes. RMSE also measures error, but it penalizes large mistakes more strongly.",
        "R2 compares the model against a simple reference based on the average. R2 is useful, but it is not a percentage of accuracy.",
      ],
      metricCards: [
        ["MAE", "Average distance between prediction and real value."],
        ["RMSE", "Error metric that gives more weight to large mistakes."],
        ["R2", "How much the model improves over a basic average-based reference."],
      ],
      codeBlocks: [["Evaluation function", code.metrics]],
    },
    {
      id: "preprocessing",
      title: "The model needs numbers",
      tag: "Preprocessing",
      body: [
        "Numeric variables can enter the model directly after handling missing values. Text categories such as Weather or Vehicle_Type need a numeric representation.",
        "Do not assign arbitrary ordinal numbers to categories such as Clear, Rainy, and Snowy. One-Hot Encoding creates binary columns that answer whether a record belongs to a category.",
        "ColumnTransformer lets numeric and categorical columns receive different transformations inside one workflow.",
      ],
      codeBlocks: [["Imputers, OneHotEncoder, and ColumnTransformer", code.preprocess]],
    },
    {
      id: "pipeline",
      title: "Train the complete model",
      tag: "Pipeline",
      body: [
        "A Pipeline joins preprocessing and model training. This keeps the sequence consistent and reduces the risk of data leakage.",
        "Transformations are learned from train data. Test data should only receive transformations already learned, then be used for evaluation.",
      ],
      codeBlocks: [["Full model and comparison", code.fullModel]],
    },
    {
      id: "errors",
      title: "Study where the model fails",
      tag: "Errors",
      body: [
        "A model is not understood only by looking at where it works. Sort predictions by absolute error and inspect the most difficult orders.",
        "Look for patterns: extreme weather, high traffic, long distances, unusual preparation times, rare combinations, or missing variables.",
      ],
      codeBlocks: [["Error analysis", code.errors]],
    },
    {
      id: "prediction",
      title: "Return to the initial order",
      tag: "Prediction",
      body: [
        "Use the complete model to estimate the delivery time for the initial order. Then modify one variable at a time: distance, traffic, preparation time, experience, or vehicle type.",
        "If you try Vehicle_Type = Drone, the pipeline can process it because handle_unknown='ignore'. That does not mean the model understands drones.",
      ],
      codeBlocks: [
        ["Predict a new order", code.predictOrder],
        ["Unknown category and generated feature names", code.experiment],
      ],
    },
    {
      id: "trust",
      title: "When should we trust the prediction?",
      tag: "Interpretation",
      body: [
        "A number such as 37.4 minutes should not be read as an exact promise. It means: according to patterns learned from available data, the model estimates a value near that number.",
        "Before using the model in a real system, ask whether the data represent the current situation, whether important variables are missing, how large typical errors are, and what the consequences of a wrong estimate would be.",
      ],
      list: [
        "Data representativeness",
        "Missing variables",
        "Extreme values",
        "Typical error size",
        "Similarity between a new case and training cases",
        "Consequences of a bad prediction",
      ],
    },
  ],
  es: [
    {
      id: "problem",
      title: "La pregunta del domicilio",
      tag: "Problema",
      body: [
        "Cuando una aplicación de domicilios dice “tu pedido llegará aproximadamente en 37 minutos”, ese número es una estimación, no magia.",
        "El modelo puede usar distancia, tráfico, clima, momento del día, tipo de vehículo, tiempo de preparación del restaurante y experiencia del repartidor.",
        "La regresión es la tarea de Machine Learning que usamos cuando el objetivo es numérico. En esta clase, el objetivo es Delivery_Time_min.",
      ],
      diagram: "order",
      table: [
        ["Distancia", "8.5 km"],
        ["Clima", "Rainy"],
        ["Tráfico", "High"],
        ["Momento del día", "Evening"],
        ["Vehículo", "Scooter"],
        ["Preparación", "18 min"],
        ["Experiencia", "1 año"],
      ],
    },
    {
      id: "dataset",
      title: "Descargar y cargar el dataset",
      tag: "Datos",
      body: [
        "El dataset es Food Delivery Time Prediction de Kaggle. Empieza en Google Colab y usa kagglehub para descargar la versión más reciente.",
        "No asumas el nombre del CSV. Inspecciona el directorio descargado, encuentra el archivo CSV y cárgalo con pandas.",
      ],
      codeBlocks: [
        ["Instalar y descargar", code.install],
        ["Encontrar CSV y cargar", code.load],
      ],
    },
    {
      id: "inspect",
      title: "Entender los datos antes de cambiarlos",
      tag: "Inspección",
      body: [
        "Una fila representa un pedido histórico. Una columna representa información asociada con esa entrega.",
        "Antes de entrenar, revisa tamaño, columnas, tipos, estadísticas descriptivas, valores faltantes, duplicados y valores únicos.",
        "Order_ID identifica un registro. Existe en la tabla, pero no debería usarse como característica predictiva.",
      ],
      codeBlocks: [["Lista de inspección", code.inspect]],
    },
    {
      id: "visualize",
      title: "Explorar tiempo de entrega y distancia",
      tag: "Exploración",
      body: [
        "Las tablas muestran valores; las visualizaciones revelan patrones. Empieza con la distribución de tiempos de entrega y luego prueba la primera hipótesis: a mayor distancia, suele aumentar el tiempo.",
        "El diagrama de dispersión no formará una línea perfecta. Distancias parecidas pueden tener tiempos distintos porque otras variables importan.",
        "La correlación resume una relación lineal, pero no es causalidad y no prueba que una sola variable sea suficiente.",
      ],
      codeBlocks: [["Exploración visual", code.visualize]],
    },
    {
      id: "linear-idea",
      title: "La idea detrás de la regresión lineal",
      tag: "Idea del modelo",
      body: [
        "Una recta puede escribirse como y = m·x + b. En el primer modelo, x es distancia y y es el tiempo de entrega estimado.",
        "La pendiente indica cuánto cambia el tiempo cuando aumenta la distancia. El intercepto es el valor estimado cuando la distancia es cero.",
        "Los datos reales no caen perfectamente sobre la recta. La distancia entre el valor real y el estimado es error de predicción.",
      ],
      diagram: "line",
    },
    {
      id: "simple-model",
      title: "Modelo 1: solo distancia",
      tag: "Base",
      body: [
        "Primero construye un modelo deliberadamente simple usando solo Distance_km. Una línea base débil es útil porque nos da algo contra qué comparar.",
        "Divide el dataset en train y test. El modelo aprende con train y se evalúa con test, datos que no usó para ajustar la recta.",
      ],
      codeBlocks: [
        ["Features, target, división y entrenamiento", code.variables + "\n\n" + code.splitSimple],
        ["Visualizar la recta aprendida", code.simplePlot],
      ],
    },
    {
      id: "metrics",
      title: "Evaluar errores con MAE, RMSE y R2",
      tag: "Evaluación",
      body: [
        "MAE indica el error absoluto promedio en minutos. RMSE también mide error, pero penaliza con más fuerza los errores grandes.",
        "R2 compara el modelo contra una referencia simple basada en el promedio. R2 es útil, pero no es porcentaje de precisión.",
      ],
      metricCards: [
        ["MAE", "Distancia promedio entre predicción y valor real."],
        ["RMSE", "Métrica de error que da más peso a errores grandes."],
        ["R2", "Cuánto mejora el modelo frente a una referencia basada en el promedio."],
      ],
      codeBlocks: [["Función de evaluación", code.metrics]],
    },
    {
      id: "preprocessing",
      title: "El modelo necesita números",
      tag: "Preprocesamiento",
      body: [
        "Las variables numéricas pueden entrar al modelo después de tratar valores faltantes. Categorías de texto como Weather o Vehicle_Type necesitan una representación numérica.",
        "No asignes números ordinales arbitrarios a categorías como Clear, Rainy y Snowy. One-Hot Encoding crea columnas binarias que responden si un registro pertenece a una categoría.",
        "ColumnTransformer permite que columnas numéricas y categóricas reciban transformaciones distintas dentro de un mismo flujo.",
      ],
      codeBlocks: [["Imputers, OneHotEncoder y ColumnTransformer", code.preprocess]],
    },
    {
      id: "pipeline",
      title: "Entrenar el modelo completo",
      tag: "Pipeline",
      body: [
        "Un Pipeline une preprocesamiento y entrenamiento del modelo. Esto mantiene la secuencia consistente y reduce el riesgo de fuga de información.",
        "Las transformaciones se aprenden desde train. Test solo debe recibir transformaciones ya aprendidas y luego usarse para evaluar.",
      ],
      codeBlocks: [["Modelo completo y comparación", code.fullModel]],
    },
    {
      id: "errors",
      title: "Estudiar dónde falla el modelo",
      tag: "Errores",
      body: [
        "Un modelo no se entiende solo mirando dónde acierta. Ordena las predicciones por error absoluto e inspecciona los pedidos más difíciles.",
        "Busca patrones: clima extremo, tráfico alto, grandes distancias, tiempos de preparación inusuales, combinaciones raras o variables faltantes.",
      ],
      codeBlocks: [["Análisis de errores", code.errors]],
    },
    {
      id: "prediction",
      title: "Volver al pedido inicial",
      tag: "Predicción",
      body: [
        "Usa el modelo completo para estimar el tiempo de entrega del pedido inicial. Luego modifica una sola variable a la vez: distancia, tráfico, preparación, experiencia o tipo de vehículo.",
        "Si pruebas Vehicle_Type = Drone, el pipeline puede procesarlo porque handle_unknown='ignore'. Eso no significa que el modelo entienda los drones.",
      ],
      codeBlocks: [
        ["Predecir un pedido nuevo", code.predictOrder],
        ["Categoría desconocida y nombres de features generados", code.experiment],
      ],
    },
    {
      id: "trust",
      title: "¿Cuándo deberíamos confiar en la predicción?",
      tag: "Interpretación",
      body: [
        "Un número como 37.4 minutos no debe leerse como una promesa exacta. Significa: según patrones aprendidos desde los datos disponibles, el modelo estima un valor cercano a ese número.",
        "Antes de usar el modelo en un sistema real, pregunta si los datos representan la situación actual, si faltan variables importantes, qué tan grandes son los errores típicos y qué consecuencias tendría una mala estimación.",
      ],
      list: [
        "Representatividad de los datos",
        "Variables faltantes",
        "Valores extremos",
        "Tamaño del error típico",
        "Parecido entre un caso nuevo y los casos de entrenamiento",
        "Consecuencias de una mala predicción",
      ],
    },
  ],
};

const text = {
  en: {
    pageTitle: "Class 02 | Linear Regression for Delivery Time",
    navHome: "Home",
    navRoute: "Route",
    navNotebook: "Notebook",
    navChallenge: "Challenge",
    classLabel: "Class 02",
    heroTitle: "Where is my burger?",
    heroText:
      "Build a Machine Learning model that estimates food delivery time and learn why prediction is more than drawing a line.",
    startNotebook: "Start notebook",
    openCode: "Open code path",
    etaLabel: "Estimated arrival",
    etaValue: "37 min",
    signalDistance: "Distance",
    signalTraffic: "Traffic",
    signalWeather: "Weather",
    signalVehicle: "Vehicle",
    outcomeLabel: "Session goal",
    outcomeTitle: "Predict a number with evidence",
    competencyText:
      "Use a real delivery dataset to define a regression problem, prepare features and target, train a linear model, evaluate its errors, and decide how much trust a prediction deserves.",
    routeLabel: "Notebook route",
    routeTitle: "From question to model interpretation",
    notebookLabel: "Student notebook",
    notebookTitle: "Linear regression for delivery time",
    indexTitle: "Jump to",
    challengeLabel: "Final challenge",
    challengeTitle: "Explain the model where it fails",
    challenge1: "Find the test order with the largest absolute error.",
    challenge2: "Explain at least two possible reasons why the model missed that case.",
    challenge3: "Propose one new variable that could reduce the error and justify why it would help.",
    challenge4: "Decide whether you would trust the model to promise an exact arrival time to a customer.",
    footerText: "Generative AI course notebook",
    copy: "Copy",
    copied: "Copied",
  },
  es: {
    pageTitle: "Clase 02 | Regresión lineal para tiempos de entrega",
    navHome: "Inicio",
    navRoute: "Ruta",
    navNotebook: "Cuaderno",
    navChallenge: "Reto",
    classLabel: "Clase 02",
    heroTitle: "¿Dónde está mi hamburguesa?",
    heroText:
      "Construye un modelo de Machine Learning que estima el tiempo de entrega y aprende por qué predecir es más que dibujar una recta.",
    startNotebook: "Empezar cuaderno",
    openCode: "Abrir ruta de código",
    etaLabel: "Llegada estimada",
    etaValue: "37 min",
    signalDistance: "Distancia",
    signalTraffic: "Tráfico",
    signalWeather: "Clima",
    signalVehicle: "Vehículo",
    outcomeLabel: "Meta de la sesión",
    outcomeTitle: "Predecir un número con evidencia",
    competencyText:
      "Usar un dataset real de entregas para definir un problema de regresión, preparar características y objetivo, entrenar un modelo lineal, evaluar sus errores y decidir cuánta confianza merece una predicción.",
    routeLabel: "Ruta del notebook",
    routeTitle: "De la pregunta a la interpretación del modelo",
    notebookLabel: "Cuaderno del estudiante",
    notebookTitle: "Regresión lineal para tiempo de entrega",
    indexTitle: "Ir a",
    challengeLabel: "Reto final",
    challengeTitle: "Explica el modelo donde falla",
    challenge1: "Encuentra el pedido del conjunto de prueba con mayor error absoluto.",
    challenge2: "Explica al menos dos posibles razones por las que el modelo falló en ese caso.",
    challenge3: "Propón una nueva variable que podría reducir el error y justifica por qué ayudaría.",
    challenge4: "Decide si confiarías en el modelo para prometer una hora exacta de llegada a un cliente.",
    footerText: "Cuaderno del curso de IA Generativa",
    copy: "Copiar",
    copied: "Copiado",
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function diagram(kind, lang) {
  if (kind === "order") {
    const labels = lang === "es"
      ? ["Datos del pedido", "Modelo", "Tiempo de entrega"]
      : ["Order data", "Model", "Delivery time"];
    return `<div class="flow-diagram">${labels.map((item) => `<span>${item}</span>`).join("")}</div>`;
  }

  if (kind === "line") {
    return `
      <div class="line-diagram" aria-hidden="true">
        <svg viewBox="0 0 320 190">
          <line x1="32" y1="162" x2="290" y2="162"></line>
          <line x1="32" y1="162" x2="32" y2="24"></line>
          <path d="M42 140 L282 44"></path>
          <circle cx="64" cy="128" r="5"></circle>
          <circle cx="96" cy="116" r="5"></circle>
          <circle cx="132" cy="108" r="5"></circle>
          <circle cx="168" cy="82" r="5"></circle>
          <circle cx="210" cy="88" r="5"></circle>
          <circle cx="250" cy="54" r="5"></circle>
        </svg>
        <strong>y = m·x + b</strong>
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

function renderLesson(section, index, lang) {
  const dictionary = text[lang];
  return `
    <article class="lesson-section story-section" id="${section.id}">
      <div>
        <span class="topic-number">${String(index + 1).padStart(2, "0")} / ${lessons[lang].length}</span>
        <h3>${section.title}</h3>
        ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.list ? `<ul class="trust-list">${section.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="diagram-panel story-panel">
        <span class="scope-tag">${section.tag}</span>
        ${section.diagram ? diagram(section.diagram, lang) : ""}
        ${section.table ? `<div class="table-wrap"><table><tbody>${section.table.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join("")}</tbody></table></div>` : ""}
        ${section.metricCards ? `<div class="metric-cards">${section.metricCards.map(([a, b]) => `<article><strong>${a}</strong><span>${b}</span></article>`).join("")}</div>` : ""}
        ${section.codeBlocks ? section.codeBlocks.map(([title, source]) => renderCodeBlock(title, source, dictionary)).join("") : ""}
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

console.info(`Class 02 assets version ${VERSION}`);
