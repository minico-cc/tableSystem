<template>
    <div class="exportExcel">
        <div class="table-head">
            <!-- <el-button
                :loading="downloadLoading"
                style="margin-bottom:20px"
                type="primary"
                icon="el-icon-document"
                @click="handleDownload"
            >导出选中项</el-button> -->

            <!-- <el-button
                :loading="downloadLoading"
                style="margin-bottom:20px"
                type="primary"
                icon="el-icon-document"
                @click="handleDownloadAll"
            >导出所有</el-button> -->

            <!-- 搜索框 -->
            <el-input
                v-model="searchInfo"
                placeholder="请输入搜索内容"
                style="width:350px;"
                prefix-icon="el-icon-document"
                @keyup.enter.native="doFilter"
            />
        </div>

        <el-table
            ref="multipleTable"
            v-loading="listLoading"
            :data="list"
            element-loading-text="拼命加载中"
            border
            fit
            highlight-current-row           
        >
            
            <!-- <el-table-column prop="id" align="center" label="Id" width="50"></el-table-column> -->
            <el-table-column prop="createTime" label="日期" width="100" align="center"></el-table-column>
            <el-table-column prop="productName" label="咨询产品" width="110" align="center"></el-table-column>
            <el-table-column prop="serviceSource" label="服务来源" width="115" align="center"></el-table-column>
            <!-- <el-table-column prop="date1" label="来源时间" width="115" align="center" v-if="false"></el-table-column> -->
            <el-table-column prop="serverName" label="名称" width="115" align="center"></el-table-column>
            <el-table-column prop="clientName" label="姓名" width="115" align="center"></el-table-column>
            <el-table-column prop="clientPosition" label="职位" width="115" align="center" v-if="false"></el-table-column>
            <el-table-column prop="clientCompany" label="分公司" width="115" align="center"></el-table-column>
            <el-table-column prop="serviceType" label="服务类型" width="115" align="center"></el-table-column>
            <el-table-column prop="detailContent" label="具体描述" width="115" align="center" v-if="false"></el-table-column>
            <el-table-column prop="status" label="是否解决" width="90" align="center"></el-table-column>
            <el-table-column prop="deadline" label="回复时间" width="115" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button> -->
                    <el-button type="text" size="small" @click="finish(scope.row)">标为已处理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems"
        ></el-pagination>

        <!-- 查看弹出框 -->
        <el-dialog title="详情" :visible.sync="dialogVisible" width="25%">
            <p>日期：{{detail.createTime}}</p>
            <p>咨询产品：{{detail.productName}}</p>
            <p>服务来源：{{detail.serviceSource}}</p>
            <!-- <p>来源时间：{{detail.date1}}</p> -->
            <p>名称：{{detail.serverName}}</p>
            <p>姓名：{{detail.clientName}}</p>
            <p>职位：{{detail.clientPosition}}</p>
            <p>分公司：{{detail.clientCompany}}</p>
            <p>服务类型：{{detail.serviceType}}</p>
            <p>具体描述：{{detail.detailContent}}</p>
            <p>是否解决：{{detail.status}}</p>
            <p v-if="this.detail.status == false">回复时间：{{detail.deadline}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="日期" prop="createTime" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.createTime"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="咨询产品" prop="productName" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="服务来源" prop="serviceSource" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.serviceSource " placeholder="请选择服务来源">
                        <el-option label="产品服务中台_oa" value="oa"></el-option>
                        <el-option label="84710000热线" value="phone"></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="来源时间" required :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker
                                type="datetime"
                                placeholder="选择日期时间"
                                v-model="ruleForm.date1"
                                default-time="12:00:00"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item> -->

                <!-- <el-form-item label="名称" prop="serverName" :label-width="formLabelWidth">
                    <el-input
                        v-model="ruleForm.serverName"
                        :placeholder="ruleForm.service=='oa'?'请填写oa站点名称':(ruleForm.service=='phone'?'请填写反馈用户电话':'')"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="clientName" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.clientName"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="clientPosition" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.clientPosition"></el-input>
                </el-form-item>
                <el-form-item label="分公司" prop="clientCompany" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.clientCompany"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="serviceType" :label-width="formLabelWidth">
                    <el-cascader
                        :options="options"
                        clearable
                        :props="{ expandTrigger: 'hover' }"
                        v-model="ruleForm.serviceType"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="具体内容" prop="detailContent" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="ruleForm.detailContent"></el-input>
                </el-form-item>
                <el-form-item label="是否解决" prop="status" :label-width="formLabelWidth">
                    <el-switch v-model="ruleForm.status"></el-switch>
                </el-form-item>

                <el-form-item label="回复时间" prop="deadline" v-if="this.ruleForm.solve == false" :label-width="formLabelWidth">
                <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    v-model="ruleForm.deadline"
                    default-time="12:00:00"
                ></el-date-picker>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
    name: "exportExcel",
    data() {
        return {
            list: [
                // {
                //     id: 1,
                //     date: "Sun Feb 09 2020 18:07:51 GMT+0800 (中国标准时间)",
                //     service: "oa",
                //     name: "test",
                //     serviceName: "test",
                //     production: "test",
                //     career: "test",
                //     company: ["成都分公司", "公司领导"],
                //     desc: "test",
                //     solve: "未解决",
                //     date1: "Tue Feb 18 2020 12:00:00 GMT+0800 (中国标准时间)",
                //     type: ["其他"],
                //     replyTime:
                //         "Fri Feb 14 2020 12:00:00 GMT+0800 (中国标准时间)"
                // }
            ],
            listLoading: false,
            multipleSelection: [],
            ids:[],
            downloadLoading: false,
            searchInfo: "",
            dialogVisible: false,
            detail: "",
            dialogFormVisible: false,
            currentPage:1,
            pageSize:10,
            totalItems: 0,
            ruleForm: {
                id:"",
                createTime: "",
                serviceSource: "",
                clientName: "",
                serverName: "",
                productName: "",
                clientPosition: "",
                clientCompany: "",
                detailContent: "",
                status: false,
                // date1: "",
                serviceType: "",
                deadline: ""
            },
            rules: {
                createTime: [
                    {
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ],
                serviceSource: [
                    {
                        required: true,
                        message: "请输入服务来源",
                        trigger: "change"
                    }
                ],
                clientName: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                // date1: [
                //     {
                //         required: true,
                //         message: "请输入来源时间",
                //         trigger: "change"
                //     }
                // ],
                serverName: [
                    {
                        required: true,
                        message: "请输入服务名称",
                        trigger: "blur"
                    }
                ],
                productName: [
                    {
                        required: true,
                        message: "请输入咨询产品",
                        trigger: "blur"
                    }
                ],
                clientPosition: [
                    {
                        required: true,
                        message: "请输入职位",
                        trigger: "blur"
                    }
                ],
                clientCompany: [
                    {
                        required: true,
                        message: "请输入分公司名称",
                        trigger: "change"
                    }
                ],
                serviceType: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个服务类型",
                        trigger: "change"
                    }
                ],
                detailContent: [
                    {
                        required: true,
                        message: "请填写具体内容描述",
                        trigger: "blur"
                    }
                ],
                deadline: [
                    {
                        required: true,
                        message: "请填写回复时间",
                        trigger: "change"
                    }
                ]
            },
            options: [
                {
                    value: "产品咨询",
                    label: "产品咨询",
                    children: [
                        {
                            value: "资费咨询",
                            label: "资费咨询"
                        },
                        {
                            value: "技术咨询",
                            label: "技术咨询"
                        },
                        {
                            value: "考核咨询",
                            label: "考核咨询"
                        },
                        {
                            value: "营销咨询",
                            label: "营销咨询"
                        },
                        {
                            value: "其他",
                            label: "其他"
                        }
                    ]
                },
                {
                    value: "投诉纠纷",
                    label: "投诉纠纷",
                    children: [
                        {
                            value: "结算纠纷",
                            label: "结算纠纷"
                        },
                        {
                            value: "考核申诉",
                            label: "考核申诉"
                        },
                        {
                            value: "服务纠纷",
                            label: "服务纠纷"
                        },
                        {
                            value: "其他",
                            label: "其他"
                        }
                    ]
                },
                {
                    value: "支援纠纷",
                    label: "支援纠纷",
                    children: [
                        {
                            value: "产品上架申请",
                            label: "产品上架申请"
                        },
                        {
                            value: "产品政策申请",
                            label: "产品政策申请"
                        },
                        {
                            value: "赋能培训申请",
                            label: "赋能培训申请"
                        },
                        {
                            value: "其他",
                            label: "其他"
                        }
                    ]
                },
                {
                    value: "其他",
                    label: "其他"
                }
            ],
            formLabelWidth: "120px"
        };
    },
        created() {
        this.getBeingexpire()
      },
    methods: {
        getBeingexpire(){
            this.listLoading = true
        this.$post("/getSrvOrder", {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        status:0,
      })
        .then(response => {
          console.log(response.data)
          if (response.code == 1000) {
            this.list = response.data.serviceOrderList;
            // this.currentPage = response.data.number;
            this.totalItems = response.data.totalRecord;
            console.log(this.list)
            this.listLoading = false
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
            this.listLoading = false
            console.log(err)
          this.$message({
            message: "请求数据失败",
            type: "error"
          });
        });
    },

    //导出选中工单
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
        // handleDownload() {
        //     if (this.multipleSelection.length) {
        //         this.downloadLoading = true;
                // import("@/vendor/Export2Excel").then(excel => {
                //     const tHeader = [
                //         "日期",
                //         "咨询产品",
                //         "服务来源",
                //         "来源时间",
                //         "名称",
                //         "姓名",
                //         "职位",
                //         "分公司",
                //         "服务类型",
                //         "内容描述",
                //         "是否解决",
                //         "回复时间"
                //     ];
                //     const filterVal = [
                //         "id",
                //         "createTime",
                //         "productName",
                //         "serviceSource",
                //         // "serverName",
                //         "serverName",
                //         "clientName",
                //         "clientPosition",
                //         "clientCompany",
                //         "serviceType",
                //         "detailContent",
                //         "status",
                //         "deadline"
                //     ];
                //     const list = this.multipleSelection;
                //     const data = this.formatJson(filterVal, list);
                //     excel.export_json_to_excel({
                //         header: tHeader,
                //         data,
                //         filename: this.filename
                //     });
                //     this.$refs.multipleTable.clearSelection();
                //     this.downloadLoading = false;
                // });
        //         this.multipleSelection.forEach((e)=>{
        //             console.log(e.id)
        //             this.ids.push(e.id)                  
        //         })
        //         console.log(this.ids)
        //         this.$pppost("/exportSrvOrder",{
        //             ids:this.ids.join(','),
        //         },{responseType: "blob"}).then(response => {
        //             let blob = response;
        //             let reader = new FileReader();
        //             reader.readAsDataURL(blob);
        //             reader.onload = e => {
        //                 let a = document.createElement("a");
        //                 a.download = `fileName.xlsx`;
        //                 a.href = e.target.result;
        //                 document.body.appendChild(a);
        //                 a.click();
        //                 document.body.removeChild(a);
        //             };
        //             this.downloadLoading = false;
        //             this.ids.splice(0);
        //         })
        //     } else {
        //         this.$message({
        //             message: "请至少选择一项！",
        //             type: "warning"
        //         });
        //     }
        // },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },

        //导出所有
        // handleDownloadAll() {
        //     this.$pppost("/exportSrvOrder", {}, {responseType: "blob"})
        //         .then(response => {
        //             let blob = response;
        //             let reader = new FileReader();
        //             reader.readAsDataURL(blob);
        //             reader.onload = e => {
        //                 let a = document.createElement("a");
        //                 a.download = `fileName.xlsx`;
        //                 a.href = e.target.result;
        //                 document.body.appendChild(a);
        //                 a.click();
        //                 document.body.removeChild(a);
        //             };
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             this.listLoading = false;
        //             this.$message({
        //                 message: "请求数据失败",
        //                 type: "error"
        //             });
        //         });
        // },

        doFilter() {
      this.$get('/getSrvOrder',{
        page: this.currentPage,
        size: this.pageSize,
        queryCond: this.searchInfo,
        status:0,
      }).then(response => {
          if (response.code == 1000) {
            this.list = response.data.serviceOrderList;
            // this.currentPage = response.data.number;
            this.totalItems = response.data.totalRecord;
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
            console.log(err)
          this.$message({
            message: "请求数据失败",
            type: "error"
          });
        });
    },
        handleClick(row) {
            this.dialogVisible = true;
            this.detail = row;
        },
        editClick(row) {
            this.dialogFormVisible = true;
            this.ruleForm = row;
            // console.log(row)
        },

        //编辑
        confirmEdit(formName) {
           console.log(this.$moment(this.ruleForm.createTime).format("YYYY-MM-DD HH:mm:ss"));
            if(this.ruleForm.deadline){
                this.ruleForm.deadline = this.$moment(this.ruleForm.deadline).format("YYYY-MM-DD HH:mm:ss")
            }else(
                this.ruleForm.deadline = ""
            )
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.status == false) {
                        this.ruleForm.status = 0;
                    } else {
                        this.ruleForm.status = 1;
                    }
                    console.log(this.ruleForm.status);
                    this.$ppost("/updateOrSaveSrvOrder", {
                        id:this.ruleForm.id,
                        createTime: this.$moment(this.ruleForm.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        productName: this.ruleForm.productName,
                        serviceSource: this.ruleForm.serviceSource,
                        serverName: this.ruleForm.serverName,
                        clientName: this.ruleForm.clientName,
                        clientPosition: this.ruleForm.clientPosition,
                        clientCompany: this.ruleForm.clientCompany.toString(),
                        serviceType: this.ruleForm.serviceType.join("/"),
                        detailContent: this.ruleForm.detailContent,
                        status: this.ruleForm.status,
                        deadline: this.ruleForm.deadline
                        })
                        .then(response => {
                            console.log(response)
                            if (response ==  'SUCCESS') {
                                this.$message({
                                    message: "提交成功!",
                                    type: "success"
                                });
                            } else {
                                this.$message({
                                    message: "提交失败!",
                                    type: "error"
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message({
                                message: "请求数据失败",
                                type: "error"
                            });
                        });
                } else {
                    this.$message({
                        message: "提交失败，请确认信息填写完整!",
                        type: "warning"
                    });
                    return false;
                }
            });
        },
        // 改变处理状态
        finish(row){
            this.$post("/handleSrvOrder",{
                id:row.id
            })
            .then(response => {
                console.log(response)
                if(response.code == 1000){
                    this.$message({
                        message : response.msg,
                        type : "success"
                    })
                }else{
                    this.$message({
                        message : "未成功修改状态",
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
        },
        handleSizeChange(val){
            // console.log(`每页 ${val} 条`);
      this.pageSize = val;
        },
        handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getBeingexpire()
    },
    
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.table-head el-input {
    float: right;
}
.el-input{
    margin-bottom: 20px;
}
</style>
