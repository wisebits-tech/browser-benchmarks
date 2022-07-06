import Benchmark from "tinybench";

var suite = new Benchmark.Suite();

suite
  .add("case 1", function () {})
  .add("case 2", function () {})
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
