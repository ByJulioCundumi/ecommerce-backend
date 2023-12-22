export interface IProduct {
    id?: number,
    img: {
        public_id: string,
        url: string,
        path: string
    },
    name: string,
    stars: number,
    prevPrice: number,
    currentPrice: number,
    category: string,
    stock: boolean
}
