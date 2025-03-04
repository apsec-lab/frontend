import {useMutation, useQuery} from "@tanstack/react-query";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
}

export async function products(search?: string): Promise<Product[]> {
    const response = await fetch(`${import.meta.env.VITE_API}/products/get?search=${search ?? ''}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    if (response.status === 403) throw new Error('403')
    return await response.json()
}

export function useProducts(search?: string) {
    const {data = [], error, isLoading} = useQuery({
        queryFn: () => products(search),
        queryKey: ['products', search]
    })

    return {
        products: data,
        error: error,
        loading: isLoading
    }
}

export async function logout() {
    await fetch(`${import.meta.env.VITE_API}/users/logout`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
}

export function useLogout() {
    const {mutateAsync} = useMutation({
        mutationFn: logout,
    })

    return {
        logout: mutateAsync,
    }
}