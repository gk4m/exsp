import {applyMiddleware, createStore,} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import { rootReducer } from './rootReducer';

const middleware = applyMiddleware(promise(), logger);

export const store = createStore(rootReducer, middleware);
