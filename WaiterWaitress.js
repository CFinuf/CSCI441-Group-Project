const items = [
    "cheeseburger",
    "pizza",
    "pasta",
    "fries",
    "salad",
    "soda"
]
const orders = [
    {tableNumber: 1, order: [0,0,0,0,0,0]},
    {tableNumber: 2, order: [0,0,0,0,0,0]},
    {tableNumber: 3, order: [0,0,0,0,0,0]}
]

const orderQueue = []

let currentTableIndex = -1;

document.getElementById("table1btn").addEventListener("click", () => {
    currentTableIndex = 0;
})
document.getElementById("table2btn").addEventListener("click", () => {
    currentTableIndex = 1;
})
document.getElementById("table3btn").addEventListener("click", () => {
    currentTableIndex = 2;
})

document.getElementById("cbbtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[0] += 1
    }
})
document.getElementById("pizzabtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[1] += 1
    }
})
document.getElementById("pastabtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[2] += 1
    }
})
document.getElementById("frybtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[3] += 1
    }
})
document.getElementById("saladbtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[4] += 1
    }
})
document.getElementById("sodabtn").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        orders[currentTableIndex].order[5] += 1
    }
})

document.getElementById("order").addEventListener("click", () => {
    if(currentTableIndex != -1) {
        let total = 0
        orders[currentTableIndex].order.forEach(num => {
            total += num
        })
        if(total != 0) {
            orderQueue.push(orders[currentTableIndex])
            addOrder()
        }
    }
})

const queue = document.getElementById("order-queue")
function addOrder() {
    queue.replaceChildren()
    if(orderQueue.length > 0) {
        orderQueue.forEach(o => {
            const div = document.createElement("div")
            div.style.display = "flex"
            div.style.minWidth = "50%"
            const button = document.createElement("button")
            button.innerText = "remove"
            button.addEventListener("click", () => {
                queue.removeChild(div)
                orderQueue.splice(o.tableNumber - 1,1)
            })
            let text = ""
            const h2 = document.createElement("h2")
            h2.innerText = `Table ${o.tableNumber}`
            const p = document.createElement("p")
            for(let i=0;i<o.order.length;i++) {
                if(o.order[i] > 0) {
                    text += o.order[i] + " " + items[i] + ", "
                }
            }
            p.innerText = text
            div.appendChild(button)
            div.appendChild(h2)
            div.appendChild(p)
            queue.appendChild(div)
        })
    }
}

// need to add functionality for when an order is ready for pickup to bring to tables