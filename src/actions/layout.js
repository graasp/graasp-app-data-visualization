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

  // recursive function to fetch the spaces and all their childrens
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
    { _id: parentId, name: i18n.t('Spaces') },
  ]);

  // force tree to be fully expanded
  // todo: a better solution would be to know the path
  // from a parent to spaceId and expanded all the way through
  const expanded = getAllIds(tree);

  dispatch({ type: GET_SPACE_TREE_SUCCESS, payload: { tree, expanded } });
};

export { openSettings, closeSettings };
