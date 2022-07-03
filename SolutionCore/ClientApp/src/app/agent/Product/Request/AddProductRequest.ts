export class AddProductRequest{
  files: File;
  Name: string;
  Description: string;
  Price: number;
}

export class EditProductRequest{
  ProductId: number;
  files: File;
  Name: string;
  Description: string;
  Price: number;
}
