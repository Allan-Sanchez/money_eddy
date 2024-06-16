import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card from '../components/Card';
import HomeIcon from '../assets/icons/HomeIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import LogoutIcon from '../assets/icons/LogoutIcon';
import styles from '../scss/Dashboard.module.scss';

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  // Datos de ejemplo para el gráfico
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Total Préstamos',
        data: [12000, 19000, 3000, 5000, 2000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.cardContainer}>
        <Card title="Total Deudores" value={350} icon={<HomeIcon />} />
        <Card title="Total Préstamos" value="$150,000" icon={<ProfileIcon />} />
        <Card title="Intereses Ganados" value="$50,000" icon={<SettingsIcon />} />
        <Card title="Deudores Activos" value={120} icon={<LogoutIcon />} />
      </div>
      <div className={styles.chartContainer}>
        <div>
          <h6>Préstamos Mensuales</h6>
          <Bar data={data} />
        </div>
        <div>
          <h6>Intereses Mensuales</h6>
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
