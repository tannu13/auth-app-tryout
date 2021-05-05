import { ChangeEvent, FunctionComponent } from "react";
import { ValidationState } from "../types/ValidationState";

type Props = {
  name: string,
  label: string,
  type?: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  validationState?: ValidationState,
}

const InputBox: FunctionComponent<Props> = (props) => {
  const {label, validationState, ...inputProps} = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" {...inputProps} />
      </div>
      { validationState && validationState.isTouched &&
        <p className={`help ${validationState.isValid ? 'is-success' : 'is-danger'}`}>{validationState.message}</p>
      }
    </div>
  );
}

InputBox.defaultProps = {
  type: "text",
  validationState: {
    isTouched: false,
    isValid: false,
    message: ''
  },
}

export default InputBox;