import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const RightPanelBox = ({ data }) => {
  const renderVerbList = () => {
    if (data.length !== 0) {
      return data.map(action => (
        <TableRow key={action.verb}>
          <TableCell>{action.verb}</TableCell>
          <TableCell>{action.You}</TableCell>
          <TableCell>{action.Average}</TableCell>
        </TableRow>
      ));
    }
    return <div />;
  };

  return (
    <TableContainer style={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>You</TableCell>
            <TableCell>Avg</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderVerbList()}</TableBody>
      </Table>
    </TableContainer>
  );
};

RightPanelBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RightPanelBox;
