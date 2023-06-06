import GoogleMapsFromSignal from "./reusable/GoogleMapsFromSignal.js"

const GoogleMapsPlugin = ({widgets, simulator, vehicle}) => {
    widgets.register(
        "GoogleMapDirections",
        GoogleMapsFromSignal(
            [
                {
                    "lat": 10.030342,
                    "lng": 105.751816
                },
                {
                    "lat": 10.030751,
                    "lng": 105.752240
                },
            ],
            vehicle,
            { iterate: true }
        )
    )
    simulator("Vehicle.CurrentLocation.Latitude", "get", async () => {
        return 10.030342
    })
    simulator("Vehicle.CurrentLocation.Longitude", "get", async () => {
        return 105.751816
    })
}

export default GoogleMapsPlugin