import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Button,
  StyleSheet,
  Image,
  Text
} from "react-native";
import axios from "axios";
import fetch from "node-fetch";

import LinkedInModal from "react-native-linkedin";
import apiBack from "../api/apiBack";
import {URL} from "../utils/utils"

export default class Login extends React.Component {

  constructor(){
    super()
    this.baseURL = URL
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BM</Text>

        <LinkedInModal
          clientID="77c7dguhn2k24m"
          clientSecret="M4bawEQmMYtEZPxM"
          redirectUri="https://127.0.0.1:3000/"
          linkText={
            <Image
              style={{ width: 210, height: 50 }}
              source={require("../resources/images/linkedinlogin.png")}
            />
          }
          onSuccess={data => {
            this.getUser(data);
          }}
        />
        <Button title="Hola" onPress={apiBack.SayHello}></Button>
      </View>
    );
  }

  _sayHello = async () => {
      await axios.get(`${this.baseURL}/auth/sayHello/`)
      .then((response) => console.log(response))
  }

  _sendDataToBack(data)  {
    axios
      .post(`${this.baseURL}/auth/saveUsereData/`, data)
      .then((user) => {
        console.log(user.data)
        AsyncStorage.setItem("userToken", data.access_token);
        if (user.data.firstSignup === true ) {
          this.props.navigation.navigate('Categories', {access_token: data.access_token});
        } else {
          this.props.navigation.navigate('App');
        }
    
      });
  };
  

  async getUser({ access_token }) {

    const baseApi = "https://api.linkedin.com/v1/people/";
    const qs = { format: "json" };
    const params = [
      "id",
      "first-name",
      "last-name",
      "summary",
      "specialties",
      "positions",
      "industry",
      "picture-url",
      "headline",
      "email-address",
      "public-profile-url"
    ];

    const response = await fetch(
      `${baseApi}~:(${params.join(",")})?format=json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const payload = await response.json();
    const userInfo = { ...payload, access_token: access_token };
    console.log(userInfo)
    this._sendDataToBack(userInfo)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center"
  },
  title: {
    fontFamily: "Futura",
    fontSize: 100,
    color: "white"
  }
});
