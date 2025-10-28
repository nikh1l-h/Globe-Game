
function changePage(currentPageid,nextPageid) {
    const oldPage = document.getElementById(currentPageid);
    oldPage.classList.add('hidden');

    const newPage = document.getElementById(nextPageid);
    newPage.classList.remove('hidden');
}

main_menu = document.getElementById('play-button');
main_menu.addEventListener("click", () => changePage('menu','tutorial')); /* first test */

