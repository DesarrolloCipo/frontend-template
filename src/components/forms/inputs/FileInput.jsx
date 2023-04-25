import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useRef } from "react";
import { useField, useFormikContext } from "formik";

const FileInput = ({ extraFn, ...props }) => {
  const formik = useFormikContext();
  const [field, meta] = useField(props);
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    /* if (file.size > 5000)
    formik.setFieldError(field, "File size cannot exceed more than 5MB");
    else  */
    formik.setFieldValue(field.name, file);
    if(extraFn){
      extraFn(file)
    }
  };

  return (
    <>
      <input style={{ display: "none" }} onChange={handleFileInput} id={`${field.name}-button-file`} type="file" />
      <label htmlFor={`${field.name}-button-file`}>
        <Button
          onClick={(e) => {
            fileInput.current && fileInput.current.click();
          }}
          variant="contained"
          color="primary"
          component="span"
          size="large"
          endIcon={<UploadFile />}
        >
          Cargar archivo
        </Button>
      </label>
      {field.value && <label> {field.value.name}</label>}
    </>
  );
};

export default FileInput;