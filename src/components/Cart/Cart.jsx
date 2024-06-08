import React, { useContext } from "react";
import './Cart.css';
import CartItens from "../CartItens/CartItens";
import AppContext from "../../context/AppContext";
import formatCurrency from "../../utils/formatCurrency";

function Cart() {
    const { cartItens, isCartVisible } = useContext(AppContext);

    const totalPrice = cartItens.reduce((acc, item) => item.price + acc, 0);

    const handleCheckout = () => {
        // Adiciona um atraso de 3 segundos antes de redirecionar
        setTimeout(() => {
            window.location.href = "https://www.mercadolivre.com/jms/mlb/lgz/msl/login/H4sIAAAAAAAEAzWNQQ7DIAwE_-JzlNw59iPICYagmoDAKa2q_L2mao87nl2_gXOIh5VXITDgyOPJAhMURvG5Jhud8lQUtSj0i7wOBSsmEqoNzHvsBHI30tJY8siNVMJTdus5d2XfV8pis_TU3oFsO62PSOP6b4SsYRcpzSxL731OVDd0uWDI85bTvFa4JtWbWKm43cFIPen6AN5uNinLAAAA/user";
        }, 500); // 3000 milissegundos = 3 segundos
    };

    return(
        <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
            <div className="cart-itens">
                {cartItens.map((cartItem) => <CartItens key={cartItem.id} data={cartItem}/> )}
            </div>
            <div className="cart-resume">{formatCurrency(totalPrice, 'BRL')}</div>
            <button className="checkout-button" onClick={handleCheckout}>Finalizar Pagamento</button>
        </section>
    );
}

export default Cart;


