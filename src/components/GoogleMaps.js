import { Box, Popper } from '@mui/material';
import { GoogleMap, Marker, MarkerClusterer, MarkerClustererF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import GooglemapsPopover from './GooglemapsPopover';
import { useNavigate } from 'react-router-dom';

const GoogleMaps = ({activity}) => {
  const navigate = useNavigate();
  const [activityMark, setMark] = useState(null);
  const containerStyle = {
    width: '100%',
    height: '400px',
    maxHeight: '30%'
  };
  const center = {
    lat: 50.378472,
    lng: 14.970598
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAONiK1AbeIKizfXbLqQ9lhHJo2zKYDLLA"
  })
  const [map, setMap] = useState(null)
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  useEffect(()=>{
      setTimeout(() => {
          setMark(activity)    
      }, 1000);
  },[])

  return isLoaded ? (
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onLoad={onLoad}
          onUnmount={onUnmount}
      >
          {activityMark &&
          <MarkerClustererF>
          {clusterer => activityMark.map(item=>
          <>
          {/* <GooglemapsPopover title={item.title} position={{lat:item.lat, lng:item.lng}} clusterer={clusterer} /> */}
          <Marker position={{lat:item.lat, lng:item.lng}} clusterer={clusterer} onClick={e=>navigate(`activity/${item._id}`)}/>
          </>
          )}
          </MarkerClustererF>
          }
      </GoogleMap>
  ) : <></>
}
 
export default GoogleMaps;