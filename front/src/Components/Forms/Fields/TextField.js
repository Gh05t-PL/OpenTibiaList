import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const TextField = ({label, ...props}) => {
  const [field, meta] = useField(props);

  let elementClass = classNames({
    'form-control': true,
    'is-valid': meta.touched && !meta.error,
    'is-invalid': meta.touched && meta.error
  })

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={elementClass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextField;
