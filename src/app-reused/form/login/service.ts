import { GeneralMsg, LoginFormMsg } from "@/util/message.helper";

export class LoginFormSvc {

  static validateEmail(val: string): string {
    if (!val || val.trim() === "")
      return GeneralMsg.not_empty;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val))
      return LoginFormMsg.must_email;

    return "";
  }

  static validatePass(val: string): string {
    if (!val || val.trim() === "")
      return GeneralMsg.not_empty;

    if (val.length >= 15)
      return GeneralMsg.exceeded_len;

    return "";
  }

}