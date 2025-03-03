import './styles.css'
import {FormEvent, useRef} from "react";
import {useRegister} from "./api.ts";
import {useNavigate} from "react-router";

export function Register() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (!username || !password) return

        const result = await register({username, password})
        if (result.ok)
            navigate('/')
        else alert(`${result.status}, ${result.statusText}`)
    }
    const {register} = useRegister()

    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className='authContainer'>
            <form onSubmit={handleSubmit} className='form'>
                <h4>Регистрация</h4>
                <input ref={usernameRef} placeholder='username' className='form__input'/>
                <input ref={passwordRef} type='password' placeholder='password' className='form__input'/>
                <button type='submit' className='form__submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}