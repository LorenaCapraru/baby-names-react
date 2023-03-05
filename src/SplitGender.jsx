import React from "react";

export default function SplitGender(props) {
  return props.data.map((baby) =>
    baby.sex === "m" ? (
      <span className="babyBoy">{baby.name}</span>
    ) : (
      <span className="babyGirl">{baby.name}</span>
    )
  );
}
