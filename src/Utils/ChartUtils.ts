import { ChartData } from 'chart.js/auto';
import { RankedManufacturados } from '../Interfaces/Ranking/RankedManufacturados';
export interface BaseChartData {
  pointerLabel: string;
  data: number[];
  labels?: string | string[];
  rgbs?: string | string[];
  borderRgbs?: string | string[];
  borderWidth?: number;
}
interface MultiDataSetChart {
  labels?: string[];
  datasets: {
    data: number[];
    label: string;
    rgb?: string;
    borderRgb?: string;
    borderWidth?: number;
  }[];
}

interface ChartGenerator {
  chartData: RankedManufacturados[];
  dataToGraph: string[];
  labelToGraph?: string;
  charDataSeter: React.Dispatch<ChartData<any>>;
}
export const defineOnlyDatasetChart = (config: BaseChartData) => {
  const data = {
    labels: config.labels,
    datasets: [
      {
        label: config.pointerLabel,
        data: config.data,
        backgroundColor: config.rgbs ?? [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: config.borderRgbs ?? [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: config.borderWidth ?? 1,
      },
    ],
  };
  return data;
};

export const defineMultiDatasetChart = (config: MultiDataSetChart) => {
  const data = {
    labels: config.labels,
    datasets: config.datasets?.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.rgb,
      borderColor: dataset.borderRgb,
      borderWidth: dataset.borderWidth ?? 1,
    })),
  };

  return data;
};

const generateVerticalBarChart = (config: ChartGenerator) => {
  const dataArray = config.dataToGraph.map((data) => {
    return config.chartData ? (config.chartData.map((a) => a[data]) as number[]) : [];
  });

  const colorArray = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
  let labels = config.chartData ? config.chartData.map((a) => a.denominacion) : [];

  const verticalData = defineMultiDatasetChart({
    labels: labels,
    datasets: dataArray.map((data, index) => ({
      data: data,
      label: config.dataToGraph[index],
      borderRgb: colorArray[index],
      rgb: colorArray[index],
    })),
  });

  config.charDataSeter(verticalData as any);
};

const generatePolarChart = (config: ChartGenerator) => {
  let data = config.chartData!.map((a) => a[config.dataToGraph[0]]) as number[];
  let labels = config.chartData!.map((a) => a.denominacion);

  const polarData = defineOnlyDatasetChart({
    data: data,
    pointerLabel: config.labelToGraph!,
    labels: labels,
  });

  config.charDataSeter(polarData as any);
};

const generatePieChart = (config: ChartGenerator) => {
  let data = config.chartData!.map((a) => a[config.dataToGraph[0]]) as number[];
  let labels = config.chartData!.map((a) => a.denominacion);

  const pieData = defineOnlyDatasetChart({
    data: data,
    pointerLabel: config.labelToGraph!,
    labels: labels,
  });

  config.charDataSeter(pieData as any);
};



export { generatePieChart, generatePolarChart, generateVerticalBarChart };
