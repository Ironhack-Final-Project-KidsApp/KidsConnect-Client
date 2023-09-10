import { useEffect, useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";


const GoogleMapsAutofill = ({activity, setActivity}) => {
    const [location, setLocation] = useState(null)
    const [fakeload, setLoad] = useState(false)
    // const testitem = item =>{
    //     console.log(item.geometry)
    // }
    useEffect(()=>{
        if(location && location.formatted_address){
            setActivity({...activity, location: location.formatted_address, lat: location.geometry.location.lat(), lng: location.geometry.location.lng()})
        }
        else if(location && location.name){setActivity({...activity, location: location.name, lat: null, lng: null})}
        else{setActivity({...activity, location: location, lat: null, lng: null})}
        // console.log(activity)
    }, [location])
    useEffect(()=>{
        setTimeout(() => {
            setLoad(true)
        }, 1000);
    }, [])
    return (
        <>
        {fakeload &&
        <ReactGoogleAutocomplete
            onChange={e=>setLocation(e.target.value)}
            style={{borderStyle:'none none solid none'}}
            
            options={{
                //options:["(regions)"],
                fields:["formatted_address",'geometry.location'],
            }}
            apiKey={'AIzaSyAONiK1AbeIKizfXbLqQ9lhHJo2zKYDLLA'}
            onPlaceSelected={(place) => setLocation(place)} //place.geometry?.location?.lat()
        />
        }
        </>
    );
}
 
export default GoogleMapsAutofill;