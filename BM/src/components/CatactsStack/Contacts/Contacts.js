import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  AsyncStorage,
  Text
} from "react-native";
import { List, ListItem } from "react-native-elements";
import ButtonCamera from "../../ButtonCamera";
import Icon from "react-native-vector-icons/FontAwesome";
import apiBack from "../../api/apiBack";
import io from "socket.io-client";


export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://192.168.20.83:3000");
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    console.log("hola");
    AsyncStorage.getItem("userToken")
      .then(token => apiBack.GetContactOfUsers(token))
      .then(user => {

        this.socket.on("updateContacts", contacts => {
  
        });


        this.setState({ ...this.state, user: user })
      });
  }



  render() {
    console.log(this.state.user);

    return (
      <View style={styles.container}>
        <List>
          {this.state.user !== null &&
            this.state.user.contacts.map(contact => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate("ContactSelected", {
                    idContact: contact.id
                  })
                }
                roundAvatar
                avatar={{ uri: contact.pictureUrl }}
                key={contact.id}
                title={contact.firstName}
              />
            ))}
        </List>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});
