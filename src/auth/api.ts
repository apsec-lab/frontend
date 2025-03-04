import {useMutation} from "@tanstack/react-query";

type UserPayload = {
    username: string
    password: string
}

export async function register(data: UserPayload) {
    return fetch(`${import.meta.env.VITE_API}/users/create`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function useRegister() {
    const {mutateAsync, error} = useMutation({mutationFn: register})

    return {
        register: mutateAsync,
        error: error
    }
}

export async function login(data: UserPayload) {
    return fetch(`${import.meta.env.VITE_API}/users/auth`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function useLogin() {
    const {mutateAsync, error} = useMutation({mutationFn: login})

    return {
        login: mutateAsync,
        error: error
    }
}