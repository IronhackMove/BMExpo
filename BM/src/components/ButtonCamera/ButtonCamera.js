import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";

export default class ButtonCamera extends Component {
  
  constructor(props) {
    super(props)
    this.props = props;
  }

  render() {
    return (
      <View style={styles.buttonSection}>

          <Icon  name="camera" size={30} color="white" />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
