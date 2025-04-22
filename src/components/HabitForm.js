import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

function HabitForm({ onAdd }) {
  const [habit, setHabit] = useState({
    name: '',
    frequency: 'daily',
    goal: '',
    reminder: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habit.name.trim() && habit.goal) {
      onAdd(habit);
      setHabit({
        name: '',
        frequency: 'daily',
        goal: '',
        reminder: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Habit Name"
        name="name"
        value={habit.name}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Frequency</InputLabel>
        <Select
          name="frequency"
          value={habit.frequency}
          onChange={handleChange}
          label="Frequency"
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Goal"
        name="goal"
        value={habit.goal}
        onChange={handleChange}
        required
        placeholder="e.g., Read for 30 minutes"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="time"
        label="Daily Reminder"
        name="reminder"
        value={habit.reminder}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Add Habit
      </Button>
    </Box>
  );
}

export default HabitForm; 