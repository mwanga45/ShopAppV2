import React, { useEffect, useState } from "react";
import "./toggle.css";

type ToggleProps = {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  size?: "default" | "tiny" | "xs";
  id?: string;
  ariaLabel?: string;
};

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  size = "default",
  id,
  ariaLabel = "Toggle",
}) => {
  // local state used only when parent does not control the component
  const [internal, setInternal] = useState<boolean>(!!checked);

  // keep internal state in sync when parent controls via `checked`
  useEffect(() => {
    if (typeof checked === "boolean") setInternal(checked);
  }, [checked]);

  const isControlled = typeof checked === "boolean" && typeof onChange === "function";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (onChange) onChange(next);
    if (!isControlled) setInternal(next);
  };

  const inputId = id ?? `toggle-${Math.random().toString(36).slice(2, 8)}`;
  const isChecked = isControlled ? !!checked : internal;

  return (
    <>
      <input
        id={inputId}
        type="checkbox"
        className="toggle-input"
        checked={isChecked}
        onChange={handleChange}
        aria-label={ariaLabel}
      />
      <label
        htmlFor={inputId}
        className={`toggle ${size === "tiny" ? "tiny" : ""} ${size === "xs" ? "xs" : ""}`}
      />
    </>
  );
};

export default Toggle;