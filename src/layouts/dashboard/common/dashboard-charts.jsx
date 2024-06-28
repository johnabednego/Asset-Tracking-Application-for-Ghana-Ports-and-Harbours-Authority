import React from 'react';
import Chart from 'react-apexcharts';

const DashboardCharts = () => {
  const ordersData = {
    series: [{
      name: 'Item Orders',
      data: [120, 200, 300, 500, 700, 1200, 1500, 1600, 1700, 1720] // Dummy data for years 2015-2024
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      title: {
        text: 'Item Orders Over Years',
        align: 'left'
      },
      xaxis: {
        categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
      },
      yaxis: {
        title: {
          text: 'Orders'
        }
      }
    }
  };

  const bugData = {
    series: [{
      name: 'Bugs',
      data: [30, 25, 20, 15, 10, 8, 5, 3, 2, 1] // Dummy data for years 2015-2024
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      title: {
        text: 'Bug Reports Over Years',
        align: 'left'
      },
      xaxis: {
        categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
      },
      yaxis: {
        title: {
          text: 'Bugs'
        }
      }
    }
  };

  const bugStatusData = {
    series: [{
      name: 'Fixed Bugs',
      data: [15, 18, 17, 13, 9, 7, 4, 2, 1, 1] // Dummy data for fixed bugs
    }, {
      name: 'Unfixed Bugs',
      data: [15, 7, 3, 2, 1, 1, 1, 1, 1, 0] // Dummy data for unfixed bugs
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true
      },
      title: {
        text: 'Fixed vs Unfixed Bugs',
        align: 'left'
      },
      xaxis: {
        categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
      },
      yaxis: {
        title: {
          text: 'Bugs'
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div>
      <div className="chart">
        <Chart options={ordersData.options} series={ordersData.series} type="line" height={350} />
      </div>
      <div className="chart">
        <Chart options={bugData.options} series={bugData.series} type="line" height={350} />
      </div>
      <div className="chart">
        <Chart options={bugStatusData.options} series={bugStatusData.series} type="bar" height={350} />
      </div>
    </div>
  );
}

export default DashboardCharts;
