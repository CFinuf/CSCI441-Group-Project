//Written by: Dustin Riley
//Tested by: Dustin Riley
//Debugged by: Dustin Riley
let tables = []
let resList = []
const stat = ["available","occupied","bussing"]
const alertsh2 = document.getElementById("alerts")
const procRes = document.getElementById("process-reservation")
const resListDiv = document.getElementById("reservation-list")
const addRes = document.getElementById("addRes")
const form = document.getElementById("add-reservation")

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
        h2.innerText = `Table ${table.tableNumber}`
        const button = document.createElement("button")
        const h1 = document.createElement("h1")
        h1.innerText = stat[table.status]
        button.appendChild(h1)
        button.addEventListener("click", async () => {
            const index = await checkReserved(table.tableNumber) // get the index of resList for this table, -1 not found
            if(index === -1) { // if no reservation for this table found in resList
                if(table.status === 0) { // if table is available
                    table.status = 1 // change table status to occupied
                    await fetch('https://torpid-closed-robe.glitch.me/tables', { // update tables database
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(table)
                    })
                    getTables() // refreshes table chart and reservation list
                    alertsh2.innerText = "" // if there was an alert get rid of it
                }
            } else {
                alertsh2.innerText = `Table ${table.tableNumber} is reserved` // checkReserved came back with an index
                procRes.style.display = "block" // display the reservation processing form
                // have form event here for the table.tableNumber needed for checkReserved()
                procRes.addEventListener("submit", async (event) => { // on reservation processing form submit
                    event.preventDefault() // prevent the normal form action
                    const procResData = new FormData(procRes) // get the form data
                    for(let pair of procResData.entries()) { // loop through the form data entries
                        if(pair[1].toLowerCase() === resList[index].name.toLowerCase()) { // check if name given matches the table reservation name
                            await fetch("https://torpid-closed-robe.glitch.me/reservations", { // delete reservation from reservation database
                                method: "DELETE",
                                headers: {
                                "Content-Type": "application/json"
                                },
                                body: JSON.stringify(resList[index])
                            })
                            table.status = 1 // change table status to occupied
                            await fetch('https://torpid-closed-robe.glitch.me/tables', { // update tables database
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(table)
                            })
                            alertsh2.innerText = "" // if there was an alert get rid of it
                            procRes.style.display = "none" // hide the reservation processing form
                            getTables() // refreshes table chart and reservation list
                        } else {
                            alertsh2.innerText = `${pair[1]} does not match the name reserved for ${table.tableNumber}`
                        }
                    }
                })
            }
        })
        div.appendChild(h2)
        div.appendChild(button)
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
    resList.forEach(r => {
        const div = document.createElement("div")
        div.style.display = "flex"
        div.style.justifyContent = "space-between"
        const h2 = document.createElement("h2")
        h2.innerText = "Table " + r.tableNumber + " " + r.name + "\n"
        const cancelRes = document.createElement("button")
        cancelRes.innerText = "cancel"
        cancelRes.addEventListener("click", async () => {
            await fetch("https://torpid-closed-robe.glitch.me/reservations", {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(r)
            })
        })
        div.appendChild(h2)
        div.appendChild(cancelRes)
        resListDiv.appendChild(div)
    })
    setTimeout(displayReservationList, 5000)
}

addRes.innerText = "Add Reservation"
addRes.addEventListener("click", () => {
    form.style.display = "block"
})

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    await fetch("https://torpid-closed-robe.glitch.me/reservations", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    form.style.display = "none"
    displayReservationList()
})

displayReservationList()