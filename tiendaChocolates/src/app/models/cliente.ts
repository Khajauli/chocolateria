export class Cliente{
    constructor(
        public _id:string,
        public cedula:string,
        public nombre:string,
        public notifi:boolean,
        public usuario:string,
        public contrasenia:string,
        public correo:string,
    ){}
}
