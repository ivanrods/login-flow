import styles from "../styles/input.module.css";
interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <fieldset>
      <legend>
        <label htmlFor={placeholder}>{placeholder}</label>
      </legend>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={placeholder}
      />
    </fieldset>
  );
};

export default Input;
