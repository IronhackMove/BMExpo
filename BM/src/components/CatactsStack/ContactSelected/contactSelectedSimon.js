import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";

import SvgUri from "react-native-svg-uri";
import ViewMoreText from "react-native-view-more-text";

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const sliderWidth = wp(100);

export default class ContactSelected extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userToken: null,
      userId: null,
      contactId: this.props.navigation.state.params.idContact,
      contactSelected: null,
      note: ""
    };
  }

  componentDidMount() {
    this.loadAppInformation();
  }

  AddContact() {
    console.log(this.state.userToken, this.state.contactId, this.state.note);

    apiBack.AddContactNote(
      this.state.userToken,
      this.state.contactId,
      this.state.note
    );
  }

  chatPage() {
    this.props.navigation.navigate("ContactChat", {
      emitter: this.state.userId,
      receiver: this.state.contactId
    });
  }

  loadAppInformation = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);
      const contactInfo = await apiBack.GetContactInfo(this.state.contactId);

      let note;

      if (userProfile.data.notes.length > 0) {
        noteFound = userProfile.data.notes.filter(
          note => note.idContact === this.state.contactId
        );

        if (noteFound.length > 0) {
          note = noteFound[0].note;
        } else {
          note = "";
        }
      } else {
        note: "";
      }

      console.log(note);

      this.setState({
        ...this.state,
        userToken: token,
        contactSelected: contactInfo.data,
        userId: userProfile.data.id,
        note: userProfile.data.notes.length > 0 ? note : ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(sliderWidth);

    return (
      <KeyboardAvoidingView
        style={styles.containerContact}
        behavior="padding"
        enabled
      >
        <View style={styles.container}>
          {this.state.contactSelected !== null && (
            <React.Fragment>
              <View style={styles.imagePerfil}>
                <Image
                  style={{ width: 250, height: 250, position: "absolute" }}
                  source={{uri: this.state.contactSelected.pictureUrl}}
                />
              </View>
              <View style={styles.arrow}>
                <SvgUri
                  width="20"
                  height="20"
                  source={require("../../resources/svg/arrow.svg")}
                />
              </View>
              <View style={styles.boxTitle}>
                <View>
                  <Text style={styles.textTitle}>
                    {this.state.contactSelected.firstName}
                  </Text>
                </View>
                <View style={styles.margin}>
                  <Text style={styles.textTitle}>
                    {this.state.contactSelected.lastName}
                  </Text>
                </View>
              </View>

              <View style={styles.boxOption1}>
                <Text style={styles.text}>Madrid, España</Text>
              </View>
              <View style={styles.boxOption2}>
                <Text style={styles.text}>
                  {this.state.contactSelected.headline}
                </Text>
              </View>
              <View style={styles.acordeon}>
                <ViewMoreText
                  numberOfLines={4}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{ textAlign: "left" }}
                >
                  <Text style={styles.acordeon}>
                    {this.state.contactSelected.summary}
                  </Text>
                </ViewMoreText>
              </View>
              <View style={styles.add}>
                <View>
                  <SvgUri
                    width="30"
                    height="30"
                    source={require("../../resources/svg//iconAdd.svg")}
                  />
                </View>
                <View style={{ marginLeft: "5%", marginTop: "-1%" }}>
                  <Text style={styles.text}>Add your notes</Text>
                  <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    onChangeText={text =>
                      this.setState({ ...this.state, note: text })
                    }
                    value={this.state.note}
                  />
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 2,
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: "3%"
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  height: "10%",
                  width: "100%",
                  marginTop: 40
                }}
              >
                <View
                  style={{
                    borderColor: "white",
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <SvgUri
                    width="30"
                    height="20"
                    source={require("./src/svg/email.svg")}
                  />
                  <Text style={styles.button2}>eMail</Text>
                </View>
                <View
                  style={{
                    borderColor: "white",
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <SvgUri
                    width="20"
                    height="20"
                    source={require("./src/svg/arrow.svg")}
                  />
                  <Text style={styles.button2}>Call</Text>
                </View>
                <View
                  style={{
                    borderColor: "white",
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <SvgUri
                    width="40"
                    height="20"
                    source={require("./src/svg/chat.svg")}
                  />
                  <Text style={styles.button2}>Chat</Text>
                </View>
              </View>
            </React.Fragment>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  imagePerfil: {
    marginLeft: "43%"
  },
  arrow: {
    marginTop: "23%",
    marginLeft: "6%"
  },
  boxTitle: {
    marginTop: "7%",
    marginLeft: "4%"
  },
  margin: {
    marginTop: "9%"
  },
  boxOption1: {
    marginTop: 60,
    marginLeft: "6%",
    marginRight: "6%"
  },
  boxOption2: {
    marginTop: 30,
    marginLeft: "6%",
    marginRight: "6%"
  },
  acordeon: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
  },
  button: {
    fontSize: 15,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 10,
    textDecorationLine: "underline"
  },

  button2: {
    fontSize: 15,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 10,
    textAlign: "center"
  },
  add: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
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
    justifyContent: "space-between"
  },
  eventName: {
    backgroundColor: "white",
    position: "absolute",
    left: -10,
    bottom: "-5%",
    paddingLeft: 10,
    paddingRight: 10
  },
  textTitle: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute"
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
    height: 500
  }
});
