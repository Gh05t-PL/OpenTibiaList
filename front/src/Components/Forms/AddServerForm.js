import React, {useState} from 'react'
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextField from "./Fields/TextField";
import ClientVersionField from "./Fields/ClientVersionField";
import CountryField from "./Fields/CountryField";
import PvpTypeField from "./Fields/PvpTypeField";
import TextAreaField from "./Fields/TextAreaField";
import HasWebsiteField from "./Fields/HasWebsiteField";

const DESCRIPTION_LENGTH = 10;

const AddServerForm = () => {
  const [descriptionLength, setDescriptionLength] = useState(0)

  return (
    <Formik
      initialValues={{
        serverName: '',
        serverHost: '',
        serverPort: '',
        clientVersion: '',
        serverCountry: '',
        pvpType: '',
        hasWebsite: '',
        description: ''
      }}

      validationSchema={Yup.object({
        serverName: Yup.string()
          .max(
            15,
            'Must be 15 characters or less'
          )
          .required('Required'),
        serverHost: Yup.string()
          .matches(
            '^(?:(?:(?:[a-zA-z\\-]+)\\:\\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\\-\\.]){1,61}(?:\\.[a-zA-Z]{2,})+|\\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\\]|(?:(?:[0-9]{1,3})(?:\\.[0-9]{1,3}){3}))(?:\\:[0-9]{1,5})?$',
            'Hostname must be valid Domain or IP'
          )
          .notOneOf(
            ['localhost', '127.0.0.1', '::1'],
            'Hostname can\'t be localhost'
          )
          .required('Required'),
        serverPort: Yup.string()
          .matches(
            /^\d+$/,
            'Port must be number'
          )
          .test(
            'inRange',
            'Port must be in range from 0 to 65535',
            value => Number(value) >= 0 && Number(value) <= 65535
          ),
        description: Yup.string()
          .max(
            DESCRIPTION_LENGTH,
            `Must be ${DESCRIPTION_LENGTH} characters or less`
          )
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="w-75">
        <div className="row">
          <div className="col-5">
            <div className="form-group">
              {/*<<label htmlFor="serverName">Server Name</label>*/}
              {/*<input type="text" className="form-control" id="serverName"*/}
              {/*       placeholder="Server Name" onChange={(e) => {*/}
              {/*  setServerName(e.target.value)*/}
              {/*}} value={serverName}/>>*/}
              <TextField
                label="Server Name"
                name="serverName"
                type="text"
                placeholder="Server Name"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Server Host"
                name="serverHost"
                type="text"
                placeholder="Server Host"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Server Port"
                name="serverPort"
                type="text"
                placeholder="7171"
              />
            </div>

            <div className="form-group">
              <ClientVersionField
                label="Client Version"
                name="clientVersion"
              />
            </div>

            <div className="form-group">
              <CountryField
                label="Server Country"
                name="serverCountry"
              />
            </div>

            <div className="form-group">
              <PvpTypeField
                label="PvP Type"
                name="pvpType"
              />
            </div>
            <div className="form-group">
              {/*<CheckboxField*/}
              {/*  label="Server has website"*/}
              {/*  name="hasWebsite"*/}
              {/*  id="hasWebsite"*/}
              {/*/>*/}
              <HasWebsiteField
                label="Server has website"
                name="hasWebsite"
                id="hasWebsite"
              />
            </div>

          </div>
          <div className="col-7">
            <div className="form-group h-50">
              <TextAreaField
                className={{
                  "form-control": true,
                  "w-100": true,
                  "h-100": true
                }}
                id="description"
                name="description"
                label="Description"
                onKeyUp={(e) => {
                  setDescriptionLength(e.target.value.length);
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                Characters left: {DESCRIPTION_LENGTH - descriptionLength}
              </small>
              <button type="submit" className="btn btn-primary float-right">Submit</button>
            </div>
          </div>
        </div>

      </Form>
    </Formik>
  )
}

export default AddServerForm;
