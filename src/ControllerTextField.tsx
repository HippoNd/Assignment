import { InputAdornment } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  control: Control<T>;
  name: FieldPath<T>;
  adornmentLabel?: string;
  value?: string | number;
}

const ControllerTextField = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, adornmentLabel, value, ...rest } = props;

  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            id={name}
            fullWidth
            error={Boolean(error)}
            helperText={error?.message && error.message}
            {...field}
            {...rest}
            InputLabelProps={{
              shrink: true,
            }}
            value={value ? value : field.value}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{adornmentLabel}</InputAdornment>
              ),
            }}
            {...control.register(name, {
              onBlur: (e) => field.onChange(e.target.value.trim()),
            })}
            onChange={field.onChange}
          />
        );
      }}
      name={name}
      control={control}
    />
  );
};

export default ControllerTextField;
