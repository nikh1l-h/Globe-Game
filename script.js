class ScreenManager {
    constructor() {
        this.screens = { /* object storing all screens (like a python dict) */
            menu: document.getElementById('menu'), /* key/value pair syntax */
            tutorial: document.getElementById('tutorial'),
            gameplayScreen: document.getElementById('gameplay-screen'),
            endScreen: document.getElementById('end-screen')
        };

        this.currentScreen = 'menu'; /* start at menu by default */
    }
}