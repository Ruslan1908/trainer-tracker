import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { saveUserData } from './firebaseService'; // Импорт функции сохранения данных

// eslint-disable-next-line react/prop-types
const UserSetupForm = ({ onSetupComplete }) => {
  const [physicalParams, setPhysicalParams] = useState({
    weight: localStorage.getItem('weight') || '',
    height: localStorage.getItem('height') || '',
    age: localStorage.getItem('age') || ''
  });
  const [trainingPreferences, setTrainingPreferences] = useState({
    location: localStorage.getItem('location') || 'gym',
    sessionsPerWeek: localStorage.getItem('sessionsPerWeek') || 3
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhysicalParams({ ...physicalParams, [name]: value });
    localStorage.setItem(name, value);
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setTrainingPreferences({ ...trainingPreferences, [name]: value });
    localStorage.setItem(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...physicalParams,
      ...trainingPreferences,
    };

    try {
      await saveUserData(userData); 
      onSetupComplete({ physicalParams, trainingPreferences });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ввод физических параметров</h2>
      <TextField
        label="Вес"
        type="number"
        name="weight"
        value={physicalParams.weight}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Рост"
        type="number"
        name="height"
        value={physicalParams.height}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Возраст"
        type="number"
        name="age"
        value={physicalParams.age}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Где тренироваться"
        name="location"
        value={trainingPreferences.location}
        onChange={handlePreferencesChange}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="gym">В зале</MenuItem>
        <MenuItem value="home">Дома</MenuItem>
        <MenuItem value="outdoors">На улице</MenuItem>
      </TextField>
      <TextField
        label="Количество тренировок в неделю"
        type="number"
        name="sessionsPerWeek"
        value={trainingPreferences.sessionsPerWeek}
        onChange={handlePreferencesChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Начать
      </Button>
    </form>
  );
};

export default UserSetupForm;
