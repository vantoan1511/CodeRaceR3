import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    const init = async () => {
        simulator("Vehicle.Speed", "get", async()=>{
            return 10
        })
    }

    init()

    const set_speed = async () => {
        var currentSpeed = await vehicle.Speed.get()
        simulator("Vehicle.Speed", "get", async()=>{
            return currentSpeed*1.15
        })
    }



    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed"],
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