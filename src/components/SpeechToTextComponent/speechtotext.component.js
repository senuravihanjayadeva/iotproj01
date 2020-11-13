import React, { useState, useEffect } from "react";
import LedTwoComponent from "../LedTwoComponent/ledtwo.component";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
export default function Speechtotext() {
  const [transcriptText, settranscriptText] = useState("");
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
        if (
          transcript === "turn on blue LED" ||
          transcript === " turn on blue LED"
        ) {
          alert("turn on blue LED");

          settranscriptText(transcript);
          //led2StateOn();
          <LedTwoComponent status="ON" />;
        }

        if (
          transcript === "turn off blue LED" ||
          transcript === " turn off blue LED"
        ) {
          alert("turn off blue LED");
          settranscriptText(transcript);
          <LedTwoComponent status="OFF" />;
          //led2StateOff();
        }
      }

      setTimeout(() => {
        recognition.start();
      }, 50);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      console.log("voice stopped");
    };
  };

  useEffect(() => {
    recognition.start();
    voiceCommands();
  }, []);

  return (
    <div>
      <p>{transcriptText}</p>
    </div>
  );
}
