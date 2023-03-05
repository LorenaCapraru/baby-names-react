import "./App.css";
import data from "./babyNamesData.json";
// import SplitGender from "./SplitGender";
import Search from "./Search";

function App() {
  return (
    <div className="container">
      <Search search={data} />
      {/* <SplitGender data={data} /> */}
    </div>
  );
}

export default App;
