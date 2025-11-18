class Earth {
    constructor() {

        this.globe = Globe()(document.getElementById('Main-Globe')) // New Globe is created
            .backgroundColor('#ffffff')
            .showAtmosphere(false)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
        
        this.countryData = null;
        this.coloursMap = {}; 
    }

    async init() { // .then and fetch is async therefore we must use init() to load country polygons
        fetch('globe-properties.json')
            .then(res => res.json())
            .then(world => {
                this.countryData = topojson.feature(world, world.objects.countries).features; // converts topojson to geojson

                this.countryData.forEach(country => { // for every country in the data set
                    this.coloursMap[country.id] = 'grey' // add it to dict with [iso-numeric code: colour]
                })

                this.globe 
                .polygonsData(this.countryData)
                .polygonStrokeColor(() => '#ffffff')
                .polygonAltitude(0.01)
                .polygonSideColor(()=>'#ffffff')
                .polygonCapColor(country => this.coloursMap[country.id]); // passes country into map to find colour
            });
    } 

    changeCountryColour(iso_code) {
        this.coloursMap[iso_code] = 'red';
        console.log(this.coloursMap);
    }
}

const newGlobe = new Earth();
newGlobe.init();
newGlobe.changeCountryColour('380')

