import GoogleMapsFromSignal from "reusable/GoogleMapsFromSignal.js"

const GoogleMapsPlugin = ({widgets, vehicle}) => {
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
}

export default GoogleMapsPlugin