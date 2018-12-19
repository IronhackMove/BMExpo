import React, { Component } from "react";

export const URL = "http://192.168.20.83:3000";

export const CategoryImages = {
  Tech: [
    require("../resources/images/Tec/Tec1.jpg"),
    require("../resources/images/Tec/Tec2.jpg"),
    require("../resources/images/Tec/Tec3.jpg"),
    require("../resources/images/Tec/Tec4.jpg"),
  ],
  Business: [
    require("../resources/images/Bussines/Bussines1.jpg"),
    require("../resources/images/Bussines/Bussines1.jpg"),
    require("../resources/images/Bussines/Bussines1.jpg"),
    require("../resources/images/Bussines/Bussines1.jpg"),
  ],
  Education: [
    require("../resources/images/Education/Education1.jpg"),
    require("../resources/images/Education/Education2.jpg"),
    require("../resources/images/Education/Education3.jpg"),
    require("../resources/images/Education/Education4.jpg"),
  ],
  Community: [
    require("../resources/images/Community/Community1.jpg"),
    require("../resources/images/Community/Community2.jpg"),
    require("../resources/images/Community/Community3.jpg"),
    require("../resources/images/Community/Community4.jpg"),
  ],
  Movements: [
    require("../resources/images/Politic/Politic1.jpg"),
    require("../resources/images/Politic/Politic2.jpg"),
    require("../resources/images/Politic/Politic3.jpg"),
    require("../resources/images/Politic/Politic4.jpg"),
  ],
  Support: [
    require("../resources/images/Support/Support1.jpg"),
    require("../resources/images/Support/Support2.jpg"),
    require("../resources/images/Support/Support3.jpg"),
    require("../resources/images/Support/Support4.jpg"),
  ]
};

export const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const meetupsIfError = [
  {
    name: "",
    local_date: "",
    local_time: "",
    venues: {
      city: "",
      address_1: ""
    },
    image: ""
  },
  {
    name: "Earlier this morning, NYC",
    local_date: "2018-12-25",
    local_time: "20.00",
    venues: {
      city: "MADRID",
      address_1: "Paseo de la castellana 208, Madrid"
    },
    image: "./resources/images/Movements/Movements.png"
  },
  {
    name: "Earlier this morning, NYC",
    local_date: "2018-12-25",
    local_time: "20.00",
    venues: {
      city: "MADRID",
      address_1: "Paseo de la castellana 208, Madrid"
    },
    image: "../resources/images/Tech/Tech.png"
  }
];
