import { useCallback } from "react";
import { useState } from "react";
import isEmail from 'validator/lib/isEmail';

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
    if (target.closest("input").name === 'email' && isEmail(value)) {
        setIsEmailValid(target.closest("input").checkValidity())
    }
    if (target.closest("input").name === 'password') {
        setIsPasswordValid(target.closest("input").checkValidity())
    }
    if (name === 'email' && !isEmail(value)) {
      setErrors({ ...errors, email: 'Некорректная почта.' });
    }
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, isNameValid, isEmailValid, isPasswordValid, setValues, setErrors, resetForm };
}