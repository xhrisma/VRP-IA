var map = {};
var latitud, longitud, miUbicacion;
var inputDestino = document.getElementById("input-destino");
var inputDestinoB = document.getElementById("input-destinoB");
var inputDestinoC = document.getElementById("input-destinoC");



function initMap() {
  var AguaUnica = {lat:  -6.802893, lng: -79.842997}

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: AguaUnica,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true
  });

   var markerAG = new google.maps.Marker({
     position: AguaUnica,
    map: map
   });


  new google.maps.places.Autocomplete(inputDestino);
  new google.maps.places.Autocomplete(inputDestinoB);
  new google.maps.places.Autocomplete(inputDestinoC);

  map.setOptions({styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]});
  

}
 
document.getElementById("form1").addEventListener("submit", function(e) {
  e.preventDefault();

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  const waypts=[
    {location:inputDestino.value,
    stopover: true},
    {location:inputDestinoB.value,
      stopover: true},
      {location:inputDestinoC.value,
        stopover: true},
    ]
  directionsService.route({
      origin: {lat:  -6.802893, lng: -79.842997},
      destination:{lat:  -6.802893, lng: -79.842997},
      waypoints:waypts,
      optimizeWaypoints:true,
      travelMode: 'DRIVING'
      }, function(response, status){
        if(status === 'OK'){
          
          var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
       
          $( '#mostrar_distancia').html( 'Distancia Estimada: '  + distancia * 1000 +' metros' );
          mostrar_distancia.classList.remove("none");
          console.log(response.routes[0].legs[0].distance.text);
 

          directionsDisplay.setDirections(response);
        }else{
          window.alert("No encontramos una ruta.");
        }
      });
  directionsDisplay.setMap(map)
});














