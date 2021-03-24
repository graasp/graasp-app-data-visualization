import { LOCAL_API_HOST } from './api';

export const DEFAULT_LANG = 'en';
export const DEFAULT_MODE = 'student';

// avoid breaking the app in production when embedded in different contexts
let defaultApiHost;
try {
  defaultApiHost =
    window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;
} catch (e) {
  defaultApiHost = null;
}

export const DEFAULT_API_HOST = defaultApiHost;

// we haven't decided what to call the teacher mode
export const TEACHER_MODES = ['teacher', 'producer', 'educator', 'admin'];
export const STUDENT_MODES = ['student', 'consumer', 'learner'];

export const DEFAULT_VISIBILITY = 'private';
export const PUBLIC_VISIBILITY = 'public';

export const DATE_FORMAT_SHORT_YEAR = 'DD/MM/YY';
export const DATE_FORMAT_FULL_YEAR = 'DD/MM/YYYY';

export const VERB_AVG_CHART_MAX_CHART_NUMBER = 8;
export const VERB_CHART_MAX_CHART_NUMBER = 6;

export const TREE_VIEW_MAX_WIDTH = 400;
export const TREE_VIEW_MAX_HEIGHT = 350;
export const SPACE_TREE_PARENT_NAME = 'Spaces';

export const ACTIONS_PAGE_SIZE = 1000;
export const ACTIONS_DEFAULT_PAGE = 0;

export const DISABLED_COLOR = 'grey';

export const TIME_PERIOD_LABEL_WIDTH = 100;
export const FULL_YEAR_LABEL_WIDTH = 70;
export const LEGEND_WIDTH = 120;
