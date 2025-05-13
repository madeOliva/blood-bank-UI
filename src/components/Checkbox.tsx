import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

type CheckboxName = 'apto' | 'noapto';

interface CheckedState {
  apto: boolean;
  noapto: boolean;
}

export default function ExclusiveCheckboxes() {
  const [checked, setChecked] = useState<CheckedState>({ apto: false, noapto: false });

  const handleChange =
    (name: CheckboxName) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        setChecked({ apto: name === 'apto', noapto: name === 'noapto' });
      } else {
        setChecked((prev) => ({ ...prev, [name]: false }));
      }
    };

  return (
    <FormGroup row>
      <FormControlLabel
        sx={{ mr: 5 }}
        control={
          <Checkbox checked={checked.apto} onChange={handleChange('apto')} />
        }
        label="Apto"
      />
      <FormControlLabel
        sx={{ mr: 5 }}
        control={
          <Checkbox checked={checked.noapto} onChange={handleChange('noapto')} />
        }
        label="No Apto"
      />
    </FormGroup>
  );
}