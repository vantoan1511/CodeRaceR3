const plugin = ({ widgets, simulator, vehicle }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    <input type="text" placeholder="Nhap tai day">
    `

    widgets.register("test",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;