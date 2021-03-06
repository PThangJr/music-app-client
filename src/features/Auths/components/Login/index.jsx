import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../../../components/Form/FormField/InputField";
import { clearMessageAndErrorsAuths, fetchLogin } from "../../authsSlice";
import "./styles.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const handleInputValue = (object) => {
    setValues({ ...values, ...object });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(values));
  };
  const auths = useSelector((state) => state.auths);

  useEffect(() => {
    if (auths.errors) {
      toast.error(auths.errors, {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(clearMessageAndErrorsAuths()),
      });
    } else if (auths.message) {
      toast.success(auths.message, {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(clearMessageAndErrorsAuths()),
      });
    }
  }, [auths.errors, auths.message, dispatch]);

  if (auths.authenticate && auths.user?.role === "admin") {
    return <Redirect to="/" />;
  }
  if (auths.authenticate && auths.user?.role === "user") {
    return <Redirect to="/" />;
  }
  return (
    <div className="auths-box">
      <form action="" className="auths-form" onSubmit={handleSubmitForm}>
        <h3 className="auths-form__heading">Đăng nhập</h3>
        <InputField
          placeholder="Username..."
          type="username"
          name="username"
          fullWidth
          value={values.username}
          onChange={handleInputValue}
        />
        <InputField
          placeholder="Password..."
          type="password"
          name="password"
          fullWidth
          value={values.password}
          onChange={handleInputValue}
        />
        <button type="submit" className="btn btn--green btn--submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
