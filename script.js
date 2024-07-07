function markVisited(siteId) {
    const now = new Date();
    localStorage.setItem(`${siteId}-lastVisit`, now.toISOString());
    updateStatus(siteId);
    updateVisitTimes(siteId, now);
    updateStreak(siteId);
}

function updateStatus(siteId) {
    const statusElement = document.getElementById(siteId);
    if (localStorage.getItem(`${siteId}-lastVisit`)) {
        statusElement.style.backgroundColor = 'green';
    } else {
        statusElement.style.backgroundColor = 'red';
    }
}

function updateVisitTimes(siteId, now) {
    const visitTimesElement = document.getElementById(`${siteId}-times`);
    let visitTimes = JSON.parse(localStorage.getItem(`${siteId}-visitTimes`)) || [];
    visitTimes.push(now.toISOString());
    localStorage.setItem(`${siteId}-visitTimes`, JSON.stringify(visitTimes));
    visitTimesElement.textContent = `Visits: ${visitTimes.length}`;
}

function updateStreak(siteId) {
    const streakElement = document.getElementById(`${siteId}-streak`);
    const visitTimes = JSON.parse(localStorage.getItem(`${siteId}-visitTimes`)) || [];
    let streak = 0;
    let lastDate = null;

    visitTimes.forEach(visitTime => {
        const visitDate = new Date(visitTime).toDateString();
        if (lastDate && new Date(lastDate).getTime() + 86400000 === new Date(visitDate).getTime()) {
            streak++;
        } else {
            streak = 1;
        }
        lastDate = visitDate;
    });

    streakElement.textContent = `Streak: ${streak} day(s)`;
}

function initializeStatuses() {
    const sites = ['codeforces', 'tryhackme', 'kaggle', 'hackerrank', 'linkedin'];
    sites.forEach(siteId => {
        updateStatus(siteId);
        updateVisitTimes(siteId);
        updateStreak(siteId);
    });
}

document.addEventListener('DOMContentLoaded', initializeStatuses);
