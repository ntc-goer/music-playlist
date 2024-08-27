import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface PropsI {
  label: string;
  children: ReactNode;
}

function InputRow({ label, children }: PropsI) {
  return (
    <Grid item xs={12} sx={{ mb: "30px" }}>
      <Grid container alignItems={'center'}>
        <Grid item xs={3}>
          {label}
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InputRow;
