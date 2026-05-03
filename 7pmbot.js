import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import qrcode from 'qrcode-terminal';
import cron from 'node-cron';

console.log("🚀 Starting WhatsApp bot...");

// =========================
// CLIENT SETUP (STABLE)
// =========================
const client = new Client({
  authStrategy: new LocalAuth(),

  webVersionCache: {
    type: "remote",
    remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html"
  },

  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
});

// =========================
// AUTO-RECOVERY WATCHDOG
// =========================
let readyTimeout = null;

// =========================
// QR LOGIN
// =========================
client.on('qr', (qr) => {
  console.log("📱 Scan QR code:");
  qrcode.generate(qr, { small: true });
});

// =========================
// LOADING
// =========================
client.on('loading_screen', (percent, message) => {
  console.log(`⏳ Loading: ${percent}% - ${message}`);
});

// =========================
// AUTHENTICATED
// =========================
client.on('authenticated', () => {
  console.log("🔐 Authenticated ✔");

  // If WhatsApp never reaches ready, restart automatically
  readyTimeout = setTimeout(() => {
    console.log("⚠️ Ready timeout detected → restarting bot...");
    process.exit(1); // PM2 will restart it
  }, 60000); // 60 seconds
});

// =========================
// READY (SUCCESS STATE)
// =========================
client.on('ready', async () => {
  console.log("✅ Bot ready ✔");

  if (readyTimeout) clearTimeout(readyTimeout);

  try {
    console.log("📡 Fetching chats...");

    const chats = await client.getChats();
    const groups = chats.filter(c => c.isGroup);

    console.log(`💬 Total chats: ${chats.length}`);
    console.log(`👥 Total groups: ${groups.length}`);

    for (const group of groups) {
      console.log("--------------------");
      console.log("Name:", group.name);
      console.log("ID:", group.id._serialized);
    }

    // =========================
    // TEST CRON JOB
    // =========================

    const testGroupId = '120363408469506959@g.us';

    console.log("⏰ Cron job started (every 1 min)");

    cron.schedule('*/1 * * * *', async () => {
      try {
        console.log("📤 Sending test message...");

        const chat = await client.getChatById(testGroupId);

        await chat.sendMessage("TEST ✔ bot working");

        console.log("✅ Message sent ✔");
      } catch (err) {
        console.error("❌ Send error:", err);
      }
    });

  } catch (err) {
    console.error("❌ Chat load failed:", err);
  }
});

// =========================
// AUTH FAILURE
// =========================
client.on('auth_failure', (msg) => {
  console.error("❌ Auth failure:", msg);
});

// =========================
// DISCONNECT HANDLING
// =========================
client.on('disconnected', (reason) => {
  console.log("⚠️ Disconnected:", reason);
});

// =========================
// START CLIENT
// =========================
client.initialize();