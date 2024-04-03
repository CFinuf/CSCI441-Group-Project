// authentication.js

function authenticateAndRedirect(interface) {
    var password = prompt("Please enter the password for " + interface + ":");
    switch (interface) {
        case "chef":
            if (password === "chefpassword") {
                window.location.href = "chefInterface.html";
            } else {
                alert("Incorrect password for Chef interface!");
            }
            break;
        case "manager":
            if (password === "managerpassword") {
                window.location.href = "ManagerInterface.html";
            } else {
                alert("Incorrect password for Manager interface!");
            }
            break;
        case "busBoyBusGirl":
            if (password === "busboypassword") {
                window.location.href = "busBoybusGirlInterface.html";
            } else {
                alert("Incorrect password for Bus Boy/Bus Girl interface!");
            }
            break;
        case "hostHostess":
            if (password === "hostpassword") {
                window.location.href = "hostHostessInterface.html";
            } else {
                alert("Incorrect password for Host/Hostess interface!");
            }
            break;
        case "waiterWaitress":
            if (password === "waiterpassword") {
                window.location.href = "waiterWaitressInterface.html";
            } else {
                alert("Incorrect password for Waiter/Waitress interface!");
            }
            break;
        default:
            alert("Invalid interface!");
    }
}
