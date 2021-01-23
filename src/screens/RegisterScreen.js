import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { register, setAuthMode } from '../redux/auth/auth_action'
import { sendError422 } from '../helpers';
import { st } from '../styles';

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

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  _register = () => {
    if (this.state.name != '' && this.state.email != '' && this.state.password != ''
      && this.state.password_confirmation != '') {
      this.props.register(this.state.name, this.state.email,
        this.state.password, this.state.password_confirmation)
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
              AUTH REDUX REGISTER
            </Title>
          </Body>
        </Header>
        <Content style={[st.bgPrimary, { paddingVertical: 100, paddingHorizontal: 15 }]}>
          <Form>
            <Item rounded style={[st.bgLight, { marginBottom: 15 }]}>
              <Icon type='FontAwesome' name='user' />
              <Input
                placeholder="Name"
                onChangeText={text => this.setState({ name: text })} />
              {
                error !== null && error.name !== undefined ? (
                  <Icon name='close-circle' style={{ color: 'red', }} />
                ) : null
              }
            </Item>
            <Item rounded style={[st.bgLight, { marginBottom: 15 }]}>
              <Icon type='FontAwesome' name='envelope-o' />
              <Input
                placeholder="Email"
                onChangeText={text => this.setState({ email: text })} />
              {
                error !== null && error.email !== undefined ? (
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
              {
                error !== null && error.password !== undefined ? (
                  <Icon name='close-circle' style={{ color: 'red', }} />
                ) : null
              }
            </Item>
            <Item rounded style={[st.bgLight, { marginBottom: 15 }]}>
              <Icon type='FontAwesome' name='key' />
              <Input
                placeholder='Password confirmation'
                secureTextEntry
                onChangeText={text => this.setState({ password_confirmation: text })} />
            </Item>
            <Button block rounded danger
              disabled={loading}
              onPress={this._register}
              style={{ marginBottom: 15 }}
            >
              <Text>
                {
                  loading ? 'Loading...' : 'Register'
                }
              </Text>
            </Button>
            <Button transparent light block
              onPress={() => this.props.setAuthMode('login')}>
              <Text style={st.textLight}>Login?</Text>
            </Button>
          </Form>

        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    register: (name, email, password, password_confirmation) =>
      dispatch(register(name, email, password, password_confirmation)),
    setAuthMode: (mode) => dispatch(setAuthMode(mode))
  }
)

const mapStateToProps = state => (
  { error, loading } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
