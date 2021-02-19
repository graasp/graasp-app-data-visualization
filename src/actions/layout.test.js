import { DEFAULT_API_HOST, SPACE_TREE_PARENT_NAME } from '../config/settings';
import { getSpaceTree } from './layout';
import * as api from '../api/space';

const emptySpaceId = 'empty-space-id';
const spaceId = 'space-id';
const parentSpaceId = 'parent-id';

api.getChildren = jest.fn(id => {
  const data = {
    [emptySpaceId]: [],
    [parentSpaceId]: [
      { _id: 'parent-child1', name: 'parent child 1' },
      { _id: 'parent-child2', name: 'parent child 2' },
      { _id: 'parent-child3', name: 'parent child 3' },
    ],
    'parent-child1': [
      { _id: 'parent-child4', name: 'parent child 4' },
      { _id: 'parent-child5', name: 'parent child 5' },
      { _id: spaceId, name: 'space id' },
    ],
    [spaceId]: [
      { _id: 'child1', name: 'child 1' },
      { _id: 'child2', name: 'child 2' },
    ],
    child1: [
      { _id: 'child3', name: 'child 3' },
      { _id: 'child4', name: 'child 4' },
    ],
    child4: [{ _id: 'child5', name: 'child 5' }],
  };

  return data?.[id] || [];
});

const buildGetStateMock = ({ spaceId: sId, parentSpaceId: psId }) => () => ({
  context: {
    apiHost: DEFAULT_API_HOST,
    spaceId: sId,
    parentSpaceId: psId || sId,
    appInstanceId: 'random-app-instance-id',
  },
});

const emptySpaceTree = [
  { _id: emptySpaceId, name: SPACE_TREE_PARENT_NAME, children: [] },
];

const spaceIdTree = [
  {
    _id: 'child1',
    name: 'child 1',
    children: [
      { _id: 'child3', name: 'child 3', children: [] },
      {
        _id: 'child4',
        name: 'child 4',
        children: [{ _id: 'child5', name: 'child 5', children: [] }],
      },
    ],
  },
  { _id: 'child2', name: 'child 2', children: [] },
];

const spaceIdExpanded = [
  spaceId,
  'child1',
  'child2',
  'child3',
  'child4',
  'child5',
];

const parentIdTree = [
  {
    _id: parentSpaceId,
    name: SPACE_TREE_PARENT_NAME,
    children: [
      {
        _id: 'parent-child1',
        name: 'parent child 1',
        children: [
          {
            _id: 'parent-child4',
            name: 'parent child 4',
            children: [],
          },
          {
            _id: 'parent-child5',
            name: 'parent child 5',
            children: [],
          },
          {
            _id: spaceId,
            name: 'space id',
            children: spaceIdTree,
          },
        ],
      },
      {
        _id: 'parent-child2',
        name: 'parent child 2',
        children: [],
      },
      {
        _id: 'parent-child3',
        name: 'parent child 3',
        children: [],
      },
    ],
  },
];

const parentIdExpanded = [
  'parent-child1',
  'parent-child2',
  'parent-child3',
  'parent-child4',
  'parent-child5',
  parentSpaceId,
  ...spaceIdExpanded,
];

describe('actions > layout', () => {
  describe('getSpaceTree', () => {
    it('get  empty space tree', async () => {
      const getStateMock = buildGetStateMock({ spaceId: emptySpaceId });

      // use this dispatch function to assert result
      const dispatchMock = ({ payload: { tree, expanded } }) => {
        expect(tree).toEqual(emptySpaceTree);
        expect(expanded).toEqual([emptySpaceId]);
      };

      await getSpaceTree()(dispatchMock, getStateMock);
    });

    it('get space tree with all children', async () => {
      const getStateMock = buildGetStateMock({ spaceId });

      // use this dispatch function to assert result
      const dispatchMock = ({ payload: { tree, expanded } }) => {
        expect(tree).toEqual([
          {
            _id: 'space-id',
            name: SPACE_TREE_PARENT_NAME,
            children: spaceIdTree,
          },
        ]);
        expect(expanded).toEqual(expect.arrayContaining(spaceIdExpanded));
        expect(expanded.length).toBe(spaceIdExpanded.length);
      };

      await getSpaceTree()(dispatchMock, getStateMock);
    });

    it('get space tree with all children from parentSpaceId=spaceId', async () => {
      const getStateMock = buildGetStateMock({
        spaceId,
        parentSpaceId: spaceId,
      });

      // use this dispatch function to assert result
      const dispatchMock = ({ payload: { tree, expanded } }) => {
        expect(tree).toEqual([
          {
            _id: 'space-id',
            name: SPACE_TREE_PARENT_NAME,
            children: spaceIdTree,
          },
        ]);
        expect(expanded).toEqual(expect.arrayContaining(spaceIdExpanded));
        expect(expanded.length).toBe(spaceIdExpanded.length);
      };

      await getSpaceTree()(dispatchMock, getStateMock);
    });

    it('get space tree with all children from parent', async () => {
      const getStateMock = buildGetStateMock({
        parentSpaceId,
        spaceId,
      });

      // use this dispatch function to assert result
      const dispatchMock = ({ payload: { tree, expanded } }) => {
        expect(tree).toEqual(parentIdTree);
        expect(expanded).toEqual(expect.arrayContaining(parentIdExpanded));
        expect(expanded.length).toBe(parentIdExpanded.length);
      };

      await getSpaceTree()(dispatchMock, getStateMock);
    });
  });
});
