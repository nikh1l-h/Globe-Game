class Earth {
    constructor() {

        this.globe = Globe()(document.getElementById('Main-Globe')) // New Globe is created
            .backgroundColor('#ffffff')
            .showAtmosphere(false)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        
        this.countryData = null;
        this.coloursMap = {}; 
        this.guessedCountries = [];
        this.mysteryCountry = null;
    }

    async init() { // await and fetch is async therefore we must use init() to load country polygons rather than constructor
        const res = await fetch('globe-properties.json');
        const world = await res.json();

        this.countryData = topojson.feature(world, world.objects.countries).features; // converts topojson to geojson

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

    async changeCountryColour(iso_code, colour) {
        this.coloursMap[iso_code] = colour;
        this.guessedCountries.push(iso_code);
    }

    resetGlobe() {
        this.guessedCountries.forEach(item => {
            this.coloursMap[item] = 'grey'
        });
        this.guessedCountries = [];
        this.mysteryCountry = null;
    }

    chooseMysteryCountry() {
        const possibleCountries = Object.keys(this.coloursMap); // converts the coloursMap into array with only iso-codes
        const randomIndex = Math.floor(Math.random()*possibleCountries.length);
        this.mysteryCountry = possibleCountries[randomIndex];
    }

    calculateCountryDistance(countryId) {
        let index = 0;
        this.countryData.forEach(country => { // finds the index of the geometries array that the country is stored in
            if (country['id'] === countryId) {
                console.log(index);
            } else {
                index = index+1;
            }
        })
    }
        
}

const newGlobe = new Earth();
newGlobe.init().then(() => {
    newGlobe.changeCountryColour('250','red');
    newGlobe.changeCountryColour('642','orange'); 
    newGlobe.resetGlobe();
    newGlobe.chooseMysteryCountry();
    newGlobe.changeCountryColour(newGlobe.mysteryCountry,'purple'); // colour lithuania purple 
    newGlobe.calculateCountryDistance('834');
    
    console.log(newGlobe.mysteryCountry);
});
