const httpsProxyAgent = require("https-proxy-agent");
const config = require("./config.js");

const createHttpAgent = () => {
  if (config.proxy) {
    const [ip, port, username, password] = config.proxy.split(":");
    return new httpsProxyAgent({
      host: ip,
      port: port,
      auth: `${username}:${password}`,
    });
  }
  return false;
};

exports.createHttpAgent = createHttpAgent;
