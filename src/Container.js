import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

import { connect } from 'react-redux'
import { checkAuth } from './redux/auth/auth_action'


class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    const Stack = createStackNavigator();
    const { authLoading, token } = this.props
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {
            authLoading ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : token != null ? (
              <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                  <Stack.Screen name="Login" component={LoginScreen} />
                )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    checkAuth: () => dispatch(checkAuth())
  }
)

const mapStateToProps = (state) => (
  { authLoading, token } = state.authReducer
)
export default connect(mapStateToProps, mapDispatchToProps)(Container);