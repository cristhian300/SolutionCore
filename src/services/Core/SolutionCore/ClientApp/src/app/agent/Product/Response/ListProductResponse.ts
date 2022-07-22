export class ListProductResponse{
    listProduct: ListProductEntity[];

    /**
     *
     */
    constructor() {
      this.listProduct = []
      
    }
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
  }