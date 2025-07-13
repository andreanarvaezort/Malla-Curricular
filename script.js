// Lista de prerequisitos
const prerequisitos = {
  "MAT-132": ["MAT-123"], // Cálculo I requiere Álgebra Lineal
  "MAT-251": ["MAT-123"], // Investigación Operativa I requiere Álgebra Lineal
  "MAT-142": ["MAT-123"], // Probabilidad y Estadística I requiere Álgebra Lineal
  "SIS-112": ["SIS-111"], // Programación I requiere Intro a la Programación
  "SIS-133": ["MAT-122","SIS-123"], // etc.
  "FHC-102": [] // sin prerequisitos
  // Y así sigues para demás materias
};

// Cargar progreso guardado
let progreso = JSON.parse(localStorage.getItem('progreso')) || [];

// Marcar materias completadas desde progreso
progreso.forEach(codigo => {
  const materia = document.querySelector(`.materia[data-codigo="${codigo}"]`);
  if(materia) materia.classList.add('completada');
});

// Desbloquear materias si se cumplen los prerequisitos
function actualizarBloqueos() {
  document.querySelectorAll('.materia').forEach(materia => {
    const codigo = materia.dataset.codigo;
    if (prerequisitos[codigo]) {
      const requisitos = prerequisitos[codigo];
      const completos = requisitos.every(req => progreso.includes(req));
      if (completos) materia.classList.remove('bloqueada');
      else materia.classList.add('bloqueada');
    }
  });
}
actualizarBloqueos();

// Al hacer clic
document.querySelectorAll('.materia').forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('bloqueada')) return;
    const codigo = materia.dataset.codigo;
    materia.classList.toggle('completada');
    if (materia.classList.contains('completada')) {
      progreso.push(codigo);
    } else {
      progreso = progreso.filter(c => c !== codigo);
    }
    localStorage.setItem('progreso', JSON.stringify(progreso));
    actualizarBloqueos();
  });
});
