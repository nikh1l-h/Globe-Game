class Earth {
    constructor() {

        this.globe = Globe()(container) // New Globe is created
            .backgroundColor('#ffffff')
            .showAtmosphere(false)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
    }

    async init(highlightCountryCode) { // .then and fetch is async therefore we must use init() to load country polygons
        fetch('globe-properties.json')
            .then(res => res.json())
            .then(world => {
                const countries = topojson.feature(world, world.objects.countries).features; // converts topojson to geojson
                this.globe 
                .polygonsData(countries)
                .polygonStrokeColor(() => '#ffffff')
                .polygonAltitude(0.01)
                .polygonSideColor(()=>'#ffffff')
                .polygonCapColor(choice => {
                    if (choice.id===highlightCountryCode) {  // 250 = country code for France
                        return 'red'
                    } else {
                    return 'grey'
                    } 
                });
            });
    } 
}

const newGlobe = new Earth();
newGlobe.init('250');
