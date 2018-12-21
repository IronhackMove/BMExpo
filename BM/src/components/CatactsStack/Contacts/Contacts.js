//

import React, { Component } from "react";
import io from "socket.io-client";
import { URL } from "../../utils/utils";


import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableHighlight
} from "react-native";

import apiBack from "../../api/apiBack";
import Accordion from "react-native-collapsible/Accordion";
import SvgUri from "react-native-svg-uri";

export default class Contacts extends Component {



  static navigationOptions = {
    header: null // !!! Hide Header
  };

  componentDidMount() {
     
    this._updateList();

  }

  _updateList = () => {
    
    setInterval(() => {

      AsyncStorage.getItem("userToken")
      .then(token => apiBack.GetContactOfUsers(token))
      .then(user => {
        console.log(user);
        // this.socket.on("updateContacts", contacts => {});
        this.setState({ ...this.state, user: user });
      });

    }, 2000)
  }

  constructor() {
    super();
    this.state = {
      activeSections: [],
      user: null
    };

    this.socket = io(URL);

    this.socket.on("updateContacts", message => {
      AsyncStorage.getItem("userToken")
        .then(token => apiBack.GetContactOfUsers(token))
        .then(user => {
          console.log(user);
          // this.socket.on("updateContacts", contacts => {});
          this.setState({ ...this.state, user: user });
        });
    });
  }

  _renderHeader = item => {
    return (
      <View>
        <View style={styles.event}>
          <View style={styles.header}>
            <Text style={styles.headerEvent}>{item.meetup}</Text>
          </View>
          <View style={(width = "100%")}>
            <View style={{ marginRight: 20 }}>
              <SvgUri
                marginTop="30"
                width="20"
                height="20"
                source={require("../../resources/svg/arrow.svg")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  _renderContent = item => {
    console.log(item);
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("ContactSelected", {
            idContact: item.contact.id
          })
        }
      >
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{ uri: item.contact.pictureUrls.values[0] }}
          />
          <View style={styles.positionNameText}>
            <Text style={styles.name}>
              {item.contact.firstName} {item.contact.lastName}
            </Text>
            <Text style={styles.text}>{item.contact.headline}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <View style={styles.arrow}>
            <SvgUri
              width="20"
              height="20"
              source={require("../../resources/svg/arrow.svg")}
            />
          </View>
        </TouchableHighlight>

        {this.state.user !== null && (
          <Accordion
            sections={this.state.user.contacts}
            activeSections={this.state.activeSections}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        )}

        {/* {
					this.state.user.contacts === null &&
					<View>
						<Text>Escane a tu primer contacto!</Text>
					</View>
				} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  section: {
    justifyContent: "center"
  },
  positionNameText: {
    marginTop: "5%",
    marginRight: "10%"
  },
  content: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginLeft: "5%"
  },
  avatar: {
    marginTop: "0%",
    marginLeft: "-5%",
    width: "28%",
    height: 150
  },
  header: {
    marginTop: "50%"
  },
  header1: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "10%"
  },
  event: {
    marginTop: "8%",
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerEvent: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "5%",
    marginRight: "10%"
  },
  arrow: {
    marginTop: "23%",
    marginLeft: "6%"
  },
  name: {
    fontSize: 13,
    letterSpacing: 1.2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "3%",
    marginRight: "6%",
    color: "black",
    backgroundColor: "white",
    position: "absolute"
  },
  text: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: "10%",
    marginLeft: "6%",
    marginRight: "20%"
  },
  header: {
    color: "white"
  },
  headerText: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
  }
});
