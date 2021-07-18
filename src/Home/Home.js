import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../Products";
import "./Home.css";

export const Home = () => {
  const [img, setImg] = useState("img1");
  const { dispatch } = useData();

  return (
    <div className='home'>
      <div className='banner'>
        {img === "img1" && (
          <div className='sliding-img img1'>
            <h2 className='slogan'>
              preStore helps Swimmers and Triathletes swim better and achieve
              their goals.
            </h2>
            <Link to='/products'>
              <button className='btn-main btn'>Shop Now</button>
            </Link>
          </div>
        )}
        {img === "img2" && <div className='sliding-img img2'></div>}
        <button
          style={
            img === "img1"
              ? { backgroundColor: "#f50057" }
              : { backgroundColor: "#fbcfe8" }
          }
          className='btn-img'
          onClick={() => setImg("img1")}
        ></button>
        <button
          style={
            img === "img2"
              ? { backgroundColor: "#f50057" }
              : { backgroundColor: "#fbcfe8" }
          }
          className='btn-img'
          onClick={() => setImg("img2")}
        ></button>
      </div>

      <h2 className='center-txt'>Categories</h2>
      <div className='categories'>
        <Link to='/products'>
          <div
            onClick={() => {
              return dispatch({
                type: "CATEGORY",
                payload: "Men's Swim Shorts",
              });
            }}
            className='card-category cat-img1'
          >
            <h3>Men's Swim Shorts</h3>
          </div>
        </Link>
        <Link to='/products'>
          <div
            onClick={() => {
              return dispatch({
                type: "CATEGORY",
                payload: "Floatation Devices",
              });
            }}
            className='card-category cat-img2'
          >
            <h3>Swimming Floatation Devices</h3>
          </div>
        </Link>
        <Link to='/products'>
          <div
            onClick={() => {
              return dispatch({
                type: "CATEGORY",
                payload: "Training Kickboards",
              });
            }}
            className='card-category cat-img3'
          >
            <h3>Swimming Training Kickboards</h3>
          </div>
        </Link>
        <Link to='/products'>
          <div
            onClick={() => {
              return dispatch({ type: "CATEGORY", payload: "Kiddie Pools" });
            }}
            className='card-category cat-img4'
          >
            <h3>Kiddie Pools</h3>
          </div>
        </Link>
        <Link to='/products'>
          <div
            onClick={() => {
              return dispatch({ type: "CATEGORY", payload: "Swimming Kits" });
            }}
            className='card-category cat-img5'
          >
            <h3>Swimming Kits</h3>
          </div>
        </Link>
      </div>

      <footer className='main-footer'>
        <p>
          © | 2021 | <span className='pink-txt'>preStore</span>
        </p>
        <p className='pink-txt'>preStore by preCodes</p>

        <ul className='footer-list'>
          <li>
            <a className='links' href='mailto: prerananw1@gmail.com'>
              <i className='far fa-2x fa-envelope'></i>
            </a>
          </li>

          <li>
            <a className='links' href='https://github.com/prerana1821'>
              <i className='fab fa-2x fa-github'></i>
            </a>
          </li>

          <li>
            <a className='links' href='https://twitter.com/precodes18'>
              <i className='fab fa-2x fa-twitter'></i>
            </a>
          </li>
          <li>
            <a
              className='links'
              href='https://www.linkedin.com/in/prerana-nawar/'
            >
              <i className='fab fa-2x fa-linkedin-in'></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
