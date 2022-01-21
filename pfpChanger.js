const axios = require("axios");
const fs = require("fs");
const { sleep } = require("./utils.js");
const { getCookies } = require("./utils");
const { createHttpAgent } = require("./helpers");

async function pfpChanger(token) {
  const httpsAgent = createHttpAgent();

  let images = fs.readdirSync("./images");
  var randomImage = images[Math.floor(Math.random() * images.length)];
  var imageAsBase64 = fs.readFileSync("./images/" + randomImage, "base64");
  const [dcfuid, sdcfuid] = await getCookies(axios);

  try {
    const res = await axios.patch(
      "https://discord.com/api/v9/users/@me",
      {
        avatar: "data:image/png;base64," + imageAsBase64,
      },
      {
        httpsAgent,
        headers: {
          accept: " */*",
          // "accept-encoding": "gzip, deflate, br",
          "accept-language": "it",

          authorization: token,
          "content-type": "application/json",
          Cookie:
            "__dcfduid=" + dcfuid + "; __sdcfduid=" + sdcfuid + "; locale=it",
          origin: "https://discord.com",
          referer: "https://discord.com/channels/@me",
          "sec-ch-ua":
            'Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "Windows",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
          "x-debug-options": "bugReporterEnabled",
          "x-super-properties":
            "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkzLjAuNDU3Ny44MiBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiOTMuMC40NTc3LjgyIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL2Rpc2NvcmQuY29tL2xvZ2luIiwicmVmZXJyaW5nX2RvbWFpbiI6ImRpc2NvcmQuY29tIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjk3NjYyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

exports.pfpChanger = pfpChanger;
