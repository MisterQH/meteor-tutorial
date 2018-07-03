import React from 'react';

const Checkbox = ({
  label, className, checked, onClick,
}) => (
  <label className={className} htmlFor="checkbox">
    {label}
    <input type="checkbox" name="checkbox" readOnly checked={checked} onClick={onClick} />
  </label>
);

export default Checkbox;
