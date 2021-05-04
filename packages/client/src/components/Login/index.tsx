import './login.scss';
import { gql, useMutation } from '@apollo/client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const LOGIN_USER = gql`
  mutation LoginUser($id: String!, $pw: String!) {
    loginUser(email: $id, password: $pw) {
      message
      user {
        nickname
      }
    }
  }
`;

function Login() {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const IDInputEl = useRef<HTMLInputElement>(null);

  const [idValue, setIDValue] = useState('');
  const [pwValue, setPWValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const disabled = useMemo(() => loading, [loading]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!idValue || !pwValue) return;

      loginUser({ variables: { id: idValue, pw: pwValue } });
    },
    [loginUser, idValue, pwValue],
  );

  useEffect(() => {
    IDInputEl?.current?.focus();
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (!data?.loginUser.message) {
      if (data?.loginUser?.user?.nickname) {
        return setErrorMessage(`Hello ${data?.loginUser?.user?.nickname}`);
      }
      return setErrorMessage('');
    }
    setErrorMessage(data.loginUser.message);
  }, [data]);

  return (
    <div id="login__wrapper">
      <form id="login__form" onSubmit={onSubmit}>
        <h1>로그인</h1>
        <input
          ref={IDInputEl}
          className="login__input"
          type="text"
          placeholder="아이디"
          value={idValue}
          onChange={(e) => setIDValue(e.target.value)}
          disabled={disabled}
        />
        <input
          className="login__input"
          type="password"
          placeholder="패스워드"
          value={pwValue}
          onChange={(e) => setPWValue(e.target.value)}
          disabled={disabled}
        />
        <button id="login__button_submit" type="submit">
          로그인
        </button>
        <span id="login__error_handler">{errorMessage}</span>
      </form>
    </div>
  );
}

export default Login;
