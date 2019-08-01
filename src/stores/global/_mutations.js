import TYPES from './_types';
import defaultState from './_state';

export default {
  [TYPES.FETCH_ERROR] (state, error = defaultState.fetchError) {
    state.fetchError = {
      ...error
    };
  },
};
