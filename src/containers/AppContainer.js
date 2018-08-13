import React, {Component} from 'react';
import AuthService from '../services/auth';
import App from '../components/App';

class AppContainer extends Component {

  componentDidMount() {
    //AuthService.login();
  }

  render() {
    return (
      <App/>
    );
  }
}

export default AppContainer;
