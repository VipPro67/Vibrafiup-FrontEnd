import { Eye, EyeOff } from 'lucide-react'
import { useCallback, useState } from 'react';
import { LoginFormSvc } from './service';
import { FormUtil } from '@/util/general.helper';
import toast from 'react-hot-toast';
import { AuthAPI } from '@/apis/auth.page.api';
import { APIResponse } from '@/dtos/general.dto';
import { LoginRequest, OAuthUrlResponse } from '@/dtos/auth.page.dto';
import { LoginFormMsg } from '@/util/message.helper';
import { GeneralAPIHelper } from '@/util/axios.helper';
import { CContext } from '@/util/constant';

export default function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState<string>("")
  // const [isFormTouched, setIsFormTouched] = useState<boolean>(false)
  const [validation, setValidation] = useState<Record<string, string>>({
    email: "",
    pass: ""
  });

  const authenticateGeneralAccount = useCallback(() => {
    async function postReq() {
      /* // Example for updating form (submit without touching on existing values)
      if (!isFormTouched) {
        toast.error(GeneralMsg.invalid_empty_form || GeneralMsg.default_err_validation));
        return;
      }*/

      if (!FormUtil.isPassedValidation(validation)) {
        toast.error(Object.values(validation)[0]);
        return;
      }

      const request = LoginRequest.withBuilder().bemail(email).bpassword(pass);
      const response = await AuthAPI.loginWithEmail(request) as APIResponse<null>
      if (GeneralAPIHelper.validResponse(response)) {
        toast.success(LoginFormMsg.wellcome);
        window.location.href = CContext.PAGES.TRADE;
        return;
      }
    }
    postReq();
  }, [validation, email, pass]);

  const authenticateOauth2Account = useCallback((provider: string) => {
    async function auth() {
      const response = await AuthAPI.getOAuthRedirectUrl(provider) as APIResponse<OAuthUrlResponse>
      if (GeneralAPIHelper.validResponse(response)) {
        window.location.href = response.data.url;
      }
    }
    auth();
  }, []);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // setIsFormTouched(true);
    setValidation(prev => ({ ...prev, email: LoginFormSvc.validateEmail(e.target.value) }));
  }, []);

  const onChangePass = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    // setIsFormTouched(true);
    setValidation(prev => ({ ...prev, pass: LoginFormSvc.validatePass(e.target.value) }));
  }, []);

  return <form className="login-form" onSubmit={(e) => e.preventDefault()}>
    <InputForm label="Email" placeholder="" type="text"
      name="email"
      value={email}
      onChange={onChangeEmail}
      err={validation.email}
      autoComplete="off"
    />
    <PasswordInputForm label="Password" placeholder="" type="text"
      name="password"
      value={pass}
      onChange={onChangePass}
      err={validation.pass}
      autoComplete="off"
    />
    <button className="submit" onClick={authenticateGeneralAccount}>Login</button>
    <span className="form-separator">OR</span>
    <div className="oauth2-buttons">
      <button className="oauth-btn oauth2-gg" title="Google">
        <GoogleButtonIcon onClick={() => authenticateOauth2Account(CContext.OAUTH2.GOOGLE)}/>
      </button>
      <button className="oauth-btn oauth2-fb" title="Facebook">
        <FacebookButtonIcon onClick={() => authenticateOauth2Account(CContext.OAUTH2.FACEBOOK)} />
      </button>
      <button className="oauth-btn oauth2-gh" title="Github">
        <GithubButtonIcon />
      </button>
    </div>
  </form>
}


export interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  err: string;
}

export function InputForm(props: InputFormProps) {
  const { label, err, ...rest } = props;

  return <div className="form_input_wrapper">
    <fieldset className={`form_input ${err ? "has-err" : ""}`}>
      <legend className="form_legend">{label}</legend>
      <input {...rest} />
    </fieldset>
    {err && <span className="form_input_err">{err}</span>}
  </div>;
}

export function PasswordInputForm(props: InputFormProps) {
  const [isHiddingEye, setIsHiddingEye] = useState(true)
  const { label, err, type, ...rest } = props;

  const toggleShowHidePassword = useCallback((isHidding: boolean) => {
    setIsHiddingEye(isHidding);
  }, []);

  return <div className="form_input_wrapper">
    <fieldset className={`form_input input_password ${err ? "has-err" : ""}`}>
      <legend className="form_legend">{label}</legend>
      <input type={isHiddingEye ? "password" : type} {...rest} />
      <div className={`hidden-toggle ${isHiddingEye ? "show" : "hide"}`}>
        <Eye className="toggle-eyes show-eye" size={24} strokeWidth={2} onClick={() => toggleShowHidePassword(false)} />
        <EyeOff className="toggle-eyes hide-eye" size={24} strokeWidth={2} onClick={() => toggleShowHidePassword(true)} />
      </div>
    </fieldset>
    <span className="form_input_err">{err}</span>
  </div>
}

export function FacebookButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" {...props} >
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>;
}

export function GoogleButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>;
}

export function GithubButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>;
}