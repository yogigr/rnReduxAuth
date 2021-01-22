import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { logout } from '../redux/auth/auth_action';

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  _logout = () => {
    this.props.logout(this.props.token)
  }

  render() {
    const { user } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={{ textAlign: 'center' }}>Selamat datang {user.name}</Text>
          <TouchableOpacity
            disabled={this.state.loading}
            style={styles.logoutButton}
            onPress={this._logout}
          >
            <Text style={styles.logoutText}>
              {
                this.state.loading ? 'Loading...' : 'Logout'
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

  },
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  logoutButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    padding: 15
  },
  logoutText: {
    color: '#fff',
    fontSize: 15
  }
})

const mapDispatchToProps = dispatch => (
  {
    logout: (token) => dispatch(logout(token))
  }
)

const mapStateToProps = (state) => (
  { user } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);