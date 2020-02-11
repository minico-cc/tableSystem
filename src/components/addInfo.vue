<template>
    <div class="hello">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
        >
            <el-form-item label="日期" prop="date">
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
            <el-form-item label="咨询产品" prop="production">
                <el-input v-model="ruleForm.production"></el-input>
            </el-form-item>
            <el-form-item label="服务来源" prop="service">
                <el-select v-model="ruleForm.service" placeholder="请选择服务来源">
                    <el-option label="产品服务中台_oa" value="oa"></el-option>
                    <el-option label="84710000热线" value="phone"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源时间" prop="date1">
                <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    v-model="ruleForm.date1"
                    default-time="12:00:00"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="名称" prop="serviceName">
                <el-input
                    v-model="ruleForm.serviceName"
                    :placeholder="ruleForm.service=='oa'?'请填写oa站点名称':(ruleForm.service=='phone'?'请填写反馈用户电话':'')"
                ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="career">
                <el-input v-model="ruleForm.career"></el-input>
            </el-form-item>
            <el-form-item label="分公司" prop="company">
                <!-- <el-input v-model="ruleForm.company"></el-input> -->
                <el-cascader
                    :options="company"
                    clearable
                    :props="{ expandTrigger: 'hover' }"
                    v-model="ruleForm.company"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="服务类型" prop="type">
                <el-cascader
                    :options="options"
                    clearable
                    :props="{ expandTrigger: 'hover' }"
                    v-model="ruleForm.type"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="具体内容" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="是否解决" prop="solve">
                <el-switch v-model="ruleForm.solve"></el-switch>
            </el-form-item>
            <el-form-item label="回复时间" prop="replytTime" v-if="this.ruleForm.solve == false">
                <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    v-model="ruleForm.replytTime"
                    default-time="12:00:00"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            ruleForm: {
                date: new Date(),
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
            rules: {
                date: [
                    {
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ],
                service: [
                    {
                        required: true,
                        message: "请选择服务来源",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                date1: [
                    {
                        required: true,
                        message: "请输入来源时间",
                        trigger: "change"
                    }
                ],
                serviceName: [
                    {
                        required: true,
                        message: "请输入服务名称",
                        trigger: "blur"
                    }
                ],
                production: [
                    {
                        required: true,
                        message: "请输入咨询产品",
                        trigger: "blur"
                    }
                ],
                career: [
                    {
                        required: true,
                        message: "请输入职位",
                        trigger: "blur"
                    }
                ],
                company: [
                    {
                        required: true,
                        message: "请选择分公司名称",
                        trigger: "change"
                    }
                ],
                type: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个服务类型",
                        trigger: "change"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请填写具体内容描述",
                        trigger: "blur"
                    }
                ],
                replytTime: [
                    {
                        required: true,
                        message: "请填写回复时间",
                        trigger: "blur"
                    }
                ]
            },
            company: [
                {
                    value: "省公司本部",
                    label: "省公司本部"
                    // children: [
                    //     {
                    //         value: "公司领导",
                    //         label: "公司领导"
                    //     },
                    //     {
                    //         value: "资深副总裁",
                    //         label: "资深副总裁"
                    //     },
                    //     {
                    //         value: "副总师",
                    //         label: "副总师"
                    //     },
                    //     {
                    //         value: "办公室",
                    //         label: "办公室"
                    //     },
                    //     {
                    //         value: "市场部",
                    //         label: "市场部"
                    //     },
                    //     {
                    //         value: "市场部",
                    //         label: "市场部"
                    //     },
                    //     {
                    //         value: "销售及渠道市场部",
                    //         label: "销售及渠道市场部"
                    //     },
                    //     {
                    //         value: "开放渠道部",
                    //         label: "开放渠道部"
                    //     }
                    // ]
                },
                {
                    value: "成都分公司",
                    label: "成都分公司"
                    // children: [
                    //     {
                    //         value: "公司领导",
                    //         label: "公司领导"
                    //     },
                    //     {
                    //         value: "资深副总裁",
                    //         label: "资深副总裁"
                    //     },
                    //     {
                    //         value: "春促联合行动办公室",
                    //         label: "春促联合行动办公室"
                    //     },
                    //     {
                    //         value: "快速响应决策",
                    //         label: "快速响应决策"
                    //     },
                    //     {
                    //         value: "办公室",
                    //         label: "办公室"
                    //     },
                    //     {
                    //         value: "市场及客户经营部",
                    //         label: "市场及客户经营部"
                    //     },
                    //     {
                    //         value: "政企客户部",
                    //         label: "政企客户部"
                    //     },
                    //     {
                    //         value: "销售及渠道拓展部",
                    //         label: "销售及渠道拓展部"
                    //     },
                    //     {
                    //         value: "电子渠道运营部",
                    //         label: "电子渠道运营部"
                    //     }
                    // ]
                },
                {
                    value: "天府新区分公司",
                    label: "天府新区分公司"
                },
                {
                    value: "绵阳分公司",
                    label: "绵阳分公司"
                },
                {
                    value: "南充分公司",
                    label: "南充分公司"
                },
                {
                    value: "泸州分公司",
                    label: "泸州分公司"
                },
                {
                    value: "乐山分公司",
                    label: "乐山分公司"
                },
                {
                    value: "凉山分公司",
                    label: "凉山分公司"
                },
                {
                    value: "宜宾分公司",
                    label: "宜宾分公司"
                },
                {
                    value: "达州分公司",
                    label: "达州分公司"
                },
                {
                    value: "德阳分公司",
                    label: "德阳分公司"
                },
                {
                    value: "眉山分公司",
                    label: "眉山分公司"
                },
                {
                    value: "内江分公司",
                    label: "内江分公司"
                },
                {
                    value: "巴中分公司",
                    label: "巴中分公司"
                },
                {
                    value: "自贡分公司",
                    label: "自贡分公司"
                },
                {
                    value: "广元分公司",
                    label: "广元分公司"
                },
                {
                    value: "广安分公司",
                    label: "广安分公司"
                },
                {
                    value: "遂宁分公司",
                    label: "遂宁分公司"
                },
                {
                    value: "资阳分公司",
                    label: "资阳分公司"
                },
                {
                    value: "甘孜分公司",
                    label: "甘孜分公司"
                },
                {
                    value: "雅安分公司",
                    label: "雅安分公司"
                },
                {
                    value: "攀枝花分公司",
                    label: "攀枝花分公司"
                },
                {
                    value: "阿坝分公司",
                    label: "阿坝分公司"
                },
                {
                    value: "四川省传输线路维护局（省光缆维护管理局）",
                    label: "四川省传输线路维护局（省光缆维护管理局）"
                },
                {
                    value: "四川机动应急通信局",
                    label: "四川机动应急通信局"
                },
                {
                    value: "天府云商",
                    label: "天府云商"
                },
                {
                    value: "信产公司",
                    label: "信产公司"
                },
                {
                    value: "成都天翼空间技术科技有限公司",
                    label: "成都天翼空间技术科技有限公司"
                },
                {
                    value: "号百商旅四川省分公司",
                    label: "号百商旅四川省分公司"
                },
                {
                    value: "供应商",
                    label: "供应商"
                }
            ],
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
            ]
        };
    },
    methods: {
        // submitForm(formName) {
        //     this.$refs[formName].validate(valid => {
        //         if (valid) {
        //             console.log(this.ruleForm.type.join("/"));
        //             this.$post("", {})
        //                 .then(response => {
        //                     if (response.code == 200) {
        //                         this.$message({
        //                             message: "提交成功!",
        //                             type: "success"
        //                         });
        //                     } else {
        //                         this.$message({
        //                             message: "提交失败!",
        //                             type: "error"
        //                         });
        //                     }
        //                 })
        //                 .catch(err => {
        //                     this.$message({
        //                         message: "请求数据失败",
        //                         type: "error"
        //                     });
        //                 });
        //         } else {
        //             this.$message({
        //                 message: "提交失败，请确认信息填写完整!",
        //                 type: "warning"
        //             });
        //             return false;
        //         }
        //     });
        // },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
    width: 50%;
    margin: 0 auto;
}
</style>
