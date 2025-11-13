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

for (const [id,change] of Object.entries(actions)) 
{
    const element = document.getElementById(id);
    element.addEventListener('click', change);
}

// document.querySelectorAll('button').forEach(button => { 
//     button.addEventListener('click', event => { 
//         const specificButton = event.target.dataset.buttons; // finds the value of the data-buttons property of the exact element referenced


//         if (specificButton === 'play-from-menu') {changePage('menu','gameplay-screen')};
//         if (specificButton === 'tutorial-from-menu') {changePage('menu','tutorial')};
//         if (specificButton === 'play-from-tutorial') {changePage('tutorial','gameplay-screen')};
//         if (specificButton === 'menu-from-tutorial') {changePage('tutorial','menu')};
//         if (specificButton === 'play-again') {changePage('end-screen','menu')};

//     });
// });

