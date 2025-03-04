import {useCreateProduct, useMe, useRemoveProduct} from "./api.ts";
import {useNavigate} from "react-router";
import {FormEvent, useEffect, useRef} from "react";
import './styles.css'
import {useProducts} from "../products/api.ts";

export function Layout() {
    const {me, loading, error} = useMe()
    const navigate = useNavigate()
    const {products} = useProducts()
    const {removeProduct} = useRemoveProduct()
    const {createProduct} = useCreateProduct()
    useEffect(() => {
        if (error?.message == '403' || (me && !me.isAdmin)) navigate('/login')
    }, [me, error])


    const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault()
        const productName = productNameRef.current?.value
        const productDescription = productDescriptionRef.current?.value
        const productPrice = productPriceRef.current?.value
        if (!productName || !productDescription || !productPrice) return;

        await createProduct({name: productName, description: productDescription, price: parseInt(productPrice) ?? 1});

        (e.target as HTMLFormElement)?.reset?.()
    }
    const productNameRef = useRef<HTMLInputElement>(null)
    const productDescriptionRef = useRef<HTMLTextAreaElement>(null)
    const productPriceRef = useRef<HTMLInputElement>(null)
    if (loading || !me) return <></>
    return (
        <div className='admin__container'>
            <form onSubmit={handleSubmit} className='form__admin'>
                <h3>Добавить продукт</h3>
                <input className='form__input' ref={productNameRef} placeholder='Название'/>
                <textarea className='form__textarea' ref={productDescriptionRef} placeholder='Описание'/>
                <input className='form__input' type='number' ref={productPriceRef} placeholder='Цена'/>
                <button type='submit' className='form__submit'>Добавить</button>
            </form>
            <div className='admin__products'>{products.map(product => (
                <div className='admin__product' key={product.id}>
                    <div className='admin__product_name'>{product.name}</div>
                    <button onClick={() => removeProduct(product.id)}>Удалить</button>
                </div>
            ))
            }</div>
        </div>
    )
}