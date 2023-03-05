export class Comentario{
    constructor(
        public _id:string,
        public codigo:string,
        public producto:string,
        public usuario:boolean,
        public texto:String,
        public aprobado:string,
    ){}
}
