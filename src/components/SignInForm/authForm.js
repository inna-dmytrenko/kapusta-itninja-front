import React, { Fragment, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import * as authOperations from "../../redux/auth/auth-operations";
// import { authSelectors } from "../../redux/auth/auth-selectors";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
// import * as Yup from "yup";

import {
  AuthGoogleDescription,
  OtherDescriptionToSignUp,
  SignInFormWrapper,
  LabelInputForm,
  FormInputDescription,
  FormInput,
  FormBtn,
} from "./SignInForm.styled";

function AuthForm() {
  const dispatch = useDispatch();
  const [isRegistration, setRegistration] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let schemaMail = Yup.string().email();
  // let result = schemaMail.isValidSync("test@test.com"); // isValidSync returns boolean
  // console.log(result);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleChangeForm = e => {
    e.preventDefault();
    setRegistration(!isRegistration);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const OnSubmitRegBtn = evt => {
    evt.preventDefault();
    if (!name || !email || !password) {
      toast.info("Fill in all the fields")
      return;
    }
    dispatch(authOperations.signUp({ name, email, password }));
    resetInputs();
  };

  const OnSubmitSignInBtn = evt => {
    evt.preventDefault();
    if (!email || !password) {
      toast.info("Fill in all the fields")
      return;
    }
    dispatch(authOperations.signIn({ email, password }));
    resetInputs();
  };

  return (
    <Fragment>
      {/* <AuthGoogleBtn type="button">
        <FcGoogle size={18} />
        <SpanTextWrapper>Google</SpanTextWrapper>
      </AuthGoogleBtn> */}
      {isRegistration ? null : (
        <Fragment>
          <AuthGoogleDescription>
            Вы можете авторизоваться с помощью Google Account:
          </AuthGoogleDescription>
          <GoogleAuth />
        </Fragment>
      )}

      <OtherDescriptionToSignUp>
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </OtherDescriptionToSignUp>
      <SignInFormWrapper
        //   onSubmit={handleSubmit}
        action=""
        autoComplete="on"
      >
        {isRegistration ? (
          <LabelInputForm>
            <FormInputDescription>Введите имя:</FormInputDescription>
            <FormInput
              //   onBlur={blurHandler}
              placeholder={"Barry Donatello"}
              type="name"
              name="name"
              onChange={handleChange}
              value={name}
              required
            />
          </LabelInputForm>
        ) : null}

        <LabelInputForm>
          <FormInputDescription>Электронная почта:</FormInputDescription>
          <FormInput
            // onBlur={blurHandler}
            placeholder={"your@email.com"}
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
        </LabelInputForm>

        <LabelInputForm marginBTM>
          <FormInputDescription>Пароль:</FormInputDescription>
          <FormInput
            placeholder={"········"}
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
        </LabelInputForm>

        {isRegistration ? (
          <Fragment>
            <FormBtn type="button" marginRigth15 onClick={handleChangeForm}>
              Войти
            </FormBtn>
            <FormBtn type="submit" submitBtn onClick={OnSubmitRegBtn}>
              Регистрация
            </FormBtn>
          </Fragment>
        ) : (
          <Fragment>
            <FormBtn
              type="submit"
              marginRigth15
              submitBtn
              onClick={OnSubmitSignInBtn}
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

export default AuthForm;
