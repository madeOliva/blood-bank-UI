import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

type CheckboxName = 'apto' | 'noapto';

interface CheckedState {
  apto: boolean;
  noapto: boolean;
}

interface Props {
  checked: CheckedState;
  onChange: (checked: CheckedState) => void;
}

export default function ExclusiveCheckboxes({ checked, onChange }: Props) {
  const handleChange =
    (name: CheckboxName) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (event.target.checked) {
        onChange({ apto: name === 'apto', noapto: name === 'noapto' });
      } else {
        onChange({ ...checked, [name]: false });
      }
    };

  return (
    <Box display="flex" alignItems="center" gap={2}>
    <FormGroup row>
      <FormControlLabel
        control={
         <Checkbox checked={checked.apto} onChange={handleChange('apto')} />
        }
        label="Apto"
      />
      <FormControlLabel
        control={
          <Checkbox checked={checked.noapto} onChange={handleChange('noapto')} />
        }
        label="No Apto"
      />
    </FormGroup>
    </Box>
  );
}