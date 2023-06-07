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
            lat += 0.0001
            lng += 0.0001
            simulator("Vehicle.CurrentLocation.Latitude", "get", async () => {
                return lat
            })
            simulator("Vehicle.CurrentLocation.Longitude", "get", async () => {
                return lng
            })
        } else {
            init()
        }
    }

    const case_1 = async (time) => {
        setInterval(set_location, time)
        var intervalId = setInterval(set_location, time)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 13000);
    }

    const case_2 = async (time) => {
        setInterval(async () => {
            set_location()
        }, time);
    }

    return {
        start_simulation: (time, caseId) => {
            switch (caseId) {
                case 1:
                    case_1(time)
                    break;
                case 2:
                    case_2(time)
                    break;
                default:
                    break;
            }
        }
    }
}

export default GoogleMapsPlugin