//Written by: Dustin Riley
//Tested by: Dustin Riley
//Debugged by: Dustin Riley
let tables = []
const stat = ["available","occupied","bussing"]
const busList = document.getElementById("bus-list")

async function displayTables() {
    const chart = document.getElementById("table-chart")
    chart.style.display = "flex"
    chart.style.justifyContent = "space-between"
    chart.innerHTML = ''
    tables.forEach(table => {
        const div = document.createElement("div")
        if(table.status === 2) {
            div.style.backgroundColor = "red"
        }
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
            if(table.status === 2) {
                table.status = 0;
                await fetch('https://torpid-closed-robe.glitch.me/tables', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(table)
                })
                getTables()
            }
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
    setTimeout(getTables,5000)
}

getTables()

function displayBussableTables() {
    busList.replaceChildren()
    const h2 = document.createElement("h2")
    let text = ""
    tables.forEach(t => {
        if(t.status === 2) {
            text += "Table " + t.tableNumber + "\n"
        }
    })
    h2.innerText = text
    busList.appendChild(h2)
    setTimeout(displayBussableTables, 5000)
}

displayBussableTables()