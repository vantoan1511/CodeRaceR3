// if ('WebSocket' in window){
// alert('Có hỗ trợ đấy nhé');
// } else {
// alert('Chúng tôi không biết đây là cái gì, tôi không hỗ trợ !');
// }

var  ws = new WebSocket('ws://127.0.0.1:5500/');
console.log(ws.OPEN);

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};

const plugin = ({ widgets, simulator, vehicle }) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <input type="text" placeholder="Nhap tai day">
    `

    widgets.register("test",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;