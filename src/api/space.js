import _ from 'lodash';
import { SPACES_ENDPOINT } from '../config/api';
import { DEFAULT_GET } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getChildren = async (id, apiHost) => {
  try {
    const res = await fetch(
      `//${apiHost}${SPACES_ENDPOINT}/${id}/navspace-children`,
      DEFAULT_GET,
    );

    const test = await fetch(`https://graasp.eu/spaces/${id}`, DEFAULT_GET);
    console.log(test);

    const content = await res.json();

    return !_.isEmpty(content) ? content : [];
  } catch (e) {
    console.error(e);

    return [];
  }
};
