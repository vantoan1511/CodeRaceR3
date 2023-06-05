const plugin = ({ widgets, simulator, vehicle }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    <div>
    Hello World!
    </div>
    `

    widgets.register("test",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;