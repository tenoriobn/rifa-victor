import React from "react";

const Input = ({ label, id, type, value, onChange, placeholder, error }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-bold text-blue-900 text-2xl">
        {label}
      </label>
      {type === "file" ? (
        <>
          <input
            className=""
            id={id}
            name={id}
            onChange={onChange}
            type={type}
          />
          {error && <p className="text-red-500">{error}</p>}
        </>
      ) : (
        <>
          <input
            className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
          />
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Input;
