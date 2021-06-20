import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/authorization';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleChange = useCallback(event => {

    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается`);
    }
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!email || !password) {
        alert('Fill the Login form');
        return;
      }

      dispatch(authOperations.logIn({ email, password }));

      setEmail('');
      setPassword('');
    },
    [dispatch, email, password],
  );

  return (
    <div className="UserMenu">
      <h2 className="header-title">Login Page</h2>

      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChange}
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}