import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { convertFileToString } from "../../ultis/common";

interface PropsI {
  onChange?: CallableFunction;
  value?: string | File | null;
}

const Styled = styled(Stack)`
  .upload-image {
    cursor: pointer;
    border: 1px solid #fcccff;
    border-style: dashed;
    border-radius: 10px;
    height: 200px;
  }
`;
function ImageUpload(props: PropsI) {
  const [imageFile, setImageFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState("");

  const { onChange, value } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setImageFile(value);
    }
  }, [value]);

  const convertAndSetPreviewImage = async (file: File) => {
    const previewImgStr = await convertFileToString(file);
    previewImgStr && setImagePreview(previewImgStr);
  };
  useEffect(() => {
    if (typeof imageFile == "string") {
      setImagePreview(imageFile);
    } else {
      convertAndSetPreviewImage(imageFile);
    }
  }, [imageFile]);

  const handleImageSelect = (event: any) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setImageFile(selectedFile);
    onChange && onChange(selectedFile);
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleClose = () => {
    setImageFile("");
    setImagePreview("");
  };
  return (
    <Styled>
      <input
        accept="image/*"
        multiple={false}
        type="file"
        ref={inputRef}
        onChange={handleImageSelect}
        hidden
      />
      {!imageFile && (
        <Stack
          className="upload-image"
          direction="column"
          justifyContent="center"
          alignItems="center"
          onClick={handleUpload}
        >
          <Typography
            sx={{
              color: "text.primary",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            Browse file to upload
          </Typography>
          <CloudUploadIcon />
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            Supported Files
          </Typography>
          <Typography sx={{ fontSize: "bold", color: "text.primary" }}>
            JPG,JPEG,PNG
          </Typography>
        </Stack>
      )}
      {imageFile && (
        <Stack
          flexDirection="row"
          justifyContent="center"
          sx={{ position: "relative" }}
        >
          <Box sx={{ display: "inline-block", position: "relative" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", maxWidth: "500px" }}
            />
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
                transform: "translate(50%, -50%)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      )}
    </Styled>
  );
}
export default ImageUpload;
