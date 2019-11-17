// @flow
import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { Marker, Popup, Layer, Feature } from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import CityPin from '../constants/CityPin';
import PropertyPopup from './PropertyPopup';
import * as Api from '../api/api';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYmNoZW5nMTk5NiIsImEiOiJjazJtb2k3OTgwazdsM2JqcHJ6eG4xbWExIn0.uBnju3v1L3jvMa3TzwH2mQ';
mapboxgl.accessToken = MAPBOX_TOKEN;
const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  injectCSS: false
});

type Props = {
  center: Dict,
  property: Dict
};

export default class MyMap extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mapStyle: 'mapbox://styles/mapbox/basic-v8',
      properties: []
    };
  }

  componentDidMount() {
    Api.getProperties()
      .then(res => {
        this.setState({properties: JSON.parse(res)})
      })
  }

  render() {
    const { mapStyle, properties } = this.state;
    const { center, property } = this.props;
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
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          {properties.map((val, index) => {
            return(
              <Feature key={val._id} coordinates={[val.address.longitude, val.address.latitude]}/>
            )
          })}
        </Layer>
{/* 
        <Marker
          coordinates={center}
          anchor={"bottom-left"}
          offsetLeft={-64}
          offsetTop={128}
        
          >
          <CityPin size={20}/>
        </Marker>
 
        <Popup
     
          coordinates={center}
          anchor={"bottom"}
          offset={[0,-50]}
          closeButton={true}
          closeOnClick={true}
        >
         <PropertyPopup info={property}></PropertyPopup>
        </Popup>  */}

      </Map>
    );
  }
}
