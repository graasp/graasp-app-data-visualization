import React from 'react';
import PropTypes from 'prop-types';

const RightPanelBox = ({ data }) => {
  const renderVerbList = () => {
    if (data.length !== 0) {
      return data.map(action => (
        <tr key={action.verb}>
          <td>{action.verb}</td>
          <td>{action.You}</td>
          <td>{action.Average}</td>
        </tr>
      ));
    }
    return <div />;
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Verb</th>
              <th>You</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>{renderVerbList()}</tbody>
        </table>
      </div>
    </div>
  );
};

RightPanelBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RightPanelBox;
