import { ListUsuarioEntity } from "../../../agent/User/response/ListUsuarioResponse";

export class SecurityViewModel{

    listUsuarios: ListUsuarioEntity[];

    /**
     *
     */
    constructor() {
        this.listUsuarios =[]
        

    }
}