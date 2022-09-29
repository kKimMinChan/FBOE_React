import { useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import "./Login.css";

const Signup = ({ signup, isAuthenticated }) => {
  let navigate = useNavigate();
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
    phonenumber: "",
    company: "",
    position: "",
    name: "",
    email: "",
  });

  const {
    username,
    password,
    re_password,
    phonenumber,
    company,
    position,
    name,
    email,
  } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    //setIsLoading(true);
    if (password === re_password) {
      signup(
        username,
        password,
        re_password,
        phonenumber,
        company,
        position,
        name,
        email
      );
      setAccountCreated(true);
    }
    //setFormData({ username: "", password: "" });
    //setIsLoading(false);
  }

  // Is the user authenticated?
  // Redirect them to the home page
  //let history = useHistory();

  if (isAuthenticated) {
    return navigate("/");
  }
  if (accountCreated) {
    return navigate("/login");
  }

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Id"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="re_password"
            name="re_password"
            value={re_password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            placeholder="tel"
            name="phonenumber"
            value={phonenumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="position"
            name="position"
            value={position}
            onChange={onChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
