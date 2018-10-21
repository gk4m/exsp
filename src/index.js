import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store} from "./redux/store";
import {AppContainer} from './components/app';
import registerServiceWorker from './registerServiceWorker';

import './styles/app.sass';

const app = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>, app);
registerServiceWorker();
