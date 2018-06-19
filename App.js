import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, ScrollView, Text, View, Vibration, Button, Image, TabBarIOS } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts'
import { StackNavigator } from 'react-navigation';


import { appImages } from './images';

const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;
/*
const App = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});
*/

/*
class Greeting extends React.Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}
*/


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff9900' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}




export default class App extends React.Component {
  constructor(props){
    super(props);
    //console.log("hi");  
    //this.filterOfficeType.bind(this);
    this.state = {
      isLoading: true,
      refreshing:false,
      office:"all",
      progress:0.5
    }
  }

  componentDidMount() {
      return fetch('https://cngodles.github.io/people.json?yes=1')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            fulldataSource: responseJson.employees,
            dataSource: responseJson.employees,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        })
      ;
  }

  componentDidUpdate() {
    this.filterOfficeType;
  }

  StartVibrationFunction=()=>{
    Vibration.vibrate(DURATION) ;
  }

  StopVibrationFunction=()=>{
    Vibration.cancel();
  }
  
  changeProgress(amt){
    let newstate = this.state.progress+amt;
    this.setState({progress:newstate});
  }

  setProgress(amt){
    this.setState({progress:amt});
  }

  filterOfficeType(officetype){
    console.log(this.state.progress);
    let newarray = [];
    this.state.fulldataSource.forEach((element, index) => {
        if(element.office === officetype) {
          newarray.push(element);
        }
    });
    //console.log(this.state.progress);
    this.setState({
      dataSource:newarray,
      office:officetype
    });
    //console.log(this.state);
  }

  render() {
    if(this.state.isLoading){
        return(
          <View style={{flex: 3, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      return(
        <View style={{flex: 1, padding:0}}>
          <Text style={styles.headline}>Pokemon Go Reference</Text>
          <HomeScreen />
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', padding:0, backgroundColor: '#009fdb'}}>
            <Button onPress={(e) => this.filterOfficeType("pitt")} buttonStyle={{width: 50, flex:1}} title="Pitt" />
            <Button onPress={(e) => this.filterOfficeType("atl")} buttonStyle={{width: 50, flex:1}} title="Atl" />
            <Button onPress={(e) => this.changeProgress(0.02)} buttonStyle={{width: 50, flex:1}} title="Up" />
            <Button onPress={(e) => this.changeProgress(-0.02)} buttonStyle={{width: 50, flex:1}} title="Down" />
          </View>
          <ProgressCircle
            style={ { flex:1 } }
            progress={ this.state.progress }
            progressColor={'rgb(134, 65, 244)'}
            startAngle={ -Math.PI * 0.9 }
            endAngle={ Math.PI * 0.9 }
            />
          <FlatList
            style={ { flex:3 } }  
            data={this.state.dataSource}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              renderItem={({item}) => 
                <Text style={{padding:10}}>
                  <Text style={{fontSize:20}}>{item.nameLast}, {item.nameFirst}</Text>{"\n"}
                  {item.email}{"\n"}{item.ext}
                </Text>}
              keyExtractor={(item, index) => index.toString()}
          />
          <TabBarIOS>
            <TabBarIOS.Item 
              title="Down" 
              systemIcon="favorites"
              onPress={(e) => this.setProgress(0.50)}
            />
            <TabBarIOS.Item 
              title="Down" 
              systemIcon="favorites"
              onPress={(e) => this.setProgress(0.75)}
            />
          </TabBarIOS>
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
    headline: {
        flex:2,
        fontSize: 24,
        fontWeight:"700",
        padding:20,
        textAlign:"center",
				color:'#fff',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
  },
});
