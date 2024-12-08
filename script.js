// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists in localStorage
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        // Successful login
        localStorage.setItem('currentUser ', username); // Store the current user
        window.location.href = 'dashboard.html'; // Redirect to dashboard after login
    } else {
        // Show alert if the credentials do not match
        alert("Username or password does not match, try again or Sign Up!");
        // Clear the input fields
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    }
});

// Handle signup form submission
document.getElementById('signupForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the user already exists
    if (localStorage.getItem(username)) {
        // User already exists
        document.getElementById('authMessage').innerText = 'Username already taken. Please choose another, or try logging in.';
        // Clear the input fields
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupPassword').value = '';
    } else {
        // Store the new user
        localStorage.setItem(username, password);
        // Store the username for later use
        localStorage.setItem('currentUser ', username);
        window.location.href = 'travel-info.html'; // Redirect to travel info page after signup
    }
});

// Handle travel info form submission
document.getElementById('travelInfoForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Store the values in local storage
    const currentUser = localStorage.getItem('currentUser ');
    localStorage.setItem(`${currentUser}_destination`, destination);
    localStorage.setItem(`${currentUser}_startDate`, startDate);
    localStorage.setItem(`${currentUser}_endDate`, endDate);

    // Redirect to the dashboard page
    window.location.href = 'dashboard.html';
});

// Pre-fill the travel info form if the user is returning
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem('currentUser ');
    if (currentUser) {
        const destination = localStorage.getItem(`${currentUser}_destination`);
        const startDate = localStorage.getItem(`${currentUser}_startDate`);
        const endDate = localStorage.getItem(`${currentUser}_endDate`);

        if (destination) document.getElementById('destination').value = destination;
        if (startDate) document.getElementById('startDate').value = startDate;
        if (endDate) document.getElementById('endDate').value = endDate;
    }
});
