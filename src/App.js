import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import ProgressChart from './components/ProgressChart';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    setHabits([...habits, { 
      ...habit, 
      id: Date.now(),
      progress: [],
      streak: 0
    }]);
  };

  const updateHabit = (id, completed) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const progress = [...habit.progress];
        const todayIndex = progress.findIndex(p => p.date === today);

        if (todayIndex >= 0) {
          progress[todayIndex].completed = completed;
        } else {
          progress.push({ date: today, completed });
        }

        // Calculate streak
        let streak = 0;
        for (let i = progress.length - 1; i >= 0; i--) {
          if (progress[i].completed) {
            streak++;
          } else {
            break;
          }
        }

        return { ...habit, progress, streak };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Habit Tracker
          </Typography>
          
          <HabitForm onAdd={addHabit} />
          
          <Box sx={{ my: 4 }}>
            <HabitList 
              habits={habits}
              onUpdate={updateHabit}
              onDelete={deleteHabit}
            />
          </Box>
          
          {habits.length > 0 && (
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" gutterBottom>
                Progress Overview
              </Typography>
              <ProgressChart habits={habits} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 