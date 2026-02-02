const nameToIso = {
    "fiji": "242",
    "tanzania": "834",
    "western sahara": "732",
    "canada": "124",
    "usa": "840",
    "us": "840",
    "united states of america": "840",
    "kazakhstan": "398",
    "uzbekistan": "860",
    "papua new guinea": "598",
    "indonesia": "360",
    "argentina": "032",
    "chile": "152",
    "drc": '180',
    "democratic republic of the congo": "180",
    "somalia": "706",
    "kenya": "404",
    "sudan": "729",
    "chad": "148",
    "haiti": "332",
    "dominican republic": "214",
    "russia": "643",
    "bahamas": "044",
    "falkland islands": "238",
    "norway": "578",
    "greenland": "304",
    "east timor": "626",
    "timor-leste": "626",
    "south africa": "710",
    "lesotho": "426",
    "mexico": "484",
    "uruguay": "858",
    "brazil": "076",
    "bolivia": "068",
    "peru": "604",
    "colombia": "170",
    "panama": "591",
    "costa rica": "188",
    "nicaragua": "558",
    "honduras": "340",
    "el salvador": "222",
    "guatemala": "320",
    "belize": "084",
    "venezuela": "862",
    "guyana": "328",
    "suriname": "740",
    "france": "250",
    "ecuador": "218",
    "puerto rico": "630",
    "jamaica": "388",
    "cuba": "192",
    "zimbabwe": "716",
    "botswana": "072",
    "namibia": "516",
    "senegal": "686",
    "mali": "466",
    "mauritania": "478",
    "benin": "204",
    "niger": "562",
    "nigeria": "566",
    "cameroon": "120",
    "togo": "768",
    "ghana": "288",
    "ivory coast": "384",
    "cote d'ivoire": "384",
    "côte d'ivoire": "384",
    "guinea": "324",
    "guinea-bissau": "624",
    "liberia": "430",
    "sierra leone": "694",
    "burkina faso": "854",
    "car": "140",
    "central african republic": "140",
    "congo": "178",
    "gabon": "266",
    "equitorial guinea": "226",
    "zambia": "894",
    "malawi": "454",
    "mozambique": "508",
    "eswatini": "748",
    "angola": "024",
    "burundi": "108",
    "israel": "376",
    "lebanon": "422",
    "madagascar": "450",
    "palestine": "275",
    "gambia": "270",
    "tunisia": "788",
    "algeria": "012",
    "jordan": "400",
    "uae": "784",
    "united arab emirates": "784",
    "qatar": "634",
    "kuwait": "414",
    "kosovo": "383",
    "iraq": "368",
    "oman": "512",
    "vanuatu": "548",
    "cambodia": "116",
    "thailand": "764",
    "laos": "418",
    "burma":"104",
    "myanmar": "104",
    "vietnam": "704",
    "north korea": "408",
    "south korea": "410",
    "mongolia": "496",
    "india": "356",
    "bangladesh": "050",
    "bhutan": "064",
    "nepal": "524",
    "pakistan": "586",
    "afghanistan": "004",
    "tajikistan": "762",
    "kyrgyzstan": "417",
    "turkmenistan": "795",
    "iran": "364",
    "syria": "760",
    "armenia": "051",
    "sweden": "752",
    "belarus": "112",
    "ukraine": "804",
    "poland": "616",
    "austria": "040",
    "hungary": "348",
    "moldova": "498",
    "romania": "642",
    "lithuania": "440",
    "latvia": "428",
    "estonia": "233",
    "germany": "276",
    "bulgaria": "100",
    "greece": "300",
    "turkiye": "792",
    "türkiye": "792",
    "turkey": "792",
    "albania": "008",
    "croatia": "191",
    "switzerland": "756",
    "luxembourg": "442",
    "belgium": "056",
    "netherlands": "528",
    "portugal": "620",
    "spain": "724",
    "ireland": "372",
    "solomon islands": "090",
    "new zealand": "554",
    "australia": "036",
    "sri lanka": "144",
    "china": "156",
    "italy": "380",
    "denmark": "208",
    "uk": "826",
    "united kingdom": "826",
    "iceland": "352",
    "azerbaijan": "031",
    "georgia": "268",
    "philippines": "608",
    "malaysia": "458",
    "brunei": "096",
    "slovenia": "705",
    "finland": "246",
    "slovakia": "703",
    "czechia": "203",
    "czech republic":"203",
    "eritrea": "232",
    "japan": "392",
    "paraguay": "600",
    "yemen": "887",
    "saudi": "682",
    "saudi arabia": "682",
    "antarctica": "010",
    "cyprus": "196",
    "morocco": "504",
    "egypt": "818",
    "libya": "434",
    "ethiopia": "231",
    "djibouti": "262",
    "uganda": "800",
    "rwanda": "646",
    "bosnia": "070",
    "herzegovina": "070",
    "bosnia and herzegovina": "070",
    "north macedonia": "807",
    "macedonia": "807",
    "serbia": "688",
    "montenegro": "499",
    "trinidad": "780",
    "tobago": "780",
    "trinidad and tobago": "780",
    "south sudan": "728"
}

function togglePageVisibility(pageid) {
    const page = document.getElementById(pageid);
    page.classList.toggle('hidden');
}


function changePage(currentPageid,nextPageid) { // swaps what page is on screen
    togglePageVisibility(currentPageid);
    togglePageVisibility(nextPageid);
};


const allButtons = { // lists the id of every button in the game and the action that they should do
    'play-from-menu': () => {
        changePage('menu','gameplay-screen');
        togglePageVisibility('guessed-countries');
    },
    'play-from-tutorial': () => {
        changePage('tutorial','gameplay-screen');
        togglePageVisibility('guessed-countries');
    },
    'tutorial-from-menu': () => changePage('menu','tutorial'),
    'menu-from-tutorial': () => changePage('tutorial', 'menu'),
    'play-again': () => changePage('end-screen','menu')
}

for (const [id,action] of Object.entries(allButtons)) { // for every key-value pair in allButtons list
    const element = document.getElementById(id);
    element.addEventListener('click', action);
}


function convertCountryNametoCode(countryName) {
    if (countryName in nameToIso) {
        return nameToIso[countryName]
    } else {
        console.log('country not found')
        return false
    }
    
}

function checkFirstGuess() {

}

const guessBox = document.getElementById('guess-input');
guessBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // checks for user finishing their guess
        let userGuess = guessBox.value.toLowerCase();
        guessBox.value = ''; // resets the guessBox to remove user guess from screen
        let countryCode = convertCountryNametoCode(userGuess)
        if (countryCode != false) { // if guess is valid
            checkFirstGuess();
            newGlobe.AssignColourGivenDistance(countryCode);
            newGlobe.rotateCameraToCountry(countryCode)
        }
        
    }
})