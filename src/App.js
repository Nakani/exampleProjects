import React from "react";
import { Root, Toast } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { StatusBar, Platform, View, Alert, AppState, AppStateIOS, SafeAreaView } from 'react-native';

import Login from "./screens/login/";



const AppNavigator = StackNavigator(
  {
    Login: {screen: Login}
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default class App extends React.Component {
    state = {
        appState: 'active',
        notification: {}
    };


  async componentDidMount() {
    StatusBar.setHidden(Platform.OS === "android" ? false : true);
  }


    componentWillMount() {

    }



  render() {
    return(
  <Root>
    <AppNavigator />
  </Root>
        )
  }
}
