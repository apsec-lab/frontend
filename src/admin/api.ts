import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product} from "../products/api.ts";

type User = {
    id: number;
    username: string;
    isAdmin: boolean
}

export async function me(): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API}/users/me`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    if (response.status === 403) throw new Error('403')
    return await response.json()
}

export function useMe() {
    const {data , error, isLoading} = useQuery({
        queryFn: me,
        queryKey: ['me']
    })

    return {
        me: data,
        error: error,
        loading: isLoading
    }
}

export async function removeProduct(productId: number) {
    return fetch(`${import.meta.env.VITE_API}/products/delete/${productId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function useRemoveProduct() {
    const client = useQueryClient()
    const {mutateAsync, error} = useMutation({
        onSuccess: () => client.invalidateQueries({queryKey: ['products']}),
        mutationFn: removeProduct
    })

    return {
        removeProduct: mutateAsync,
        error: error
    }
}

export async function createProduct(product: Omit<Product, 'id'>) {
    return fetch(`${import.meta.env.VITE_API}/products/create`, {
        method: 'post',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function useCreateProduct() {
    const client = useQueryClient()
    const {mutateAsync, error} = useMutation({
        mutationFn: createProduct,
        onSuccess: () => client.invalidateQueries({queryKey: ['products']})
    })

    return {
        createProduct: mutateAsync,
        error: error
    }
}