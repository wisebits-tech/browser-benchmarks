import { benchEventEmitters } from "./eventEmitters";

const app = document.getElementById("app");
const log = document.createElement("p");

const benchmarks = {
  eventEmitters: benchEventEmitters,
};

Object.entries(benchmarks).forEach(([name, run]) => {
  const button = document.createElement("button");
  const logger = (message: string) => {
    log.innerText += `${message}\n`
  };
  button.addEventListener("click", () => {
    log.innerText = "";
    run(logger);
  });
  button.innerText = `Run ${name} benchmark`;
  app?.appendChild(button);
});

app?.appendChild(log);
