import styles from "../styles/input.module.css";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input = ({ type = "text", placeholder, label, ...rest  }: InputProps) => {
  return (
    <fieldset>
      <legend>
        <label htmlFor={placeholder}>{label}</label>
      </legend>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        id={placeholder}
        {...rest}
      />
    </fieldset>
  );
};

export default Input;
