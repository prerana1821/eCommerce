import { useState } from "react";

export const Home = () => {
  const [img, setImg] = useState("img1");
  return (
    <>
      <div className='banner'>
        {img === "img1" && (
          <div className='sliding-img img1'>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <button className='btn-main btn'>Shop Now</button>
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

      <div style={{ height: "500px" }}>
        <h2>Categories</h2>

        <div className='card-category cat-img1'>
          <h4>Men's Swim Shorts</h4>
        </div>
        <div className='card-category cat-img2'>
          <h4>Swimming Floatation Devices</h4>
        </div>
        <div className='card-category cat-img3'>
          <h4>Swimming Training Kickboards</h4>
        </div>
        <div className='card-category cat-img4'>
          <h4>Kiddie Pools</h4>
        </div>
        <div className='card-category cat-img5'>
          <h4>Swimming Kits</h4>
        </div>
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
    </>
  );
};
