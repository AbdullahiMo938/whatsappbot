# WhatsApp Automated Messages Bot

Node.js bot that sends scheduled messages to WhatsApp group chats using WhatsApp Web automation.

---

## Features

- QR code login (WhatsApp Web)
- Persistent login session (no repeated QR scans)
- Send scheduled messages to WhatsApp groups
- Cron-based scheduling (daily / weekly)
- Fetch and list group chats + IDs
- Run 24/7 using PM2

---

## Setup

### Clone repo

git clone https://github.com/YOUR_USERNAME/whatsapp-bot.git
cd whatsapp-bot

### Install dependencies

npm install

---

## Run bot

node 7pmbot.js

Then:
- Scan QR code in WhatsApp (Linked Devices)
- Wait for "Bot ready ✔"

---

## Get WhatsApp Group IDs

When the bot runs it prints:

Group name: Example Group  
Group ID: 120363XXXXXXXX@g.us  

Copy the Group ID into your code.

---

## Scheduling messages (cron)

Example: every Monday at 9:00 AM

cron.schedule('0 9 * * 1', async () => {
  const chat = await client.getChatById('GROUP_ID@g.us');
  await chat.sendMessage('Weekly reminder');
});

---

## Cron format

minute hour day month weekday  
0 9 * * 1 → Monday at 9:00 AM  
0 10 * * 0 → Sunday at 10:00 AM  
15 10 * * * → every day at 10:15 AM  

---

## Test mode (every minute)

cron.schedule('*/1 * * * *', async () => {
  const chat = await client.getChatById('GROUP_ID@g.us');
  await chat.sendMessage('Test message ✔');
});

---

## Run 24/7 (PM2)

Install PM2:

npm install -g pm2

Start bot:

pm2 start 7pmbot.js --name whatsapp-bot

View logs:

pm2 logs whatsapp-bot

Save process:

pm2 save  
pm2 startup  

---

## Project structure

whatsapp-bot/
│── 7pmbot.js
│── package.json
│── package-lock.json
│── .gitignore
│── README.md

---

## .gitignore

node_modules/
.wwebjs_auth/
.wwebjs_cache/
.env

---

## Notes

- First run requires QR scan
- Sessions may expire sometimes
- Do NOT commit node_modules or auth folders
- Uses WhatsApp Web automation (not official API)

---

## Troubleshooting

If stuck on "Authenticated ✔":

pm2 logs whatsapp-bot --lines 100

Fix:
- Delete .wwebjs_auth
- Restart bot
- Scan QR again

---

## Next steps

- Run on VPS for 24/7 uptime
- Add multiple group scheduling
- Add database (MongoDB / Firebase)
- Add retry + auto-reconnect logic
- Dockerise for stable deployment