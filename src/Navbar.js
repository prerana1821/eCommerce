import { useCart } from "./CartProvider";
import Logo from "./preCodes.png";

export const Navbar = ({ changeRoute }) => {
  const { cartState } = useCart();

  const totalItems = () => {
    return cartState.cart.reduce((acc, value) => {
      return acc + value.quantity;
    }, 0);
  };

  return (
    <header className='header'>
      <div className='logo'>
        <img src={Logo} alt='Logo' />
        <p
          className='logo-txt'
          onClick={() => {
            return changeRoute("products");
          }}
        >
          eCom
        </p>
      </div>
      <div
        onClick={() => {
          return changeRoute("wishlist");
        }}
        className='badge-av'
      >
        <div className='badge-icon pink bdg-top'>
          {cartState.wishList.length}
        </div>
        <div className='avatar av-pink'>
          <i className='fas fa-lg fa-heart'></i>
        </div>
      </div>
      <div onClick={() => changeRoute("cart")} className='badge-av'>
        <div className='badge-icon yellow bdg-top'>{totalItems()}</div>
        <div className='avatar av-yellow'>
          <i className='fas fa-lg fa-shopping-cart'></i>
        </div>
      </div>
    </header>
  );
};
