function changePage(currentPageid,nextPageid) {
    const oldPage = document.getElementById(currentPageid);
    oldPage.classList.add('hidden');

    const newPage = document.getElementById(nextPageid);
    newPage.classList.remove('hidden');
};


document.querySelectorAll('button').forEach(button => { 
    button.addEventListener('click', event => { 
        const specificButton = event.target.dataset.buttons; // finds the value of the data-buttons property of the exact element referenced
        if (specificButton === 'play-from-menu') {changePage('menu','gameplay-screen')};
        if (specificButton === 'tutorial-from-menu') {changePage('menu','tutorial')};
        if (specificButton === 'play-from-tutorial') {changePage('tutorial','gameplay-screen')};
        if (specificButton === 'menu-from-tutorial') {changePage('tutorial','menu')};
        if (specificButton === 'play-again') {changePage('end-screen','menu')};

    });
});

