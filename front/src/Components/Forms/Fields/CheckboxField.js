import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const CheckboxField = ({label, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'});

  let elementClass = classNames({
    'custom-control-input': true,
    'is-valid': meta.touched && !meta.error,
    'is-invalid': meta.touched && meta.error
  })

  return (
    <>
      <input className={elementClass} {...field} {...props} type="checkbox"/>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
      <label className={'custom-control-label'} htmlFor={props.id || props.name}>{label}</label>
    </>
  );
};

export default CheckboxField;
