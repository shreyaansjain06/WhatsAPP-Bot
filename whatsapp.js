const qrcode = require('qrcode-terminal');
const fs =require('fs')
const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});


client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();
// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
client.on('message', (message) => {
  if (message.body.includes('hi') || message.body.includes('Hi')) {
    client.sendMessage(message.from, 'Hello');
  }
  if (
    message.body.includes('what are you doing') ||
    message.body.includes('kya kar') ||
    message.body.includes('Kya kar raha hai')
  ) {
    client.sendMessage(message.from, 'Time Passing');
  }
  if (
    message.body.includes('Good Morning') ||
    message.body.includes('Good morning')
  ) {
    client.sendMessage(message.from, 'Good Morning');
  }
  if (
    message.body.includes('Happy Christmas') ||
    message.body.includes('Happy christmas')
  ) {
    client.sendMessage(message.from, 'Happy Christmas');
  }
});
