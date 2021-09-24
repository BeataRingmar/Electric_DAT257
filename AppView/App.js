import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
HAVE_GOOGLE_MAPS=1
// API Key IOS Map
// AIzaSyArsdMW-uQ3t87BoHnwgY_pqTyoEyC_fjM

// API Key Android Map
// AIzaSyDrXtMBPlOkP785ixYJ0D606ROWXvqKK40
/*
export default class App extends Component<Props> {
    render() {    
      return (      
        <MapView   
        provider ={PROVIDER_GOOGLE}     
        style={{flex: 1}}         
        region={{          
          latitude: 42.882004,          
          longitude: 74.582748,          
          latitudeDelta: 0.0922,          
          longitudeDelta: 0.0421        
        }}        
        showsUserLocation={true}      
      />    
    );  
  }
}
**/
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
