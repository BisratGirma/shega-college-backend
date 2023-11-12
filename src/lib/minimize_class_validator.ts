import { ValidationError } from "class-validator";

export default function minimizeClassValidatorError(error: ValidationError[]): {
  statusCode: number;
  error: any;
} {
  let errObj: string[] = [];

  error.forEach((_err) => {
    _err.constraints;
    errObj.push(Object.values(_err?.constraints!)[0]);
  });

  return {
    statusCode: 400,
    error: errObj,
  };
}
