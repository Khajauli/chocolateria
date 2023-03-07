export class Comentario{
    constructor(
        public _id:string,
        public codigo:string,
        public producto:string,
        public usuario:string,
        public texto:string,
        public aprobado:boolean,
    ){}
}
