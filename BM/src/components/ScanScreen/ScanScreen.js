import React, { Component } from "react";
import Modal from "react-native-modal";
import apiBack from "../api/apiBack";
import { Avatar, Badge, Text } from "react-native-elements";
import { BarCodeScanner, Permissions } from "expo";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Dimensions,
  AsyncStorage,
  StatusBar,
  Vibration
} from "react-native";

import ModalNewContact from "./ModalNewContact";

// import QRCodeScanner from "react-native-qrcode-scanner";

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      isModalVisible: false,
      idUser: null,
      qrStatus: true,
      contactUser: null,
      hasCameraPermission: null,
      cameraReady: true
    };
  }

  componentDidMount() {
    this.loadDataApp();
  }

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
  };

  // _requestCameraPermission = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({
  //     hasCameraPermission: status === 'granted',
  //   });
  // };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();

      this.setState({ lastScannedUrl: result.data });
    }
  };

  _closeModal = () => {
    this.setState({ ...this.state, isModalVisible: false });
  };

  loadDataApp = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);
      const permission = await Permissions.askAsync(Permissions.CAMERA);
      const meetups = await apiBack.GetUserMeetups(token);
      const selectMeetups = [];

      newMeetups = meetups.data;
      formatedMeetups = newMeetups.map(meet => meet.name);
      formatedMeetups.forEach((meet, i) => {
        selectMeetups.push({ value: i, label: meet });
      });

      console.log(selectMeetups);

      this.setState({
        ...this.state,
        token: token,
        meetups: selectMeetups,
        idUser: userProfile.data.id,
        hasCameraPermission: permission.status
      });
    } catch (error) {
      console.log(error);
    }
  };

  onSuccess(e) {
    console.log(e);
    apiBack.GetContactInfo(e.data).then(contact => {
      Vibration.vibrate(500);
      console.log(contact.data);
      this.setState({
        ...this.state,
        contactUser: contact.data,
        qrStatus: false,
        isModalVisible: true
      });
    });
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    console.log(this.state.token);
    return (
      <React.Fragment>
        {this.state.contactUser !== null && (
          <View style={styles.modal}>
            <Modal isVisible={this.state.isModalVisible}>
              <ModalNewContact
                userId={this.state.idUser}
                contactUserId={this.state.contactUser.id}
                meetups={this.state.meetups}
                closeModal={this._closeModal}
                contact={this.state.contactUser}
              />
            </Modal>
          </View>
        )}

        <View style={styles.container}>
          {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : this.state.hasCameraPermission === false ? (
            <Text style={{ color: "#fff" }}>
              Camera permission is not granted
            </Text>
          ) : (
            <View>
              {this.state.cameraReady !== false && (
                <BarCodeScanner
                  onBarCodeRead={this.onSuccess.bind(this)}
                  style={{
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width
                  }}
                />
              )}
            </View>
          )}

          {this._maybeRenderUrl()}

          <StatusBar hidden />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  scrollableModal: {
    height: 300
  }
});
