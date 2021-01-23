import { Body, Button, Card, CardItem, Container, Content, Header, Text, Title, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from '../redux/auth/auth_action';

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  _logout = () => {
    this.props.logout(this.props.token)
  }

  render() {
    const { user, loading } = this.props
    return (
      <Container>
        <Header>
          <Body style={{ alignItems: 'center' }}>
            <Title>HOME</Title>
          </Body>
        </Header>
        <Content style={{ padding: 3 }}>
          <Card>
            <CardItem>
              <Body>
                <View style={{ alignItems: 'center', width: '100%', marginBottom: 15 }}>
                  <Text>WELCOME,</Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Text>
                </View>
                <Button block danger
                  disabled={loading}
                  onPress={this._logout}>
                  <Text>
                    {
                      loading ? 'LOADING...' : 'LOGOUT'
                    }
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    logout: (token) => dispatch(logout(token))
  }
)

const mapStateToProps = (state) => (
  { user, loading } = state.authReducer
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);