const removeUndefinedKeys =  (obj) => {
  try {
    // Itera sobre todas las claves del objeto
    Object.keys(obj).forEach((key) => {
      // Si el valor de la clave es undefined, una cadena vacía o un array vacío, elimina la clave del objeto
      if (obj[key] === undefined || obj[key] === "" || (Array.isArray(obj[key]) && obj[key].length === 0)) {
        //delete obj[key]; esto estaba antes y funciona, vamos a probar esto de abajo 
        //obj[key] = null;
        delete obj[key]
      }
    });
    return obj;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { removeUndefinedKeys };
