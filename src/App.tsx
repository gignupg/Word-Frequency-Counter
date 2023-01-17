import { useEffect } from "react";
import "./App.css";
import videos from "./transcripts/chinese";

interface Dict {
  [key: string]: number;
}

function App() {
  useEffect(() => {
    const dict: Dict = {};
    for (const video of videos) {
      if (!video.videoId) console.log("You forgot the videoId!");
      const arr = video.transcript.toLowerCase().split(" ");
      for (const word of arr) {
        if (!dict[word]) dict[word] = 0;
        dict[word]++;
      }
    }

    const frequencies = [];
    for (const [key, val] of Object.entries(dict)) {
      frequencies.push({ key, val });
    }
    frequencies.sort((a, b) => b.val - a.val);
    console.log(frequencies);
  }, []);
  return <div className="App"></div>;
}

export default App;
