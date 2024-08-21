export interface ProductDto {
  productId:    number;
  name:         string;
  description:  string;
  price:        number;
  createDate:   Date;
  updatedDate:  Date;
  deleted:      boolean;
  photo:        string;
  pathUrlImage: string;
}

export interface ListProductResponse {
  listProduct : ProductDto[];
}
