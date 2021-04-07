import { useData } from "../Products";
import { useState } from "react";
import "./Filters.css";
export const Filters = () => {
  const {
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly,
    priceRange,
    dispatch,
    level,
    ratings,
    // searchString,
  } = useData();

  const [search, setSearch] = useState("");

  return (
    <div className='filters'>
      <h3>Search</h3>
      <div className='input'>
        <input
          type='text'
          onChange={(e) => {
            return setSearch(e.target.value);
            // return dispatch({ type: "SEARCH", payload: e.target.value });
          }}
          value={search}
          className='input-txt'
          required
        />
        <span className='flt-label'>Search Product</span>
        <button
          onClick={() => dispatch({ type: "SEARCH", payload: search })}
          className='btn-search'
        >
          <i className='fas fa-search'></i>
        </button>
      </div>
      <h3>Filters</h3>
      <div className='filter'>
        Price:
        <div>
          <label>
            <input
              type='radio'
              name='sort'
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            />
            Sort from Low to High
          </label>
        </div>
        <div>
          <label>
            <input
              type='radio'
              name='sort'
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            />
            Sort from High to Low
          </label>
        </div>
      </div>

      <div className='filter'>
        <div>
          <label>
            <input
              type='checkbox'
              checked={showInventoryAll}
              onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
            />
            Exclude Out of Stock
          </label>
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              checked={showFastDeliveryOnly}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            Fast Delivery Only
          </label>
        </div>
      </div>
      <div className='filter'>
        <select
          className='select-level'
          value={level}
          onChange={(e) =>
            dispatch({ type: "SELECT_LEVEL", payload: e.target.value })
          }
        >
          <option value='Beginner'>Beginner</option>
          <option value='Amateur'>Amateur</option>
          <option value='Intermediate'>Intermediate</option>
          <option value='Advanced'>Advanced</option>
          <option value='professional'>professional</option>
        </select>
      </div>
      <div className='filter'>
        <label>Price Range: 0 to {priceRange}</label>
        <input
          type='range'
          min='0'
          step='100'
          max='1000'
          value={priceRange}
          onChange={(e) =>
            dispatch({ type: "PRICE_RANGE", payload: Number(e.target.value) })
          }
        />
      </div>
      <div className='filter'>
        <label>Star Ratings: 0 to {ratings}</label>
        <input
          type='range'
          min='1'
          max='5'
          value={ratings}
          onChange={(e) =>
            dispatch({
              type: "RATINGS",
              payload: Number(e.target.value),
            })
          }
        />
      </div>
      <button
        className='btn primary btn-clr'
        onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
      >
        Cleat Filters
      </button>
    </div>
  );
};
