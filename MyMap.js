const plugin = ({ widgets }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    
    <div id="map"></div>

    <script>

        function initMap() {
            const center = { lat: 37.7749, lng: -122.4194 };

            const map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 20
            });

            const marker = new google.maps.Marker({
                position: center,
                map: map,
                title: 'Center Marker'
            });
        }
    </script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo-gybL3WcIWNMYjt0MsB9mkSN2lFci0c&callback=initMap"
        async defer></script>

    `

    widgets.register("MyMap", (box) => {
        box.injectNode(div)

    })
}

export default plugin;
