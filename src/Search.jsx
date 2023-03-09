import { useState, React } from "react";
import data from "./babyNamesData.json";
import SplitGender from "./SplitGender";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  const [mainList, setMainList] = useState(data);
  const [favoriteList, setFavoriteList] = useState([]);
  
  function addToFavorites(id) {
    const nameIndex = mainList.findIndex((name) => name.id === id);
    const newMainList = [...mainList];
    const removedName = newMainList.splice(nameIndex, 1);
    setMainList(newMainList);
    setFavoriteList([...favoriteList, removedName[0]]);
  }

  function removeFromFavorites(id) {
    const nameIndex = mainList.findIndex((name) => name.id === id);
    const newFavoritesList = [...favoriteList];
    const removedName = newFavoritesList.splice(nameIndex, 1);
    setFavoriteList(newFavoritesList);
    setMainList([...mainList, removedName[0]]);
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
      <div className="favouriteList">
        <h2>Favorites:</h2>
        <SplitGender data={favoriteList} handleClick={removeFromFavorites} />
      </div>
      <div className="searchOutput">
        {searchInput === "" ? (
          <SplitGender data={mainList} handleClick={addToFavorites} />
        ) : (
          filteredNames
        )}
      </div>
    </>
  );
}
