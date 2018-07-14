const fetch = require("node-fetch");
const debug = require("debug")("logging");
const emoji = require("node-emoji");
const yaml = require("js-yaml");
const fs = require("fs");

const url = "https://slack.com/api/users.profile.set";

class SlackService {
  constructor(OAUTH_KEY) {
    this._OAUTH_KEY = OAUTH_KEY;

    this.setStatus = this.setStatus.bind(this);
  }

  setStatus(status, icon) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this._OAUTH_KEY}`,
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
        if (res.ok === false) {
          throw new Error(res.error);
        }
        debug(
          `Successfully updated slack status to "${status} ${emoji.get(icon)}"!`
        );
      })
      .catch(exception => {
        debug("The Slack API is offline or returned an error message");
        debug(exception);
      });
  }
}

module.exports = SlackService;
