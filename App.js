import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, ScrollView, Text, View, Vibration, Button, Image } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts'


const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;

/*
class Greeting extends React.Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}
*/

export default class App extends React.Component {
  constructor(props){
    super(props);
    //console.log("hi");  
    this.filterOfficeType.bind(this);
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
  
  increaseProgress(){
    
    this.setState({progress:this.state.progress+0.1})
  }

  filterOfficeType(officetype){
    let newarray = [];
    this.state.fulldataSource.forEach((element, index) => {
        if(element.office === officetype) {
          newarray.push(element);
        }
    });
    this.setState({
      dataSource:newarray,
      office:officetype
    });
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
        <View style={{flex: 3, padding:20}}>
          <Text style={styles.headline}>Chemistry Contacts</Text>
          <Button onPress={(e) => this.filterOfficeType("pitt")} title="Pitt" />
          <Button onPress={(e) => this.filterOfficeType("atl")} title="Atl" />
          <Button onPress={this.increaseProgress} title="Up" />
          <ProgressCircle
                style={ { height: 200 } }
                progress={ this.progress }
                progressColor={'rgb(134, 65, 244)'}
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
            />
          <FlatList
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
        flex:0.2,
        fontSize: 30,
        fontWeight:"700",
        padding:20,
        textAlign:"center",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  },
});
