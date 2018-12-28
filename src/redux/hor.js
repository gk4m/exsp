import { handleActions } from 'redux-actions';

export function createReducer(actionPath) {
  const ACTIONS = {
    PENDING: `${actionPath}_PENDING`,
    FULFILLED: `${actionPath}_FULFILLED`,
    REJECTED: `${actionPath}_REJECTED`,
    END: `${actionPath}_END`,
  };

  const PROPS = {
    REQUEST: 'isLoading',
    FAILURE: 'failure',
    DATA: 'data',
  };

  const INITIAL_STATE = {
    [PROPS.REQUEST]: false,
    [PROPS.FAILURE]: false,
    [PROPS.DATA]: null,
  };

  return handleActions({
    [ACTIONS.PENDING](state) {
      return {
        ...state,
        [PROPS.REQUEST]: true,
        [PROPS.FAILURE]: false,
        [PROPS.DATA]: null,
      };
    },
    [ACTIONS.FULFILLED](state, action) {
      return {
        ...state,
        [PROPS.REQUEST]: false,
        [PROPS.FAILURE]: false,
        [PROPS.DATA]: action.payload,
      };
    },
    [ACTIONS.REJECTED](state, action) {
      return {
        ...state,
        [PROPS.REQUEST]: false,
        [PROPS.FAILURE]: true,
        [PROPS.DATA]: action.payload,
      };
    },
    [ACTIONS.END](state) {
      return INITIAL_STATE;
    },
  }, INITIAL_STATE);
}
