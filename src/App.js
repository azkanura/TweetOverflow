import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';

class App extends Component {

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
      </div> : <div>
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                      showIcon={true}
                      customHeaders={customHeader}
                      forceLogin={true}/>

        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                      showIcon={true}
                      customHeaders={customHeader}>
          <b>Custom</b> Twitter <i>Login</i> content
        </TwitterLogin>
      </div>);
  }
}

export default App;
