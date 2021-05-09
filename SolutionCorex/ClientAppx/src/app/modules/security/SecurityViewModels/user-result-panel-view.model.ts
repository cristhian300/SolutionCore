export class UserResultPanelViewModel{

Title:string
Header :string[]   =[]
row :string[]=[]

/**
 *
 */
constructor(title:string,header:string[] , row:string[] ) {
     
    this.Title=title
  this.Header=header
  this.row=row
}
 
}