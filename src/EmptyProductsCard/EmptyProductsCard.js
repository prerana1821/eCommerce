import { Link } from "react-router-dom";
import "./EmptyProductsCard.css";

export const EmptyProductsCard = ({ title, body }) => {
  return (
    <div className='card cart-empty-card'>
      <h3>{title}</h3>
      <hr className='hr' />
      <p className='mg-1'>{body}</p>
      <Link to='/products'>
        <button className='btn primary btn-shop'>Shop Now</button>
      </Link>
    </div>
  );
};
