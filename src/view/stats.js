import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BACKGROUND_COLORS } from '../constants.js';
import {
  calculateCost,
  calculateType,
  calculateTime,
  calculateDuration
} from '../utils/stats.js';

const renderMoneyChart = (ctx, waypoints) => {
  const moneySpend = calculateCost(waypoints);
  const labels = [...moneySpend.keys()];
  const data = [...moneySpend.values()];
  const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

  ctx.height = 275;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels.map((type) => type.toUpperCase()),
      datasets: [{
        data,
        backgroundColor,
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (ctx, waypoints) => {
  const timesByType = calculateType(waypoints);
  const labels = [...timesByType.keys()];
  const data = [...timesByType.values()];
  const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

  ctx.height = 275;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels.map((type) => type.toUpperCase()),
      datasets: [{
        data,
        backgroundColor,
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (ctx, waypoints) => {
  const timeSpend = calculateTime(waypoints);
  const labels = [...timeSpend.keys()];
  const data = [...timeSpend.values()];
  const backgroundColor = labels.map((item) => BACKGROUND_COLORS[item]);

  ctx.height = 275;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels.map((type) => type.toUpperCase()),
      datasets: [{
        data,
        backgroundColor,
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 150,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val ? calculateDuration(0, 0, val) : 0}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


export const createStatsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Stats extends SmartView {
  constructor(waypoints) {
    super();
    this._data = waypoints;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;
    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._colorsCart = null;
      this._daysChart = null;
    }
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
