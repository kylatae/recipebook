// script.js 
const topbarContainer = document.getElementById('topbar-container');

fetch('topbar.html')
    .then(response => response.text())
    .then(html => topbarContainer.innerHTML = html);