-- Creación de la tabla Persona
CREATE TABLE Persona (
    id_persona SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    primer_nombre VARCHAR(50),
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50),
    segundo_apellido VARCHAR(50),
    genero VARCHAR(10),
    fecha_nacimiento DATE,
    ciudad_nacimiento VARCHAR(100),
    mes_nacimiento INT,
    edad INT,
    rango_edad VARCHAR(50),
    estado_civil VARCHAR(20),
    numero_hijos INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creación de la tabla Documento
CREATE TABLE Documento (
    id_documento SERIAL PRIMARY KEY,
    tipo_documento VARCHAR(20),
    fecha_expedicion DATE,
    ciudad_expedicion VARCHAR(100),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Residencia
CREATE TABLE Residencia (
    id_residencia SERIAL PRIMARY KEY,
    ciudad_residencia VARCHAR(100),
    direccion VARCHAR(200),
    barrio VARCHAR(100),
    telefono_casa VARCHAR(20),
    celular VARCHAR(20),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Educacion
CREATE TABLE Educacion (
    id_educacion SERIAL PRIMARY KEY,
    nivel_educativo VARCHAR(50),
    nombre_titulo VARCHAR(100),           -- Título obtenido
    institucion VARCHAR(100),             -- Nombre de la universidad o centro
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Salud
CREATE TABLE Salud (
    id_salud SERIAL PRIMARY KEY,
    rh VARCHAR(5),
    preexistencias_medicas TEXT,
    alergias TEXT,
    medicamentos TEXT,
    observaciones_medicas TEXT,
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Laboral
CREATE TABLE Laboral (
    id_laboral SERIAL PRIMARY KEY,
    cargo VARCHAR(100),
    foco VARCHAR(100),
    campaña VARCHAR(100),
    supervisor VARCHAR(100),
    fecha_ingreso DATE,
    fecha_retiro DATE,
    motivo_retiro VARCHAR(100),
    observacion_retiro TEXT,
    sede_trabajo VARCHAR(100),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Contrato
CREATE TABLE Contrato (
    id_contrato SERIAL PRIMARY KEY,
    tipo_contrato VARCHAR(50),
    modalidad VARCHAR(50),
    tipo_modalidad VARCHAR(50),
    fecha_novedad DATE,
    novedad TEXT,
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla SistemaUsuario
CREATE TABLE SistemaUsuario (
    id_sistema SERIAL PRIMARY KEY,
    id_walter_bridge VARCHAR(50),
    id_torniquete VARCHAR(50),
    correo_mentius VARCHAR(100),
    pure_cloud VARCHAR(100),
    usuario_sap VARCHAR(100),
    usuario_c4c VARCHAR(100),
    rtrweb VARCHAR(100),
    s4hanna VARCHAR(100),
    usuario_crm VARCHAR(100),
    codigo_vendedor VARCHAR(50),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla Beneficios
CREATE TABLE Beneficios (
    id_beneficios SERIAL PRIMARY KEY,
    fondo_cesantias VARCHAR(100),
    fondo_pensiones VARCHAR(100),
    eps VARCHAR(100),
    caja_compensacion VARCHAR(100),
    ips VARCHAR(100),
    arl VARCHAR(100),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla ContactoEmergencia
CREATE TABLE ContactoEmergencia (
    id_contacto SERIAL PRIMARY KEY,
    nombre_contacto VARCHAR(100),
    direccion_contacto VARCHAR(200),
    parentesco VARCHAR(50),
    telefono_fijo VARCHAR(20),
    numero_celular VARCHAR(20),
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);

-- Creación de la tabla TiemposLaborales
CREATE TABLE TiemposLaborales (
    id_tiempos SERIAL PRIMARY KEY,
    antiguedad INT,
    dias_trabajados_nuevos INT,
    dias_laborados INT,
    meses_trabajados INT,
    años_trabajados INT,
    dias_laborados_mes INT,
    cedula VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES Persona(cedula)
);
