const { pfpChanger } = require("./pfpChanger");
const fs = require("fs");
const { sleep } = require("./utils");

const main = async () => {
  let tokens = fs
    .readFileSync("./tokens.txt")
    .toString()
    .split("\n")
    .map((token) => token.trim())
    .filter((a) => a);

  let completed = fs
    .readFileSync("./completed.txt")
    .toString()
    .split("\n")
    .map((token) => token.trim())
    .filter((a) => a);

  for (let token of tokens) {
    if (completed.includes(token)) {
      console.log("Skipping");
      continue;
    }
    new Promise(async (res, rej) => {
      try {
        let { username, discriminator } = await pfpChanger(token);
        if (username) {
          console.log(`Changed ${username}#${discriminator} pfp`);
          fs.writeFileSync("./completed.txt", token + "\n", { flag: "a+" });
        } else {
          console.log(`Failed to change pfp of ${token}`);
        }
      } catch {}
    });
    await sleep(200);
  }
};
main();
