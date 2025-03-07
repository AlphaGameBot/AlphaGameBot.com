/**
 * Creates and populates a leaderboard row with user data
 * @param {Object} userData - The user data object
 * @param {number} userData.rank - User's rank position
 * @param {string} userData.username - Username
 * @param {string} userData.discriminator - User's discriminator (optional)
 * @param {string} userData.avatarUrl - URL to user's avatar (optional)
 * @param {number} userData.level - User's level
 * @param {number} userData.xp - User's XP points
 * @param {string} userData.serverName - Server name
 * @param {boolean} userData.isEvenRow - Whether this is an even row (for alternating colors)
 * @returns {HTMLTableRowElement} The populated table row
 */
function createLeaderboardRow(userData) {
    console.log("Row: ", userData);
    // Create table row
    const row = document.createElement('tr');
    
    // Apply alternating row background color
    if (userData.isEvenRow) {
        row.className = 'bg-gray-750';
    }
    
    // Format rank with medal for top 3
    let rankDisplay = `${userData.rank}`;
    if (userData.rank === 1) {
        rankDisplay = `<span class="text-yellow-400 font-bold">🥇 1</span>`;
    } else if (userData.rank === 2) {
        rankDisplay = `<span class="text-gray-300 font-bold">🥈 2</span>`;
    } else if (userData.rank === 3) {
        rankDisplay = `<span class="text-yellow-700 font-bold">🥉 3</span>`;
    }
    
    // Format XP with commas
    const formattedXP = userData.xp.toLocaleString();
    
    // Generate avatar element
    let avatarElement;
    if (userData.avatarUrl) {
        avatarElement = `<img class="h-10 w-10 rounded-full" src="${userData.avatarUrl}" alt="${userData.username}">`;
    } else {
        // Generate a colored avatar with first letter
        const colors = ['blue', 'green', 'purple', 'red', 'yellow', 'pink'];
        const colorIndex = Math.floor(userData.username.charCodeAt(0) % colors.length);
        const color = colors[colorIndex];
        const initial = userData.username.charAt(0).toUpperCase();
        
        avatarElement = `<div class="h-10 w-10 rounded-full bg-${color}-500 flex items-center justify-center">
            <span class="text-white font-bold">${initial}</span>
        </div>`;
    }
    
    // Discriminator display (if available)
    const discriminatorDisplay = userData.discriminator ? 
        `<div class="text-sm text-gray-400">#${userData.discriminator}</div>` : '';
    
    // Set the row HTML
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${rankDisplay}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    ${avatarElement}
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-white">${userData.username}</div>
                    ${discriminatorDisplay}
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-white">
                Level ${userData.level}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${formattedXP}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-white">${userData.serverName || 'Multiple Servers'}</td>
    `;
    
    return row;
}

/**
 * Populates the leaderboard table with the provided user data
 * @param {Array} users - Array of user data objects
 */
function populateLeaderboard(users) {
    const leaderboardTableBody = document.querySelector('#data-state tbody');
    
    // Clear existing rows
    leaderboardTableBody.innerHTML = '';
    
    // Add each user row
    users.forEach((userData, index) => {
        // Add isEvenRow property for alternating row colors
        userData.isEvenRow = index % 2 === 1;
        
        // Create and append the row
        const row = createLeaderboardRow(userData);
        leaderboardTableBody.appendChild(row);
    });
    
    // Hide loading state and show data
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('data-state').classList.remove('hidden');
    document.getElementById('pagination').classList.remove('hidden');
    document.getElementById('placeholder-note').classList.add('hidden');
}

/**
 * Shows an error state when data loading fails
 */
function showErrorState() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('data-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
    document.getElementById('pagination').classList.add('hidden');
    document.getElementById('placeholder-note').classList.add('hidden');
}

/**
 * Shows a no results state when search returns empty
 */
function showNoResultsState() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('data-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    document.getElementById('no-results-state').classList.remove('hidden');
    document.getElementById('pagination').classList.add('hidden');
    document.getElementById('placeholder-note').classList.add('hidden');
}

/**
 * Fetches leaderboard data from an API
 * @param {Object} options - Options for the API request
 */
function fetchLeaderboardData(options = {}) {
    // Show loading state
    document.getElementById('loading-state').classList.remove('hidden');
    document.getElementById('data-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    document.getElementById('no-results-state').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
    
    // In a real implementation, this would be an actual API call
    // For now, we'll simulate a network request with setTimeout
    setTimeout(() => {
        // Here's where you'd actually fetch data
        // fetch('https://api.example.com/leaderboard')    exampleUsers = undefined;
        //    .then(response => response.json())
        //    .then(data => populateLeaderboard(data))
        //    .catch(error => showErrorState());
        
        // For demo purposes, use the example data
        alert(1);
        populateLeaderboard(exampleUsers);
        
        // Update pagination info if needed
        document.getElementById('page-indicator').textContent = `Page 1 of 1`;
    }, 1500); // Simulate network delay
}

// Example usage - for testing purposes
document.addEventListener('DOMContentLoaded', () => {
    // Example users data (same as before)
    const exampleUsers = [
        {
            rank: 1,
            username: 'GamerKing',
            discriminator: '1234',
            level: 50,
            xp: 158245,
            serverName: 'Gaming Central',
            avatarUrl: 'https://cdn.discordapp.com/avatars/420052952686919690/e8c59787f38af8ea2bf39fc275d5d57d.png?size=512'
        },
        {
            rank: 2,
            username: 'PixelPro',
            discriminator: '5678',
            level: 48,
            xp: 142850,
            serverName: 'Awesome Guild'
        },
        {
            rank: 3,
            username: 'NinjaGamer',
            discriminator: '9012',
            level: 45,
            xp: 135620,
            serverName: 'Epic Gamers'
        },
        {
            rank: 4,
            username: 'Strategos',
            level: 42,
            xp: 124780,
            serverName: 'Strategy Masters'
        },
        {
            rank: 5,
            username: 'StreamerElite',
            discriminator: '7890',
            level: 40,
            xp: 115325,
            serverName: 'Streamer Haven'
        }
    ];

    // Set up retry button
    document.getElementById('retry-button').addEventListener('click', () => {
        fetchLeaderboardData();
    });
    
    // Setup tab switching for different leaderboards
    const tabs = document.querySelectorAll('.inline-flex button');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('bg-blue-600');
                t.classList.add('bg-gray-700');
            });
            
            // Add active class to clicked tab
            this.classList.add('bg-blue-600');
            this.classList.remove('bg-gray-700');
            
            // Fetch data for the selected tab
            const tabType = this.textContent.trim().toLowerCase();
            fetchLeaderboardData({ type: tabType });
            
            console.log(`Switched to ${tabType} leaderboard`);
        });
    });
    
    // Initial data fetch
    fetchLeaderboardData();
});
