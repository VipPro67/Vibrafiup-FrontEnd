
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthAPI } from "@/apis/auth.page.api";
import { APIResponse } from "@/dtos/general.dto";
import { ForgotPassOTPRequest } from "@/dtos/auth.page.dto";
import { FormUtil } from "@/util/general.helper";
import { GeneralMsg } from "@/util/message.helper";
import { GeneralAPIHelper } from "@/util/axios.helper";
import { InputForm } from "../login/main";
import { ForgotPassFormSvc } from "./service";

type ForgotPassValidation = {
  email: string;
  otp: string;
};

const DEFAULT_VALIDATION: ForgotPassValidation = {
  email: "",
  otp: "",
};

const OTP_COOLDOWN_SECONDS = 300;

export default function ForgotPassForm() {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [validation, setValidation] = useState<ForgotPassValidation>(DEFAULT_VALIDATION);
  const [otpCooldown, setOtpCooldown] = useState<number>(0);

  useEffect(() => {
    if (otpCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setOtpCooldown(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [otpCooldown]);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setEmail(nextValue);
    setValidation(prev => ({
      ...prev,
      email: ForgotPassFormSvc.validateEmail(nextValue),
    }));
  }, []);

  const onChangeOTP = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value.toUpperCase();
    setOtp(nextValue);
    setValidation(prev => ({
      ...prev,
      otp: ForgotPassFormSvc.validateOTP(nextValue),
    }));
  }, []);

  const onClickGetOTP = useCallback(() => {
    async function sendOTP() {
      const emailValidation = ForgotPassFormSvc.validateEmail(email);
      if (emailValidation) {
        setValidation(prev => ({ ...prev, email: emailValidation }));
        toast.error(emailValidation);
        return;
      }

      const request = ForgotPassOTPRequest.withBuilder().bemail(email);
      // const response = await AuthAPI.sendForgotPassOTP(request) as APIResponse<null>;
      const response = {
        status: 200,
        msg: "Success",
        time: String(new Date())
      }
      if (GeneralAPIHelper.validResponse(response)) {
        toast.success(response.msg);
        setOtpCooldown(OTP_COOLDOWN_SECONDS);
      }
    }

    sendOTP();
  }, [email]);

  const submitForgotPass = useCallback(() => {
    const nextValidation: ForgotPassValidation = {
      email: ForgotPassFormSvc.validateEmail(email),
      otp: ForgotPassFormSvc.validateOTP(otp),
    };

    setValidation(nextValidation);

    if (!FormUtil.isPassedValidation(nextValidation)) {
      toast.error(Object.values(nextValidation).find(Boolean) || GeneralMsg.default_err_validation);
      return;
    }

    toast.success("OTP is valid, continue reset password flow.");
  }, [email, otp]);

  const minutes = Math.floor(otpCooldown / 60);
  const seconds = otpCooldown % 60;
  const cooldownLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <form className="forgot-pass-form" onSubmit={(e) => e.preventDefault()}>
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

      <div className="form_input_wrapper">
        <fieldset className={`form_input input_otp ${validation.otp ? "has-err" : ""}`}>
          <legend className="form_legend">OTP</legend>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={onChangeOTP}
            autoComplete="off"
          />
          {otpCooldown === 0 ? (
            <button type="button" className="otp_get-btn" onClick={onClickGetOTP}>
              Get OTP
            </button>
          ) : (
            <span className="otp_countdown">{cooldownLabel}</span>
          )}
        </fieldset>
        {validation.otp && <span className="form_input_err">{validation.otp}</span>}
      </div>

      <button className="submit" onClick={submitForgotPass}>Continue</button>
    </form>
  );
}