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

            <!-- 搜索框 -->
            <el-input
                v-model="filename"
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
            <el-table-column prop="id" align="center" label="Id" width="50"></el-table-column>
            <el-table-column prop="date" label="日期" width="100" align="center"></el-table-column>
            <el-table-column prop="production" label="咨询产品" width="110" align="center"></el-table-column>
            <el-table-column prop="service" label="服务来源" width="115" align="center"></el-table-column>
            <el-table-column prop="date1" label="来源时间" width="115" align="center" v-if="false"></el-table-column>
            <el-table-column prop="serviceName" label="名称" width="115" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="115" align="center"></el-table-column>
            <el-table-column prop="career" label="职位" width="115" align="center" v-if="false"></el-table-column>
            <el-table-column prop="company" label="分公司" width="115" align="center"></el-table-column>
            <el-table-column prop="type" label="服务类型" width="115" align="center"></el-table-column>
            <el-table-column prop="desc" label="具体描述" width="115" align="center" v-if="false"></el-table-column>
            <el-table-column prop="solve" label="是否解决" width="90" align="center"></el-table-column>
            <el-table-column prop="replyTime" label="回复时间" width="115" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 查看弹出框 -->
        <el-dialog title="详情" :visible.sync="dialogVisible" width="25%">
            <p>日期：{{detail.date}}</p>
            <p>咨询产品：{{detail.production}}</p>
            <p>服务来源：{{detail.service}}</p>
            <p>来源时间：{{detail.date1}}</p>
            <p>名称：{{detail.serviceName}}</p>
            <p>姓名：{{detail.name}}</p>
            <p>职位：{{detail.career}}</p>
            <p>分公司：{{detail.company}}</p>
            <p>服务类型：{{detail.type}}</p>
            <p>具体描述：{{detail.desc}}</p>
            <p>是否解决：{{detail.solve}}</p>
            <p v-if="this.detail.solve == false">回复时间：{{detail.replyTime}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="日期" prop="date" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.date"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="咨询产品" prop="production" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.production"></el-input>
                </el-form-item>
                <el-form-item label="服务来源" prop="service" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.service" placeholder="请选择服务来源">
                        <el-option label="产品服务中台_oa" value="oa"></el-option>
                        <el-option label="84710000热线" value="phone"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源时间" required :label-width="formLabelWidth">
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
                </el-form-item>
                <el-form-item label="名称" prop="serviceName" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.serviceName"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="career" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.career"></el-input>
                </el-form-item>
                <el-form-item label="分公司" prop="company" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="type" :label-width="formLabelWidth">
                    <el-cascader
                        :options="options"
                        clearable
                        :props="{ expandTrigger: 'hover' }"
                        v-model="ruleForm.type"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="具体内容" prop="desc" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="是否解决" prop="solve" :label-width="formLabelWidth">
                    <el-switch v-model="ruleForm.solve"></el-switch>
                </el-form-item>
                <el-form-item
                    label="回复时间"
                    prop="replytTime"
                    v-if="this.ruleForm.solve == false"
                    :label-width="formLabelWidth"
                >
                    <el-date-picker
                        type="datetime"
                        placeholder="选择日期时间"
                        v-model="ruleForm.replytTime"
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
                {
                    id:1,
                    date: "Sun Feb 09 2020 18:07:51 GMT+0800 (中国标准时间)",
                    service: "oa",
                    name: "test",
                    serviceName: "test",
                    production: "test",
                    career: "test",
                    company: "成都分公司/公司领导",
                    desc: "test",
                    solve: "未解决",
                    date1: "Tue Feb 18 2020 12:00:00 GMT+0800 (中国标准时间)",
                    type: ["其他"],
                    replyTime: "Fri Feb 14 2020 12:00:00 GMT+0800 (中国标准时间)"
                },
                {
                    id:2,
                    date: "Sun Feb 09 2020 18:07:51 GMT+0800 (中国标准时间)",
                    service: "oa",
                    name: "test",
                    serviceName: "test",
                    production: "test",
                    career: "test",
                    company: "成都分公司/公司领导",
                    desc: "test",
                    solve: "已解决",
                    date1: "Tue Feb 18 2020 12:00:00 GMT+0800 (中国标准时间)",
                    type: ["其他"],
                    replyTime: ""
                },
                {
                    id:3,
                    date: "Sun Feb 09 2020 18:07:51 GMT+0800 (中国标准时间)",
                    service: "oa",
                    name: "test",
                    serviceName: "test",
                    production: "test",
                    career: "test",
                    company: "成都分公司/公司领导",
                    desc: "test",
                    solve: "未解决",
                    date1: "Tue Feb 18 2020 12:00:00 GMT+0800 (中国标准时间)",
                    type: ["其他"],
                    replyTime: "Fri Feb 14 2020 12:00:00 GMT+0800 (中国标准时间)"
                }
            ],
            listLoading: false,
            multipleSelection: [],
            downloadLoading: false,
            filename: "",
            dialogVisible: false,
            detail: "",
            dialogFormVisible: false,
            ruleForm: {
                date: "",
                service: "",
                name: "",
                serviceName: "",
                production: "",
                career: "",
                company: "",
                desc: "",
                solve: false,
                date1: "",
                type: "",
                replytTime: ""
            },
            formLabelWidth: "120px"
        };
    },
    //     created() {
    //     this.fetchData()
    //   },
    methods: {
        //     fetchData() {
        //   this.listLoading = true
        //   fetchList(this.listQuery).then(response => {
        //     this.list = response.data.items
        //     this.listLoading = false
        //   })
        // },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDownload() {
            if (this.multipleSelection.length) {
                this.downloadLoading = true;
                import("@/vendor/Export2Excel").then(excel => {
                    const tHeader = [
                        "Id",
                        "日期",
                        "咨询产品",
                        "服务来源",
                        "来源时间",
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
                        "Id",
                        "date",
                        "production",
                        "production",
                        "data1",
                        "serviceName",
                        "name",
                        "career",
                        "company",
                        "type",
                        "desc",
                        "solve",
                        "replyTime"
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
        handleClick(row) {
            this.dialogVisible = true;
            this.detail = row;
        },
        // editClick(row) {
        //     this.dialogFormVisible = true;
        //     this.ruleForm = row;
        //     console.log(row);
        // },
        // confirmEdit(formName) {
        //     console.log(formName)
        //             console.log(this.ruleForm);
        //     this.$refs[formName].validate(valid => {
        //         if (valid) {
        //             console.log(this.ruleForm);
        //             this.$message({
        //                 message: "提交成功!",
        //                 type: "success"
        //             });
        //     this.dialogFormVisible = false;
        //         } else {
        //             this.$message({
        //                 message: "提交失败，请确认信息填写完整!",
        //                 type: "warning"
        //             });
        //             return false;
        //         }
        //     });
        // },
        //搜索
        doFilter() {

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
