export interface addMenuStateRequest {
    menuitemname: string,
      menuitemnameerror: string,
      menuitemcontoller:string,
      menuitemview:string,
      sortorder:string,
      sortordererror?: string,
      parentid:number,
      isActive:boolean,
      updateTrue:boolean,
      menuid:string,
      menudata:any,
      menuicon:string,
      menuiconerror:string
}