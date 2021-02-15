import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const PvpTypeField = ({label, ...props}) => {
  const [field, meta] = useField(props);

  let elementClass = classNames({
    'custom-select': true,
    'is-valid': meta.touched && !meta.error,
    'is-invalid': meta.touched && meta.error
  })

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className={elementClass} {...field} {...props}>
        <option value="0">Non-PvP</option>
        <option value="1">PvP</option>
        <option value="2">PvPe</option>
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default PvpTypeField;
