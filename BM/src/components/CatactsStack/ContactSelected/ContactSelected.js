import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import apiBack from "../../api/apiBack";
import { Avatar, Badge, Text } from "react-native-elements";


const _ = require("lodash");

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

  componentDidMount() {
    this.loadAppInformation();
  }

  AddContact() {

    console.log(    this.state.userToken,
      this.state.contactId,
      this.state.note)

    apiBack.AddContactNote(
      this.state.userToken,
      this.state.contactId,
      this.state.note
    );
  }

  chatPage() {
    this.props.navigation.navigate("ContactChat", {emitter: this.state.userId, receiver: this.state.contactId})
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.containerContact}
        behavior="padding"
        enabled
      >
        <View style={styles.containerContact}>
          {this.state.contactSelected !== null && (
            <React.Fragment>
              <View style={styles.imagePerfil}>
                <Avatar
                  xlarge
                  rounded
                  source={{
                    uri: `${this.state.contactSelected.pictureUrl}`
                  }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  avatarStyle={{
                    shadowColor: "black",
                    shadowRadius: 10
                  }}
                />
                <Badge containerStyle={{ backgroundColor: "#2689DC" }}>
                  <Text h2 style={{ color: "white" }}>
                    {this.state.contactSelected.firstName}
                  </Text>
                </Badge>
                <Badge containerStyle={{ backgroundColor: "#2689DC" }}>
                  <Text h4 style={{ color: "white", textAlign: "center" }}>
                    {this.state.contactSelected.headline}
                  </Text>
                </Badge>
              </View>
              <View style={styles.buttonSection}>
                <TextInput
                  style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                  onChangeText={text =>
                    this.setState({ ...this.state, note: text })
                  }
                  value={this.state.note}
                />
                <Button title="Save" onPress={() => this.AddContact()} />
                <Button title="Chat" onPress={() => this.chatPage()} />
              </View>
            </React.Fragment>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerContact: {
    flex: 1
  },
  imagePerfil: {
    flex: 2,
    paddingTop: 10,
    backgroundColor: "#EBEDF0",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonSection: {
    flex: 1
  }
});
