const plugin = ({ widgets, simulator, vehicle }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62860.63879223682!2d105.75757035!3d10.03418695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1685950284409!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `

    widgets.register("map",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;