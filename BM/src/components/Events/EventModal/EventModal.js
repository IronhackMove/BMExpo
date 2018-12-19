import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  Alert,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";

export default class EventModal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      modalVisible: null
    };
  }

  render() {
    console.log(this.props.eventSelected);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >

          {this.props.eventSelected !== null && (
            <View style={styles.container}>
              <Button
                title="Close"
                onPress={() => {
                  this.props.setModalVisible(false, this.props.eventSelected);
                }}
              />

              <Text style={styles.titleEvent}>{this.props.eventSelected.name}</Text>

              <Text style={styles.infoEvent}>{this.props.eventSelected.description}</Text>
            </View>
          )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(122,122,122,0.4)",
    textAlign: "left"
  },
  titleEvent: {
    backgroundColor: "white",
    color: "black"
  },
  infoEvent: {
    fontWeight: "bold",
    color: "white"
  }
});
