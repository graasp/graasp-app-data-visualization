import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withTranslation } from 'react-i18next';
import { fade, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TreeItem from '@material-ui/lab/TreeItem';
import { connect } from 'react-redux';
import { getSpaceTree, patchAppInstance } from '../../actions';
import {
  TREE_VIEW_MAX_HEIGHT,
  TREE_VIEW_MAX_WIDTH,
} from '../../config/settings';

const MinusSquare = props => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
};

const PlusSquare = props => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
};

const CloseSquare = props => {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
};

const SelectedSquare = () => {
  return <CheckBoxIcon color="primary" />;
};

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
}))(props => {
  const icon = props.selected ? <SelectedSquare /> : null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TreeItem icon={icon} {...props} />;
});

const styles = {
  root: {
    maxHeight: TREE_VIEW_MAX_HEIGHT,
    flexGrow: 1,
    maxWidth: TREE_VIEW_MAX_WIDTH,
  },
  verbTitle: {
    width: '100%',
  },
};

class SpaceTree extends Component {
  static propTypes = {
    parentSpaceId: PropTypes.string,
    settings: PropTypes.shape({}).isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    selectedSpaces: PropTypes.arrayOf(PropTypes.string).isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      verbTitle: PropTypes.string.isRequired,
    }).isRequired,
    dispatchGetSpaceTree: PropTypes.func.isRequired,
    tree: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    expanded: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    parentSpaceId: null,
  };

  state = (() => {
    const { selectedSpaces, parentSpaceId } = this.props;
    return {
      selected: selectedSpaces,
      expanded: [parentSpaceId],
    };
  })();

  componentDidMount() {
    const { dispatchGetSpaceTree, tree } = this.props;

    // avoid fetching tree each time settings modal is closed
    if (!tree.length) {
      dispatchGetSpaceTree();
    }
  }

  handleSpaceToggle = newSelectedSpaces => {
    const { dispatchPatchAppInstance, settings } = this.props;
    const settingsToChange = {
      spaces: newSelectedSpaces,
    };
    const newSettings = {
      ...settings,
      ...settingsToChange,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  };

  onNodeSelect = (e, v) => {
    const { selected } = this.state;
    const clickedSpaceId = v[0];

    const res = [...selected];
    const idx = res.indexOf(clickedSpaceId);
    if (idx >= 0) {
      res.splice(idx, 1);
    } else {
      res.push(clickedSpaceId);
    }
    this.setState({ selected: res });
    this.handleSpaceToggle(res);
  };

  renderTreeItem = items => {
    const { selected } = this.state;

    if (!items) {
      return null;
    }

    return items.map(({ _id, name, children }) => {
      return (
        <StyledTreeItem
          key={_id}
          nodeId={_id}
          label={name}
          selected={selected.includes(_id)}
        >
          {children && this.renderTreeItem(children)}
        </StyledTreeItem>
      );
    });
  };

  render() {
    const { classes, tree, expanded, t } = this.props;
    const { selected } = this.state;

    if (!tree.length) {
      return null;
    }

    return (
      <>
        <Typography variant="h6" className={classes.verbTitle}>
          {t('Include the following spaces')}
        </Typography>
        <TreeView
          className={classes.root}
          expanded={expanded}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          multiSelect
          selected={selected}
          onNodeSelect={this.onNodeSelect}
        >
          {this.renderTreeItem(tree)}
        </TreeView>
      </>
    );
  }
}

const mapStateToProps = ({ context, appInstance, layout }) => ({
  spaceId: context.spaceId,
  parentSpaceId: context.parentSpaceId,
  settings: appInstance.content.settings,
  selectedSpaces: appInstance.content.settings.spaces || [context.spaceId],
  tree: layout.tree,
  expanded: layout.expanded,
});

const mapDispatchToProps = {
  dispatchPatchAppInstance: patchAppInstance,
  dispatchGetSpaceTree: getSpaceTree,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpaceTree);

const StyledComponent = withStyles(styles)(ConnectedComponent);
const TranslatedComponent = withTranslation()(StyledComponent);

export default TranslatedComponent;
