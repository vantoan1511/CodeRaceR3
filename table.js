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
        simulator("Vehicle.Speed", "get", async () => {
            currentSpeed += acc * 0.49
            return currentSpeed
        })
    }

    const slowDown = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 0) {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed -= acc * 1.1
                return currentSpeed
            })
        }
        else {
            simulator("Vehicle.Speed", "get", async () => {
                return 0
            })
        }
    }

    const set_speed = async () => {
        const acc = 5
        var currentSpeed = await vehicle.Speed.get()
        if (currentSpeed > 40) {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed -= acc * 1.1
                return currentSpeed
            })
        } else {
            simulator("Vehicle.Speed", "get", async () => {
                currentSpeed += acc * 0.49
                return currentSpeed
            })
        }

    }

    const case_1 = async (time) => {
        var intervalId = setInterval(set_speed, time);
        setTimeout(() => {
            clearInterval(intervalId)
        }, 11000);
    }

    const case_2 = async (time) => {
        var intervalId = setInterval(set_speed, time)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 4000);
        var intervalId2 = setInterval(slowDown, time)
        setTimeout(() => {
            clearInterval(intervalId2)
        }, 4000);
        var intervalId3 = setInterval(set_speed, time)
        setTimeout(() => {
            clearInterval(intervalId3)
        }, 3000);
    }

    const case_3 = async (time) => {
        var intervalId = setInterval(set_speed, time)
        setTimeout(() => {
            clearInterval(intervalId)
        }, 2000);
        var intervalId2 = setInterval(slowDown, time)
        setTimeout(() => {
            clearInterval(intervalId2)
        }, 2000);
        var intervalId3 = setInterval(() => {
            simulator("Vehicle.Speed", "get", async () => {
                return 0
            })
        }, time)
        setTimeout(() => {
            clearInterval(intervalId3)
        }, 1000);
        var intervalId4 = setInterval(set_speed, time)
        setTimeout(() => {
            clearInterval(intervalId4)
        }, 6000);
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
                case 3:
                    case_3(time)
                    break;
                default:
                    break;
            }
        }
    }
}

export default plugin;