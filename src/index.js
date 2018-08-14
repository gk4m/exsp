import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import './styles/app.sass';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
