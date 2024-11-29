
document.addEventListener('DOMContentLoaded', () => {
    const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID'; // or dynamically obtain the chat ID
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Function to send message to Telegram bot
    function sendMessage(message) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    // Retrieve user data from Telegram
    const telegramData = window.Telegram.WebApp.initDataUnsafe;

    if (telegramData) {
        const user = telegramData.user; // User data
        document.getElementById('username').textContent = user.username || 'User'; // Set username
        document.getElementById('profile-picture').src = user.photo_url || 'default-profile-pic.jpg'; // Set profile picture
    }

    const currentPage = document.title.toLowerCase();

    if (currentPage.includes("dashboard")) {
        const balanceElement = document.querySelector('#balance span');
        const balance = 100; // Replace with your actual balance logic
        balanceElement.textContent = balance; // Ensure 'balance' variable is defined
    }

    if (currentPage.includes("mining")) {
        document.getElementById('startMining').addEventListener('click', () => {
            // Disable the button to prevent multiple clicks
            const startMiningButton = document.getElementById("startMining");
            startMiningButton.disabled = true;
            document.getElementById("miningStatus").textContent = "Mining in progress...";
            
            // Send a message to the bot
            sendMessage("Mining has started.");

            // Set the countdown duration (24 hours in seconds)
            let countdownDuration = 24 * 60 * 60; // 24 hours
            let endTime = Date.now() + countdownDuration * 1000; // end time in milliseconds

            // Show the countdown div
            document.getElementById("countdown").style.display = "block";

            // Update the timer every second
            let timerInterval = setInterval(() => {
                let remainingTime = endTime - Date.now();
                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    document.getElementById("miningStatus").textContent = "You can mine again now!";
                    document.getElementById("timer").textContent = "";
                    startMiningButton.disabled = false; // Re-enable the button
                } else {
                    let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    document.getElementById("timer").textContent = `${hours}h ${minutes}m ${seconds}s`;
                }
            }, 1000);
        });
    }

    if (currentPage.includes("transactions")) {
        const transactionList = document.getElementById('transactionList');
        const transactions = ["Transaction 1", "Transaction 2"]; // Simulate fetching transactions
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = transaction;
            transactionList.appendChild(li);
        });
    }
});






    function openSocialLink(url, fallback) {
        var appLink = document.createElement('a');
        appLink.href = url;
        appLink.target = '_blank';
        
        // Set a timer to open the fallback link if the app link doesn't work
        var timer = setTimeout(function() {
            window.location.href = fallback;
        }, 2500); // Adjust the timeout duration as needed

        appLink.onclick = function() {
            clearTimeout(timer); // Clear the timer if the app link works
        };

        appLink.click(); // Trigger the click
    }







/

document.addEventListener('DOMContentLoaded', function () {
const offlineMessage = document.getElementById('offline-message');

// Function to show offline message
    function showOfflineMessage() {
        offlineMessage.style.display = 'flex';  // Show the offline message
    }

// Function to hide offline message
    function hideOfflineMessage() {
        offlineMessage.style.display = 'none';  // Hide the offline message
    }

    // Check if user is offline when page loads
    if (!navigator.onLine) {
        showOfflineMessage();
    }

    // Listen for the online and offline events
    window.addEventListener('online', hideOfflineMessage);
    window.addEventListener('offline', showOfflineMessage);
});



