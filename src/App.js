import "./App.css";
import data from "./babyNamesData.json";
import SplitGender from "./SplitGender";

function App() {
  return (
    <>
      <SplitGender data={data} />
    </>
  );
}

export default App;
