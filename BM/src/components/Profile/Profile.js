import React, { Component } from "react";
import apiBack from "../api/apiBack";

import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  AsyncStorage
} from "react-native";
import { Avatar, Badge, Text } from "react-native-elements";
import ButtonCamera from "../ButtonCamera";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      userProfile: null,
      emailAddress: null,
      phoneNumber: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      const userProfile = apiBack.GetUserProfile(token);
      userProfile.then(userProfile =>
        this.setState({
          ...this.state,
          userProfile: userProfile.data,
          emailAddress: userProfile.data.emailAddress,
          phoneNumber: userProfile.data.phoneNumber,
          token: token
        })
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.userProfile !== null && (
          <React.Fragment>
            <View style={styles.imagePerfil}>
              <Avatar
                xlarge
                rounded
                source={{
                  uri: `${this.state.userProfile.pictureUrl}`
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
                  {this.state.userProfile.firstName}
                </Text>
              </Badge>
              <Badge containerStyle={{ backgroundColor: "#2689DC" }}>
                <Text h4 style={{ color: "white", textAlign: "center" }}>
                  {this.state.userProfile.headline}
                </Text>
              </Badge>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChangeText={text =>
                  this.setState({ ...this.state, emailAddress: text })
                }
                value={this.state.emailAddress}
              />
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChangeText={text =>
                  this.setState({ ...this.state, phoneNumber: text })
                }
                value={this.state.phoneNumber}
              />
            </View>
            <View style={styles.buttonSection2}>
              <Button
                title="Save"
                onPress={() =>
                  this.props.navigation.navigate("Home")
                  // apiBack
                  //   .UpdateUserProfile(
                  //     this.state.userProfile.access_token,
                  //     this.state.emailAddress,
                  //     this.state.phoneNumber
                  //   )
                  //   .then(() =>
                  //     this.props.navigation.navigate("Home")
                  //   )
                }
              />
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagePerfil: {
    flex: 2,
    paddingTop: 10,
    backgroundColor: "#EBEDF0",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonSection2: {
    flex: 1
  }
});
