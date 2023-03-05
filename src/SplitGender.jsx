import React from "react";

export default function SplitGender(props) {
  const sortedNames = props.data.sort((a, b) => {
    let fa = a.name;
    let fb = b.name;

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  
  const listOfNames = sortedNames.map((baby) =>
    baby.sex === "m" ? (
      <span className="babyBoy">{baby.name}</span>
    ) : (
      <span className="babyGirl">{baby.name}</span>
    )
  );
  return <div className="listOfNames">{listOfNames}</div>;
}
