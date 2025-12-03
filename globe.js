class Earth {
    constructor() {

        this.globe = Globe()(document.getElementById('Main-Globe')) // New Globe is created
            .backgroundColor('#ffffff')
            .showAtmosphere(false)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        
        this.countryData = null;
        this.coloursMap = {}; 
    }

    async init() { // await and fetch is async therefore we must use init() to load country polygons rather than constructor
        const res = await fetch('globe-properties.json');
        const world = await res.json();

        this.countryData = topojson.feature(world, world.objects.countries).features; // converts topojson to geojson

        this.countryData.forEach(country => { // for every country in the data set
            this.coloursMap[country.id] = 'grey'; // add it to dict with {iso-numeric code: colour}
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
        this.globe
        .polygonsData(this.countryData)
        .polygonCapColor(country => this.coloursMap[country.id]);
    }
}

const newGlobe = new Earth();
newGlobe.init().then(() => {
    newGlobe.changeCountryColour('250','red'); // code for france
    newGlobe.changeCountryColour('642','orange'); // code for romania

});


