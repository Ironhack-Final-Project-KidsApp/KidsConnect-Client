//import { useEffect, useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const GoogleMapsAutofill = ({activity, setActivity}) => {
    //const [fakeload, setLoad] = useState(false)

    const storeLocation = (item) => {
        if(item && item.formatted_address){
            setActivity({...activity, location: item.formatted_address, lat: item.geometry.location.lat(), lng: item.geometry.location.lng()})
        }
        else if(item && item.name){setActivity({...activity, location: item.name, lat: null, lng: null})}
        else{setActivity({...activity, location: item, lat: null, lng: null})}
        // console.log(activity)
    }

    /* useEffect(()=>{
        setTimeout(() => {
            setLoad(true)
        }, 2000);
    }, []) */
    return (
        <>
        {/* {fakeload && */}
        <ReactGoogleAutocomplete
            onChange={e=>storeLocation(e.target.value)}
            style={{borderStyle:'none none solid none'}}
            
            options={{
                //options:["(regions)"],
                fields:["formatted_address",'geometry.location'],
            }}
            apiKey={'AIzaSyAONiK1AbeIKizfXbLqQ9lhHJo2zKYDLLA'}
            onPlaceSelected={(place) => storeLocation(place)} //place.geometry?.location?.lat()
        />
        {/*  */}
        </>
    );
}
 
export default GoogleMapsAutofill;