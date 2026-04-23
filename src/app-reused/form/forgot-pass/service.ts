import { GeneralMsg, LoginFormMsg } from "@/util/message.helper";

export class ForgotPassFormSvc {
  static validateEmail(val: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return LoginFormMsg.must_email;
    }

    return "";
  }

  static validateOTP(val: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    if (val.length > 10) {
      return GeneralMsg.exceeded_len;
    }

    return "";
  }
}
