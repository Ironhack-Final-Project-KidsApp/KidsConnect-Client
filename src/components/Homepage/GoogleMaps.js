import { GoogleMap, Marker, MarkerClustererF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
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
    setMap(map)
  }, [])
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  useEffect(()=>{
    setTimeout(() => {
      if(map){}
      setMark(activity)    
    }, 1000);
  },[map, activity])

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
          <Marker key={item._id} position={{lat:item.lat, lng:item.lng}} clusterer={clusterer} onClick={e=>navigate(`activity/${item._id}`)}/>
          {/* <Marker placeId='ChIJN1t_tDeuEmsRUsoyG83frY4'/> */}
          </>
          )}
          
          {/* position={{lat:item.lat, lng:item.lng}} clusterer={clusterer} onClick={e=>navigate(`activity/${item._id}`)}/>
          ChIJi8MeVwPKlzMRH8FpEHXV0Wk */}
          </MarkerClustererF>
          }
      </GoogleMap>
  ) : <></>
}
 
export default GoogleMaps;