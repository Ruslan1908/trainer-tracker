import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { saveUserData } from './firebaseService';

const getFromLocalStorage = (key) => localStorage.getItem(key);

const getInitialPhysicalParams = () => ({
  weight: getFromLocalStorage('weight') || '',
  height: getFromLocalStorage('height') || '',
  age: getFromLocalStorage('age') || '',
});

const getInitialTrainingPreferences = () => ({
  location: getFromLocalStorage('location') || 'gym',
  sessionsPerWeek: getFromLocalStorage('sessionsPerWeek') || 3,
});

const saveUserDataToLocalStorage = (userData) => {
  Object.entries(userData).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const UserSetupForm = ({ onSetupComplete }) => { 
  const [physicalParams, setPhysicalParams] = useState(getInitialPhysicalParams);
  const [location, setLocation] = useState(() => getInitialTrainingPreferences().location);
  const [sessionsPerWeek, setSessionsPerWeek] = useState(() => getInitialTrainingPreferences().sessionsPerWeek);

  const handlePhysicalParamsChange = (e) => {
    const { name, value } = e.target;
    setPhysicalParams((prev) => ({
      ...prev,
      [name]: value,
    }));
    localStorage.setItem(name, value);
  };

  const handleTrainingPreferencesChange = (e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      setLocation(value);
    } else if (name === 'sessionsPerWeek') {
      setSessionsPerWeek(value);
    }
    localStorage.setItem(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...physicalParams,
      location,
      sessionsPerWeek,
    };

    try {
      await saveUserData(userData);
      saveUserDataToLocalStorage(userData);

      onSetupComplete({ physicalParams, trainingPreferences: { location, sessionsPerWeek } });
    } catch (error) {
      console.error('Error saving user data:', error);
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
        onChange={handlePhysicalParamsChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Рост"
        type="number"
        name="height"
        value={physicalParams.height}
        onChange={handlePhysicalParamsChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Возраст"
        type="number"
        name="age"
        value={physicalParams.age}
        onChange={handlePhysicalParamsChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Где тренироваться"
        name="location"
        value={location}
        onChange={handleTrainingPreferencesChange}
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
        value={sessionsPerWeek}
        onChange={handleTrainingPreferencesChange}
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
