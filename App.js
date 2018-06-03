import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, ScrollView, Text, View, Vibration, Button, Image } from 'react-native';


const DURATION = 10000 ;
const PATTERN = [ 1000, 2000, 3000, 4000] ;


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
					isLoading: true,
					refreshing:false,
					office:"all"
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
    
    StartVibrationFunction=()=>{
        Vibration.vibrate(DURATION) ;
    }

    StopVibrationFunction=()=>{
        Vibration.cancel();
    }
		
		filterOfficeType = (officetype) => {
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
		
		filterOfficeTypePitt = () => {
			let newarray = [];
			this.state.fulldataSource.forEach((element, index) => {
					if(element.office === 'pitt') {
						newarray.push(element);
					}
			});

			this.setState({
				dataSource:newarray,
				office:"pitt"
			});
		}
		
		filterOfficeTypeAtl = () => {
			let newarray = [];
			this.state.fulldataSource.forEach((element, index) => {
					if(element.office === 'atl') {
						newarray.push(element);
					}
			});

			this.setState({
				dataSource:newarray,
				office:"atl"
			});
		}
    
    handleRefresh = () => {
        this.setState({
            lastSuggestionKey: '',
            refreshing: true
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
						<Button onPress={this.filterOfficeType('pitt')} title="Pitt" />
					  <Button onPress={this.filterOfficeTypeAtl} title="Atl" />
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

        /*
        return (
        <ScrollView>  
            <View style={styles.container}>
                <Text style={styles.headline}>Chemistry Contacts</Text>
                <Text>Open up App.js to start working on your app!</Text>

 

        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    </ScrollView>
    );
    
  }*/
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
