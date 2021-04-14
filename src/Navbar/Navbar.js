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
          <p className='logo-txt'>preStore</p>
        </div>
      </NavLink>
      <div className='nav'>
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
        <div className='badge-av'>
          <div className='badge-icon primary bdg-top'>
            {cartState.wishList.length}
          </div>
          <div className='avatar av-primary'>
            <i className='fas fa-lg fa-heart'></i>
          </div>
        </div>
      </NavLink>
      <NavLink to='/cart'>
        <div className='badge-av'>
          <div className='badge-icon pink bdg-top'>{totalItems()}</div>
          <div className='avatar av-pink'>
            <i className='fas fa-lg fa-shopping-cart'></i>
          </div>
        </div>
      </NavLink>
      <NavLink to='/login'>
        <div className='badge-av'>
          <div className='avatar av-pink'>
            <i className='fas fa-lg fa-user'></i>
          </div>
        </div>
      </NavLink>
    </header>
  );
};
