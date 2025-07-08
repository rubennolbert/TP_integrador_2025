// Convierte una url de archivo en una ruta de sistema de archivos

import { fileURLToPath } from "url";

// Dirname devuelve el directorio padre de una ruta
// Join une dos partes de rutas

import {dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
// import.meta.url: Proporciona la URL absoluta del modulo actual


const __dirname = join(dirname(__filename), "../../../");

export {
    __dirname,
    join
}
