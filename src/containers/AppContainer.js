import React, {Component} from 'react';
import AuthService from '../services/auth';
import App from '../components/App';

import ls from '../utils/localStorage';

class AppContainer extends Component {

  componentDidMount() {
    if (!ls.get('token')) {
      AuthService.login()
    }

    AuthService.getTokensFromQuery();
  }

  render() {
    return (
      <App/>
    );
  }
}

export default AppContainer;
