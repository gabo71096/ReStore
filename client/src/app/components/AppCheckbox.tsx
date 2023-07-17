import { Checkbox, FormControlLabel } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

export default function AppCheckbox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={<Checkbox {...field} disabled={props.disabled} checked={field.value} color="secondary" />}
      label={props.label}
    />
  );
}
