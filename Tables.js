const stat = ["available","occupied","bussing"]
const tables = [
    { tableNumber: 1, status: 0 },
    { tableNumber: 2, status: 1 },
    { tableNumber: 3, status: 2 }
]

function displayTables() {
    const chart = document.getElementById("table-chart")
    chart.style.display = "flex"
    chart.style.justifyContent = "space-between"
    chart.innerHTML = ''
    tables.forEach(table => {
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = `Table ${table.status + 1}`
        const button = document.createElement("button")
        button.style.height = "500px"
        button.style.width = "500px"
        const h1 = document.createElement("h1")
        h1.innerText = stat[table.status]
        button.appendChild(h1)
        button.addEventListener("click", () => {
            table.status = (table.status + 1) % 3
            h1.innerText = stat[table.status]
        })
        div.appendChild(h2)
        div.appendChild(button)
        chart.appendChild(div)
    })
}

displayTables()