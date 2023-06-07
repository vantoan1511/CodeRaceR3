import GoogleMapsFromSignal from "./reusable/GoogleMapsFromSignal.js"

const GoogleMapsPlugin = ({ widgets, simulator, vehicle }) => {

    const lat_a = 10.030342
    const lat_b = 10.030751
    const lng_a = 105.751816
    const lng_b = 105.752240

    const init = async () => {
        simulator("Vehicle.CurrentLocation.Latitude", "get", async () => {
            return lat_a
        })
        simulator("Vehicle.CurrentLocation.Longitude", "get", async () => {
            return lng_a
        })
    }

    init()

    widgets.register(
        "GoogleMapDirections",
        GoogleMapsFromSignal(
            [
                {
                    "lat": lat_a,
                    "lng": lng_a
                },
                {
                    "lat": lat_b,
                    "lng": lng_b
                },
            ],
            vehicle,
            { iterate: true }
        )
    )

    const set_location = async () => {
        var lat = await vehicle.CurrentLocation.Latitude.get()
        var lng = await vehicle.CurrentLocation.Longitude.get()
        if (lat < lat_b && lng < lng_b) {
            lat += 0.000001
            lng += 0.000001
            simulator("Vehicle.CurrentLocation.Latitude", "get", async () => {
                return lat
            })
            simulator("Vehicle.CurrentLocation.Longitude", "get", async () => {
                return lng
            })
        }
    }

    return {
        start_simulation: (time) => {
            setInterval(async () => {
                set_location()
            }, time);
        }
    }
}

export default GoogleMapsPlugin