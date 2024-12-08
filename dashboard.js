// Function to format date to MM/DD/YYYY
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

// Retrieve travel information from local storage
const username = localStorage.getItem('currentUser '); // Ensure there are no trailing spaces
const destination = localStorage.getItem(`${username}_destination`);
const startDateString = localStorage.getItem(`${username}_startDate`);
const endDateString = localStorage.getItem(`${username}_endDate`);

// Convert start and end dates to Date objects
const startDate = new Date(startDateString);
const endDate = new Date(endDateString);

// Check if the data exists
if (destination && startDateString && endDateString) {
    // Set the trip information
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() + 1); // Adjust for display

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Adjust for display

    document.getElementById('tripInfo').innerText = `${username}'s Trip to ${destination}!`;
    document.getElementById('tripDates').innerText = `${formatDate(adjustedStartDate)} - ${formatDate(adjustedEndDate)}`;
} else {
    // Handle case where no data is found
    document.getElementById('tripInfo').innerText = 'No trip information found.';
    document.getElementById('tripDates').innerText = '';
}

// Function to display the weather forecast for a week
function displayWeatherForecast(startDate) {
    const weatherForecast = document.getElementById('weatherForecast');
    weatherForecast.innerHTML = ''; // Clear previous forecast

    // Create a week view (7 days)
    for (let i = 1; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        // Format date and day
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
        const dayName = currentDate.toLocaleString('default', { weekday: 'long' });

        // Create a weather day element
        const weatherDay = document.createElement('div');
        weatherDay.className = 'weatherDay';
        weatherDay.innerHTML = `
            <div>${formattedDate}</div>
            <div>${dayName}</div>
            <div>°C</div> <!-- Placeholder for temperature -->
        `;

        weatherForecast.appendChild(weatherDay);
    }
}

// Initialize the weather forecast display to start on the trip's start date
displayWeatherForecast(startDate);

// Navigation buttons functionality
document.getElementById('prevWeek').addEventListener('click', function () {
    startDate.setDate(startDate.getDate() - 7);
    displayWeatherForecast(startDate);
});

document.getElementById('nextWeek').addEventListener('click', function () {
    startDate.setDate(startDate.getDate() + 7);
    displayWeatherForecast(startDate);
});
