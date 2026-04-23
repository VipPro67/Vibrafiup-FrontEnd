
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FormUtil } from "@/util/general.helper";
import { InputForm, PasswordInputForm } from "../login/main";
import { RegisterFormSvc } from "./service";
import { RegisterRequest } from "@/dtos/auth.page.dto";
import { AuthAPI } from "@/apis/auth.page.api";
import { APIResponse } from "@/dtos/general.dto";
import { GeneralAPIHelper } from "@/util/axios.helper";
import { CContext } from "@/util/constant";
import { GeneralMsg } from "@/util/message.helper";

type RegisterValidation = {
  email: string;
  fullName: string;
  dob: string;
  pass: string;
  confirmPass: string;
};

const DEFAULT_VALIDATION: RegisterValidation = {
  email: "",
  fullName: "",
  dob: "",
  pass: "",
  confirmPass: "",
};

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [validation, setValidation] = useState<RegisterValidation>(DEFAULT_VALIDATION);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setEmail(nextValue);
    setValidation(prev => ({
      ...prev,
      email: RegisterFormSvc.validateEmail(nextValue),
    }));
  }, []);

  const onChangeFullName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setFullName(nextValue);
    setValidation(prev => ({
      ...prev,
      fullName: RegisterFormSvc.validateFullName(nextValue),
    }));
  }, []);

  const onChangeDOB = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setDob(nextValue);
    setValidation(prev => ({
      ...prev,
      dob: RegisterFormSvc.validateDOB(nextValue),
    }));
  }, []);

  const onChangePass = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setPass(nextValue);
    setValidation(prev => ({
      ...prev,
      pass: RegisterFormSvc.validatePass(nextValue),
      confirmPass: RegisterFormSvc.validateConfirmPass(confirmPass, nextValue),
    }));
  }, [confirmPass]);

  const onChangeConfirmPass = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setConfirmPass(nextValue);
    setValidation(prev => ({
      ...prev,
      confirmPass: RegisterFormSvc.validateConfirmPass(nextValue, pass),
    }));
  }, [pass]);

  const createGeneralAccount = useCallback(() => {
    async function register() {
      const nextValidation: RegisterValidation = {
        email: RegisterFormSvc.validateEmail(email),
        fullName: RegisterFormSvc.validateFullName(fullName),
        dob: RegisterFormSvc.validateDOB(dob),
        pass: RegisterFormSvc.validatePass(pass),
        confirmPass: RegisterFormSvc.validateConfirmPass(confirmPass, pass),
      };

      setValidation(nextValidation);

      if (!FormUtil.isPassedValidation(nextValidation)) {
        toast.error(Object.values(nextValidation).find(Boolean) || GeneralMsg.default_err_validation);
        return;
      }

      const request = RegisterRequest.withBuilder()
        .bemail(email)
        .bfullName(fullName)
        .bdob(dob)
        .bpassword(pass);
      const response = await AuthAPI.registerWithEmail(request) as APIResponse<null>;
      if (GeneralAPIHelper.validResponse(response)) {
        toast.success(response.msg);
        window.location.href = CContext.PAGES.HOME;
      }
    }
    register();
  }, [confirmPass, dob, email, fullName, pass]);

  return (
    <form className="register-form" onSubmit={(e) => e.preventDefault()}>
      <InputForm
        label="Email"
        placeholder=""
        type="text"
        name="email"
        value={email}
        onChange={onChangeEmail}
        err={validation.email}
        autoComplete="off"
      />
      <InputForm
        label="Full Name"
        placeholder=""
        type="text"
        name="full-name"
        value={fullName}
        onChange={onChangeFullName}
        err={validation.fullName}
        autoComplete="off"
      />
      <InputForm
        label="Date of Birth"
        placeholder=""
        type="date"
        name="dob"
        value={dob}
        onChange={onChangeDOB}
        err={validation.dob}
        autoComplete="off"
      />
      <PasswordInputForm
        label="Password"
        placeholder=""
        type="text"
        name="password"
        value={pass}
        onChange={onChangePass}
        err={validation.pass}
        autoComplete="off"
      />
      <PasswordInputForm
        label="Confirm Password"
        placeholder=""
        type="text"
        name="confirm-password"
        value={confirmPass}
        onChange={onChangeConfirmPass}
        err={validation.confirmPass}
        autoComplete="off"
      />
      <button className="submit" onClick={createGeneralAccount}>Sign up</button>
    </form>
  );
}