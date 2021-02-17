import React, { useState } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TreeItem from '@material-ui/lab/TreeItem';

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

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const SpaceTree = () => {
  const [selected, setSelected] = useState([]);
  const classes = useStyles();

  const onNodeSelect = (e, v) => {
    const res = [...selected];
    const idx = res.indexOf(v);
    if (idx >= 0) {
      res.splice(idx, 1);
    } else {
      res.push(v[0]);
    }
    setSelected(res);
  };

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      multiSelect
      selected={selected}
      onNodeSelect={onNodeSelect}
    >
      <StyledTreeItem nodeId="1" label="Main">
        <StyledTreeItem nodeId="2" label="Hello" />
        <StyledTreeItem
          selected={selected.includes('3')}
          nodeId="3"
          label="Subtree with children"
        >
          <StyledTreeItem
            selected={selected.includes('6')}
            nodeId="6"
            label="Hello"
          />
          <StyledTreeItem
            selected={selected.includes('7')}
            nodeId="7"
            label="Sub-subtree with children"
          >
            <StyledTreeItem
              selected={selected.includes('9')}
              nodeId="9"
              label="Child 1"
            />
            <StyledTreeItem nodeId="10" label="Child 2" />
            <StyledTreeItem nodeId="11" label="Child 3" />
          </StyledTreeItem>
          <StyledTreeItem nodeId="8" label="Hello" />
        </StyledTreeItem>
      </StyledTreeItem>
    </TreeView>
  );
};
export default SpaceTree;
