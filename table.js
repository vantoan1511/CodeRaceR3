import StatusTable from "./reusable/StatusTable.js"

const plugin = ({ widgets, simulator, vehicle }) => {

    widgets.register("Table", StatusTable({
        apis: ["Vehicle.Speed"],
        vehicle: vehicle,
        refresh: 500
    }));
}

export default plugin;