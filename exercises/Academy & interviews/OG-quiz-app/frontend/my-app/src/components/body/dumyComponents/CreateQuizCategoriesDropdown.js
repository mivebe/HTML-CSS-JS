import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const CreateQuizCategoriesDropdown = ({ setCategory, categories }) => {
  const handleChange = (event, value) => {
    if (value) {
      setCategory(value.id)
    };
  };

  return (
    <Autocomplete
      id='combo-box-demo'
      options={categories}
      getOptionLabel={(option) => option.category}
      style={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label='Category' variant='outlined' />
      )}
    />
  );
};

export default CreateQuizCategoriesDropdown;
