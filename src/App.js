import "./App.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart } from "./Cart";
import { Filters } from "./Filters";

function App() {
  const [route, setRoute] = useState("products");

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
  };

  return (
    <div className='App'>
      <Navbar changeRoute={changeRoute} />
      <div className='main'>
        <Filters />
        {route === "products" && <Products setRoute={setRoute} />}
        {route === "cart" && <Cart />}
        {route === "wishlist" && <WishList />}
      </div>
    </div>
  );
}

export default App;
