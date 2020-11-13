import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";

import LEDBLUE from "../img/blue.png";
import LEDGREY from "../img/grey.png";

export default function LedTwoComponent({ status }) {
  const [ledTwo, setLedTwo] = useState(null);

  useEffect(() => {
    firebaseDb.child("LED_2").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setLedTwo(snapshot.val());
      }
    });
  }, []);

  function led2StateOn() {
    //alert("LED 2 ON");
    //firebaseDb.child("LED").push("ON");
    firebaseDb.child("LED_2").set("ON");
  }

  function led2StateOff() {
    //alert("LED 2 OFF");
    //firebaseDb.child("LED").push("ON");
    firebaseDb.child("LED_2").set("OFF");
  }

  return (
    <div className="col-md-6" style={{ padding: "30px" }}>
      <div class="card">
        <center>
          {ledTwo == "ON" ? (
            <img
              class="card-img-top LedImg"
              src={LEDBLUE}
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

        <div class="card-body">
          <center>
            <div className="row">
              <div className="col-md-12">
                <h5 className="text-center" style={{ color: "blue" }}>
                  LED 2 {ledTwo}
                </h5>
              </div>
              <div className="col-md-6">
                <button
                  class="btn btn-outline-primary text-center btnClass"
                  onClick={led2StateOn}
                >
                  ON
                </button>
              </div>

              <div className="col-md-6">
                {" "}
                <button
                  class="btn btn-outline-primary text-center btnClass"
                  onClick={led2StateOff}
                >
                  OFF
                </button>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
