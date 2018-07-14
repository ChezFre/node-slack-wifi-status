const wifiName = require("wifi-name");
const fs = require("fs");
const yaml = require("js-yaml");
const debug = require("debug")("logging");

const CURRENT_WIFI = wifiName.sync();

const SlackService = require("./slack");

try {
  const config = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/config/config.yaml`, "utf8")
  );

  const slack = new SlackService(config.oauth_key);

  let statusUpdated = false;

  for (location of config.locations) {
    if (location.ssids.includes(CURRENT_WIFI)) {
      const { status, icon } = location;
      slack.setStatus(status, icon);
      statusUpdated = true;
      break;
    }
  }

  if (!statusUpdated) {
    debug("Location not recognized");
    slack.setStatus(config.unknown.status, config.unknown.icon);
  }
} catch (exception) {
  debug(`Could not read configuration file at ${__dirname}/config/config.yaml`);
  debug(exception);
}
