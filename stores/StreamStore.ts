import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ProcessStream } from "../backend/processStream";

class StreamStore {
  constructor() {
    makeObservable(this, {
      streams: observable,
      selectedStream: observable,
      addStream: action,
      removeStream: action,
      setSelectedStream: action,
    });
  }

  streams: ProcessStream[] = [];
  selectedStream: ProcessStream | number = 0;

  addStream = (stream: ProcessStream) => {
    this.streams.push(stream);
  };

  removeStream = (stream: ProcessStream) => {
    this.streams = this.streams.filter((s) => s.id !== stream.id);
    this.selectedStream = 0;
  };

  setSelectedStream = (stream: ProcessStream) => {
    this.selectedStream = stream;
  };
}

const StreamStoreContext = createContext<StreamStore>(new StreamStore());

export { StreamStore, StreamStoreContext };
