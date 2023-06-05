const plugin = ({ widgets }) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div id="map" style="width: 100%; height: 400px;"></div>
    `;

    widgets.register("google-map", (box) => {
        box.injectNode(div);

        // Check if Google Maps API is ready
        if (typeof google !== "undefined" && typeof google.maps !== "undefined") {
            initializeMap();
        } else {
            // Load Google Maps API asynchronously
            loadGoogleMapsAPI().then(() => {
                initializeMap();
            });
        }
    });
};

// Load Google Maps API asynchronously
function loadGoogleMapsAPI() {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.defer = true;
        script.async = true;
        window.initMap = resolve;
        document.head.appendChild(script);
    });
}

// Initialize the map
function initializeMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
    });

    new google.maps.Marker({
        position: { lat: 37.7749, lng: -122.4194 },
        map,
        title: "San Francisco",
    });
}

export default plugin;
