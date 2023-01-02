import Benchmark from "tinybench";
import EventEmitter3 from "eventemitter3";

var suite = new Benchmark.Suite();

const ee3 = new EventEmitter3();
const et = new EventTarget();

function handle() {
  if (arguments.length > 100) console.log("damn");
}
[ee3, et].forEach(function ohai(emitter) {
  if (emitter instanceof EventEmitter3) {
    emitter.on("foo", handle);
    //
    // We add and remove a listener to see if the event emitter implementation is
    // de-optimized because it deletes items from an object etc.
    //
    emitter.on("ohai", ohai);
    if (emitter.removeListener) emitter.removeListener("ohai", ohai);
    else if (emitter.off) emitter.off("ohai", ohai);
    else throw new Error("No proper remove implementation");
  } else {
    emitter.addEventListener("foo", handle);
    //
    // We add and remove a listener to see if the event emitter implementation is
    // de-optimized because it deletes items from an object etc.
    //
    emitter.addEventListener("ohai", ohai as any);
    emitter.removeEventListener("ohai", ohai as any);
  }
});

export const benchEventEmitters = (logger: (message: string) => void) =>
  suite
    .add("EventEmitter3", function () {
      ee3.emit("foo", new Event("foo"));
      ee3.emit("foo", new Event("foo"));
      ee3.emit("foo", new Event("foo"));
      ee3.emit("foo", new Event("foo"));
    })
    .add("EventTarget", function () {
      et.dispatchEvent(new Event("foo"));
      et.dispatchEvent(new Event("foo"));
      et.dispatchEvent(new Event("foo"));
      et.dispatchEvent(new Event("foo"));
    })
    .on("cycle", function (event) {
      logger(String(event.target));
    })
    .on("complete", function () {
      logger("Fastest is " + this.filter("fastest").map("name"));
    })
    .run({ async: true });
