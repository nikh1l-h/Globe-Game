class Earth {
    constructor() {

        this.globe = Globe()(document.getElementById('Main-Globe')) // New Globe is created
            .backgroundColor('#ffffff')
            .showAtmosphere(false)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        
        this.countryData = null;
        this.coloursMap = {}; 
        this.guessedCountries = [];
        this.mysteryCountryId = null;
    }

    async init() { // await and fetch is async therefore we must use init() to load country polygons rather than constructor
        const res = await fetch('globe-properties.json');
        this.world = await res.json();
        this.countryData = topojson.feature(this.world, this.world.objects.countries).features; // converts topojson to geojson

        this.countryData.forEach(country => { // for every country in the data set
            this.coloursMap[country.id] = 'grey'; // add it to dict obj with {iso-numeric code: colour}
        });

        this.globe
            .polygonsData(this.countryData)
            .polygonStrokeColor(() => '#ffffff')
            .polygonAltitude(0.01)
            .polygonSideColor(() => '#ffffff')
            .polygonCapColor(country => this.coloursMap[country.id]); // passes country into the colourmap to assign colour
    }

    changeCountryColour(iso_code, colour) {
        this.coloursMap[iso_code] = colour;
        this.guessedCountries.push(iso_code);
        this.globe
            .polygonsData(this.countryData)
            .polygonCapColor(country => this.coloursMap[country.id]);
    }

    resetGlobe() {
        this.guessedCountries.forEach(item => {
            this.coloursMap[item] = 'grey'
        });
        this.guessedCountries = [];
        this.mysteryCountryId = null;
    }

    chooseMysteryCountry() {
        const possibleCountries = Object.keys(this.coloursMap); // converts the coloursMap into array with only iso-codes
        const randomIndex = Math.floor(Math.random()*possibleCountries.length);
        this.mysteryCountryId = possibleCountries[randomIndex];
    }

    calculateCountryDistance(guessId) {
        const latLongData = this.world.objects.countries.geometries; // extracts only full data about countries from json file
        const guess = latLongData.find(item => item.id === guessId); // finds all data for inputted country
        const mystery = latLongData.find(item => item.id === this.mysteryCountryId); // finds all data for the mystery country
        if (guess.id === mystery.id) {
            return 0 // user has guessed correctly, distance between countries is 0
        }

        // defining data needed for calculation
        const guessLat = (parseFloat(guess.latitude)) * Math.PI / 180; // lat and long data must be in radians
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
        return distance;
    }

    AssignColourGivenDistance(guessId) {
        const distance = this.calculateCountryDistance(guessId);

        if (distance === 0) { // if the user has guessed correctly
            this.changeCountryColour(guessId,'green')
            return true // exits function early
        }

        const startRGB = [232,250,255]; // rgb for start point in gradient
        const midRGB = [255,210,112];
        const startToMidRGBChange = [23, -40, -143]; // change in green/blue from start to mid point in gradient
        const midToFinalRGBChange = [-76,-210, -85]; // change in red from mid to final point in gradient

        const maxDistance = 20015; // distance between north/south pole
        const guessRating = 1-(distance / maxDistance); // gives a decimal to show how close guess is
        let r,g,b;

        // calculating the colour it should be
        if (guessRating >= 0.5) {
            let multiplier = (guessRating-0.5) * 2; // expresses guessRating as a % how close from the middle of the gradient to the end
            r = midRGB[0] + Math.floor(midToFinalRGBChange[0] * multiplier);
            g = midRGB[1] + Math.floor(midToFinalRGBChange[1] * multiplier);
            b = midRGB[2] + Math.floor(midToFinalRGBChange[2] * multiplier); 
        } else {
            let multiplier = guessRating*2;
            r = startRGB[0] + Math.floor(startToMidRGBChange[0] * multiplier)
            g = startRGB[1] + Math.floor(startToMidRGBChange[1]*multiplier);
            b = startRGB[2] + Math.floor(startToMidRGBChange[2]*multiplier);
        }

        let finalHEX = this.convertRgbToHex(r, g, b);
        this.changeCountryColour(guessId,finalHEX)
    }
        

    convertRgbToHex(r, g, b) {
        let finalHEX = [];
        // converting rgb to hex 
        [r, g, b].forEach(colour => {
            let hexColour = colour.toString(16);
            if (hexColour.length == 1) { // single digit numbers must be padded with leading 0s. (0 -> 00)
                hexColour = '0'.concat(hexColour);
            }
            finalHEX.push(hexColour);
        });
        finalHEX = '#'.concat(finalHEX[0]).concat(finalHEX[1]).concat(finalHEX[2]);
        return finalHEX;
    }
}

const newGlobe = new Earth();
newGlobe.init().then(() => {
    newGlobe.chooseMysteryCountry();


});
