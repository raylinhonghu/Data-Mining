import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { TransportProvider } from '../../providers/transport/transport'
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [TransportProvider]
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: string="5";
  longitude: string= "5";


  constructor(
    public platform: Platform, 
    private transport: TransportProvider, 
    private googleMaps: GoogleMaps, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    private ref: ChangeDetectorRef) {
  }


  ionViewDidLoad() {
    this.initializeMap();
  }

  initializeMap() {
    this.platform.ready().then(() => {
      // let position;
      let minZoomLevel = 5;
      let mapOptions = {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(37.39, -119),
        mapTypeId: google.maps.MapTypeId.TERRIAN
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // Place a draggable marker on the map
      let marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 37.39, lng: -119}
      });
      marker.addListener('drag', ()=> {
       
        this.latitude = marker.position.lat();
        this.longitude = marker.position.lng();
        console.log("lat: " + this.latitude + " long: " + this.longitude)
        this.ref.detectChanges();
      });
    });

  }

  sampleHttpRequest() {
    console.log("lat: " + parseInt(this.latitude, 10) + " long: " + parseInt(this.longitude, 10))
    let body = { "year": 1980, "latitude": parseInt(this.latitude, 10), "longitude": parseInt(this.longitude, 10) }
    
    let loader = this.loadingCtrl.create({
      content: "Prediciting...",
    });
    loader.present();


    this.transport.post('predict', body).then((data) => {
      console.log("here is the post: " + data)
      let myTitle = this.getTitle(data)
      let mySubTitle = this.getSubTitle(data)
      loader.dismiss().then(()=> {
        let alert = this.alertCtrl.create({
          title: myTitle,
          subTitle: mySubTitle,
          buttons: ['OK']
        });
        alert.present();
      })
    },
      (error) => {
        console.log("Error occurs: " + error);
        loader.dismiss()
      })
  }

  getTitle(data) {
    switch(data) {
      case 'A':
        return "No Fire"
      case 'B':
        return "Smouldering Ground Fire"
      case 'C':
        return "Low Vigour Surface Fire"
      case 'D':
        return "Moderately Vigorous Surface Fire"
      default: 
        return "Passive Crown Fire"
    }
  }

  getSubTitle(data) {
    switch(data) {
      case 'A':
        return "A fire was not found"
      case 'B':
        return "White smoke, no open flame"
      case 'C':
        return "Smoke, visible open flame"
      case 'D':
        return "Grey to black smoke, Organized surface flame"
      default:
        return "Possible fire balls and whirls, Dominate smoke colum"
    }
  }

  ok() {
    console.log ("ok")
  }

}
