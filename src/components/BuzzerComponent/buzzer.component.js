import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";

import buzzeron from "../img/buzzeron.png";
import buzzeroff from "../img/buzzeroff.png";

export default function BuzzerComponent() {
  const [buzzer, setBuzzer] = useState(null);

  useEffect(() => {
    firebaseDb.child("BUZZER").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setBuzzer(snapshot.val());
      }
    });
  }, []);

  function buzzerStateOn() {
    //alert("LED 1 ON");
    firebaseDb.child("BUZZER").set("ON");
  }

  function buzzerStateOff() {
    //alert("LED 1 OFF");
    firebaseDb.child("BUZZER").set("OFF");
  }

  return (
    <div className="col-md-6" style={{ padding: "30px" }}>
      <div class="card">
        <center>
          {buzzer == "ON" ? (
            <img
              class="card-img-top LedImg"
              src={buzzeron}
              alt="Card image cap"
            />
          ) : (
            <img
              class="card-img-top LedImg"
              src={buzzeroff}
              alt="Card image cap"
            />
          )}
        </center>

        <center>
          <div class="card-body">
            <div className="row">
              <div className="col-md-12">
                <h5 className="text-center" style={{ color: "green" }}>
                  BUZZER {buzzer}
                </h5>
              </div>
              <div className="col-md-6">
                <button
                  class="btn btn-outline-success text-center btnClass"
                  onClick={buzzerStateOn}
                >
                  ON
                </button>
              </div>

              <div className="col-md-6">
                {" "}
                <button
                  class="btn btn-outline-success text-center btnClass"
                  onClick={buzzerStateOff}
                >
                  OFF
                </button>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}
