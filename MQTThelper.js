const mqtt = require('mqtt');
const AIO_FEED_ID = ["temp", "humi", "light", "relay1", "relay2", "relay3", "ledbutton", "security", "doorbutton"];
const AIO_USERNAME = "lygiahuy05022002";
const AIO_KEY = "key_kHoz82rC78CkW8BT3G9jf3LXAoDy";
const AIO_KEY_REPLACED = AIO_KEY.replace(AIO_KEY.substring(0, 3), "aio");

let client = mqtt.connect('mqtt://io.adafruit.com', {
  username: AIO_USERNAME,
  password: AIO_KEY_REPLACED
});

client.on('connect', function () {
  console.log('Ket noi thanh cong ...');
  AIO_FEED_ID.forEach((topic) => {
    client.subscribe(AIO_USERNAME + '/f/' + topic);
  });
});

client.on('message', function (topic, payload) {
  console.log('Nhan du lieu:', payload.toString(), ', feed id:', topic.split('/').pop());
});

client.on('disconnect', function () {
  console.log('Ngat ket noi ...');
  process.exit(1);
});

// main program
let counter_updateValue = 1;
let counter_readServer = 1;

setInterval(() => {
  counter_updateValue--;
  if (counter_updateValue <= 0) {
    counter_updateValue = 1;
    const cambien1 = Math.floor(Math.random() * 10) + 1;
    const cambien2 = Math.floor(Math.random() * 10) + 1;
    // TODO1 - adding sensor value to server
    client.publish(AIO_USERNAME + '/f/temp', cambien1.toString());
    client.publish(AIO_USERNAME + '/f/light', cambien2.toString());
  }
}, 1000);