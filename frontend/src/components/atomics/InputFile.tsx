import { useRef, useState } from "react";
import { Button, Stack } from "@mui/material";

interface PropsI {
  onChange?: CallableFunction;
  label?: string;
  accept?: string;
  isShowFileName?: boolean;
}

function InputFile(props: PropsI) {
  const [file, setFile] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { onChange, accept } = props;

  const handleClick = () => {
    inputFileRef.current?.click();
  };
  const handleChange = (e: any) => {
    const fileE = e.target.files[0];
    setFile(fileE);
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
