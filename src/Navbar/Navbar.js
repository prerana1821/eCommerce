import { NavLink } from "react-router-dom";
import { useCart } from "../Cart";
import Logo from "../images/preCodes.png";
import "./Navbar.css";

export const Navbar = () => {
  const { cartState } = useCart();

  const totalItems = () => {
    return cartState.cart.reduce((acc, value) => {
      return acc + value.quantity;
    }, 0);
  };

  return (
    <header className='header'>
      <NavLink to='/'>
        <div className='logo'>
          <img src={Logo} alt='Logo' />
          <p
            className='logo-txt'
            // onClick={() => {
            //   return changeRoute("products");
            // }}
          >
            preStore
          </p>
        </div>
      </NavLink>
      <div className='nav'>
        {/* <button
          style={route === "home" ? { color: "var(--dk-pink)" } : {}}
          className='btn-nav'
          onClick={() => changeRoute("home")}
        >
          Home
        </button> */}
        <NavLink
          end
          activeStyle={{
            color: "var(--dk-pink)",
          }}
          className='btn-nav'
          to='/'
        >
          Home
        </NavLink>
        {/* <button
          style={route === "products" ? { color: "var(--dk-pink)" } : {}}
          className='btn-nav'
          onClick={() => changeRoute("products")}
        >
          Products
        </button> */}
        <NavLink
          activeStyle={{
            color: "var(--dk-pink)",
          }}
          className='btn-nav'
          to='/products'
        >
          Products
        </NavLink>
      </div>
      <NavLink to='/wishlist'>
        <div
          // onClick={() => {
          //   return changeRoute("wishlist");
          // }}
          className='badge-av'
        >
          <div className='badge-icon primary bdg-top'>
            {cartState.wishList.length}
          </div>
          <div className='avatar av-primary'>
            <i className='fas fa-lg fa-heart'></i>
          </div>
        </div>
      </NavLink>
      <NavLink to='/cart'>
        <div
          // onClick={() => changeRoute("cart")}
          className='badge-av'
        >
          <div className='badge-icon pink bdg-top'>{totalItems()}</div>
          <div className='avatar av-pink'>
            <i className='fas fa-lg fa-shopping-cart'></i>
          </div>
        </div>
      </NavLink>
    </header>
  );
};
