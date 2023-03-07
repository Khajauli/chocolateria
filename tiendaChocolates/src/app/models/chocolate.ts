export class Chocolate{
    constructor(
        public _id: string,
        public codigo:string,
        public nombre: string,
        public precio: number,
        public estado:string, //estado
        public descripcion:string,
        public imagen: string,
        public puntuacion:number,
        public totales:number,
        public categoria:string,
    ){}
}
