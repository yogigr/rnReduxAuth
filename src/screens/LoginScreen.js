import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import { setToken, setAuthUser, setAuthLoading, login } from '../redux/auth/auth_action'

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
      <View style={styles.container}>
        <Text style={styles.logo}>
          Auth Redux
        </Text>
        <View style={styles.form}>

          <TextInput style={styles.textInput}
            placeholder="Email..."
            onChangeText={text => this.setState({ email: text })} />

          {
            error && error.email ? (
              <Text style={styles.errorText}>
                { error.email[0]}
              </Text>
            ) : null
          }


          <TextInput style={styles.textInput}
            placeholder="Password..."
            secureTextEntry
            onChangeText={text => this.setState({ password: text })} />
          <TouchableOpacity
            disabled={loading}
            style={styles.loginButton}
            onPress={this._login}
          >
            <Text style={styles.loginText}>
              {
                loading ? 'Loading...' : 'Login'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 30,
    marginBottom: 15
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  textInput: {
    backgroundColor: '#eee',
    marginVertical: 15,
    padding: 15,
    fontSize: 15
  },
  loginButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    padding: 15
  },
  loginText: {
    color: '#fff',
    fontSize: 15
  },
  errorText: {
    color: 'red'
  }
})

const mapDispatchToProps = dispatch => (
  {
    login: (email, password) => dispatch(login(email, password))
  }
)

const mapStateToProps = state => (
  { error, loading } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);