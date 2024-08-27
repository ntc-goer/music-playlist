import { TextField } from "@mui/material";

interface PropsI {
  type?: string;
  value: string | number;
  onChange?: CallableFunction;
  placeholder?: string;
}
function InputField({ value, placeholder, onChange, type = "text" }: PropsI) {
  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };
  return (
    <TextField
      type={type}
      variant="standard"
      sx={{
        width: "100%",
        '& .MuiInputBase-input': {
            fontSize: "16px"
        }
      }}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default InputField;
