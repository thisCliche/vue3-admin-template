<template>
  <div class="dashboard default-main">
    <el-card shadow="hover" header="测试图表">
      <div class="user-growth-chart" ref="chartRefs"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref ,onMounted,onActivated,nextTick,reactive,onBeforeMount,watch} from 'vue'
import * as echarts from 'echarts'
import { useEventListener } from '@vueuse/core'
import { useNavTabs } from '@/stores/navTabs'

const navTabs = useNavTabs()
const state:{charts:any[]}=reactive({charts:[]})
const chartRefs = ref<HTMLElement>()
const initUserGrowthChart = () => {
  const userGrowthChart = echarts.init(chartRefs.value as HTMLElement)
  const option = {
    grid: {
      top: 0,
      right: 0,
      bottom: 20,
      left: 0,
    },
    xAxis: {
      data: [
        '周日', '周一', '周二', '周三', '周四', '周五', '周六'
      ],
    },
    yAxis: {},
    legend: {
      data: ['访问量', '注册量'],
      textStyle: {
        color: '#73767a',
      },
    },
    series: [
      {
        name: '访问量',
        data: [100, 160, 280, 230, 190, 200, 480],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#8595F4',
        },
      },
      {
        name: '注册量',
        data: [45, 180, 146, 99, 210, 127, 288],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#F48595',
          opacity: 0.5,
        },
      },
    ],
  }
  userGrowthChart.setOption(option)
  state.charts.push(userGrowthChart)
}
const echartsResize = () => {
    nextTick(() => {
        for (const key in state.charts) {
            state.charts[key].resize()
        }
    })
}
onActivated(() => {
    echartsResize()
})

onMounted(() => {
    initUserGrowthChart()
    useEventListener(window, 'resize', echartsResize)
})
onBeforeMount(() => {
    for (const key in state.charts) {
        state.charts[key].dispose()
    }
})
watch(
    () => navTabs.state.tabFullScreen,
    () => {
        echartsResize()
    }
)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'dashboard/dashboard',
})
</script>
<style lang="scss" scoped>
.dashboard{
  // padding: 20px;
  .user-growth-chart{
    height: 260px;
  }
}
</style>