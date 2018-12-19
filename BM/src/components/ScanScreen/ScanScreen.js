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
      hasCameraPermission: null
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
  }

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

  loadDataApp = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);
      const permission = await Permissions.askAsync(Permissions.CAMERA);

      console.log(permission);

      this.setState({
        ...this.state,
        token: token,
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
      Vibration.vibrate(500)
      console.log(contact.data);
      this.setState({
        ...this.state,
        contactUser: contact,
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

  renderModalContent = () => (
    <View style={styles.modalContent}>
      {this.state.contactUser !== null && (
        <View>
          <Badge containerStyle={{ backgroundColor: "#2689DC" }}>
            <Text h2 style={{ color: "white" }}>
              {this.state.contactUser.data.firstName}
            </Text>
          </Badge>

          <Avatar
            xlarge
            rounded
            source={{
              uri: `${this.state.contactUser.data.pictureUrl}`
            }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            avatarStyle={{
              shadowColor: "black",
              shadowRadius: 10
            }}
          />
          <Badge containerStyle={{ backgroundColor: "#2689DC" }}>
            <Text style={{ color: "white" , fontSize: 15, }}>
              {this.state.contactUser.data.headline}
            </Text>
          </Badge>
        </View>
      )}

      {this.renderButton("Close", () => {
        this.props.navigation.navigate("Home");
        this.setState({ isModalVisible: false, qrStatus: true });
      })}
      {this.renderButton("Guardar", () => {
        apiBack
          .SaveUserContact(this.state.idUser, this.state.contactUser.data.id)
          .then(() => {
            this.props.navigation.navigate("Home");
          });
      })}
    </View>
  );

  render() {
    console.log(this.state.token);
    return (
      <React.Fragment>
        <View style={styles.container}>
          {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : this.state.hasCameraPermission === false ? (
            <Text style={{ color: "#fff" }}>
              Camera permission is not granted
            </Text>
          ) : (
            <BarCodeScanner
              onBarCodeRead={this.onSuccess.bind(this)}
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width
              }}
            />
          )}

          {this._maybeRenderUrl()}

          <StatusBar hidden />
        </View>
        {/* <QRCodeScanner
          reactivate={true}
          reactivateTimeout={3000}
          onRead={this.onSuccess.bind(this)}
          topContent={<Text style={styles.centerText}>BM</Text>}
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              {this.renderButton("Close", () => {
                this.props.navigation.navigate("Home");
                this.setState({ isModalVisible: false, qrStatus: true });
              })}
            </TouchableOpacity>
          }
        /> */}
        <Modal isVisible={this.state.isModalVisible}>
          {this.renderModalContent()}
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
