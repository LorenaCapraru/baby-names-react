import { useState, React } from "react";
import data from "./babyNamesData.json";
import SplitGender from "./SplitGender";

export default function Search({ search }) {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  const filteredNames = data
    .sort((a, b) => {
      let fa = a.name;
      let fb = b.name;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    })
    .filter((babyName) =>
      babyName.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((baby) =>
      baby.sex === "m" ? (
        <span className="babyBoy">{baby.name}</span>
      ) : (
        <span className="babyGirl">{baby.name}</span>
      )
    );

  return (
    <>
      <div className="searchDiv">
        <input
          id="searchBar"
          type="text"
          placeholder="Search.."
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      <div className="searchOutput">
        {searchInput === "" ? <SplitGender data={data} /> : filteredNames}
      </div>
    </>
  );
}
