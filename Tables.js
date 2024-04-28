let tables = []
const stat = ["available","occupied","bussing"]

async function updateTable(data) {
    const result = await fetch('https://torpid-closed-robe.glitch.me/tables', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const ret = await result.json()
    return ret
}

async function displayTables() {
    const chart = document.getElementById("table-chart")
    chart.style.display = "flex"
    chart.style.justifyContent = "space-between"
    chart.innerHTML = ''
    tables.forEach(table => {
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        const div2 = document.createElement("div")
        h2.innerText = `Table ${table.tableNumber}`
        const button = document.createElement("button")
        button.style.height = "100%"
        button.style.width = "100%"
        const h1 = document.createElement("h1")
        h1.innerText = stat[table.status]
        button.appendChild(h1)
        button.addEventListener("click", async () => {
            let data = {
                _id: table._id,
                tableNumber: table.tableNumber,
                status: (table.status+1)%3
            }
            table = await updateTable(data)
            h1.innerText = stat[table.status]
        })
        div2.appendChild(button)
        div.appendChild(h2)
        div.appendChild(div2)
        chart.appendChild(div)
    })
}

async function getTables() {
    const result = await fetch("https://torpid-closed-robe.glitch.me/tables")
    tables = await result.json()
    displayTables()
}

getTables()