<template>
  <div class="wrapper">
    <ApexChart
      width="100%"
      height="100%"
      :type="type"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, computed } from 'vue';
import ApexChart from 'vue3-apexcharts';

import { formatNumber, formatValue, formatShare } from '@/utils/formatters';

type ChartType = 'bar' | 'area' | 'line';

type DataType = 'number' | 'money' | 'share';

interface ChartData {
  name: string;
  values: number[];
}

const props = defineProps({
  type: {
    type: String as PropType<ChartType>,
    default: 'bar',
  },
  isRelative: {
    type: Boolean,
    default: false,
  },
  timestamps: {
    type: Array as PropType<number[]>,
    required: true,
  },
  data: {
    type: Array as PropType<ChartData[]>,
    required: true,
  },
  dataType: {
    type: String as PropType<DataType>,
    default: 'number',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { type, isRelative, timestamps, data, dataType } = toRefs(props);

const series = computed(() => {
  const totals = data.value.reduce((totals, series) => {
    return series.values.map((value, index) => {
      const total = totals[index] || 0;
      return total + value;
    });
  }, new Array<number>(timestamps.value.length));
  return data.value.map((series) => {
    const { name, values } = series;
    return {
      name,
      data: isRelative.value
        ? values.map((value, index) => value / totals[index])
        : values,
    };
  });
});

const options = computed(() => {
  return {
    chart: {
      id: 'chart',
      type: type.value,
      stacked: true,
      stackType: 'normal',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: 'Nunito, Helvetica, Roboto, Arial, sans-serif',
    },
    grid: {
      show: false,
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: timestamps.value,
    },
    yaxis: {
      labels: {
        formatter: formatter.value,
      },
      min: isRelative.value ? 0 : undefined,
      max: isRelative.value ? 1 : undefined,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#625598', '#8472cc', '#a58fff'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      show: false,
    },
  };
});

const formatter = computed(() => {
  if (isRelative.value) {
    return formatShare;
  }
  if (dataType.value === 'money') {
    return formatValue;
  }
  if (dataType.value === 'share') {
    return formatShare;
  }
  return formatNumber;
});
</script>

<style>
.apexcharts-text tspan,
.apexcharts-yaxis-label tspan,
.apexcharts-xaxis-label tspan {
  fill: var(--text-color);
}

.apexcharts-gridline {
  stroke: var(--text-color);
  opacity: 0.15;
}

.apexcharts-legend-text {
  color: var(--text-color) !important;
}
</style>

<style scoped>
.wrapper {
  height: 360px;
  margin-left: -16px;
}

@media (min-width: 768px) {
  .wrapper {
    height: 220px;
  }
}
</style>
