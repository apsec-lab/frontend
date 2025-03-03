import {useProducts} from "./api.ts";
import {Link, useNavigate} from "react-router";
import './styles.css'

export function Products() {
    const {products, error, loading} = useProducts()

    const navigate = useNavigate();
    if (error?.message == '403') navigate('/login')
    if (loading) return <>Загрузка...</>
    return (
        <div className='page__container'>
            <div className='header'><Link className='logo' to='/'>Our site</Link></div>
            <div className='products__content'>{products.map(p => <div>{p.name}</div>)}</div>
        </div>
    )
}