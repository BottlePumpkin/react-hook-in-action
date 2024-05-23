import { useState } from "react";
import data from "../../static.json"
import { FaArrowRight } from "react-icons/fa";

const {bookables} = data;

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

  function nextBookable() {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
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
  );
}