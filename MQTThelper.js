<script src="paho-mqtt.js"></script>
<script>
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

  const mqttClient = new Paho.MQTT.Client(serverUri, clientId);

  mqttClient.onConnectionLost = onConnectionLost;
  mqttClient.onMessageArrived = onMessageArrived;

  const connectOptions = {
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: username,
    password: password,
    useSSL: true
  };

  mqttClient.connect(connectOptions);

  function onConnect() {
    console.log('Ket noi thanh cong ...');
    subscribeToTopics();
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.error('Ket noi bi mat:', responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log('Nhan du lieu:', message.payloadString, ', feed id:', message.destinationName.split('/').pop());
  }

  function onFailure(responseObject) {
    console.error('Loi ket noi:', responseObject.errorMessage);
  }

  function subscribeToTopics() {
    arrayTopics.forEach((topic) => {
      mqttClient.subscribe(topic, {
        onSuccess: function () {
          console.log('Da subscribe thanh cong cho topic:', topic);
        },
        onFailure: function (err) {
          console.error('Loi khi subscribe:', err.errorMessage);
        }
      });
    });
  }
</script>
