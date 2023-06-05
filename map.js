const plugin = ({ widgets, simulator, vehicle }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d502.58320866212387!2d105.75196985854758!3d10.03059120532462!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1685951169349!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `

    widgets.register("map",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;