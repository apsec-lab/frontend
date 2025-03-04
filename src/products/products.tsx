import {useLogout, useProducts} from "./api.ts";
import {Link, useNavigate, useSearchParams} from "react-router";
import './styles.css'
import {useEffect, useState} from "react";
import {useMe} from "../admin/api.ts";

export function Products() {
    const {me} = useMe()
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') ?? '')
    const {products, error} = useProducts(search)
    const {logout} = useLogout()
    useEffect(() => {
        setSearchParams(new URLSearchParams({search}))
    }, [search])

    const navigate = useNavigate();
    if (error?.message == '403') navigate('/login')
    return (
        <div className='page__container'>
            <div className='header'>
                <Link className='logo' to='/'>Our site</Link>
                <div className='header__user'>
                    <div>Вы вошли: {me?.username}</div>
                    <button onClick={() => {
                        logout().then(() => navigate('/login'))
                    }}>Выйти</button>
                </div>
            </div>
            <div className='page__content'>
                <div className='search'><input placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)}/></div>
                {search && <div>Ваш поиск: <span dangerouslySetInnerHTML={{__html: search}}></span></div>}
                {products && <div className='products__content'>{products.map(p =>
                    <div key={p.id} className='product__container'>
                        <h4>{p.name}</h4>
                        <div>{p.description}</div>
                        <div>{p.price}₽</div>
                    </div>)}</div>}
            </div>
        </div>
    )
}