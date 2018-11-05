NodeJS version of https://github.com/icapps/slack-wifi-status

# Retrieve Slack API token

- Navigate to https://api.slack.com/custom-integrations/legacy-tokens
- Press the "create token" button for Team iCapps
- Confirm with your password
- The token should be available now

# Setup the script

- Clone the script from this repo (for example to your /Applications/utilities folder).
- Run `npm install`
- Copy the `config/config.example.yaml` file to `config/config.yaml` and add in your API token and ssids.

```yaml
oauth_key: 'xoxp-paste-your-token'
locations:
  - status: 'At home'
        icon: ":house:"
        ssids:
          - YOUR_PERSONAL_SSID
  - status: 'At the office'
        icon: ":office:"
        ssids:
          - YOUR_OFFICE_SSID
```

# Schedule the script

- Edit the `slack-wifi.sh` to include the path to node (run `which node` to get the path) and update the path to the index and log files.
- Open terminal
- Type the following: crontab -e
- Type the following: i
- Paste the following: (if you didn't unzip into the Applications folder, make sure the path below is correct)

`2 */5 * * * * /Applications/Utilities/slack-location/slack-wifi.sh > /dev/null 2> /dev/null`

=> this will schedule the script to run every 5 minutes (change de '5' at the start of the line if you want to run the script less frequent)

- Press the esc button
- Type the following `:wq`

# Debugging

Should a location not work you can get some basic debugging information by running

`DEBUG=* node index.js`

This will return

```
logging Location not recognized +0ms
logging Successfully updated slack status to "Lost in space :male-astronaut:"! +0ms
```
  
Or

```
logging Successfully updated slack status to "At home :home:"! +0ms
```
