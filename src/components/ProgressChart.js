import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Paper } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressChart({ habits }) {
  // Get last 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const data = {
    labels: dates.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: habits.map(habit => ({
      label: habit.name,
      data: dates.map(date => {
        const progress = habit.progress.find(p => p.date === date);
        return progress?.completed ? 1 : 0;
      }),
      fill: false,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      tension: 0.1
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Progress'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: value => value === 1 ? 'Done' : 'Not Done'
        }
      }
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Line data={data} options={options} />
    </Paper>
  );
}

export default ProgressChart; 