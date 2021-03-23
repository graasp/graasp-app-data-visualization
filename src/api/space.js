import _ from 'lodash';
import { buildGetSpaceChildrenEndpoint } from '../config/api';
import { DEFAULT_GET } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getChildren = async (id, apiHost) => {
  try {
    const res = await fetch(
      `//${apiHost}${buildGetSpaceChildrenEndpoint(id)}`,
      DEFAULT_GET,
    );

    const content = await res.json();

    return !_.isEmpty(content) ? content : [];
  } catch (e) {
    console.error(e);

    return [];
  }
};
