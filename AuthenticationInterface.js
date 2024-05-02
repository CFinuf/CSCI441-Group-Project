//Written by: Braulio Mercado
//Tested by: Braulio Mercado
//Debugged by: Braulio Mercado

// Declare users array in a broader scope
let users = [];

fetch('https://torpid-closed-robe.glitch.me/users')
  .then(response => response.json())
  .then(data => {
    users = data; // Store fetched data in the users array
    console.log(users); // Logging the retrieved data to console for verification
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to authenticate the user and redirect them to the appropriate interface
function authenticateAndRedirect() {
    // Get username and password from input fields
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if entered username and password are not null and not empty after trimming whitespace
    if (username.trim() !== "" && password.trim() !== "") {
        // Find the user in the fetched data array
        var user = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password.toLowerCase() === password.toLowerCase());

        // Check if user is found
        if (user) {
            // Redirect to the appropriate interface based on user's role
            switch (user.role) {
                case 1: // Manager
                    window.location.href = "ManagerInterface.html";
                    break;
                case 2: // Chef
                    window.location.href = "chefInterface.html";
                    break;
                case 3: // Busser
                    window.location.href = "busBoybusGirlInterface.html";
                    break;
                case 4: // Waiter
                    window.location.href = "WaiterWaitress.html";
                    break;
                case 5: // Host
                    window.location.href = "HostHostess.html";
                    break;
                default:
                    alert("Invalid role!");
            }
        } else {
            // If user not found, display invalid username or password alert
            alert("Invalid username or password!");
        }
    } else {
        // If username or password null or empty after trimming whitespace display alert
        alert("Username and password cannot be empty!");
    }
}

// Commenting out this line as it's causing the function to execute prematurely
// authenticateAndRedirect();
