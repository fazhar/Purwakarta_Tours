        function initMap() {
            // Mendapatkan lokasi pengguna
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    
                    // Menyiapkan peta dengan lokasi pengguna
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: latitude, lng: longitude},
                        zoom: 15
                    });

                    // Membuat request ke Google Places API untuk mencari tempat berdasarkan lokasi pengguna
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location: {lat: latitude, lng: longitude},
                        radius: 500, // jarak dalam meter
                        type: ['restaurant'] // jenis tempat yang dicari
                    }, callback);
                });
            } else {
                alert("Geolocation tidak didukung oleh browser ini.");
            }
        }

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

        function createMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzsSWM-e3tms9bJgE5vPTKUWlNpJLNGuc&libraries=places&callback=initMap" async defer></script>


