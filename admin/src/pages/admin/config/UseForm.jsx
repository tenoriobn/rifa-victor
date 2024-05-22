import React from "react";

const UseForm = (type = "text") => {
  const [value, setValue] = React.useState(type === "file" ? null : "");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === "file") {
      if (!value) {
        setError("Selecione um arquivo");
        return false;
      }
    } else {
      if (value.length === 0) {
        setError("Preencha um valor");
        return false;
      }
    }
    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (type === "file") {
      const file = target.files[0];
      setValue(file);
      validate(file);
    } else {
      setValue(target.value);
      if (error) validate(target.value);
    }
  }

  return {
    value,
    setValue,
    setError,
    error,
    onChange,
    validate: () => validate(value),
  };
};

export default UseForm;
