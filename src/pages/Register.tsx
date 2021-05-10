import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Notification from '../components/Notification';

const boxStyle = {
  maxWidth: '300px',
  margin: '0 auto',
};
const Register = () => {
  const [formData, setFormData] = useState([
    {
      name: "first_name",
      label: "First Name",
      placeholder: "e.g. John",
      value: "",
      regex: /^[A-z ]+$/,
      message: 'Only Alphabets and spaces allowed',
      validationState: {},
    },
    {
      name: "last_name",
      label: "Last Name",
      placeholder: "e.g. Jacobs",
      value: "",
      regex: /^[A-z ]+$/,
      message: 'Only Alphabets and spaces allowed',
      validationState: {},
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "e.g. email@address.com",
      value: "",
      regex: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i,
      message: 'Provide a valid email address',
      validationState: {},
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
      value: "",
      regex: /^[A-z0-9!@#$%^&*()]{8,15}$/,
      message: 'Provide a valid password (8-15 alphanumeric and special chars)',
      validationState: {},
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const newData = formData.map((item) => {
      if (item.name === e.target.name) {
        const validationState = {
          isTouched: true,
          isValid: false,
          message: item.message
        }
        if (item.regex.test(e.target.value)) {
          validationState.isValid = true;
          validationState.message = 'This is valid';
        }
        return {...item, ...{value: e.target.value, validationState: validationState}};
      }
      return item;
    });
    setFormData(newData);
  }

  function handleFormSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const form: {[index:string]: string} = {};
    formData.forEach(item => {
      form[item.name] = item.value;
    });

    axios.post('https://reqres.in/api/users?delay=1', form).then(({data}) => {
      setNotificationStatus(true);
      setLoading(false);
    });
  }

  return <div className="container">
    {notificationStatus && <Notification message="Hooraayyy!!!" setNotificationStatus={setNotificationStatus} />}
    <div className="section has-text-centered">
      <h1 className="title">Auth Tryout</h1>
      <p className="subtitle">
        Register
      </p>
    </div>

    <form className="box mb-5" style={boxStyle}>
      {
        formData.map((item, i) => {
          return (
            <InputBox key={i}
              name={item.name}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              onChange={onChangeHandler}
              value={item.value}
              validationState={item.validationState}
            />
          );
        })
      }

      <button className={`button is-link ${loading && 'is-loading'}`} onClick={e => handleFormSubmit(e)}>Sign up</button>
      <Link to={"/"} className="button is-ghost">Login</Link>
    </form>
  </div>
}

export default Register;