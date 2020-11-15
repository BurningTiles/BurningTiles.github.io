mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0dGVtcGxhdGUiLCJhIjoiY2s0M3I5ZHgzMGEzNDNucXM1cDd0dzl3cSJ9.a2wjLlxz8LzWj9nIoGsshw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
	center: [-73.9751,40.7289], 
    zoom: 13
});

var popup = new mapboxgl.Popup({ offset: 40 }).setText(
    '756 Livingston Street, Brooklyn, NY 11201'
);

var el = document.createElement('div');
el.id = 'marker';

new mapboxgl.Marker(el)
    .setLngLat([-73.9751,40.7289])
    .setPopup(popup) 
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');