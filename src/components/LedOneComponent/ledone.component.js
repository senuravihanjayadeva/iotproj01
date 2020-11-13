import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";

import LEDRED from "../img/red.png";
import LEDGREY from "../img/grey.png";

export default function LedoneComponent() {
  const [ledOne, setLedOne] = useState(null);

  useEffect(() => {
    firebaseDb.child("LED_1").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setLedOne(snapshot.val());
      }
    });
  }, []);

  function led1StateOn() {
    //alert("LED 1 ON");
    firebaseDb.child("LED_1").set("ON");
  }

  function led1StateOff() {
    //alert("LED 1 OFF");
    firebaseDb.child("LED_1").set("OFF");
  }

  return (
    <div className="col-md-6" style={{ padding: "30px" }}>
      <div class="card">
        <center>
          {ledOne == "ON" ? (
            <img
              class="card-img-top LedImg"
              src={LEDRED}
              alt="Card image cap"
            />
          ) : (
            <img
              class="card-img-top LedImg"
              src={LEDGREY}
              alt="Card image cap"
            />
          )}
        </center>

        <center>
          <div class="card-body">
            <div className="row">
              <div className="col-md-12">
                <h5 className="text-center" style={{ color: "red" }}>
                  LED 1 {ledOne}
                </h5>
              </div>
              <div className="col-md-6">
                <button
                  class="btn btn-outline-danger text-center btnClass"
                  onClick={led1StateOn}
                >
                  ON
                </button>
              </div>

              <div className="col-md-6">
                {" "}
                <button
                  class="btn btn-outline-danger text-center btnClass"
                  onClick={led1StateOff}
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
