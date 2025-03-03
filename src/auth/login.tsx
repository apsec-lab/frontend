import './styles.css'
import {FormEvent, useRef} from "react";
import {useLogin} from "./api.ts";
import {useNavigate} from "react-router";

export function Login() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (!username || !password) return

        const result = await login({username, password})
        if (result.ok)
            navigate('/')
        else alert(`${result.status}, ${result.statusText}`)
    }
    const {login} = useLogin()

    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className='authContainer'>
            <form onSubmit={handleSubmit} className='form'>
                <h4>Вход</h4>
                <input ref={usernameRef} placeholder='username' className='form__input'/>
                <input ref={passwordRef} type='password' placeholder='password' className='form__input'/>
                <button type='submit' className='form__submit'>Войти</button>
            </form>
        </div>
    )
}