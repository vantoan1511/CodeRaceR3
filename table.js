import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed", "Vehicle.TripMeterReading", "Vehicle.Acceleration.Lateral", "Vehicle.Acceleration.Longitudinal", "Vehicle.Acceleration.Vertical", "Vehicle.AngularVelocity.Roll", "Vehicle.AngularVelocity.Pitch", "Vehicle.AngularVelocity.Yaw", "Vehicle.CurrentLocation.Latitude", "Vehicle.CurrentLocation.Longitude"],
        vehicle: vehicle,
        refresh: 1000
    }));

    let sim_function;
    simulator("Vehicle.Speed", "subscribe", async ({ func, args }) => {
        sim_function = args[0]
    })

    return {
        start_simulation: (time, skip = 1) => {
            sim_intervalId = setInterval(async () => {
                for (let i = 0; i < skip; i++) {
                    await vehicle.Next.get()
                }
                sim_function()
            }, time)
        }
    }
}

export default plugin;