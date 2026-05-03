# 📲 WhatsApp Automated Messages

A Node.js automation bot that sends scheduled messages to WhatsApp group chats using WhatsApp Web automation.

Built using:
- :contentReference[oaicite:0]{index=0}
- Node.js
- node-cron
- Puppeteer
- PM2 (for 24/7 process management)

---

## 🚀 Features

- QR code login (WhatsApp Web authentication)
- Persistent login sessions (no repeated QR scans)
- Automated scheduled messages to WhatsApp groups
- Weekly reminders using cron jobs
- Ability to fetch and list group chats + IDs
- Can run continuously using PM2

---

## 📦 Installation

1. Clone the repository:
git clone https://github.com/YOUR_USERNAME/whatsapp-bot.git
cd whatsapp-bot

2. Install dependencies:
npm install

---

## ▶️ Run the bot

node 7pmbot.js

Then:
- Scan QR code in WhatsApp → Linked Devices
- Wait for "Bot ready ✔"

---

## 👥 Get WhatsApp Group IDs

When the bot runs, it prints:

Group name: Example Group  
Group ID: 120363XXXXXXXX@g.us  

Copy the Group ID into your script.

---

## ⏰ Scheduling Messages

cron.schedule('0 9 * * 1', async () => {
  const chat = await client.getChatById('GROUP_ID@g.us');

  await chat.sendMessage('Weekly reminder: standup meeting at 10am');
});

### Cron format:
┌──────── minute (0 - 59)
│ ┌────── hour (0 - 23)
│ │ ┌──── day of month (1 - 31)
│ │ │ ┌── month (1 - 12)
│ │ │ │ ┌─ day of week (0 - 6)
│ │ │ │ │
0  9 * * 1   → Every Monday at 9:00 AM

---

## 🧪 Test Mode

cron.schedule('*/1 * * * *', async () => {
  const chat = await client.getChatById('YOUR_GROUP_ID@g.us');
  await chat.sendMessage('Test message ✔');
});

---

## 🖥️ Run 24/7 (PM2)

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

## 📁 Project Structure

whatsapp-bot/
│── 7pmbot.js
│── package.json
│── package-lock.json
│── .gitignore
│── README.md

---

## 🚫 .gitignore

node_modules/
.wwebjs_auth/
.wwebjs_cache/
.env

---

## ⚠️ Notes

- First run requires QR scan
- Sessions may expire occasionally
- Do NOT commit session folders or node_modules
- This uses WhatsApp Web automation (not official API)

---

## 🛠️ Troubleshooting

If stuck at "Authenticated ✔":

- Delete .wwebjs_auth
- Restart bot
- Scan QR again

pm2 logs whatsapp-bot --lines 100

---

## 🚀 Next Steps

If you want to improve this project further:

### 🔥 Production Upgrade
- Move to a VPS (AWS / DigitalOcean / Hetzner)
- Run bot 24/7 without your laptop
- Use PM2 + system startup service

### 🐳 Docker Setup
- Containerise the bot
- Avoid dependency + environment issues
- Run anywhere with one command

### 📊 Monitoring
- Add logging dashboard (Grafana / Loki)
- Track sent messages + failures
- Health checks for bot status

### 🤖 Feature Expansion
- AI auto-replies in WhatsApp groups
- Role-based commands (!help, !stats)
- Multiple group scheduling system
- Database integration (MongoDB / Firebase)

### 🔐 Stability Fixes
- Improve session persistence
- Auto-reconnect on disconnect
- Better error handling + retry logic

---

## 📜 License

MIT