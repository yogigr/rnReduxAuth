import { Container, Header, H2, Text } from 'native-base';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';

class SplashScreen extends Component {
  render() {
    return (
      <Container style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9534f'
      }}>
        <StatusBar hidden />
        <H2 style={{ color: '#fff', marginBottom: 50 }}>{'<\\ AUTH REDUX />'}</H2>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>LOADING...</Text>
      </Container>
    )
  }
}

export default SplashScreen