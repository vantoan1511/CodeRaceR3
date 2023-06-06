import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    const init = async () => {
        simulator("Vehicle.Speed", "get", async () => {
            return 0
        })
    }

    init()

    const set_speed = async () => {
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 60) {
            simulator("Vehicle.Speed", "get", async () => {
                return currentSpeed * 0.8
            })
        } else {
            simulator("Vehicle.Speed", "get", async () => {
                return currentSpeed * 1.05
            })
        }

    }



    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed","Vehicle.CurrentLocation.Latitude","Vehicle.CurrentLocation.Longitude","Vehicle.ADAS.EBA.IsError","Vehicle.ADAS.EBA.IsEnabled"],
        vehicle: vehicle,
        refresh: 500
    }));

    // simulator("Vehicle.Speed", "get", async () => {
    //     return 10
    // })

    return {
        start_simulation: (time) => {
            setInterval(async () => {
                set_speed()
            }, time);
        }
    }
}

export default plugin;