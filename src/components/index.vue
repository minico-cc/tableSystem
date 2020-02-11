<template>
  <div class="index">
    <h2>表单处理情况</h2>
        <div id="main" style="width: 600px;height:400px;"></div>
        <!-- <div class="dataDetail">
            <p>待处理单数：{{number.bending}}</p>
            <p>即将过期单数：{{number.aboutToExpire}}</p>
            <p>已过期单数：{{number.expire}}</p>
        </div> -->
  </div>
</template>
 
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
          number:{
              bending: 13,
              aboutToExpire:2,
              expire:3
          }
          
      }
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            legend: {
                data:['数量']
            },
            xAxis: {
                data: ["待处理","即将过期","已过期"]
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: [13, 2, 3]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },
    methods: {},
    watch: {},
    created() {
 
    }
  }
</script>

<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  #main{
    width: 50%;
    height: 500px;
    margin: 0 auto;
  }
  .dataDetail{
    margin: 0 auto;
  }
</style>

