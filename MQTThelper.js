const mqtt = require('mqtt');

const arrayTopics = [
  "lygiahuy05022002/feeds/temp",
  "lygiahuy05022002/feeds/humi",
  "lygiahuy05022002/feeds/light",
  "lygiahuy05022002/feeds/relay1",
  "lygiahuy05022002/feeds/relay2",
  "lygiahuy05022002/feeds/relay3",
  "lygiahuy05022002/feeds/ledbutton",
  "lygiahuy05022002/feeds/doorbutton",
  "lygiahuy05022002/feeds/security"
];

const clientId = "12345678";
const username = "lygiahuy05022002";
const password = "aio" + "_kHoz82rC78CkW8BT3G9jf3LXAoDy";

const serverUri = "mqtt://io.adafruit.com:1883";

const client = mqtt.connect(serverUri, {
  clientId: clientId,
  username: username,
  password: password
});

client.on('connect', function () {
  console.log('Ket noi thanh cong ...');
  arrayTopics.forEach((topic) => {
    client.subscribe(topic);
  });
});

client.on('message', function (topic, message) {
  console.log('Nhan du lieu:', message.toString(), ', feed id:', topic.split('/').pop());
});

client.on('error', function (error) {
  console.error('Loi ket noi:', error);
});

client.on('close', function () {
  console.log('Ket noi bi dong ...');
});

// main program
function subscribeToTopics() {
  arrayTopics.forEach((topic) => {
    client.subscribe(topic, function (err) {
      if (err) {
        console.error('Loi khi subscribe:', err);
      } else {
        console.log('Da subscribe thanh cong cho topic:', topic);
      }
    });
  });
}

function connectToBroker() {
  client.on('connect', function () {
    console.log('Ket noi thanh cong ...');
    subscribeToTopics();
  });
}

connectToBroker();
