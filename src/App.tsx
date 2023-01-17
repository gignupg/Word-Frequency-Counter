import { useEffect } from "react";
import "./App.css";
import videos from "./transcripts/chinese";

interface Dict {
  [key: string]: {
    occurences: number;
    foundIn: number;
  };
}

interface FoundInDict {
  [key: string]: boolean;
}

function App() {
  useEffect(() => {
    const dict: Dict = {};
    for (const video of videos) {
      if (!video.videoId) console.log("You forgot the videoId!");
      const arr = video.transcript.pinyin.toLowerCase().split(" ");
      const foundInDict: FoundInDict = {};
      for (const word of arr) {
        if (!dict[word]) dict[word] = { occurences: 0, foundIn: 0 };
        dict[word].occurences++;
        if (!foundInDict[word]) dict[word].foundIn++;
        foundInDict[word] = true;
      }
    }

    const frequencies = [];
    for (const [key, val] of Object.entries(dict)) {
      frequencies.push({
        key,
        occurences: val.occurences,
        foundIn: val.foundIn,
      });
    }
    frequencies.sort((a, b) => {
      if (b.foundIn !== a.foundIn) {
        return b.foundIn - a.foundIn;
      } else {
        return b.occurences - a.occurences;
      }
    });
    console.log(frequencies);
  }, []);
  return <div className="App"></div>;
}

export default App;
