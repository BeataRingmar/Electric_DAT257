import  React, {useState,useEffect, useRef} from 'react'; 
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View,  Dimensions,Text, ImageBackground, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import localhost from 'react-native-localhost';
import axios from 'axios';



export default function App(){

  const [bathroomList, setBathroomList] = useState([]);
 
  const [region, setRegion] = useState({
    latitude: 57.708870,
    longitude: 11.974560,
    latitudeDelta: 0.062,
    longitudeDelta: 0.025,
  }); 

  const mapView = useRef(null);

 const currentRegion = new MapView.AnimatedRegion(region);

  const Stack = createNativeStackNavigator();
  const image = require("../AppView/assets/Background.png");
  const markerImage = require("../AppView/assets/BathroomMarker.png");



  // Fetches data from the API end point which is then made into an array using setBathroomList. 
  const getBathrooms = () => {
    axios.get("http://" + localhost + ":3001/bathrooms").then((Response) => {
      setBathroomList(Response.data);
      return bathroomList; 
    })
    .catch(error => {console.log(error);
    });
  };

  // Calls getBathrooms every time the application is run.
  useEffect(() => {
    let ignore = false;
    if (!ignore) getBathrooms()
    console.log("At least you've gotten here");
    return () => {ignore = true;}
    },[]);


  
  // Creates markers from the data in bathroomList using the map method. When a marker is pressed, 
  // it navigates to the DescriptionScreen. Some parameters are passed to the description screen so they can be displayed.
  renderMapMarkers = (navigation) => {
    return (
      bathroomList.map((item,id) => {
      return (
        <Marker
           key={id}
           coordinate={{ latitude: item.latitude, longitude: item.longitude }}
           onPress= {() => 
            navigation.navigate('Description', 
            {name: item.name, address: item.address, phone: item.phone, 
              wheelchair: item.wheelchair, baby: item.baby, free: item.free, communal: item.communal})
          } 
         >
           <Image source= {markerImage} style={{height: 55, width:55 }}/> 
           </Marker>
      )
      })
    );
  };

// Used for the description screen to show "yes" or "no" if a bathroom has a certain feature. 
  const returnYes = (details) => {
    if(details == 1){ 
      return "Yes"} 
    else {
      return "No"
    }
  }


// Defines the HomeScreen.
  const HomeScreen = ({navigation}) => {
    return(
       <View style= {{marginTop: 0, flex:1}}> 
         <GooglePlacesAutocomplete
      placeholder='Search for bathrooms around your area...'
      fetchDetails= {true}
      GooglePlacesSearchQuery={{
        rankby: "distance"
      }}
      onPress={(data, details = null) => {
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.020,
          longitudeDelta: 0.020,
        })
      }}
      query={{
       key: "API KEY",
        language: 'en',
        components: "country:swe", 
        radius: 100,
      }}
      styles= {{
        container: {flex: 0, position: "absolute", width: "100%", zIndex: 1},
        listView: {backgroundColor: "white"}
      }}
    />
          <MapView.Animated
          ref={mapView}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          style= {styles.map}  
          region={currentRegion}
     initialRegion={{
       latitude: 57.708870,
       longitude: 11.974560,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
     provider = "google"
     
     > 
     {renderMapMarkers(navigation)}
     </MapView.Animated> 
      </View>    
    );
  };


  
  //Defines the DescriptionScreen that gives details of each bathroom.
  const DescriptionScreen = ({navigation, route}) => {
    return(
      <View style={styles.container} >
      <ImageBackground source={image} style={styles.image}>
      <View style={styles.box}>
   <Text style={styles.descriptionTitle}> This is {route.params.name} </Text>
   <Text style={styles.description}> Address: {route.params.address} </Text>
   <Text style={styles.description}> Phone number: {route.params.phone} </Text>
   <Text style={styles.description}> Wheelchair friendly: {returnYes(route.params.wheelchair)} </Text>
   <Text style={styles.description}> Baby friendly: {returnYes(route.params.baby)} </Text>
   <Text style={styles.description}> Free: {returnYes(route.params.free)} </Text>
   <Text style={styles.description}> Communal: {returnYes(route.params.communal)} </Text>
   </View>
   </ImageBackground>
  </View>
    )
  };

  // Creates a Stack made up of Stack.Screen components so as to easily navigate between screens.
      return (
      <NavigationContainer> 
        <Stack.Navigator >
          <Stack.Screen 
          name= "Home"
          component ={HomeScreen}
          options={{
            title: "Got To Go",
            headerStyle: {
              backgroundColor: "#88d0ad", 
            },
            headerTintColor: '#fff',       
             headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
          }}
          /> 
          <Stack.Screen
          name="Description"
           component={DescriptionScreen}
           options={{
            title: "About this location",
            headerStyle: {
              backgroundColor: "#88d0ad", 
            },
            headerTintColor: '#fff',       
             headerTitleStyle: {fontWeight: 'bold'},
          }} 
           /> 
        </Stack.Navigator>
        </NavigationContainer> 
      );
      }
    

      // Style sheets for the different components
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#82C6A4',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: Dimensions.get('window').width,
        },

        descriptionTitle: {
          fontSize: 24,
          color: 'white'
        },

        box:{
          width: 400, 
          height: 250,
          marginTop: 150, 
          backgroundColor: '#88d0ad',
          borderRadius: 20,
          borderWidth: 8,
          borderColor: '#bbe4d0',
          padding: 25,
          display:"flex",
          justifyContent:"center",
        },
      
        image:{
          flex: 1,
          resizeMode: "cover",
          width: "100%",
          alignItems: "center",  
        },
      
        description: {
          fontSize: 17,
          color: 'white'
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

      name: {
        fontSize: 12,
          color: "#444"
      },
      
      bubbles: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 200,
      },
      });