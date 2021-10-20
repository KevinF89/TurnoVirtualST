export interface DropdownListClass {
  
    Respuesta :string,

    Descripcion:string,

    Error:string,

    ListaDocs:ListaDocs[]
}
export class ListaDocs {

    IdTipodoc:number;
    Descripcion: string;
    NTipodoc:string;
}
