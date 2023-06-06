const plugin = ({ widgets }) => {

    function initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 21.0168864, lng: 105.7855574 },
            zoom: 15
        });
    }

    const div = document.createElement("div")
    div.innerHTML = `
    
    <div id="map"></div>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo-gybL3WcIWNMYjt0MsB9mkSN2lFci0c&callback=initMap" async defer></script>

    `

    widgets.register("MyMap", (box) => {
        box.injectNode(div)

    })
}

export default plugin;
