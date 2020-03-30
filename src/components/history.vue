<template>
    <div class="history">
        <div class="table-head">
            <el-button
                :loading="downloadLoading"
                style="margin-bottom:20px"
                type="primary"
                icon="el-icon-document"
                @click="handleDownload"
            >导出选中项</el-button>

            <el-button
                style="margin-bottom:20px"
                type="primary"
                icon="el-icon-document"
                @click="handleDownloadAll"
            >导出所有</el-button>

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
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" align="center" />
            <!-- <el-table-column prop="id" align="center" label="Id" width="50"></el-table-column> -->
            <el-table-column prop="createTime" label="日期" width="110" align="center"></el-table-column>
            <el-table-column prop="productName" label="咨询产品" width="110" align="center"></el-table-column>
            <el-table-column prop="serviceSource" label="服务来源" width="115" align="center"></el-table-column>
            <!-- <el-table-column prop="date1" label="来源时间" width="115" align="center" v-if="false"></el-table-column> -->
            <el-table-column prop="serverName" label="名称" width="150" align="center"></el-table-column>
            <el-table-column prop="clientName" label="姓名" width="115" align="center"></el-table-column>
            <el-table-column
                prop="clientPosition"
                label="职位"
                width="115"
                align="center"
                v-if="false"
            ></el-table-column>
            <el-table-column prop="clientCompany" label="分公司" width="115" align="center"></el-table-column>
            <el-table-column prop="serviceType" label="服务类型" width="140" align="center"></el-table-column>
            <el-table-column
                prop="detailContent"
                label="具体描述"
                width="115"
                align="center"
                v-if="false"
            ></el-table-column>
            <el-table-column prop="status" label="是否解决" width="90" align="center"></el-table-column>
            <el-table-column prop="deadline" label="回复时间" width="115" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button> -->
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
    </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
    name: "exportExcel",
    data() {
        return {
            list: [],
            listAll: [],
            listLoading: false,
            multipleSelection: [],
            downloadLoading: false,
            searchInfo: "",
            dialogVisible: false,
            detail: "",
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            ruleForm: {
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
            formLabelWidth: "120px"
        };
    },
    created() {
        this.getHistory();
    },
    methods: {
        getHistory() {
            this.listLoading = true;
            this.$post("/getSrvOrder", {
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                status: 1
            })
                .then(response => {
                    console.log(response.data);
                    if (response.code == 1000) {
                        this.list = response.data.serviceOrderList;
                        // this.currentPage = response.data.number;
                        this.totalItems = response.data.totalRecord;
                        console.log(this.list);
                        this.listLoading = false;
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.listLoading = false;
                    this.$message({
                        message: "请求数据失败",
                        type: "error"
                    });
                });
        },

        //导出选中
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDownload() {
            if (this.multipleSelection.length) {
                this.downloadLoading = true;
                import("@/vendor/Export2Excel").then(excel => {
                    const tHeader = [                       
                        "日期",
                        "咨询产品",
                        "服务来源",
                        // "来源时间",
                        "名称",
                        "姓名",
                        "职位",
                        "分公司",
                        "服务类型",
                        "内容描述",
                        "是否解决",
                        "回复时间"
                    ];
                    const filterVal = [
                        "createTime",
                        "productName",
                        "serviceSource",
                        // "serverName",
                        "serverName",
                        "clientName",
                        "clientPosition",
                        "clientCompany",
                        "serviceType",
                        "detailContent",
                        "status",
                        "deadline"
                    ];
                    const list = this.multipleSelection;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    });
                    this.$refs.multipleTable.clearSelection();
                    this.downloadLoading = false;
                });
            } else {
                this.$message({
                    message: "请至少选择一项！",
                    type: "warning"
                });
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },

        //导出所有

        handleDownloadAll() {
            this.$pppost("/exportSrvOrder", {}, {responseType: "blob"})
                .then(response => {
                    let blob = response;
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = e => {
                        let a = document.createElement("a");
                        a.download = `历史工单（总）.xlsx`;
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                })
                .catch(err => {
                    console.log(err);
                    this.listLoading = false;
                    this.$message({
                        message: "请求数据失败",
                        type: "error"
                    });
                });
        },

        // handleDownload() {

        //     if (this.multipleSelection.length) {
        //         this.downloadLoading = true;
        //         import("@/vendor/Export2Excel").then(excel => {
        //             const tHeader = [
        //                 "Id",
        //                 "日期",
        //                 "咨询产品",
        //                 "服务来源",
        //                 // "来源时间",
        //                 "名称",
        //                 "姓名",
        //                 "职位",
        //                 "分公司",
        //                 "服务类型",
        //                 "内容描述",
        //                 "是否解决",
        //                 "回复时间"
        //             ];
        //             const filterVal = [
        //                 "id",
        //                 "createTime",
        //                 "productName",
        //                 "serviceSource",
        //                 // "serverName",
        //                 "serverName",
        //                 "clientName",
        //                 "clientPosition",
        //                 "clientCompany",
        //                 "serviceType",
        //                 "detailContent",
        //                 "status",
        //                 "deadline"
        //             ];
        //             const list = this.multipleSelection;
        //             const data = this.formatJson(filterVal, list);
        //             excel.export_json_to_excel({
        //                 header: tHeader,
        //                 data,
        //                 filename: this.filename
        //             });
        //             this.$refs.multipleTable.clearSelection();
        //             this.downloadLoading = false;
        //         });
        //     } else {
        //         this.$message({
        //             message: "请至少选择一项！",
        //             type: "warning"
        //         });
        //     }
        // },
        // formatJson(filterVal, jsonData) {
        //     return jsonData.map(v => filterVal.map(j => v[j]));
        // },

        //详情
        handleClick(row) {
            this.dialogVisible = true;
            this.detail = row;
        },
        //搜索
        doFilter() {
            console.log(this.searchInfo);
            this.$post("/getSrvOrder", {
                page: this.currentPage,
                size: this.pageSize,
                queryCond: this.searchInfo,
                status: 1
            })
                .then(response => {
                    console.log(response);
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
                    console.log(err);
                    this.$message({
                        message: "请求数据失败",
                        type: "error"
                    });
                });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getHistory();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.table-head .el-input {
    float: right;
}
</style>
