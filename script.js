// === Datos de la malla curricular ===
const mallaData = [
  {
    titulo: "Primer Semestre",
    materias: [
      { codigo: "MAT-123", nombre: "Álgebra Lineal" },
      { codigo: "MAT-122", nombre: "Matemáticas Discretas" },
      { codigo: "SIS-111", nombre: "Introducción a la Programación" },
      { codigo: "SIS-123", nombre: "Ingeniería de Sistemas" },
      { codigo: "FIL-107", nombre: "Pensamiento Crítico" },
    ]
  },
  {
    titulo: "Segundo Semestre",
    materias: [
      { codigo: "MAT-132", nombre: "Cálculo I" },
      { codigo: "MAT-251", nombre: "Investigación Operativa I" },
      { codigo: "MAT-142", nombre: "Probabilidad y Estadística I" },
      { codigo: "SIS-112", nombre: "Programación I" },
      { codigo: "SIS-133", nombre: "Arquitectura Computacional y SO" },
      { codigo: "FHC-102", nombre: "Formación Humano Cristiana I" },
    ]
  },
  {
    titulo: "Tercer Semestre",
    materias: [
      { codigo: "MAT-133", nombre: "Cálculo II" },
      { codigo: "FIS-111", nombre: "Física I y Laboratorio" },
      { codigo: "MAT-143", nombre: "Probabilidad y Estadística II" },
      { codigo: "SIS-113", nombre: "Programación II" },
      { codigo: "SIS-122", nombre: "Bases de Datos I" },
      { codigo: "IND-260", nombre: "Metodología de la Investigación" },
      { codigo: "FIL-207", nombre: "Epistemología" },
    ]
  },
  {
    titulo: "Cuarto Semestre",
    materias: [
      { codigo: "MAT-252", nombre: "Investigación Operativa II y Laboratorio" },
      { codigo: "SIS-211", nombre: "Estructuras de Datos" },
      { codigo: "SIS-214", nombre: "Tecnologías Web I" },
      { codigo: "SIS-221", nombre: "Bases de Datos II" },
      { codigo: "SIS-225", nombre: "Sistemas de Información" },
      { codigo: "FHC-202", nombre: "Formación Humano Cristiana II" },
    ]
  }
];

// === Prerrequisitos ===
const prerequisitos = {
  "MAT-132": ["MAT-123"],
  "MAT-251": ["MAT-123"],
  "MAT-142": ["MAT-123"],
  "SIS-112": ["SIS-111"],
  "SIS-133": ["MAT-122", "SIS-123"],

  "MAT-133": ["MAT-132"],
  "FIS-111": ["MAT-132"],
  "MAT-143": ["MAT-142"],
  "SIS-113": ["SIS-112"],
  "SIS-122": ["SIS-112"],

  "MAT-252": ["MAT-251"],
  "SIS-211": ["SIS-113"]
};

// === Progreso almacenado ===
let progreso = JSON.parse(localStorage.getItem("progreso")) || [];

// === Generar HTML dinámico ===
const contenedor = document.getElementById("malla");

mallaData.forEach(semestre => {
  const seccion = document.createElement("section");
  seccion.classList.add("semestre");

  const titulo = document.createElement("h2");
  titulo.textContent = semestre.titulo;

  const divMaterias = document.createElement("div");
  divMaterias.classList.add("materias");

  semestre.materias.forEach(materia => {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.dataset.codigo = materia.codigo;
    div.innerHTML = `${materia.nombre} <span>(${materia.codigo})</span>`;
    divMaterias.appendChild(div);
  });

  seccion.appendChild(titulo);
  seccion.appendChild(divMaterias);
  contenedor.appendChild(seccion);
});

// === Función para desbloquear materias ===
function actualizarBloqueos() {
  document.querySelectorAll(".materia").forEach(materia => {
    const codigo = materia.dataset.codigo;
    if (prerequisitos[codigo]) {
      const requisitos = prerequisitos[codigo];
      const completos = requisitos.every(req => progreso.includes(req));
      if (completos) materia.classList.remove("bloqueada");
      else materia.classList.add("bloqueada");
    }
  });
}

// === Lógica de clics ===
document.querySelectorAll(".materia").forEach(materia => {
  materia.addEventListener("click", () => {
    if (materia.classList.contains("bloqueada")) return;
    const codigo = materia.dataset.codigo;
    materia.classList.toggle("completada");

    if (materia.classList.contains("completada")) {
      progreso.push(codigo);
    } else {
      progreso = progreso.filter(c => c !== codigo);
    }

    localStorage.setItem("progreso", JSON.stringify(progreso));
    actualizarBloqueos();
  });
});

// === Marcar materias completadas ===
progreso.forEach(codigo => {
  const materia = document.querySelector(`.materia[data-codigo="${codigo}"]`);
  if (materia) materia.classList.add("completada");
});
actualizarBloqueos();

// === Botón de modo claro/oscuro ===
document.getElementById("modoToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});
