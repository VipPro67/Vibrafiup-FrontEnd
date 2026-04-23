import { GeneralMsg, LoginFormMsg } from "@/util/message.helper";

export class RegisterFormSvc {
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

  static validateFullName(val: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    if (val.length > 100) {
      return GeneralMsg.exceeded_len;
    }

    return "";
  }

  static validateDOB(val: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    return "";
  }

  static validatePass(val: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    if (val.length >= 15) {
      return GeneralMsg.exceeded_len;
    }

    return "";
  }

  static validateConfirmPass(val: string, originalPass: string): string {
    if (!val || val.trim() === "") {
      return GeneralMsg.not_empty;
    }

    if (val !== originalPass) {
      return "Password does not match";
    }

    return "";
  }
}
