import { faL } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
export default function Input({
  name,
  isEmtyNickName,
  isEmtyName,
  isEmtyPass,
  isEmty,
  isError,
  label,
  value,
  placeholder,
  type,
  onChange,
  onblur,
  className,
}) {
  const classNames = () => {
    return `inputMain ${className}`;
  };
  return (
    <div className={classNames()}>
      <div className="inputMain_wrapper">
        <label>{label}</label>
        <input
          spellCheck={false}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          name={name}
          onBlur={onblur}
        />
      </div>
      <p className="error">
        {isEmtyNickName || isEmtyName || isEmty || isError || isEmtyPass}
      </p>
    </div>
  );
}
