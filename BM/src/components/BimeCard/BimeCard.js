import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import QRCode from "react-native-qrcode-svg";
import apiBack from "../api/apiBack"
import ButtonCamera from "../ButtonCamera";

export default class BimeCard extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      user: null,
      idUser: null
    }

  }

  componentDidMount() {
    this.loadDataApp()
  }

  loadDataApp = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);

      console.log(userProfile)

      this.setState({
        ...this.state,
        user: userProfile.data,
        idUser: userProfile.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    return (
      <View style={styles.container}>
        { this.state.idUser !== null &&
        <QRCode value={this.state.idUser}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

