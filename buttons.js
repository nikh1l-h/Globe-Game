function togglePageVisibility(pageid) {
    const page = document.getElementById(pageid);
    page.classList.toggle('hidden');
}


function changePage(currentPageid,nextPageid) {
    togglePageVisibility(currentPageid);
    togglePageVisibility(nextPageid);
};


const allButtons = {
    'play-from-menu': () => changePage('menu','gameplay-screen'),
    'tutorial-from-menu': () => changePage('menu','tutorial'),
    'play-from-tutorial': () => changePage('tutorial','gameplay-screen'),
    'menu-from-tutorial': () => changePage('tutorial', 'menu'),
    'play-again': () => changePage('end-screen','menu')
}

for (const [id,action] of Object.entries(allButtons)) { // for every key-value pair in allButtons list
    const element = document.getElementById(id);
    element.addEventListener('click', action);
}
