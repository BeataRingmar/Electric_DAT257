import  React, {useState,useEffect} from 'react'; 
import MapView, {Callout, Marker, TabNavigator} from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
//this is related to the database, if you are getting errors when running then just comment out
import axios from 'axios'


export default function App() {

  const [bathroomList, setBathroomList] = useState([]);
  
  // related to the database, fetches the data that is on the api end point. 
  const getBathrooms = () => {
    axios.get("http://192.168.10.164" + ":3001/bathrooms").then((Response) => {
      setBathroomList(Response.data);
      return bathroomList; 
    })
    .catch(error => {console.log(error);
    });
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) getBathrooms()
    console.log("At least you've gotten here");
    return () => {ignore = true;}
    },[]);


/*testing to see how arrays work, and how we can access the information inside them. Try them out if you are interested 
in understanding better. Map function is really amazing. Here I am just making an array of just the bathroom names.
  let result = bathroomList.map(a => a.name);
  console.log(result);
 */ 

  //function that creates multiple markers in the map, does the using the map function. This function is called in the View
  mapMarkers = () => {
    return bathroomList.map((item) => <Marker
      key={item.id}
      coordinate={{ latitude: item.latitude, longitude: item.longitude }}
      title = {item.name}
    >
    </Marker >)
  }

    return (
      <View style={styles.container}>
        <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        mapType={Platform.OS == "android" ? "none" : "standard"}  // Not sure if this is needed, doesn't seem to help (for android)
        style= {styles.map}
        initialRegion={{
          latitude: 57.708870,
          longitude: 11.974560,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <View style={{ position:'absolute', top:10, width:'100%'}}>
          <TextInput
            style={{
              borderRadius: 15,
              margin: 30,
              color: '#000',
              borderColor: '#666',
              backgroundColor: '#FFF',
              borderWidth: 1,
              height: 45,
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            placeholder={'Search'}
            placeholderTextColor={'#666'}
          />
        </View>
        {mapMarkers()}
        </MapView> 
         </View> 
      );
      }
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    marginTop:50, 
  }, 
  item: {
    marginTop: 24, 
    padding: 30, 
    backgroundColor: 'orange',
    fontSize: 24, 
    marginHorizontal: 10, 
    marginTop: 24,
  },
map: {
  marginTop: 20,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}, 
});
