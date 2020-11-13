import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";

import LEDRED from "../img/red.png";
import LEDBLUE from "../img/blue.png";
import LEDGREY from "../img/grey.png";
import buzzeron from "../img/buzzeron.png";
import buzzeroff from "../img/buzzeroff.png";

import "./mainStyle.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.start();
recognition.continuous = true;

export default function MainComponent() {
  const [ledOne, setLedOne] = useState(null);
  const [ledTwo, setLedTwo] = useState(null);
  const [buzzer, setBuzzer] = useState(null);
  const [transcriptText, settranscriptText] = useState(null);
  const voiceCommands = () => {
    // On start
    recognition.onstart = () => {
      console.log("Voice is actived");
    };

    // Do something when we get a result
    recognition.onresult = (e) => {
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;
      let mobileRepeatBug =
        current === 1 && transcript === e.results[0][0].transcript;

      settranscriptText(transcript);

      if (!mobileRepeatBug) {
        //Blue Blub function
        if (
          transcript === "turn on blue LED" ||
          transcript === " turn on blue LED"
        ) {
          led2StateOn();
          voiceCommands();
        }

        if (
          transcript === "turn off blue LED" ||
          transcript === " turn off blue LED"
        ) {
          led2StateOff();
          voiceCommands();
        }

        //Red Blub function
        if (
          transcript === "turn on Red LED" ||
          transcript === " turn on Red LED"
        ) {
          led1StateOn();
          voiceCommands();
        }

        if (
          transcript === "turn off red LED" ||
          transcript === " turn off red LED"
        ) {
          led1StateOff();
          voiceCommands();
        }
        if (
          transcript === "turn on buzzer" ||
          transcript === " turn on buzzer"
        ) {
          buzzerStateOn();
          voiceCommands();
        }
        if (
          transcript === "turn off buzzer" ||
          transcript === " turn off buzzer"
        ) {
          buzzerStateOff();
          voiceCommands();
        }

        if (transcript == null) {
          voiceCommands();
        }
      }

      //   setTimeout(() => {
      //     recognition.start();
      //   }, 5);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      console.log("voice stopped");
    };

    recognition.onend = () => {
      console.log("continue..");
      recognition.start();
    };
  };

  useEffect(() => {
    voiceCommands();

    firebaseDb.child("LED_1").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setLedOne(snapshot.val());
      }
    });

    firebaseDb.child("LED_2").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setLedTwo(snapshot.val());
      }
    });

    firebaseDb.child("BUZZER").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setBuzzer(snapshot.val());
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

  function buzzerStateOn() {
    //alert("LED 1 ON");
    firebaseDb.child("BUZZER").set("ON");
  }

  function buzzerStateOff() {
    //alert("LED 1 OFF");
    firebaseDb.child("BUZZER").set("OFF");
  }

  return (
    <div>
      <div className="text-center" style={{ margin: "4%" }}>
        <h3>Senura Jayadeva IOT Proj01</h3>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>My Voice Command : {transcriptText}</p>
          </div>
          {/* Column 1 start */}
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

                    <div className="col-md-12">
                      <p>Turn on red LED</p>
                      <p>Turn off red LED</p>
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
          {/* Column 1 end */}
          {/* Column 2 start */}
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
                    <div className="col-md-12">
                      <p>Turn on blue LED</p>
                      <p>Turn off blue LED</p>
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
          {/* Column 2 end */}
          {/* Column 3 start */}
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
                    <div className="col-md-12">
                      <p>Turn on buzzer</p>
                      <p>Turn off buzzer</p>
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
          {/* Column 3 end */}
        </div>
      </div>
    </div>
  );
}
