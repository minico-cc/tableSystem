<template>
    <div class="app">
        <el-container>
          <div class="header">
            <div class="app-logo">服务表单系统</div>
            <div class="menu" style="width: 80%;">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                >
                    <el-menu-item index="首页" @click="toIndex">首页</el-menu-item>
                    <el-menu-item index="添加" @click="toAddInfo">新建工单</el-menu-item>
                    <el-badge :value="pending" class="item">
                        <el-menu-item index="待处理" @click="toExportExcel">待处理工单</el-menu-item>
                    </el-badge>
                    <el-menu-item index="历史" @click="toHistory">历史工单</el-menu-item>
                </el-menu>
            </div>
          </div>
            
            <el-container>
                <el-main class="app-body">
                    <template>
                        <router-view />
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Container",
    data() {
        return {
            activeIndex: this.$route.name,
            pending: 0
        };
    },
    created() {       
        this.getBadge()
    },
    methods: {
      toIndex() {
            this.$router.push("/index");
            // window.location.reload();
        },
        toExportExcel() {
            this.$router.push("/exportExcel");
            // window.location.reload();
        },
        toAddInfo() {
            this.$router.push("/addInfo");
            // window.location.reload();
        },
        toHistory() {
            this.$router.push("/history");
        },
        getBadge(){
            this.$get("/getStatusStatistics")
        .then(response => {
          if(response.code == 1000){
            this.pending = response.data.pendingOrder
          }else{
              this.$message({
                        message : "请求错误",
                        type : "error"
                    })
          }
        })
        .catch( err => {
            console.log(err)
            this.$message({
                        message : "请求失败",
                        type : "error"
                    })
        })
        }
    },
    
};
</script>

<style>
.header{
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 99;
}
.app-logo{
  background-color: white;
    border-bottom: solid 1px #e6e6e6;
    text-align: center;
    line-height: 60px;
    width: 20%;
}
.el-container {
    display: block;
}
.item {
    /* margin-top: 10px; */
    margin-right: 40px;
}
.el-badge__content.is-fixed {
    top: 15px;
}
.el-menu-item {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
}
.el-menu-item:focus,
.el-menu-item:hover {
    outline: 0;
    background-color: transparent;
}
.el-menu-item.is-active {
    border-bottom: 2px solid #409eff;
    color: #303133;
}
.el-main{
  padding: 80px 20px 20px 20px;
}
.header{
    user-select: none;
}
</style>