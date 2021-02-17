import i18n from '../config/i18n';
import { getChildren } from '../api/space';
import {
  CLOSE_SETTINGS,
  GET_SPACE_TREE_SUCCESS,
  OPEN_SETTINGS,
} from '../types';
import { getApiContext } from './common';

const openSettings = () => dispatch =>
  dispatch({
    type: OPEN_SETTINGS,
  });

const closeSettings = () => dispatch =>
  dispatch({
    type: CLOSE_SETTINGS,
  });

export const getSpaceTree = () => async (dispatch, getState) => {
  const { apiHost, spaceId, parentSpaceId } = getApiContext(getState);

  const fetchSpaceAndChildren = async spaces => {
    if (!spaces) {
      return null;
    }

    return Promise.all(
      spaces.map(async ({ _id, name }) => {
        const subspaces = await getChildren(_id, apiHost);
        return {
          _id,
          name,
          children: await fetchSpaceAndChildren(subspaces),
        };
      }),
    );
  };

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
    { _id: parentId, name: i18n.t('Spaces') },
  ]);
  const expanded = getAllIds(tree);

  dispatch({ type: GET_SPACE_TREE_SUCCESS, payload: { tree, expanded } });
};

export { openSettings, closeSettings };
