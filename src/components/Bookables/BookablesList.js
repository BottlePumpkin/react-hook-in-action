import { useState,Fragment } from "react";
import data from "../../static.json"
import { FaArrowRight } from "react-icons/fa";

const {bookables,sessions,days} = data;

function getUniqueValues (array, property) {
  const propValues = array.map(element => element[property]);
  const uniqueValues = new Set(propValues);
  const uniqueValuesArray = [...uniqueValues];

  return uniqueValuesArray;
}

export default function BookablesList () {
  const [group, setGroup] = useState("Kit")
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);
  const groups = getUniqueValues(bookables, "group");

  const bookable = bookablesInGroup[bookableIndex];

  const [hasDetails, setHasDetails] = useState(false);

  function nextBookable() {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
    <Fragment>
    <div>
      <select
        value={group}
        onChange={
          (e) => setGroup(e.target.value)}
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
            onClick={() => setBookableIndex(i)}
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
              onChange={() => setHasDetails(has => !has)}
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