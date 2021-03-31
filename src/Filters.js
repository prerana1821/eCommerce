import { useData } from "./DataProvider";
export const Filters = () => {
  const {
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly,
    priceRange,
    dispatch,
  } = useData();

  console.log({ priceRange });

  return (
    <div className='filters'>
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
            Include Out of Stock
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
        <label>Price Range: </label>
        {/* <label>Price Range: 0 to {priceRange}</label> */}
        <input
          type='range'
          min='1'
          step='100'
          max='1000'
          value={priceRange}
          onChange={(e) =>
            dispatch({ type: "PRICE_RANGE", payload: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
};
