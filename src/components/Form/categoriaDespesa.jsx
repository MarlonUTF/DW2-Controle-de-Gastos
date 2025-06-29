import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategoriaDespesa({ setCategoria, setSubCategoria, categoria, subCategoria }) {

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
    if(event.target.value !== 'alimentacao') {
      setSubCategoria('');
    }
  };

  const handleSubCategoriaChange = (event) => {
    setSubCategoria(event.target.value);
  };

  return (
    <div className='flex gap-6'>
      <FormControl className='w-60'>
        <InputLabel id="categoria-label">Categoria</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria"
          value={categoria}
          label="Categoria"
          onChange={handleCategoriaChange}
        >
          <MenuItem value="alimentacao">Alimentação</MenuItem>
          <MenuItem value="fixo">Fixo</MenuItem>
          <MenuItem value="transporte">Transporte</MenuItem>
          <MenuItem value="saude">Saúde</MenuItem>
          <MenuItem value="lazer">Lazer</MenuItem>
          <MenuItem value="educacao">Educação</MenuItem>
          <MenuItem value="investimento">Investimento</MenuItem>
          <MenuItem value="pessoal">Pessoal</MenuItem>
          <MenuItem value="divida">Dívida / Empréstimo</MenuItem>
        </Select>
      </FormControl>

      {categoria === 'alimentacao' && (
        <FormControl className='w-60'>
          <InputLabel id="subcategoria-label">Sub Categoria</InputLabel>
          <Select
            labelId="subcategoria-label"
            id="subcategoria"
            value={subCategoria}
            label="Sub Categoria"
            onChange={handleSubCategoriaChange}
          >
            <MenuItem value="cantina">Cantina</MenuItem>
            <MenuItem value="mercado">Compras de Mercado</MenuItem>
            <MenuItem value="restaurante">Restaurantes e Lanchonetes</MenuItem>
            <MenuItem value="fastFood">Fast Food / Delivery</MenuItem>
            <MenuItem value="doces">Doces e Sobremesas</MenuItem>
            <MenuItem value="feira">Feira</MenuItem>
          </Select>
        </FormControl>
      )}
    </div>
  );
}