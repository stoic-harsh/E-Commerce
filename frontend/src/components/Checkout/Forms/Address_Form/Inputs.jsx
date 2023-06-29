import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

export const Text_Field = ({name, value, label, onChange, helperText})=> {
  return <Grid item xs={12} sm={6}>
      <TextField
          required
          id="outlined-required"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
          color="secondary"
          helperText={helperText}
        />
  </Grid>;
}


export const Select_Menu = ({name, value, label, onChange, array, helperText})=> {
  return <Grid item xs={12} sm={6}>
      <TextField
        required
          id="outlined-required"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          fullWidth
          color="secondary"
          select
          helperText={helperText}
        >
          {array.map(([id, name]) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
  </Grid>;
}

