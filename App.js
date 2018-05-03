import React from 'react';
import { StyleSheet, Text, View, Vibration, Button } from 'react-native';


const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;


export default class App extends React.Component {
    

    componentDidMount() {
        Vibration.vibrate();
    }
    
    StartVibrationFunction=()=>{
        Vibration.vibrate(DURATION) ;
    }

    StopVibrationFunction=()=>{
        Vibration.cancel();
    }
    
    render() {
      return (
      <View style={styles.container}>
        <Text>REACT-NATIVE</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>

        <Button title = " Start Vibration " onPress = {this.StartVibrationFunction} />

 
        <Button title = " Stop Vibration " onPress = {this.StopVibrationFunction} />
 

        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
