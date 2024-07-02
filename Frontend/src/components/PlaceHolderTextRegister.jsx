export function placeHolderText(field) {
    switch (field) {
      case "name":
        return "Nombre";
      case "surname":
        return "Apellido";
      case "company":
        return "Empresa";
      case "email":
        return "Email";
      case "password":
        return "Contraseña";
      case "confirmPassword":
        return "Confirme la contraseña";
      default:
        return "Campo no indicado";
    }
  }