import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import SvgUri from 'react-native-svg-uri';

const SECTIONS = [
	{
		title: 'Alejandro Guti Hernesti',
		content: 'WEB Developer - Full Stack - JavaScript, CSS, HTML, NodeJS, MongoDB, Mongoose, ReactJS, Express ',
		image: require('./src/img/avatar1.jpg')
	},
	{
		title: 'Alberto el aleman',
		content: 'WEB Developer - Full Stack - JavaScript, CSS, HTML, NodeJS, MongoDB, Mongoose, ReactJS, Express ',
		image: require('./src/img/img.jpg')
	}
];

export default class Contacts extends Component {

	componentDidMount() {
		AsyncStorage.getItem("userToken")
		  .then(token => apiBack.GetContactOfUsers(token))
		  .then(user => {
			// this.socket.on("updateContacts", contacts => {});
			this.setState({ ...this.state, user: user });
		  });
	  }

	constructor() {
		super();
		this.state = {
			activeSections: []
		};
	}

	_renderHeader = (section) => {
		return (
			<View style={styles.event}>
				<View style={styles.header}>
					<Text style={styles.headerEvent}>{section.title}</Text>
				</View>
				<View style={(width = '100%')}>
					<View style={{marginRight: 20}}>
						<SvgUri marginTop="30" width="20" height="20" source={require('../../resources/svg/arrow.svg')}/>
					</View>
				</View>
			</View>
		);
	};
	_renderContent = (item) => {
		return (
			<View style={styles.content}>
				<Image style={styles.avatar} source={{uri: `${item.pictureUrl}`}} />
				<View style={styles.positionNameText}>
					<Text style={styles.name}>{item.firstName}</Text>
					<Text style={styles.text}>{item.headline}</Text>
				</View>
			</View>
		);
	};
	_updateSections = (activeSections) => {
		this.setState({ activeSections });
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.arrow}>
					<SvgUri width="20" height="20" source={require('../../resources/svg/arrow.svg')} />
				</View>
				<Accordion
					sections={this.state.user.contacts}
					activeSections={this.state.activeSections}
					renderSectionTitle={this._renderSectionTitle}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
					onChange={this._updateSections}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: 'black',
		color: 'white'
	},
	positionNameText: {
		marginTop: '5%',
		marginRight: '10%'
	},
	content: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		marginLeft: '5%',

	},
	avatar: {
		marginTop: '0%',
		marginLeft: '-5%',
		width: '28%',
		height: 150
	},
	header: {
		marginTop: '50%'
	},
	event: {
		marginTop: '8%',
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerEvent: {
		fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 21,
		textAlign: 'left',
		color: 'black',
		backgroundColor: 'white',
		paddingLeft: 10,
		paddingRight: 10,
		marginLeft: '5%',
		marginRight: '10%'
	},
	arrow: {
		marginTop: '23%',
		marginLeft: '6%'
	},
	name: {
		fontSize: 13,
		letterSpacing: 1.2,
		paddingLeft: 10,
		paddingRight: 10,
		marginLeft: '3%',
		marginRight: '6%',
		color: 'black',
		backgroundColor: 'white',
		position: 'absolute'
	},
	text: {
		fontSize: 13,
		letterSpacing: 1.2,
		color: 'white',
		marginTop: '10%',
		marginLeft: '6%',
		marginRight: '20%'
	},
	header: {
		color: 'white'
	},
	headerText: {
		fontSize: 13,
		letterSpacing: 1.2,
		color: 'white',
		marginTop: 40,
		marginLeft: '6%',
		marginRight: '6%'
	}
});