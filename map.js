const plugin = ({ widgets }) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div id="map" style="width: 100%; height: 400px;"></div>
    `;

    widgets.register("google-map", (box) => {
        box.injectNode(div);

        // Google Map initialization
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.7749, lng: -122.4194 }, // Set the initial map center
            zoom: 12, // Set the initial zoom level
        });

        // Add a marker to the map
        new google.maps.Marker({
            position: { lat: 37.7749, lng: -122.4194 }, // Set the marker position
            map, // Set the map to add the marker to
            title: "San Francisco", // Set the marker title
        });
    });
};

export default plugin;
