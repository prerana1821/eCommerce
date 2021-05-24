import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth";
import { useUser } from "../User";
import { useState } from "react";
import Logo from "../images/preCodes.png";
import "./Navbar.css";
import { findUserById } from "../utils";

export const Navbar = () => {
  const { user, login } = useAuth();
  const { userState } = useUser();
  const [toggle, setToggle] = useState(true);
  // const currentUser = findUserById(userState, user._id);

  const totalItems = () => {
    return userState?.cart.reduce((acc, value) => {
      return acc + value.quantity;
    }, 0);
  };

  return (
    <header className='header'>
      <nav className='navbar'>
        <NavLink to='/'>
          <div className='logo'>
            <img src={Logo} alt='Logo' />
            <p className='logo-txt'>preStore</p>
          </div>
        </NavLink>
        <ul className={toggle ? "nav-menu" : "nav-menu active"}>
          <div className='nav'>
            <li className='nav-item nav-link'>
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
            </li>
            <li className='nav-item nav-link'>
              <NavLink
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                className='btn-nav'
                to='/products'
              >
                Products
              </NavLink>
            </li>
          </div>
          <li className='nav-item'>
            <NavLink to='/wishlist' className='nav-link'>
              <div className='badge-av'>
                {login && (
                  <div className='badge-icon primary bdg-top'>
                    {userState?.wishList.length}
                  </div>
                )}
                <div className='avatar av-primary'>
                  <i className='fas fa-lg fa-heart'></i>
                </div>
              </div>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/cart' className='nav-link'>
              <div className='badge-av'>
                {login && (
                  <div className='badge-icon pink bdg-top'>{totalItems()}</div>
                )}
                <div className='avatar av-pink'>
                  <i className='fas fa-lg fa-shopping-cart'></i>
                </div>
              </div>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to={login ? "/account" : "/login"} className='nav-link'>
              <div className='badge-av'>
                <div className='avatar av-pink'>
                  <i className='fas fa-lg fa-user'></i>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
        <div
          onClick={() => setToggle(!toggle)}
          className={toggle ? "hamburger" : "hamburger active"}
        >
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </nav>
    </header>
  );
};
