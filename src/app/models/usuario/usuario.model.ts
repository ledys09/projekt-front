export class Usuario {

  constructor(
      public nombre: string,
      public correo: string,
      public contrasena: string,
      public telefono?: string,
      public direccion?: string,
      public nombreEmpresa?: string,
      public plan?: string,
      public foto?: string,
      public role?: string
  ) {

  }
}
