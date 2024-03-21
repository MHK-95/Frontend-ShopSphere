export interface CartDTO {
    id: number;
    userid: number;
    products: CartProductDTO[];
}

export interface CartProductDTO {
    productId: number;
    count: number; 
}