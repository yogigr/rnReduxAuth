import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

import { connect } from 'react-redux'
import { checkAuth } from './redux/auth/auth_action'

import { Root } from "native-base";
import RegisterScreen from './screens/RegisterScreen';


class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    const Stack = createStackNavigator();
    const { authLoading, token, authMode } = this.props
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            {
              authLoading ? (
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : token != null ? (
                <Stack.Screen name="Home" component={HomeScreen} />
              ) : authMode == 'login' ? (
                <Stack.Screen name="Login" component={LoginScreen} />
              ) : (
                      <Stack.Screen name="register" component={RegisterScreen} />
                    )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    checkAuth: () => dispatch(checkAuth())
  }
)

const mapStateToProps = (state) => (
  { authLoading, token, authMode } = state.authReducer
)
export default connect(mapStateToProps, mapDispatchToProps)(Container);