
export class AddProductRequest {
  ProductId: number;
  files: File;
  Name: string;
  Description: string;
  Price: number;
}

export class EditProductRequest {
  ProductId: number;
  files: File;
  Name: string;
  Description: string;
  Price: number;
}



export class ListProductEntity {
  productId: number;
  name: string;
  description: string;
  price: number;
  createDate?: any;
  updatedDate?: any;
  deleted: boolean;
  photo: string;
  pathUrlImage: string
}
