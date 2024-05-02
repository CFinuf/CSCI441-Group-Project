//Written by: Dustin Riley
//Tested by: Dustin Riley
//Debugged by: Dustin Riley
let tables = []
let resList = []
const stat = ["available","occupied","bussing"]
const resListDiv = document.getElementById("reservation-list")
const alertsh2 = document.getElementById("alerts")

async function checkReserved(tableNumber) {
    await getReservationList()
    for(let i=0;i<resList.length;i++) {
        if(resList[i].tableNumber === tableNumber) {
            return 1
        }
    }
    return -1
}

async function displayTables() {
    const chart = document.getElementById("table-chart")
    chart.style.display = "flex"
    chart.style.justifyContent = "space-between"
    chart.innerHTML = ''
    tables.forEach(table => {
        const div = document.createElement("div")
        if(table.status === 0) {
            div.style.backgroundColor = "green"
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
            if(await checkReserved(table.tableNumber) === -1) {
                if(table.status === 0) {
                    table.status = 1;
                    await fetch('https://torpid-closed-robe.glitch.me/tables', {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(table)
                    })
                    getTables()
                    alertsh2.innerText = ""
                }
            } else {
                alertsh2.innerText = `Table ${table.tableNumber} is reserved`
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

async function getReservationList() {
    const result = await fetch("https://torpid-closed-robe.glitch.me/reservations")
    resList = await result.json()
}

async function displayReservationList() {
    await getReservationList()
    resListDiv.replaceChildren()
    const h2 = document.createElement("h2")
    let text = ""
    resList.forEach(r => {
        text += "Table " + r.tableNumber + " " + r.name + "\n"
    })
    h2.innerText = text
    resListDiv.appendChild(h2)
    setTimeout(displayReservationList, 5000)
}

displayReservationList()