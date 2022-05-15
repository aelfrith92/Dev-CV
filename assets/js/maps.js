function initMap() {
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 3,
			center: { lat: 40.015630, lng: 18.242859 },
		});
		const infoWindow = new google.maps.InfoWindow({
			content: "",
			disableAutoPan: true,
		});
		// Create an array of alphabetical characters used to label the markers.
		const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		// Add some markers to the map.
		const markers = locations.map((position, i) => {
			const label = labels[i % labels.length];
			const marker = new google.maps.Marker({
				position,
				label,
			});
	
			// markers can only be keyboard focusable when they have click listeners
			// open info window when marker is clicked
			marker.addListener("click", () => {
				infoWindow.setContent(label);
				infoWindow.open(map, marker);
			});
			return marker;
		});
	
		// Add a marker clusterer to manage the markers.
		new MarkerClusterer({ markers, map });
}

const locations = [
		{
			lat: 53.339003, lng: -6.248204
		},
		{
			lat: 41.889582,  lng: 12.493033
		},
		{
			lat: 44.493702, lng: 11.343095
		}
	];

window.initMap = initMap;