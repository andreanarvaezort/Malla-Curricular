// Lista de prerequisitos
const prerequisitos = {
  //Segundo Semestre
  "MAT-132": ["MAT-123"],
  "MAT-251": ["MAT-123"], 
  "MAT-142": ["MAT-123"], 
  "SIS-112": ["SIS-111"], 
  "SIS-133": ["MAT-122", "SIS-123"], 
  "FHC-102": []

  //Tercer Semestre
  "MAT-133": ["MAT-132"],
  "FIS-111": ["MAT-132"],
  "MAT-143": ["MAT-142"],
  "SIS-113": ["SIS-112"],
  "SIS_122": ["SIS-112"],
  "IND-260": [],
  "FIL-207": []

  //Cuarto Semestre
  "MAT-252": ["MAT-251"],
  "SIS-211": ["SIS-113"]
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
