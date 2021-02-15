import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const TextAreaField = ({label, className, ...props}) => {
  const [field, meta] = useField(props);

  let elementClass = classNames({
    ...className,
    'is-valid': meta.touched && !meta.error,
    'is-invalid': meta.touched && meta.error
  })
  console.log(elementClass, 'as')
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className={elementClass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextAreaField;
