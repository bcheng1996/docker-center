// @flow
import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { Marker } from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import CityPin from '../constants/CityPin';


const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYmNoZW5nMTk5NiIsImEiOiJjazJtb2k3OTgwazdsM2JqcHJ6eG4xbWExIn0.uBnju3v1L3jvMa3TzwH2mQ';
mapboxgl.accessToken = MAPBOX_TOKEN;
const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  injectCSS: false
});
type Props = {};

export default class MyMap extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mapStyle: 'mapbox://styles/mapbox/streets-v8'
    };
  }

  render() {
    const { mapStyle } = this.state;
    const { center } = this.props;
    console.log('CENTER', center)

    return (
      <Map
        style={mapStyle}
        containerStyle={{
          height: '100vh',
          width: '100vw',
          overflowX: 'hidden'
        }}
        center={center? center: {'lng':-0.2416815, 'lat':51.5285582}}
      >
        <Marker
          coordinates={center}
          anchor={"bottom-left"}
          offsetLeft={-64}
          offsetTop={128}
          >
          <CityPin size={20}/>
        </Marker>
      </Map>
    );
  }
}
