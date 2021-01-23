import React, { Component } from 'react';

import {
  StatusBar
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input,
  Body,
  Title,
  Left,
  Icon,
  Button,
  Text
} from 'native-base'


import { connect } from 'react-redux'
import { setToken, setAuthUser, setAuthLoading, login } from '../redux/auth/auth_action'
import { color } from 'react-native-reanimated';

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  _login = () => {
    if (this.state.email != '' && this.state.password != '') {
      this.props.login(this.state.email, this.state.password)
    }
  }

  render() {
    const { error, loading } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left></Left>
          <Body>
            <Title style={{ textAlign: 'center' }}>
              AUTH REDUX LOGIN
            </Title>
          </Body>
        </Header>
        <Content style={{ padding: 10, }}>
          <Form>
            <Item floatingLabel error={error && error.email}>
              <Label>EMAIL</Label>
              <Input onChangeText={text => this.setState({ email: text })} />
              {
                error && error.email ? (
                  <Icon name='close-circle' style={{ color: 'red', }} />
                ) : null
              }
            </Item>
            {
              error && error.email ? (
                <Text style={{ color: 'red', marginTop: 15 }}>
                  { error.email[0]}
                </Text>
              ) : null
            }
            <Item floatingLabel last style={{ paddingBottom: 30 }}>
              <Label>PASSWORD</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })} />
            </Item>
            <Button block
              disabled={loading}
              onPress={this._login}
            >
              <Text>
                {
                  loading ? 'Loading...' : 'Login'
                }
              </Text>
            </Button>
          </Form>

        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    login: (email, password) => dispatch(login(email, password))
  }
)

const mapStateToProps = state => (
  { error, loading } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);