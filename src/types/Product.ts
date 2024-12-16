export type Product = {
  id: string
  brand: string
  model: string
  socket: string 
  fanSize: number
  fanSpeed: number
  fanNoiseLevel: number
  numberOfFans: number
  price: number
}
export type ProductEdit = Omit<Product, "id">;

export type ProductResponse = {
  code: number;
  success: boolean;
  details: {
    offset: number;
    limit: number;
    totalRecords: number;
    totalPage: number;
    records: Product[]; 
  };
  timestamp: string;
}

export type UpdateProduct = Partial<ProductEdit>; 