import { useState, React } from "react";
import data from "./babyNamesData.json";
import SplitGender from "./SplitGender";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const [mainList, setMainList] = useState(data);
  const [favoriteList, setFavoriteList] = useState([]);

  const [boyList, setBoyList] = useState([]);
  const [girlList, setGirlList] = useState([]);
  const [all, setAll] = useState([]);

  function resetAllList() {
    let newList = [...data];
    return setAll(newList);
  }

  function returnBoyList() {
    let newList = data.filter((el) => el.sex === "m");
    return setBoyList(newList);
  }

  function returnGirlList() {
    let newList = data.filter((el) => el.sex === "f");
    return setBoyList(newList);
  }

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function addToFavorites(id) {
    const nameIndex = mainList.findIndex((name) => name.id === id);
    const newMainList = [...mainList];
    const removedName = newMainList.splice(nameIndex, 1);
    setMainList(newMainList);
    setFavoriteList(favoriteList.concat(removedName));
  }

  function removeFromFavorites(id) {
    const nameIndex = mainList.findIndex((name) => name.id === id);
    const newFavoritesList = [...favoriteList];
    const removedName = newFavoritesList.splice(nameIndex, 1);
    setFavoriteList(newFavoritesList);
    setMainList(mainList.concat(removedName));
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
      <div className="radioButton">
        <input
          type="radio"
          id="allGender"
          name="genderSelector"
          onClick={resetAllList}
        />
        <label for="allGender">All</label>
        <input
          type="radio"
          id="boySelector"
          name="genderSelector"
          onClick={returnBoyList}
        />
        <label for="boySelector">BOYS</label>
        <input
          type="radio"
          id="girlSelector"
          name="genderSelector"
          onClick={returnGirlList}
        />
        <label for="girlSelector">GIRLS</label>
      </div>
      <div className="favouriteList">
        <h2>Favorites:</h2>
        <SplitGender data={favoriteList} handleClick={removeFromFavorites} />
      </div>
      <div className="searchOutput">
        {searchInput === "" ? (
          boyList.length === 0 && girlList.length === 0 && all.length === 0 ? (
            <SplitGender data={data} handleClick={addToFavorites} />
          ) : (
            <SplitGender data={boyList} handleClick={addToFavorites} />
          )
        ) : (
          filteredNames
        )}
      </div>
    </>
  );
}
