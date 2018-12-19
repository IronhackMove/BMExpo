import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Picker,
  Image,
  AsyncStorage
} from "react-native";

import { Avatar, Badge, Text } from "react-native-elements";

import apiBack from "../api/apiBack";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: this.props.navigation.getParam("access_token"),
      lenguage: null,
      categories: null,
      selectedCategories: []
    };
  }

  componentDidMount() {
    apiBack
      .GetCategories()
      .then(response => this.setState({ ...this.state, categories: response }));
  }

  _handleButton(category) {

    var arraySelectedCategories = this.state.selectedCategories
    let foundCategory = {
      found: false,
      id: null
    }
    if (arraySelectedCategories.length > 0) {

      arraySelectedCategories.map((selectedCategory, i) => {
        
        if (selectedCategory.shortname === category.shortname) {
          foundCategory.found = true;
          foundCategory.id = i;
        } 
      })

      if (foundCategory.found === false ) {
        arraySelectedCategories.push(category)
        this.setState({ ...this.state, selectedCategories: arraySelectedCategories });
      } else {
        arraySelectedCategories.splice(foundCategory.id,1)
        this.setState({ ...this.state, selectedCategories: arraySelectedCategories });
      }

    } else {
      arraySelectedCategories.push(category)
      this.setState({ ...this.state, selectedCategories: arraySelectedCategories });
    }
  }

  _saveCategories() {
    apiBack.UpdateCategories(this.state.token, this.state.selectedCategories)
    this.props.navigation.navigate("Profile", {access_token: this.state.token})
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.selectedCategories !== null && (
          <View style={styles.selectedCategories}>
            {this.state.selectedCategories.map((selectedCategory) => (
              <Badge
                key={selectedCategory._id}
                containerStyle={{
                  backgroundColor: "#2689DC",
                  marginBottom: 20
                }}
                onPress={() => console.log("hola")}
              >
                <Text style={{ color: "white" }}>{selectedCategory.shortname}</Text>
              </Badge>
            ))}
          </View>
        )}
        {this.state.categories !== null && (
          <View>
            {this.state.categories.map(category => (
              <Badge
                key={category.id}
                containerStyle={{
                  backgroundColor: "#2689DC",
                  marginBottom: 20
                }}
                onPress={() => this._handleButton(category)}
              >
                <Text h2 style={{ color: "white" }}>
                  {category.shortname}
                </Text>
              </Badge>
            ))}
            <Button onPress={() => this._saveCategories()} title="Save" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  selectedCategories: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
