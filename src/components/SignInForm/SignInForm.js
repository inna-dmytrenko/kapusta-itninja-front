import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';
import { FcGoogle } from 'react-icons/fc';
// import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../redux/auth/auth-operations';
import { useSelector } from 'react-redux';
import { setName, setEmail } from '../../redux/auth/auth-slice';

import { AuthGoogleDescription } from './SignInForm.styled';
import { AuthGoogleBtn } from './SignInForm.styled';
import { SpanTextWrapper } from './SignInForm.styled';
import { OtherDescriptionToSignUp } from './SignInForm.styled';

import { SignInFormWrapper } from './SignInForm.styled';
import { LabelInputForm } from './SignInForm.styled';
import { FormInputDescription } from './SignInForm.styled';
import { FormInput } from './SignInForm.styled';
import { FormBtn } from './SignInForm.styled';

function SignInForm() {
  const dispatch = useDispatch();

  const [isRegistration, setRegistration] = useState(false);

  const name = useSelector(state => state.auth.user.name);

  const email = useSelector(state => state.auth.user.email);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);

  const [emailError, setEmailError] = useState('Это обязательное поле');
  const [passwordError, setPasswordError] = useState('Это обязательное поле');
  const [nameError, setNameError] = useState('Это обязательное поле');

  const [errorSymbol, _setErrorSymbol] = useState('*');

  const blurHandler = e => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;

      default:
        return;
    }
  };

  const handleChangeForm = e => {
    e.preventDefault();
    setRegistration(!isRegistration);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
    // dispatch(setName(e.target.value));
    console.log(password);
    if (e.target.value.length < 6) {
      setPasswordError('Пароль должен быть не меньше 6 символов');
      if (!e.target.value) {
        setPasswordError('Это обязательное поле');
      }
    } else {
      setPasswordError('');
    }
  };

  const handleChangeName = e => {
    dispatch(setName(e.target.value));
    // dispatch(setName(e.target.value));
    // console.log(name);
    if (!e.target.value) {
      setNameError('Это обязательное поле');
    } else {
      setNameError('');
    }
  };

  const handleChangeEmail = e => {
    dispatch(setEmail(e.target.value));
    // dispatch(setName(e.target.value));
    // console.log(email);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл');
      if (!e.target.value) {
        setEmailError('Это обязательное поле');
      }
    } else {
      setEmailError('');
    }
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '') {
      dispatch(signIn({ email, password }));
    } else {
      dispatch(signUp({ email, password, name }));
    }

    clearInput({});
  };

  return (
    <Fragment>
      <AuthGoogleDescription>
        Вы можете авторизоваться с помощью Google Account:
      </AuthGoogleDescription>

      <AuthGoogleBtn type="button">
        <FcGoogle size={18} />
        <SpanTextWrapper>Google</SpanTextWrapper>
      </AuthGoogleBtn>

      <OtherDescriptionToSignUp>
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </OtherDescriptionToSignUp>

      <SignInFormWrapper onSubmit={handleSubmit} action="" autoComplete="on">
        {isRegistration ? (
          <LabelInputForm>
            {nameDirty && nameError && (
              <span style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
                {errorSymbol}{' '}
              </span>
            )}
            <FormInputDescription>Введите имя:</FormInputDescription>
            <FormInput
              onBlur={blurHandler}
              placeholder={'Barry Donatello'}
              type="name"
              name="name"
              onChange={handleChangeName}
              value={name}
              required
            />
            {nameDirty && nameError && (
              <div style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
                {emailError}{' '}
              </div>
            )}
          </LabelInputForm>
        ) : null}

        <LabelInputForm>
          {emailDirty && emailError && (
            <span style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
              {errorSymbol}{' '}
            </span>
          )}
          <FormInputDescription>Электронная почта:</FormInputDescription>
          <FormInput
            onBlur={blurHandler}
            placeholder={'your@email.com'}
            type="email"
            name="email"
            onChange={handleChangeEmail}
            value={email}
            pattern="[A-Za-zА-Яа-яЁёЄєЇї0-9._%+-]+@[A-Za-zА-Яа-яЁёЄєЇї0-9.-]+\.[A-Za-zА-Яа-яЁёЄєЇї]{2,4}$"
            title="Email может, сoстоять из букв цифр и обязательного символа '@'"
            required
          />
          {emailDirty && emailError && (
            <div style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
              {emailError}{' '}
            </div>
          )}
        </LabelInputForm>

        <LabelInputForm marginBTM>
          {passwordDirty && passwordError && (
            <span style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
              {errorSymbol}{' '}
            </span>
          )}
          <FormInputDescription>Пароль:</FormInputDescription>
          <FormInput
            onBlur={blurHandler}
            password
            placeholder={'········'}
            type="password"
            name="password"
            onChange={handleChangePassword}
            value={password}
            pattern="[0-9A-Za-zА-Яа-яЁёЄєЇї!@#$%^&*]{6,}"
            title="Пароль может, сoстоять не меньше чем из шести букв цифр и символов '!@#$%^&*'"
            required
          />
          {passwordDirty && passwordError && (
            <div style={{ color: 'red', fontSize: 10, paddingTop: 4 }}>
              {passwordError}{' '}
            </div>
          )}
        </LabelInputForm>

        {isRegistration ? (
          <Fragment>
            <FormBtn type="button" marginRigth15 onClick={handleChangeForm}>
              Войти
            </FormBtn>
            <FormBtn type="submit" submitBtn onClick={handleSubmit}>
              Регистрация
            </FormBtn>
          </Fragment>
        ) : (
          <Fragment>
            <FormBtn
              type="submit"
              marginRigth15
              submitBtn
              onClick={handleSubmit}
            >
              Войти
            </FormBtn>
            <FormBtn type="button" onClick={handleChangeForm}>
              Регистрация
            </FormBtn>
          </Fragment>
        )}
      </SignInFormWrapper>
    </Fragment>
  );
}

// SignInForm.propTypes = {};

export default SignInForm;
