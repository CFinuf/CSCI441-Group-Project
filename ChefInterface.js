const tables = [
    { tableNumber: 1, orders: [{ dish: 'Cheeseburger', time: 5 }, { dish: 'Fries', time: 3 }] },
    { tableNumber: 2, orders: [{ dish: 'Pizza', time: 8 }, { dish: 'Salad', time: 4 }] },
    { tableNumber: 3, orders: [{ dish: 'Pasta', time: 6 }, { dish: 'Soda', time: 2 }] }
];

let currentTableIndex = 0;
let currentDishIndex = 0;
let timer;

function displayCurrentOrder() {
    const currentOrder = tables[currentTableIndex].orders[currentDishIndex];
    document.getElementById('current-order').innerText = `Table ${tables[currentTableIndex].tableNumber}: ${currentOrder.dish} (${currentOrder.time} seconds)`;
}

function loadNextTable() {
    if (currentDishIndex < tables[currentTableIndex].orders.length - 1) {
        currentDishIndex++;
        startTimer();
    } else {
        tables.splice(currentTableIndex, 1);
        if (currentTableIndex < tables.length) {
            currentDishIndex = 0;
            displayCurrentOrder();
            displayQueue();
            startTimer();
        } else {
            document.getElementById('current-order').innerText = 'No more orders in the queue';
        }
    }
}

function startTimer() {
    let timeLeft = tables[currentTableIndex].orders[currentDishIndex].time;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = timeLeft + " seconds";

    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            timerDisplay.innerText = timeLeft + " seconds";
        } else {
            clearInterval(timer);
            timerDisplay.innerText = "Timer Expired!";
            loadNextTable();
            displayQueue();
        }
    }, 1000);
}


function displayQueue() {
    const tableList = document.getElementById('table-list');
    tableList.innerHTML = '';
    tables.forEach(table => {
        const li = document.createElement('li');
        li.textContent = `Table ${table.tableNumber}: ${table.orders.map(order => `${order.dish} (${order.time} seconds)`).join(', ')}`;
        tableList.appendChild(li);
    });
}

function clearTable() {
    tables.splice(currentTableIndex, 1);
    if (currentTableIndex < tables.length) {
        currentDishIndex = 0;
        displayCurrentOrder();
        displayQueue();
        startTimer();
    } else {
        document.getElementById('current-order').innerText = 'No more orders in the queue';
    }
}

document.getElementById('complete-btn').addEventListener('click', function() {
    clearInterval(timer);
    clearTable();
    displayQueue();
});

document.getElementById('start-btn').addEventListener('click', function() {
    startTimer();
});

// Initial display of the first table's order
displayCurrentOrder();
displayQueue();
// Timer starts automatically
startTimer();
