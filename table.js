import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed"],
        vehicle: vehicle,
        refresh: 500
    }));

    let sim_function;
    simulator("Vehicle.Speed", "subscribe", async ({ func, args }) => {
        sim_function = args[0]
    })

    simulator("Vehicle.Speed", "get", async () => {
        return (parseFloat(parseFloat(VSSdata[index]["Vehicle.Speed"]).toFixed() * 3.6).toFixed(2) + " km/h");
    })

    return {
        start_simulation: (time, skip = 1) => {
            let sim_intervalId = setInterval(async () => {
                for (let i = 0; i < skip; i++) {
                    await vehicle.Next.get()
                }
                sim_function()
            }, time)
        }
    }
}

export default plugin;