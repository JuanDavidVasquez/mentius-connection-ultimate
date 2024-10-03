interface Asistencia {
    ingresoGestor: string;
    ingresoTorniquete: string;
    desconexionGestor: string;
    ingresoBiometrico: string;
    novedad: string;
    horaIngreso: string;
    horasBiometrico: number;
  }
  
  // Función para verificar si hay malas prácticas en conexiones
  export const verificarMalasPracticasConexiones = (asistencia: Asistencia): string | null => {
    if (asistencia.ingresoGestor === "si" && asistencia.ingresoTorniquete === "no") {
      return "Malas prácticas en conexiones";
    }
    return null;
  };
  
  // Función para verificar si no se finaliza el turno
  export const verificarNoFinalizaTurno = (asistencia: Asistencia): string | null => {
    if (asistencia.desconexionGestor === "no") {
      return "No finaliza turno";
    }
    return null;
  };
  
  // Función para verificar si la novedad queda como injustificada
  export const verificarPosibleAsiste = (asistencia: Asistencia): string | null => {
    if (asistencia.novedad === "injustificada" && asistencia.ingresoGestor === "si") {
      return "Posible asiste";
    }
    return null;
  };
  
  // Función para verificar si no hay conexión en el gestor
  export const verificarSinConexionGestor = (asistencia: Asistencia): string | null => {
    if (asistencia.ingresoGestor === "no") {
      return "Sin conexión en gestor";
    }
    return null;
  };
  
  // Función para verificar si el colaborador no cumple con la jornada biométrica (menos de 4 horas)
  export const verificarNoCumplimientoJornada = (asistencia: Asistencia): string | null => {
    if (asistencia.horasBiometrico < 4) {
      return "No cumplimiento de jornada";
    }
    return null;
  };
  
  // Función para verificar si el colaborador no cumple con la hora de ingreso programada
  export const verificarIncumplimientoMalla = (asistencia: Asistencia, horaIngresoProgramada: string): string | null => {
    if (asistencia.horaIngreso !== horaIngresoProgramada) {
      return "Incumplimiento en malla";
    }
    return null;
  };
  
  // Función para ejecutar todas las verificaciones y generar un array de alertas
  export const generarAlertas = (asistencia: Asistencia, horaIngresoProgramada: string): string[] => {
    const alertas: string[] = [];
  
    const alertaMalasPracticas = verificarMalasPracticasConexiones(asistencia);
    if (alertaMalasPracticas) alertas.push(alertaMalasPracticas);
  
    const alertaNoFinalizaTurno = verificarNoFinalizaTurno(asistencia);
    if (alertaNoFinalizaTurno) alertas.push(alertaNoFinalizaTurno);
  
    const alertaPosibleAsiste = verificarPosibleAsiste(asistencia);
    if (alertaPosibleAsiste) alertas.push(alertaPosibleAsiste);
  
    const alertaSinConexionGestor = verificarSinConexionGestor(asistencia);
    if (alertaSinConexionGestor) alertas.push(alertaSinConexionGestor);
  
    const alertaNoCumplimientoJornada = verificarNoCumplimientoJornada(asistencia);
    if (alertaNoCumplimientoJornada) alertas.push(alertaNoCumplimientoJornada);
  
    const alertaIncumplimientoMalla = verificarIncumplimientoMalla(asistencia, horaIngresoProgramada);
    if (alertaIncumplimientoMalla) alertas.push(alertaIncumplimientoMalla);
  
    return alertas;
  };
  