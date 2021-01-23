import { Container, Header, H2, Text } from 'native-base';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { st } from '../styles'

class SplashScreen extends Component {
  render() {
    return (
      <Container style={[st.bgPrimary, {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }]}>
        <StatusBar hidden />
        <H2 style={[st.textLight, { marginBottom: 50 }]}>{'<\\ AUTH REDUX />'}</H2>
        <Text style={[st.textLight, { fontWeight: 'bold' }]}>LOADING...</Text>
      </Container>
    )
  }
}

export default SplashScreen