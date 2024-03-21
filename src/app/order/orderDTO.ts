export interface OrderDTO {
    id: number;
    userId: number;
    delivered: boolean;
    products: OrderProductDTO[];
}

export interface OrderProductDTO {
    productId: number;
    count: number; 
}