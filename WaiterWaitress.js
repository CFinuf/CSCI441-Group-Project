const items = [
    "cheeseburger",
    "pizza",
    "pasta",
    "fries",
    "salad",
    "soda"
]
let order = {}
let orderQueue = []
let currentTableIndex = 0;
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
        const p = document.createElement("p")
        let text = ""
        for(let i=0;i<order.order.length;i++) {
            text += order.order[i].quantity + " " + order.order[i].dish + "\n"
        }
        p.innerText = text
        orderDiv.appendChild(p)
    }
}

function findIndexByTableNumber(tableNumber) {
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
        getOrders() // update ordersQueue for findIndexByTableNumber
        if(findIndexByTableNumber(currentTableIndex) !== -1) { // check if there already is an order at this table
            return  // do nothing
        } // might add in an html element with a message for errors / alerts
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

async function displayOrders() {
    queue.replaceChildren()
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
                        const result = await fetch("https://torpid-closed-robe.glitch.me/orders", {
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
                    // possibly implement pay button that will delete the order from database
                    // or save it to order archive first
                    break;
                default:
                    break;
            }
            queue.appendChild(div)
        })
    }
}

async function getOrders() {
    const result = await fetch("https://torpid-closed-robe.glitch.me/orders")
    orderQueue = await result.json()
    if(orderQueue.length > 0) {
        displayOrders()
    }
    setTimeout(getOrders,5000)
}

getOrders()