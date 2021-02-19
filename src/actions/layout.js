import i18n from '../config/i18n';
import { getChildren } from '../api/space';
import {
  CLOSE_SETTINGS,
  GET_SPACE_TREE_SUCCESS,
  OPEN_SETTINGS,
} from '../types';
import { getApiContext } from './common';
import { DEFAULT_API_HOST, SPACE_TREE_PARENT_NAME } from '../config/settings';
import { REACT_APP_GRAASP_HOST } from '../config/env';

export const openSettings = () => dispatch =>
  dispatch({
    type: OPEN_SETTINGS,
  });

export const closeSettings = () => dispatch =>
  dispatch({
    type: CLOSE_SETTINGS,
  });

export const getSpaceTree = () => async (dispatch, getState) => {
  const { dev, spaceId, parentSpaceId } = getApiContext(getState);

  // use local server on dev,
  const host = dev ? DEFAULT_API_HOST : REACT_APP_GRAASP_HOST;

  // recursive function to fetch the spaces and all their childrens
  const fetchSpaceAndChildren = async spaces => {
    if (!spaces) {
      return null;
    }

    return Promise.all(
      spaces.map(async ({ _id, name }) => {
        const subspaces = await getChildren(_id, host);
        return {
          _id,
          name,
          children: await fetchSpaceAndChildren(subspaces),
        };
      }),
    );
  };

  // recursive function to get all ids for all retrieved spaces
  const getAllIds = obj => {
    const ids = obj
      .map(({ _id, children }) => {
        const childrenIds = getAllIds(children);
        return [_id, ...childrenIds];
      })
      .flat();
    return ids;
  };

  // get all space children starting from parentSpaceId
  const parentId = parentSpaceId || spaceId;

  const tree = await fetchSpaceAndChildren([
    { _id: parentId, name: i18n.t(SPACE_TREE_PARENT_NAME) },
  ]);

  // force tree to be fully expanded
  // todo: a better solution would be to know the path
  // from a parent to spaceId and expanded all the way through
  const expanded = getAllIds(tree);

  dispatch({ type: GET_SPACE_TREE_SUCCESS, payload: { tree, expanded } });
};
