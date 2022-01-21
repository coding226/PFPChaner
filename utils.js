const sleep = (t) => new Promise((s) => setTimeout(s, t));

async function getCookies(paxios) {
  let cookies = await paxios.get("https://discord.com/register", {
    withCredentials: true,
  });
  return [
    cookies.headers["set-cookie"][0].split("=")[1].split(";")[0],
    cookies.headers["set-cookie"][1].split("=")[1].split(";")[0],
  ];
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function dotIt(email) {
  var username = email.split("@")[0];
  var dotemail = "";
  for (let i = 0; i < username.length - 1; i++) {
    dotemail += username[i] + choose(["", "."]);
  }
  dotemail += username[username.length - 1] + "@gmail.com";
  return dotemail;
}

exports.sleep = sleep;
exports.getCookies = getCookies;
exports.dotIt = dotIt;
