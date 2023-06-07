import GoogleMapsFromSignal from "./reusable/GoogleMapsFromSignal.js"

const GoogleMapsPlugin = ({ widgets, simulator, vehicle }) => {

    const lat_a = 10.029486
    const lat_b = 10.031683
    const lng_a = 105.750977
    const lng_b = 105.753181

    const init = async () => {
        simulator("Vehicle.CurrentLocation.Latitude", "get", async () => {
            return lat_a
        })
        simulator("Vehicle.CurrentLocation.Longitude", "get", async () => {
            return lng_a
        })
    }

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
            lat += 0.00005
            lng += 0.00005
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
            init()
            setInterval(async () => {
                set_location()
            }, time);
        }
    }
}

export default GoogleMapsPlugin