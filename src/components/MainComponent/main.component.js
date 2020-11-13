import React from "react";
import firebaseDb from "../../firebase";
import "./mainStyle.css";

import LedoneComponent from "../LedOneComponent/ledone.component";
import LedTwoComponent from "../LedTwoComponent/ledtwo.component";
import BuzzerComponent from "../BuzzerComponent/buzzer.component";

export default function MainComponent() {
  return (
    <div>
      <div className="text-center" style={{ margin: "4%" }}>
        <h3>Senura Jayadeva IOT Proj01</h3>
      </div>
      <div className="container">
        <div className="row">
          {/* Column 1 start */}
          <LedoneComponent />
          {/* Column 1 end */}
          {/* Column 2 start */}
          <LedTwoComponent />
          {/* Column 2 end */}
          {/* Column 3 start */}
          <BuzzerComponent />
          {/* Column 3 end */}
        </div>
      </div>
    </div>
  );
}
