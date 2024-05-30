import { Fragment, useReducer } from "react";
import data from "../../static.json"
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer.js";

const {bookables,sessions,days} = data;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
}

function getUniqueValues (array, property) {
  const propValues = array.map(element => element[property]);
  const uniqueValues = new Set(propValues);
  const uniqueValuesArray = [...uniqueValues];

  return uniqueValuesArray;
}




export default function BookablesList () {
  const [state,dispatch] = useReducer(reducer,initialState);
  const {group, bookableIndex, bookables, hasDetails} = state;

  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups = getUniqueValues(bookables, "group");

  const bookable = bookablesInGroup[bookableIndex];


  function changeGroup (e) {
    dispatch({
      type: "SET_GROUP",
      paload: e.target.value
    })
  }

  function changeBookable (selectedIndex) {
    dispatch(
      {
        type: "SET_BOOKABLE",
        paload: selectedIndex
      }
    )
  }

  function nextBookable() {
    dispatch({
      type: "NEXT_BOOKABLE",
    });
  }

  function toggleDetails() {
    dispatch({
      type: "TOGGLE_HAS_DETAILS"
    });
  }





  return (
    <Fragment>
    <div>
      <select
        value={group}
        onChange={changeGroup}
      >
      {groups.map(g => <option value={g} key={g}>{g}</option>)}
      </select>


    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.id}
          className={i === bookableIndex ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => changeBookable(i)}
          >
            {b.title}
          </button>
        </li>
      ))}
    </ul>
    <p>
      <button
        className="btn"
        onClick={nextBookable}
        autoFocus
      >
        <FaArrowRight/>
        <span>Next</span>
      </button>
    </p>
    </div>
    {bookable && (
      <div className="bookable=details">
        <div className="item">
          <h2>
            {bookable.title}
          </h2>
          <span className="controls">
            <label>
              <input type="checkbox"
              checked={hasDetails}
              onChange={() => toggleDetails(has => !has)}
              >
              </input>
            </label>
          </span>
        </div>

      </div>
    )}
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days
                      .sort()
                      .map(d => <li key={d}>{days[d]}</li>)
                    }
                  </ul>
                  <ul>
                    {bookable.sessions
                      .map(s => <li key={s}>{sessions[s]}</li>)
                    }
                  </ul>
                </div>
              </div>
            )}
    </Fragment>
  
  );
}