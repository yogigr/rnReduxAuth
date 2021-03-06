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
  Text,
  View,
  Toast
} from 'native-base'


import { connect } from 'react-redux'
import { login, setAuthMode } from '../redux/auth/auth_action'
import { sendError422 } from '../helpers';
import { st } from '../styles';

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error && this.props.error !== null) {
      Toast.show({
        text: sendError422(this.props.error),
        position: 'bottom',
        type: 'danger'
      })
    }
  }

  render() {
    const { error, loading } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Body style={{ alignItems: 'center' }}>
            <Title>
              AUTH REDUX LOGIN
            </Title>
          </Body>
        </Header>
        <Content style={[st.bgPrimary, { paddingVertical: 100, paddingHorizontal: 15 }]}>
          <Form>
            <Item rounded style={[st.bgLight, { marginBottom: 15 }]}>
              <Icon type='FontAwesome' name='envelope-o' />
              <Input
                placeholder="Email"
                onChangeText={text => this.setState({ email: text })} />
              {
                error && error.email.length > 0 ? (
                  <Icon name='close-circle' style={{ color: 'red', }} />
                ) : null
              }
            </Item>
            <Item rounded style={[st.bgLight, { marginBottom: 15 }]}>
              <Icon type='FontAwesome' name='key' />
              <Input
                placeholder='Password'
                secureTextEntry
                onChangeText={text => this.setState({ password: text })} />
            </Item>
            <Button block rounded danger
              disabled={loading}
              onPress={this._login}
              style={{ marginBottom: 15 }}
            >
              <Text>
                {
                  loading ? 'Loading...' : 'Login'
                }
              </Text>
            </Button>
            <Button transparent light block
              onPress={() => this.props.setAuthMode('register')}>
              <Text style={st.textLight}>Register?</Text>
            </Button>
          </Form>

        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    login: (email, password) => dispatch(login(email, password)),
    setAuthMode: (mode) => dispatch(setAuthMode(mode))
  }
)

const mapStateToProps = state => (
  { error, loading } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);