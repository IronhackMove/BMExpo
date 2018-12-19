import React from "react";
import apiBack from "../api/apiBack";
import apiMeetups from "../api/apiMeetups";
import SvgUri from "react-native-svg-uri";
import Carousel from "react-native-snap-carousel";
import { CategoryImages } from "../utils/utils";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";
import { Text, Button } from "react-native-elements";
import EventCard from "../Events/EventCard";
import EventModal from "../Events/EventModal/EventModal";
import { Days, meetupsIfError } from "../utils/utils";

var moment = require("moment");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const slideHeight = wp(30);
const sliderWidth = wp(100);
const itemWidth = wp(85);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      user: null,
      events: null,
      location: null,
      modalVisible: false,
      eventSelected: null,
      loadingContent: true
    };
  }

  componentDidMount() {
    this.loadPosition();
  }

  setModalVisible(visible, event) {
    this.setState({
      ...this.state,
      modalVisible: visible,
      eventSelected: event
    });
  }

  _showCategoriesMeetups() {
    apiMeetups.GetCategories();
  }

  _reloadApi = async () => {
    console.log("hola");
    const token = await AsyncStorage.getItem("userToken");
    const categories = this.state.user.selectedCategories;
    const closeMeetups = await apiMeetups.GetCloseMeetups(
      token,
      this.state.location
    );
    const meetups = closeMeetups
      .map(meetups => meetups.data)
      .map(events => events.events.slice(0, 5));
    const meetupsCategorized = [];

    categories.forEach((category, i) => {
      meetups[i].push({ category: category });
    });

    console.log(meetups);
    this.setState({ ...this.state, buttonRefresh: false, events: meetups });
  };

  loadPosition = async () => {

    try {
      const token = await AsyncStorage.getItem("userToken");
      const position = await this.getCurrentPosition();
      const userProfile = await apiBack.GetUserProfile(token);
      const categories = userProfile.data.selectedCategories;
      const closeMeetups = await apiMeetups.GetCloseMeetups(
        userProfile,
        position
      );

      const meetups = closeMeetups
        .map(meetups => meetups.data)
        .map(events => events.events.slice(0, 5));

      categories.forEach((category, i) => {
        meetups[i].forEach(meet => {
          meet.image =
            CategoryImages[category.shortname][
              parseInt(
                Math.random() * CategoryImages[category.shortname].length
              )
            ];
        });
      });

      joinMeetups = [];

      meetups.forEach((meetup, i) => {
        meetup.forEach(meet => {
          joinMeetups.push(meet);
        });
      });

      joinMeetups.unshift({});
      console.log(joinMeetups);

      this.setState({
        ...this.state,
        token: token,
        location: position.coords,
        user: userProfile.data,
        events: joinMeetups,
        loadingContent: false
      });
    } catch (error) {
      console.log("ha petado");
      this.setState({loadingContent: false})
      // console.log(error);
    }
  };

  getCurrentPosition = (
    options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  ) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  _keyExtractor = (item, index) => item.id;

  // _renderItem = ({ item }) => (
  //   <TouchableHighlight
  //     onPress={() => {
  //       this.setModalVisible(true, item);
  //     }}
  //   >
  //     <EventCard item={item} city={this.state.events.city.city} />
  //   </TouchableHighlight>
  // );

  _renderItem({ item, index }) {
    console.log();

    return (
      <View style={styles.slide}>
        <View>
          <View>
            {item.local_date ? (
              <View style={styles.eventDate}>
                <View style={styles.eventDay}>
                  <Text style={styles.text}>
                    {Days[moment(item.local_date).day()]}
                  </Text>
                  <Text style={styles.text}>
                    {item.local_date ? item.local_date : ""}
                  </Text>
                </View>
                <View style={styles.eventHour}>
                  <Text style={styles.text}>Hour</Text>
                  <Text style={styles.text}>
                    {item.local_time ? item.local_time : ""}
                  </Text>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>

          <Image
            style={{ width: wp(85), height: wp(120) }}
            source={item.image}
          />

          {item.venue ? (
            <View>
              <Text style={styles.text}>
                {item.venue ? item.venue.address_1 : "No adress"}
              </Text>
            </View>
          ) : (
            <View />
          )}

          {item.name ? (
            <View style={styles.eventName}>
              <Text style={styles.nameevent}>{item.name ? item.name : ""}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <SvgUri
            width="80"
            height="80"
            source={require("../resources/svg/logo.svg")}
          />
          <Text style={{ color: "wihte" }}>Hola</Text>

          <View style={styles.claim}>
            <Text style={styles.text}>Bussines Meeting,</Text>
            <Text style={styles.text}>your contacts interesting</Text>
            <Text style={styles.text}>in your hand.</Text>
          </View>

          <View style={styles.slidesContainer}>
            {this.state.loadingContent === true && (
              <View>
                <Text style={styles.text}>Buscando meetups cercanos..</Text>
              </View>
            )}
            {this.state.events !== null && (
              <Carousel
                layout={"default"}
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.events}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                itemHeight={slideHeight}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  slidesContainer: {
    position: "absolute",
    top: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "380%"
  },
  logo: {
    marginTop: 80,
    marginLeft: 25
  },

  claim: {
    marginTop: 25
  },
  title: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    textAlign: "left",
    marginBottom: 1.5,
    color: "black"
  },
  eventDate: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  eventName: {
    backgroundColor: "white",
    position: "absolute",
    left: -10,
    bottom: "15%",
    paddingLeft: 10,
    paddingRight: 10
  },
  nameevent: {
    fontSize: 18
  },
  text: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    textAlign: "left",
    margin: 1.5,
    color: "white"
  },
  slide: {
    height: 400
  }
});
