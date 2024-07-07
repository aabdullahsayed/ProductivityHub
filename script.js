function markVisited(siteId) 
{
    localStorage.setItem(siteId, 'visited');
    updateStatus(siteId);
}

function updateStatus(siteId) {
    const statusElement = document.getElementById(siteId);
    if (localStorage.getItem(siteId) === 'visited') {
        statusElement.style.backgroundColor = 'green';
    } else {
        statusElement.style.backgroundColor = 'red';
    }
}

function initializeStatuses() {
    const sites = ['codeforces', 'tryhackme', 'kaggle', 'hackerrank', 'linkedin'];
    sites.forEach(siteId => {
        updateStatus(siteId);
    });
}

document.addEventListener('DOMContentLoaded', initializeStatuses);
