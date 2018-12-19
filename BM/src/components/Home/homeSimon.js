import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Carousel from 'react-native-snap-carousel';

function wp(percentage) {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const slideHeight = wp(30);;

const sliderWidth = wp(100);
const itemWidth = wp(85);

const ENTRIES1 = [
	{
		event: '',
    day1: '',
    day2: '',
    hour1: '',
    hour2: '',
    place: '',
    adress: '',
		illustration: ''
	},
	{
		event: 'Earlier this morning, NYC',
    day1: 'Miercoles ·',
    day2: '00/00/0000',
    hour1: 'Hour',
    hour2: '20.00 · 21.30',
    place: 'LIFFERY MADRID',
    adress: 'Paseo de la castellana 208, Madrid',
		illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
	},
	{
		event: 'Earlier this morning, NYC',
    day1: 'Miercoles ·',
    day2: '00/00/0000',
    hour1: 'Hour',
    hour2: '20.00 · 21.30',
    place: 'LIFFERY MADRID',
    adress: 'Paseo de la castellana 208, Madrid',
		illustration: 'https://i.imgur.com/MABUbpDl.jpg'
	},
	{
    event: 'Earlier this morning, NYC',
    day1: 'Miercoles ·',
    day2: '00/00/0000',
    hour1: 'Hour',
    hour2: '20.00 · 21.30',
    place: 'LIFFERY MADRID',
    adress: 'Paseo de la castellana 208, Madrid',		
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
	},
	{
    event: 'Earlier this morning, NYC',
   
    day2: '00/00/0000',
 
    hour2: '20.00 · 21.30',
    place: 'LIFFERY MADRID',
    adress: 'Paseo de la castellana 208, Madrid',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
	},
	{
    event: 'Earlier this morning, NYC',
    day1: 'Miercoles ·',
    day2: '00/00/0000',
    hour1: 'Hour',
    hour2: '20.00 · 21.30',
    place: 'LIFFERY MADRID',
    adress: 'Paseo de la castellana 208, Madrid',		
    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
	}
];

export default class App extends Component {
	constructor() {
		super();
  }


	_renderItem({ item, index }) {
		return (
			<View style={styles.slide}>
          <View style={styles.eventDate}>
            <View style={styles.eventDay}>
              <Text style={styles.text}>{item.day1}</Text>
              <Text style={styles.text}>{item.day2}</Text>
            </View>
            <View style={styles.eventHour}>
              <Text style={styles.text}>{item.hour1}</Text>
              <Text style={styles.text}>{item.hour2}</Text>
            </View>
          </View>
      	
				<Image style={{ width: wp(85), height: wp(140) }} source={{ uri: `${item.illustration}` }} />

        <View>
          <Text style={styles.text}>{item.place}</Text>
          <Text style={styles.text}>{item.adress}</Text>
        </View>
        <View style={styles.eventName}>
					<Text>{item.event}</Text>
				</View>
			</View>
		);
	}

	render() {


		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<SvgUri width="80" height="80" source={require('./src/svg/logo.svg')} />
					<View style={styles.claim}>
						<Text style={styles.text}>Bussines Meeting,</Text>
						<Text style={styles.text}>your contacts interesting</Text>
						<Text style={styles.text}>in your hand.</Text>
					</View>
					<View style={styles.slidesContainer}>
						<Carousel
							layout={'default'}
							ref={(c) => {
								this._carousel = c;
							}}
							data={ENTRIES1}
							renderItem={this._renderItem}
							sliderWidth={sliderWidth}
							itemWidth={itemWidth}
							itemHeight={slideHeight}
						/>
					</View>
				</View>
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
	slidesContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: '380%'

	},
	logo: {
		marginTop: 80,
		marginLeft: 25
	},

	claim: {
		marginTop: 25
	},
	title: {
    fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 13,
		textAlign: 'left',
		marginBottom: 1.5,
		color: 'black'
  },
  eventDate:{
		flex:0,
		flexDirection: 'row',
		justifyContent: 'space-between'
  },
  eventName: {
    backgroundColor: "white", 
    position: "absolute", 
    left: -10,
    bottom: '-5%',
    paddingLeft: 10,
    paddingRight:10
  },

	text: {
		fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 13,
		textAlign: 'left',
		margin: 1.5,
		color: 'white'
	},
	slide: {
		height: 500
	}
});