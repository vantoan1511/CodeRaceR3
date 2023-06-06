const plugin = ({ widgets }) => {

    const div = document.createElement("div")
    div.innerHTML = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.2/socket.io.js"
    integrity="sha512-jMNwWSmjje4fjYut9MBGKXw5FZA6D67NHAuC9szpjbbjg51KefquNfvn4DalCbGfkcv/jHsHnPo1o47+8u4biA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
    var socket = io();
    </script>
    `

    widgets.register("client",
        (box) => {
            box.injectNode(div)
        }
    )
}

export default plugin;