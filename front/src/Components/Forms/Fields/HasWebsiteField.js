import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const HasWebsiteField = ({label, ...props}) => {
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
        <option value="0">Yes</option>
        <option value="1">No</option>
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default HasWebsiteField;
