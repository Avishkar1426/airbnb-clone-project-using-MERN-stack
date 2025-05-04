
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpc2hha3ItMjYiLCJhIjoiY205cGdhbHhvMGk3ejJqc2FhMGd6bXRqZiJ9.CREYOBWhgPCzBOWwLvwrpw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates , // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
   console.log(listing.geometry.coordinates);
    const marker = new mapboxgl.Marker({color: "red",scale:1.5})
        .setLngLat(listing.geometry.coordinates) // coordinates from the database
        .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
            .setHTML(`<h5>${listing.title}</h5><p>${listing.location}</p>`))
        .addTo(map); // add marker to map