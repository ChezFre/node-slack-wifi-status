const fetch = require("node-fetch");
const debug = require("debug")("logging");
const emoji = require("node-emoji");
const yaml = require("js-yaml");
const fs = require("fs");

const url = "https://slack.com/api/users.profile.set";
const config = yaml.safeLoad(fs.readFileSync("./config/config.yaml", "utf8"));

function set_status(status, icon) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${config.oauth_key}`,
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    body: JSON.stringify({
      profile: {
        status_text: status,
        status_emoji: icon
      }
    })
  })
    .then(res => res.json())
    .then(res => {
      debug(
        `Successfully updated slack status to "${status} ${emoji.get(icon)}"!`
      );
    })
    .catch(exception => {
      debug("Could not communicate with slack API");
      debug(exception);
    });
}

module.exports = set_status;
