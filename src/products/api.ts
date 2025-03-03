import {useQuery} from "@tanstack/react-query";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
}

export async function products(): Promise<Product[]> {
    const response = await fetch('http://localhost:8000/products/get', {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    console.log(response)
    if (response.status === 403) throw new Error('403')
    return await response.json()
}

export function useProducts() {
    const {data = [], error, isLoading} = useQuery({
        queryFn: products,
        queryKey: ['products']
    })

    return {
        products: data,
        error: error,
        loading: isLoading
    }
}