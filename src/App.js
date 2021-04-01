import "./App.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart } from "./Cart";
import { Filters } from "./Filters";
import { Home } from "./Home";

function App() {
  const [route, setRoute] = useState("home");

  const changeRoute = (routeName) => {
    if (routeName === "cart") {
      setRoute("cart");
    }
    if (routeName === "wishlist") {
      setRoute("wishlist");
    }
    if (routeName === "products") {
      setRoute("products");
    }
    if (routeName === "home") {
      setRoute("home");
    }
  };

  return (
    <div className='App'>
      <Navbar changeRoute={changeRoute} route={route} />
      {route === "home" && <Home />}
      <div className='main'>
        {route === "products" && <Filters />}
        {route === "products" && <Products setRoute={setRoute} />}
        {route === "cart" && <Cart />}
        {route === "wishlist" && <WishList />}
      </div>
    </div>
  );
}

export default App;
