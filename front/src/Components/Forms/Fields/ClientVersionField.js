import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';

const ClientVersionField = ({label, ...props}) => {
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
        <option value="0">Custom</option>
        <option value="1">7.1</option>
        <option value="2">7.4</option>
        <option value="4">7.6</option>
        <option value="5">7.7</option>
        <option value="6">7.8</option>
        <option value="7">7.92</option>
        <option value="8">8.0</option>
        <option value="9">8.1</option>
        <option value="10">8.21</option>
        <option value="11">8.22</option>
        <option value="12">8.31</option>
        <option value="13">8.4</option>
        <option value="14">8.41</option>
        <option value="15">8.42</option>
        <option value="16">8.5</option>
        <option value="19">8.54</option>
        <option value="20">8.55</option>
        <option value="21">8.57</option>
        <option value="22">8.6</option>
        <option value="23">8.7</option>
        <option value="24">9.0</option>
        <option value="25">9.1</option>
        <option value="26">9.2</option>
        <option value="27">9.3</option>
        <option value="28">9.4</option>
        <option value="32">9.5</option>
        <option value="36">9.6</option>
        <option value="37">9.7</option>
        <option value="38">9.8</option>
        <option value="39">10.0</option>
        <option value="40">10.1</option>
        <option value="41">10.21</option>
        <option value="42">10.31</option>
        <option value="43">10.34</option>
        <option value="44">10.41</option>
        <option value="45">10.5</option>
        <option value="46">10.53</option>
        <option value="47">10.54</option>
        <option value="48">10.58</option>
        <option value="49">10.75</option>
        <option value="50">10.77</option>
        <option value="51">10.79</option>
        <option value="52">10.8</option>
        <option value="53">10.9</option>
        <option value="55">10.94</option>
        <option value="56">10.95</option>
        <option value="57">10.96</option>
        <option value="58">10.97</option>
        <option value="59">10.98</option>
        <option value="60">10.99</option>
        <option value="61">11.00</option>
        <option value="65">11.4</option>
        <option value="66">11.5</option>
        <option value="67">11.6</option>
        <option value="68">11.7</option>
        <option value="69">11.8</option>
        <option value="70">11.9</option>
        <option value="71">12.0</option>
        <option value="72">12.1</option>
        <option value="73">12.2</option>
        <option value="74">12.3</option>
        <option value="75">12.4</option>
        <option value="76">12.5</option>
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default ClientVersionField;
