import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    const init = async () => {
        simulator("Vehicle.Speed", "get", async () => {
            return 0
        })
        simulator("Vehicle.ADAS.EBA.IsError", "get", async () => {
            return false
        })
    }

    init()

    const speedUp = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed < 40) {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed += acc * 1.07
                return currentSpeed
            })
        }
    }

    const slowDown = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 40) {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed -= acc * 0.88
                return currentSpeed
            })
        }
    }

    const set_speed = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 40) {
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

    const case_1 = async (time) => {
        setInterval(() => {
            set_speed()
        }, time);
    }

    const case_2 = async (time) => {
        var intervalId = setInterval(set_speed, 1000)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 4000);
        intervalId = setInterval(slowDown, 1000)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 4000);
        intervalId = setInterval(set_speed, 1000)
    }

    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed", "Vehicle.CurrentLocation.Latitude", "Vehicle.CurrentLocation.Longitude", "Vehicle.ADAS.EBA.IsError", "Vehicle.ADAS.EBA.IsEnabled"],
        vehicle: vehicle,
        refresh: 1000
    }));

    // simulator("Vehicle.Speed", "get", async () => {
    //     return 10
    // })

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

export default plugin;