import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ProcessStream } from "../backend/processStream";

class StreamStore {
  constructor() {
    makeObservable(this, {
      streams: observable,
      addStream: action,
      removeStream: action,
    });
  }

  streams: ProcessStream[] = [];

  addStream = (stream: ProcessStream) => {
    this.streams.push(stream);
  };

  removeStream = (stream: ProcessStream) => {
    this.streams = this.streams.filter((s) => s.id !== stream.id);
  };
}

const StreamStoreContext = createContext<StreamStore>(new StreamStore());

export { StreamStore, StreamStoreContext };
