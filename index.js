const wifiName = require("wifi-name");
const fs = require("fs");
const yaml = require("js-yaml");
const debug = require("debug")("logging");

const CURRENT_WIFI = wifiName.sync();

const set_status = require("./slack");

try {
  const config = yaml.safeLoad(fs.readFileSync("./config/config.yaml", "utf8"));
  let statusUpdated = false;

  for (location of config.locations) {
    if (location.ssids.includes(CURRENT_WIFI)) {
      const { status, icon } = location;
      set_status(status, icon);
      statusUpdated = true;
      break;
    }
  }

  if (!statusUpdated) {
    debug("Location not recognized");
    set_status(config.unknown.status, config.unknown.icon);
  }
} catch (exception) {
  debug("Could not read configuration file at ./config/config.yaml");
  debug(exception);
}
