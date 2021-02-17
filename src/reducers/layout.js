import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  GET_SPACE_TREE_SUCCESS,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  tree: [],
  expanded: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case OPEN_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: true,
        },
      };
    case CLOSE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: false,
        },
      };
    case GET_SPACE_TREE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
