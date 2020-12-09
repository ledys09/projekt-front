export class Producto {

    constructor(
        public nombreProducto:string,
        public precio:number,
        public descripcion:string,
        public categoria?:string,
        public usuario?:string,
        public fotoProducto?: string,
        public _id?:  string 
    ) {
  
    }
  }
  