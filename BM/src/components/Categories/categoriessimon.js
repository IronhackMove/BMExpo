import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, Dimensions, onPress, shadowColor } from 'react-native';

import Button from 'react-native-button'

const colors = {
	Tech: "",
	Business: "",
	Education: "",
	Community: "",
	Movements: "",
	Tech: "",
	Support: "",
	
}

export default class ContactsCollapse extends Component {


	constructor() {
		super();
	}
	_handlePress(e) {

	  }
	render() {
		const options = [ { value: 0, label: '0' } ];
		return (
			<View style={styles.container}>
			
				<View style={{ height:'100%', width:'100%'}}>
					<View style={{ flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
							<Text style={styles.text} onPress={() => {}}>Select your favorit event</Text>
					</View>
					<View style={{ flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Bussines
      					</Button>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Community
      					</Button>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Education
      					</Button>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Politic
      					</Button>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Support
      					</Button>
						<Button style={styles.textName} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Tech
      					</Button>

					</View>
					<View style={{ flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<Button style={styles.text} styleDisabled={{color: 'red'}} onPress={() => this._handlePress()}>
							Save
      					</Button>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'black',
	},
	textName: {
		fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 21,
		color: 'black',
		backgroundColor: 'white',
		paddingLeft: 10,
		paddingRight: 10,
		height: 25,
		marginTop:20	
	},
	buttons: {
		width: 400,
		marginTop: 10,
		alignItems: "center"
	},
	text: {
		fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 13,
		margin: 1.5,
		color: 'white'
	},
  
});