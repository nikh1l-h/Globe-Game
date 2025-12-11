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
        
}

const newGlobe = new Earth();
newGlobe.init().then(() => {
    newGlobe.changeCountryColour('826','red');
    newGlobe.chooseMysteryCountry();
    newGlobe.changeCountryColour(newGlobe.mysteryCountryId,'red');
    console.log(newGlobe.calculateCountryDistance('826'));

});
