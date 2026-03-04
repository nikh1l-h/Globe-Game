class Earth { // this class stores everything related to the globe itself
    constructor() {

        this.globe = Globe()(document.getElementById('Main-Globe')) // New Globe is created
            .backgroundColor('#f8ffd0')
            .showAtmosphere(false)
            .width(window.innerWidth)
            .height(Math.floor(window.innerHeight*0.9)) // sets the height to take up 90% of the user's screen vertically
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        
        this.countryData = null; // this will be set in init method
        this.coloursMap = {}; // this wil store the colour that every country should be
        this.guessedCountries = [];
        this.mysteryCountryId = null; // will store the iso numeric code of the mystery country after it has been selected
        this.currentDistance = null; // stores the distance of the most recent guess to the mystery country
    }

    

    async init() { // await and fetch is async therefore we must use init() to load country polygons rather than constructor
        const res = await fetch('globe-properties.json'); // fetches the file with all the data about the globe
        this.world = await res.json(); // converts that file to JS interactable JSON
        this.countryData = topojson.feature(this.world, this.world.objects.countries).features; // converts topojson to geojson
        this.latLongData = this.world.objects.countries.geometries; // extracts full data about countries from json file (lat,long,borderIds are included)

        this.countryData.forEach(country => { // for every country in the data set
            this.coloursMap[country.id] = 'grey'; // add it to dict obj with {iso-numeric code: colour}
        });

        this.globe
            .polygonsData(this.countryData)
            .polygonStrokeColor(() => '#ffffff')
            .polygonAltitude(0.01) // makes the polygon slightly outward from the face of the globe
            .polygonSideColor(() => '#ffffff')
            .polygonCapColor(country => this.coloursMap[country.id]); // passes country into the colourmap to assign colour
    }

    changeCountryColour(iso_code, colour) {
        this.coloursMap[iso_code] = colour; // adds the new colour to the colour map for the given country
        this.guessedCountries.push(iso_code); // adds the country to the list of guessed country ids
        this.globe
            .polygonsData(this.countryData)
            .polygonCapColor(country => this.coloursMap[country.id]); // refreshes the polygons so colour changes are reflected
    }

    resetGlobe() {
        // update globe
        this.guessedCountries.forEach(item => {
            this.coloursMap[item] = 'grey' // all the colours are reset to be grey
        });

        this.globe
            .polygonsData(this.countryData)
            .polygonCapColor(country => this.coloursMap[country.id])
        this.chooseMysteryCountry(); 

        // update guessed countries
        this.guessedCountries = []; 
        const displayGuesses = document.getElementById('guessed-countries');
        displayGuesses.innerHTML='<p><b>Guessed Countries:</p></b></p>'; // physical list of guessed countries is reset to original text
    
        // update level and time
        statsManager.level++;
        timer.calcStartTime(statsManager.level); // the time for the next level is set
        timer.displayNewTime(); 

        // update current score
        statsManager.currentScore = 0;
    }

    chooseMysteryCountry() {
        const possibleCountries = Object.keys(this.coloursMap); // converts the coloursMap into array with only iso-codes
        const randomIndex = Math.floor(Math.random()*possibleCountries.length); 
        this.mysteryCountryId = possibleCountries[randomIndex]; // the mystery country is set to the result of random selection
    }

    calculateCountryDistance(guessId) {
        
        const guess = this.latLongData.find(item => item.id === guessId); // finds all data for inputted country
        const mystery = this.latLongData.find(item => item.id === this.mysteryCountryId); // finds all data for the mystery country
        if (guess.id === mystery.id) {
            this.currentDistance = 0;
            return 0 // user has guessed correctly, distance between countries is 0
        }

        // defining data needed for calculation
        const guessLat = (parseFloat(guess.latitude)) * Math.PI / 180; // lat and long data must be in radians so *pi/180
        const guessLong = (parseFloat(guess.longitude)) * Math.PI / 180;
        const mysteryLat = (parseFloat(mystery.latitude)) * Math.PI / 180;
        const mysteryLong = (parseFloat(mystery.longitude)) * Math.PI / 180;
        const deltaLat = mysteryLat-guessLat; 
        const deltaLong = mysteryLong-guessLong;
        const earthRadius = 6371;
        
        // applying haversine formula (see https://en.wikipedia.org/wiki/Haversine_formula)
        const a = (Math.sin(deltaLat /2))**2 + Math.cos(guessLat) * Math.cos(mysteryLat)* (Math.sin(deltaLong/2))**2;
        const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        const distance = c * earthRadius;
        this.currentDistance = distance;
        return distance;
    }
    
    AssignColourGivenDistance(guessId) {

        // handling if user guess is adjacent to the answer
        const guessedCountry = this.latLongData.find(item => item.id === guessId);
        const borderIds = guessedCountry['borderIds']
        if (borderIds.length > 0) {
            for (let i=0; i< borderIds.length; i++) { // iterates through all the borders of the guessed country
                if (borderIds[i] === this.mysteryCountryId) { // if the ids match, then the countries are bordering
                    this.changeCountryColour(guessId,'#8f0013'); // this colour can only be seen for adjacent guesses
                    popup.showAdjacentCountry(guessId);
                    return true; // exits function early because distance does not NEED to be calculated or shown to user
                }
            }
        }

        const distance = this.calculateCountryDistance(guessId);

        // handling if user guesses correctly
        if (distance === 0) { 
            this.changeCountryColour(guessId,'green');
            displayLevelComplete();
            timer.stopTimer();
            statsManager.updateCompLevels(guessId);
            return true // exits function early
        }

        // handling bad guess
        const startRGB = [232,250,255]; // rgb for start point in gradient
        const midRGB = [255,210,112];
        const startToMidRGBChange = [23, -40, -143]; // change in RGB from start to mid point in gradient
        const midToFinalRGBChange = [-76,-210, -85]; // change in RGB from mid to final point in gradient

        const maxDistance = 20015; // distance between north/south pole
        const guessRating = 1-(distance / maxDistance); // gives a decimal to show how close guess is
        let r,g,b;

        // calculating the colour it should be
        if (guessRating >= 0.5) { // if guess is better than 50% good:
            let multiplier = (guessRating-0.5) * 2; // multiplier is a % how close from the middle of the gradient to the end
            r = midRGB[0] + Math.floor(midToFinalRGBChange[0] * multiplier); 
            g = midRGB[1] + Math.floor(midToFinalRGBChange[1] * multiplier);
            b = midRGB[2] + Math.floor(midToFinalRGBChange[2] * multiplier); 
        } else { // if guess is less than 50% good
            let multiplier = guessRating*2; // multiplier is a % how close from the start of the gradient to the middle
            r = startRGB[0] + Math.floor(startToMidRGBChange[0] * multiplier)
            g = startRGB[1] + Math.floor(startToMidRGBChange[1]*multiplier);
            b = startRGB[2] + Math.floor(startToMidRGBChange[2]*multiplier);
        }

        let finalHEX = this.convertRgbToHex(r, g, b);
        this.changeCountryColour(guessId,finalHEX);
    }
        

    convertRgbToHex(r, g, b) {
        let finalHEX = [];
        [r, g, b].forEach(colour => {
            let hexColour = colour.toString(16); // converts decimal to hex
            if (hexColour.length == 1) { // single digit numbers must be padded with leading 0s. (0 -> 00)
                hexColour = '0'.concat(hexColour);
            }
            finalHEX.push(hexColour);
        });
        finalHEX = '#'.concat(finalHEX[0]).concat(finalHEX[1]).concat(finalHEX[2]); // hex = # + r + g + b
        return finalHEX;
    }

    rotateCameraToCountry(iso_code) {
        const country = this.latLongData.find(item => item.id === iso_code);
        const countryLat = parseFloat(country.latitude) // finds latitude and longitude of the country
        const countryLong = parseFloat(country.longitude)
        this.globe.pointOfView({lat: countryLat, lng: countryLong}, 500); // rotates globe to be centred at that point, animation takes 500ms
    }

    updateGuessedCountries(iso_code) { // updating the physical list of guessed countries when a new guess is made

        const countryName = this.getCountryName(iso_code);

        const displayGuesses = document.getElementById('guessed-countries');

        const newListItem = document.createElement('li');
        newListItem.innerText = countryName;
        displayGuesses.appendChild(newListItem); // adds the name of the country to the physical list
    }

    getCountryName(iso_code) { // finds the name of a country given its iso numeric code
        const country = this.latLongData.find(item => item.id === iso_code); 
        return country.properties.name;
    }
}

const newGlobe = new Earth();
newGlobe.init().then(() => { // polygons are initialised and THEN a mystery country is chosen
    newGlobe.chooseMysteryCountry();
});
