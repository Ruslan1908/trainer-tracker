import { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

import { saveUserData } from './firebaseService';

const initialPhysicalParams = {
  weight: localStorage.getItem('weight') || '',
  height: localStorage.getItem('height') || '',
  age: localStorage.getItem('age') || '',
};

const initialTrainingPreferences = {
  location: localStorage.getItem('location') || 'gym',
  sessionsPerWeek: Number(localStorage.getItem('sessionsPerWeek')) ?? 3,
};

const saveUserDataToLocalStorage = (userData) => {
  Object.entries(userData).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const UserSetupForm = ({ onSetupComplete }) => {
  const [physicalParams, setPhysicalParams] = useState(initialPhysicalParams);
  const [location, setLocation] = useState(initialTrainingPreferences.location);
  const [sessionsPerWeek, setSessionsPerWeek] = useState(initialTrainingPreferences.sessionsPerWeek);

  const handlePhysicalParamChange = (name, value) => {
    setPhysicalParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (value) => setLocation(value);

  const handleSessionsPerWeekChange = (value) => setSessionsPerWeek(value);

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
        onChange={(e) => handlePhysicalParamChange('weight', e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Рост"
        type="number"
        name="height"
        value={physicalParams.height}
        onChange={(e) => handlePhysicalParamChange('height', e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Возраст"
        type="number"
        name="age"
        value={physicalParams.age}
        onChange={(e) => handlePhysicalParamChange('age', e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Где тренироваться"
        name="location"
        value={location}
        onChange={(e) => handleLocationChange(e.target.value)}
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
        onChange={(e) => handleSessionsPerWeekChange(e.target.value)}
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
