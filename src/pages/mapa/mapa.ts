import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
declare var google;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {


  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;


  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidEnter(){
    this.clearMarkers();
    //funciòn getCurrentPosition() para mostrar localizaciòn actual
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map = new google.maps.Map(document.getElementById('map'),{
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      //funcion nearbySearch() para buscar veterinarias cercanas a mi ubicaciòn
      this.GooglePlaces.nearbySearch({
        location:latLng,
        radius: '2500',
        types: ['veterinary_care'],
        key: 'AIzaSyBa-glGSrpAngfvbpGtu7s7JcsoFox0HeE'
      }, (near_places) => {
        this.zone.run(() => {
          this.nearbyItems = [];
          for (var i = 0; i < near_places.length; i++) {
            this.crearMarcador(near_places[i]);
          }
          this.loading.dismiss();
        });
      })
      this.addMarker();

    }, (err) => {
      console.log(err);
    });

}
addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    icon: 'https://www.shareicon.net/data/50x50/2015/06/21/57809_map_256x256.png',
    position: this.map.getCenter()
  });

  let content = "<h4>Mi Ubicación</h4>";

  this.addInfoWindow(marker, content);

}
crearMarcador(place)
 {

   let marker = new google.maps.Marker({
     map: this.map,
     position: place.geometry.location
   });
   let content = "<h4>Veterinaria!</h4>";

  this.addInfoWindow(marker, content);
}
addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

  tryGeolocation(){
    this.loading.present();
    this.clearMarkers();

    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'My position',
        icon: 'blue'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
      this.loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '2500',
          types: ['veterinary_care'],
          key: 'AIzaSyBa-glGSrpAngfvbpGtu7s7JcsoFox0HeE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              //this.nearbyItems.push(near_places[i]);
              this.crearMarcador(near_places[i]);
            }
            this.loading.dismiss();
          });
        })
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          animation: google.maps.Animation.BOUNCE

        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
