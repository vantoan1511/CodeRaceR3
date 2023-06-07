import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    const init = async () => {
        simulator("Vehicle.Speed", "get", async () => {
            return 0
        })
    }

    init()

    const set_speed = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 60) {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed -= acc * 0.91
                return currentSpeed
            })
        } else {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed += acc * 1.07
                return currentSpeed
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