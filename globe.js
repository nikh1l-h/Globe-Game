// Create the globe
const globe = Globe()(document.getElementById('Main-Globe'))
    .backgroundColor('#ffffff')
    .showAtmosphere(false)
    .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');



fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
    .then(res => res.json())
    .then(world => {
    const countries = topojson.feature(world, world.objects.countries).features; // converts topojson to geojson
    globe 
        .polygonsData(countries)
        
        .polygonStrokeColor(() => '#ffffff')
        .polygonAltitude(0.01)
        .polygonSideColor(()=>'#ffffff')
        .polygonCapColor(choice => {
            if (choice.id==='250') {  // 250 = country code for France
                return 'red'
            } else {
            return 'grey'
            } 
        });
        

    });

