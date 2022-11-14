import { useState } from "react";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChange = (event) => {

    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    if (target.closest("input").name === 'name') {
        setIsNameValid(target.closest("input").checkValidity())
    }
    if (target.closest("input").name === 'email') {
        setIsEmailValid(target.closest("input").checkValidity())
    }
    if (target.closest("input").name === 'password') {
        setIsPasswordValid(target.closest("input").checkValidity())
    }
    setIsValid(target.closest("form").checkValidity());
  };

  return { values, handleChange, errors, isValid, isNameValid, isEmailValid, isPasswordValid, setValues, setErrors };
}