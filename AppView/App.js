import { StatusBar } from 'expo-status-bar';
import  React, {useState} from 'react'; 
import MapView, {Callout, Marker} from 'react-native-maps';
import { StyleSheet, Text, View,TouchableOpacity, FlatList, Dimensions} from 'react-native';
//this is related to the database, if you are getting errors when running then just comment out
import Axios from 'axios'


export default function App() {

  const [bathroomList, setBathroomList] = useState([]);

  
  // related to the database, fetches the data that is on the api end point. 
  const getBathrooms = () => {
    Axios.get("http://localhost:3001/bathrooms").then((Response) => {
      setBathroomList(Response.data);
      return bathroomList; // TODO : manage the error if any
    });
  };


  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView style= {styles.map}  
        initialRegion={{
          latitude: 57.708870,
          longitude: 11.974560,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}> 
        <Marker 
        coordinate= {{latitude: 57.708870,
          longitude: 11.974560,}}>
            <Callout>
              <Text> I'm here </Text>
            </Callout>
        </Marker> 
         </MapView> 
        
      </View>
    );
}; 

/*
removed this from the view for now so as to just focus on the map, this relates to the database
   <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {(getBathrooms)}>    
        <Text> Show bathrooms </Text>
        </TouchableOpacity>

         <FlatList
        // I am trying to see if I can get the list to show up on the app using this FlatList shit
          numColumns= {1}
          keyExtractor= {(item) => item.name}
          data= {bathroomList}
          renderItem = {( {item}) => (
            <Text style= {styles.item}> {item.name} </Text>
          )}
          />
        */

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop:16, 
  }, 
  item: {
    marginTop: 24, 
    padding: 30, 
    backgroundColor: 'yellow',
    fontSize: 24, 
    marginHorizontal: 10, 
    marginTop: 24,
  },
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}, 
});
