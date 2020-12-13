export class Plan {

    constructor(
        public nombrePlan: string,
        public precio: number,
        public paginas:number,
        public imagenes:number,
        public videos:number,
        public documentos:number,
        public _id?:string,
    ) {
  
    }
  }