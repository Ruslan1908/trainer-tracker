import { useState } from 'react';
import { Button, Checkbox, Typography } from '@mui/material';

const generateWorkoutPlan = (sessionsPerWeek) => {
  const muscleGroups = [
    ['Плечи', 'Трапеция'],
    ['Бицепс', 'Трицепс'],
    ['Грудь', 'Предплечья'],
    ['Спина'],
    ['Ноги']
  ];

  const workoutPlan = [];
  for (let i = 0; i < sessionsPerWeek; i++) {
    workoutPlan.push({
      day: `День ${i + 1}`, // Название дня тренировки
      muscles: muscleGroups[i % muscleGroups.length], // Остаток от деления i на длину массива, он позволяет "зациклить" группы мышц, если дней тренировок больше, чем доступных групп
      completed: false // Статус выполнения упражнения
    });
  }
  return workoutPlan;
};

const getInitialWorkoutPlan = (sessionsPerWeek) => {
  const savedPlan = localStorage.getItem('workoutPlan');
  return savedPlan ? JSON.parse(savedPlan) : generateWorkoutPlan(sessionsPerWeek);
};

export const WorkoutScheduler = ({ sessionsPerWeek }) => {
  const [workoutPlan, setWorkoutPlan] = useState(() => getInitialWorkoutPlan(sessionsPerWeek));

  const updateWorkoutPlan = (newPlan) => {
    setWorkoutPlan(newPlan);
    localStorage.setItem('workoutPlan', JSON.stringify(newPlan));
  };

  const markAsDone = (index) => {
    const updatedPlan = [...workoutPlan];
    updatedPlan[index].completed = !updatedPlan[index].completed;
    updateWorkoutPlan(updatedPlan);
  };

  const resetPlan = () => {
    const newPlan = generateWorkoutPlan(sessionsPerWeek);
    updateWorkoutPlan(newPlan);
  };

  return (
    <div>
      <Typography variant="h4">Ваши тренировки</Typography>
      {workoutPlan.map((workout, index) => (
        <div key={index}>
          <Typography variant="h6">{workout.day}</Typography>
          <Typography>Мышечные группы: {workout.muscles.join(', ')}</Typography>
          <Checkbox
            checked={workout.completed}
            onChange={() => markAsDone(index)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {workout.completed ? 'Выполнено' : 'Отметить как выполнено'}
        </div>
      ))}
      <Button variant="contained" color="secondary" onClick={resetPlan} fullWidth>
        Сбросить план
      </Button>
    </div>
  );
};
