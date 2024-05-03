//Written by: Dustin Riley
//Tested by: Dustin Riley
//Debugged by: Dustin Riley
const items = [
    "cheeseburger",
    "pizza",
    "pasta",
    "fries",
    "salad",
    "soda"
]
let tables = []
let order = {}
let orderQueue = []
let currentTableIndex = 0;
const alerts = document.getElementById("alerts")
const orderDiv = document.getElementById("order-display")
const tablesDiv = document.getElementById("tableButtons")
const menuDiv = document.getElementById("menu")
const queue = document.getElementById("order-queue")

function displayOrder() {
    orderDiv.replaceChildren()
    const tn = document.createElement("h2")
    tn.innerText = "Table " + currentTableIndex
    orderDiv.appendChild(tn)
    if(Object.keys(order).length !== 0) {
        for(let i=0;i<order.order.length;i++) {
            const div = document.createElement("div")
            div.style.display = "flex"
            div.style.justifyContent = "space-between"
            const p = document.createElement("p")
            p.innerText = order.order[i].quantity + " " + order.order[i].dish + "\n"
            const bDiv = document.createElement("div")
            const mbutton = document.createElement("button")
            mbutton.innerText = " - "
            mbutton.addEventListener("click", () => { // remove 1 quantity
                if(order.order[i].quantity === 1) { // quantity will become 0 so remove it from array
                    order.order.splice(i,1)
                } else {
                    order.order[i].quantity -= 1
                }
                displayOrder()
            })
            const pbutton = document.createElement("button")
            pbutton.addEventListener("click", () => {
                order.order[i].quantity += 1
                displayOrder()
            })
            pbutton.innerText = " + "
            bDiv.appendChild(mbutton)
            bDiv.appendChild(pbutton)
            div.appendChild(p)
            div.appendChild(bDiv)
            orderDiv.appendChild(div)
        }
    }
}

function findQueueIndexByTableNumber(tableNumber) {
    for(let i=0;i<orderQueue.length;i++) {
        if(orderQueue[i].tableNumber === tableNumber) {
            return i
        }
    }
    return -1
}

function findOrderIndex(itemIndex) { // since order items can be added in any order
    for(let i=0;i<order.order.length;i++) { // search thru order array for
        if(order.order[i].dish === items[itemIndex]) { // the same dish as items[itemIndex]
            return i
        }
    }
    return -1
}

function findTable(tableNumber) {
    for(let i=0;i<tables.length;i++) {
        if(tables[i].tableNumber === tableNumber) {
            return i
        }
    }
}

function setTableNumber(tableNumber) { // change the currentTableIndex
    currentTableIndex = tableNumber;
    if(Object.keys(order).length !== 0) { // if order has already been started but the wrong tableNumber was used
        order.tableNumber = tableNumber // change it
    }
    displayOrder()
}

for(let i=0;i<10;i++) { // dynamically add table buttons
    const button = document.createElement('button')
    button.innerText = "Table " + (i + 1)
    button.addEventListener("click", () => {setTableNumber(i+1)})
    tablesDiv.appendChild(button)
}

function addItemToOrder(itemIndex) {
    if(currentTableIndex !== 0) { // table needs to be selected first
        if(Object.keys(order).length === 0) { // if order is empty
            order = {
                tableNumber: currentTableIndex,
                order: [{dish: items[itemIndex], quantity: 1}],
                status: 0
            }
        } else if(findOrderIndex(itemIndex) !== -1) { // if itemIndex food found in order list
            order.order[findOrderIndex(itemIndex)].quantity += 1 // add 1 to quantity of items[itemIndex]
        } else {
            order.order.push({dish: items[itemIndex], quantity: 1}) // push new item to order array
        }
    }
    displayOrder()
}

for(let i=0;i<items.length;i++) { // dynamically add item buttons
    const ibutton = document.createElement('button')
    ibutton.innerText = items[i]
    ibutton.addEventListener("click", () => {addItemToOrder(i)})
    menuDiv.appendChild(ibutton)
}

document.getElementById("orderBtn").addEventListener("click", async () => {
    if(currentTableIndex !== 0 && order) {
        await getTables()
        const index = findTable(currentTableIndex)
        if(tables[index].status !== 1) {
            alerts.innerText = `Error: Table ${currentTableIndex} is not occupied`
            return
        }
        await getOrders() // update ordersQueue for findOrderIndexByTableNumber
        if(findQueueIndexByTableNumber(currentTableIndex) !== -1) { // check if there already is an order at this table
            alerts.innerText = `Error: Table ${currentTableIndex} already has an order`
            return
        }
        await fetch("https://torpid-closed-robe.glitch.me/orders", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        getOrders() // updates display
        order = {} // reset order
        orderDiv.replaceChildren() // reset order display
        currentTableIndex = 0; // reset currentTableIndex
    }
})

document.getElementById("cancelBtn").addEventListener("click", () => {
    order = {} // reset order
    orderDiv.replaceChildren() // reset order display
    currentTableIndex = 0; // reset currentTableIndex
})

async function displayOrders() { // displays orderQueue fetched from the database
    queue.replaceChildren() // reset
    if(orderQueue.length > 0) {
        orderQueue.forEach(o => {
            const div = document.createElement("div")
            div.style.display = "flex"
            div.style.flexDirection = "row"
            div.style.minWidth = "48%"
            const h2 = document.createElement("h2")
            h2.innerText = `Table ${o.tableNumber}`
            const p = document.createElement("p")
            let text = ""
            for(let i=0;i<o.order.length;i++) {
                text += o.order[i].quantity + " " + o.order[i].dish + "\n"
            }
            p.innerText = text
            div.appendChild(h2)
            div.appendChild(p)
            switch(o.status) {
                case 1:
                    div.style.backgroundColor = "red"
                    const dbutton = document.createElement("button")
                    dbutton.innerText = "delivered"
                    dbutton.addEventListener("click", async () => {
                        o.status = 2
                        await fetch("https://torpid-closed-robe.glitch.me/orders", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(o)
                        })
                        getOrders()
                    })
                    div.appendChild(dbutton)
                    break;
                case 2:
                    div.style.backgroundColor = "green"
                    const pbutton = document.createElement("button")
                    pbutton.innerText = "paid"
                    pbutton.addEventListener("click", async () => {
                        await fetch("https://torpid-closed-robe.glitch.me/orders", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(o)
                        })
                        await getTables()
                        let index = findTable(o.tableNumber)
                        tables[index].status = 2
                        await fetch("https://torpid-closed-robe.glitch.me/tables", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(tables[index])
                        })
                        getOrders()
                    })
                    div.appendChild(pbutton)
                    // or save it to order archive first
                    break;
                default:
                    break;
            }
            queue.appendChild(div)
        })
    }
}

async function getTables() {
    const result = await fetch("https://torpid-closed-robe.glitch.me/tables")
    tables = await result.json()
}

async function getOrders() {
    const result = await fetch("https://torpid-closed-robe.glitch.me/orders")
    orderQueue = await result.json()
    if(orderQueue.length > 0) {
        displayOrders()
    }
    await getTables()
    setTimeout(getOrders,5000)
}

getOrders()