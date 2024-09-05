import { ListUsuarioResult } from "src/app/main/providers/services/Usuarios/usuarios.interfaces";



export class SecurityViewModel{

    listUsuarios: ListUsuarioResult[];

    /**
     *
     */
    constructor() {
        this.listUsuarios =[]


    }
}
