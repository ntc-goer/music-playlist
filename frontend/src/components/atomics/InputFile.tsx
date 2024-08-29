import { useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";

interface PropsI {
  onChange?: CallableFunction;
  label?: string;
  accept?: string;
  isShowFileName?: boolean;
  errorText?: string
}

function InputFile(props: PropsI) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { onChange, accept, errorText = "" } = props;

  const handleClick = () => {
    inputFileRef.current?.click();
  };
  const handleChange = (e: any) => {
    const fileE = e.target.files[0];
    onChange && onChange(fileE);
  };
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Button
        sx={{ padding: "5px 10px", fontSize: "15px", mr: "5px" }}
        onClick={handleClick}
        variant="contained"
      >
        Select file
      </Button>
      {
        errorText && <Typography sx={{color: "#d32f2f", fontWeight: 400, fontSize: "16px"}}>{errorText}</Typography>
      }
      <input
        type="file"
        hidden
        ref={inputFileRef}
        onChange={handleChange}
        accept={accept}
      ></input>
    </Stack>
  );
}

export default InputFile;
