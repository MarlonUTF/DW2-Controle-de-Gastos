import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategoriaEntrada({ setCategoria, categoria }) {
  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <div className='flex gap-6'>
      <FormControl className='w-60' fullWidth>
        <InputLabel id="categoria-label">Categoria</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria"
          value={categoria}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value={"trabalho"}>Trabalho</MenuItem>
          <MenuItem value={"beneficio"}>Benefício</MenuItem>
          <MenuItem value={"rendimento"}>Rendimento de Patrimônio</MenuItem>
          <MenuItem value={"reembolso"}>Reembolso / Restituição</MenuItem>
          <MenuItem value={"outro"}>Outro</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}