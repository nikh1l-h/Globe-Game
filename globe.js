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

    AssignColourGivenDistance(guessId, distance) {

        if (distance === 0) { // if the user has guessed correctly
            this.changeCountryColour(guessId,'green')
            return True // exits function early
        }
        const startRGB = [255,255,245]; // rgb for start point in gradient
        const startToMidGBChange = [-255,-245]; // change in green/blue from start to mid point in gradient
        const MidToFinalRChange = -155; // change in red from mid to final point in gradient

        const maxDistance = 20015; // distance between north/south pole
        const guessRating = 1-(distance / maxDistance); // gives a decimal to show how close guess is
        let r,g,b;

        // calculating the colour it should be
        if (guessRating >= 0.5) {
            let multiplier = (guessRating-0.5) * 2; // expresses guessRating as a % how close from the middle of the gradient to the end
            r = startRGB[0] + Math.floor(MidToFinalRChange * multiplier);
            g = 0;
            b = 0; 
        } else {
            let multiplier = guessRating*2;
            r = 255;
            g = startRGB[1] + Math.floor(startToMidGBChange[0]*multiplier);
            b = startRGB[2] + Math.floor(startToMidGBChange[1]*multiplier);
        }

        let finalHEX = [];
        // converting rgb to hex 
        [r,g,b].forEach(colour => {
            let hexColour = colour.toString(16);
            if (hexColour.length == 1) { // single digit numbers must be padded with leading 0s. (0 -> 00)
                hexColour = '0'.concat(hexColour);
            }
            finalHEX.push(hexColour);
        })
        finalHEX = '#'.concat(finalHEX[0]).concat(finalHEX[1]).concat(finalHEX[2]);
        this.changeCountryColour(guessId,finalHEX)
    }
        
}

const newGlobe = new Earth();
newGlobe.init().then(() => {
    newGlobe.mysteryCountryId = '250';
    const x = newGlobe.calculateCountryDistance('036');
    newGlobe.AssignColourGivenDistance('036',x);

});
