import  React, {useState,useEffect} from 'react'; 
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions, Button,Text, TouchableWithoutFeedbackBase, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Network from 'expo-network';
import axios from 'axios';
import localhost from 'react-native-localhost';


export default function App() {

  const [bathroomList, setBathroomList] = useState([]);

  const Stack = createNativeStackNavigator();
  
  // related to the database, fetches the data that is on the api end point. 
  const getBathrooms = () => {
    axios.get("http://"+ localhost + ":3001/bathrooms").then((Response) => {
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
  


  /* renderMapMarkers is a function that creates multiple markers in the map, does this with the help of the map function. 
  //When a marker is pressed (onPress) we navigate to the DescriptionScreen, certain parameters are passed to the description screen 
  such as the bathroom's name,address etc. so that it can be displayed in the DescriptionScreen.
  */
  renderMapMarkers = (navigation) => {
    return (
      bathroomList.map((item,id) => {
      return (
        <Marker
           key={id}
           coordinate={{ latitude: item.latitude, longitude: item.longitude }}
           onPress= {() => 
            navigation.navigate('Description', 
            {name: item.name, address: item.address, phone: item.phone, wheelchair: item.wheelchair, baby: item.baby, free: item.free, communal: item.communal})
          } 
         />
      )
      })
    );
  };


// Get Local IP
/*
  const findIP = () => {
    Network.getIpAddressAsync().then((address)=> {
    console.log(address);
    return address; 
     })
     .catch(error => {console.log(error);
    });
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) findIP()
    console.log("Found the IP!");
    return () => {ignore = true;}
    },[]);
    */

    /*const ipAlert = async () => {
      const ip = await Network.getIpAddressAsync()
    };*/



    const findIP = () => {
      Network.getIpAddressAsync().then((address)=> {
      console.log(address);
      return address; 
       })
       .catch(error => {console.log(error);
      });
    };

    useEffect(() => {
      let ignore = false;
      if (!ignore) findIP()
      console.log("Found the IP!");
      return () => {ignore = true;}
      },[]);
      

  

 
/*Defining the HomeScreen so it includes a MapView and also so it renders markers.
//It renders markers by calling the renderMapMarkers method, it also passes the parameter navigation 
as this is what is going to allow us to navigate between screens in the stack. 
*/
  const HomeScreen = ({navigation}) => {
    return(
       <View>
          <MapView style= {styles.map}  
     initialRegion={{
       latitude: 57.708870,
       longitude: 11.974560,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}> 
     {renderMapMarkers(navigation)}
     </MapView> 
      </View> 
      
    );
  };
  
  //Defining the bathroom description screen
  //how to write the route to the image I think it does not appear in the file here
  const image = require("./.expo/web/cache/production/images/appBackground.png");

  const DescriptionScreen = ({navigation, route}) => {
    return(
      <View style={styles.container} >
        <ImageBackground source={image} style={styles.image}>
        <View style={styles.box}>
     <Text style={styles.descriptionTitle}> This is {route.params.name} </Text>
     <Text style={styles.description}> Address:{route.params.address} </Text>
     <Text style={styles.description}> Phone number:{route.params.phone} </Text>
     <Text style={styles.description}> Wheelchair friendly:{route.params.wheelchair} </Text>
     <Text style={styles.description}> Baby friendly:{route.params.baby} </Text>
     <Text style={styles.description}> Free:{route.params.free} </Text>
     <Text style={styles.description}> Communal:{route.params.communal} </Text>
     </View>
     </ImageBackground>
    </View>
    )
  };

  const modalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.1, 0.3, 0.7]
        })
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: "clamp"
        })
      }
    })
  };

  //screens are stacked, to create a new screen have to add a new <Stack.Screen>.
  //The first screen to appear is the one that is written first in the stack, in this case HomeScreen
    return (
      <NavigationContainer> 
        <Stack.Navigator screenOptions={{
    presentation: "modal",
    gestureEnabled: true}}>
          <Stack.Screen
          name= "Home"
          component ={HomeScreen}
          options={{headerShown: false}} 
          /> 
          <Stack.Screen
          name="Description"
           component={DescriptionScreen}
           /> 
        </Stack.Navigator>
        </NavigationContainer> 
      );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82C6A4',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    //height: 0
  },
  descriptionTitle: {
    fontSize: 24,
    color: 'white'
  },

  box:{
    //flex: 1,
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
    fontSize: 16,
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
