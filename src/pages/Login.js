import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component';
import { Input, Button, Container, Header, Grid, Segment, Menu, Checkbox, Image } from 'semantic-ui-react';

class Login extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        console.log(token);
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed(error) {
    alert(error);
  }

  render() {
    const customHeader = {};
    customHeader['Test'] = 'test-header';
    console.log(this.state.isAuthenticated);
    return (this.state.isAuthenticated ? <div>
        <p>Authenticated</p>
        <div>
          {this.state.user.email}
        </div>
        <div>
          <button onClick={this.logout} className="button" >
            Log out
          </button>
        </div>
      </div> :
      <Segment vertical>
        <Grid className='hero'>
          <Container>
          <Image src='/assets/images/logo_white.png' size='small' centered/>
          <Header as='h1' content='Tweet Overflow' textAlign='center'/>
          <Header as='p' content='Tweet Overflow is a place where you can tweet, like, or dislike without being unfollowed' textAlign='center'/>
          </Container>
        </Grid>
        <Grid columns='equal'>
          <Grid.Column/>
          <Grid.Column>
          <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
              onFailure={this.onFailed}
              onSuccess={this.onSuccess}
              requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
              showIcon={true}
              customHeaders={customHeader}
              forceLogin={true}
              style={{width:'100%'}}
          />
          </Grid.Column>
          <Grid.Column/>

        </Grid>
      </Segment>);
  }
}

export default Login;
