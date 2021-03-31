import { useCart } from "./CartProvider";

export const Navbar = ({ changeRoute }) => {
  const { cartState } = useCart();

  const totalItems = () => {
    return cartState.reduce((acc, value) => {
      return acc + value.quantity;
    }, 0);
  };

  const totalWishes = () => {
    return cartState.reduce((acc, value) => {
      console.log(Number(value.wishlist));
      return acc + Number(value.wishlist);
    }, 0);
  };

  return (
    <header className='header'>
      <h1
        onClick={() => {
          return changeRoute("products");
        }}
      >
        eCommerce
      </h1>
      <div
        onClick={() => {
          return changeRoute("wishlist");
        }}
        className='badge-av'
      >
        <div className='badge-icon pink bdg-top'>{totalWishes()}</div>
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
