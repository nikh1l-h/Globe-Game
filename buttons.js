function togglePageVisibility(pageid) {
    const page = document.getElementById(pageid);
    page.classList.toggle('hidden');
}


function changePage(currentPageid,nextPageid) {
    togglePageVisibility(currentPageid);
    togglePageVisibility(nextPageid);
};


const actions = {
    'play-from-menu': () => changePage('menu','gameplay-screen'),
    'tutorial-from-menu': () => changePage('menu','tutorial'),
    'play-from-tutorial': () => changePage('tutorial','gameplay-screen'),
    'menu-from-tutorial': () => changePage('tutorial', 'menu'),
    'play-again': () => changePage('end-screen','menu')
}

for (const [id,change] of Object.entries(actions)) { // for every key-value pair in allButtons list
    const element = document.getElementById(id);
    element.addEventListener('click', change);
}
