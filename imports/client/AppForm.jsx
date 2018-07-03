import React from 'react';

import PropTypes from 'prop-types';

const AppForm = ({ handleSubmit, handleChange, value }) => (
  <form className="new-task" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Type to add new tasks"
      value={value}
      onChange={handleChange}
    />
  </form>
);

AppForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default AppForm;
