<template>
    <div>
        <avue-crud
                ref="crud"
                :data="table.data"
                :option="table.option"
                :table-loading="table.loading"
        >
            <template slot="menuLeft">

            </template>
            <template slot="dbFieldName" slot-scope="{row}">
                <el-input v-model="row.dbFieldName" placeholder = "字段名称" size = "mini" disabled></el-input>
            </template>
            <template slot="dbFieldTxt" slot-scope="{row}">
                <el-input v-model="row.dbFieldTxt" placeholder = "字段备注" size = "mini" disabled></el-input>
            </template>
            <template slot="isShowForm" slot-scope="{row}">
                <el-checkbox v-model="row.isShowForm" :true-label="1" :false-label="0"></el-checkbox>
            </template>
            <template slot="isShowList" slot-scope="{row}">
                <el-checkbox v-model="row.isShowList" :true-label="1" :false-label="0"></el-checkbox>
            </template>
            <template slot="isQuery" slot-scope="{row}">
                <el-checkbox v-model="row.isQuery" :true-label="1" :false-label="0"></el-checkbox>
            </template>
        </avue-crud>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {http, apiList, sweetAlert, constant} from '@/utils'

    export default {
        name: "PageProps",
        props: {
            data: {
                type: Array,
            },
        },
        data() {
            const {table} = constant
            return {
                table: {
                    data: [],
                    option: {
                        ...table,
                        page: false,
                        selection : false,
                        props: {
                            label: 'itemText',
                            value: 'itemValue'
                        },
                        column: [
                            {
                                label: '字段名称',
                                prop: 'dbFieldName',
                                slot : true
                            },
                            {
                                label: '字段备注',
                                prop: 'dbFieldTxt',
                                slot : true,
                            },
                            {
                                label: '表单显示',
                                prop: 'isShowForm',
                                cell: true,
                                slot : true
                            },
                            {
                                label: '列表显示',
                                prop: 'isShowList',
                                cell: true,
                                slot : true
                            },
                            {
                                label: '控件类型',
                                prop: 'fieldShowType',
                                cell: true,
                                type : 'select',
                                dicData : [
                                    {itemText:'文本框',itemValue:'text'},
                                    {itemText:'密码',itemValue:'password'},
                                    {itemText:'单选框',itemValue:'radio'},
                                    {itemText:'多选',itemValue:'checkbox'},
                                    {itemText:'日期(yyyy-MM-dd)',itemValue:'date'},
                                    {itemText:'日期(yyyy-MM-dd HH:mm:ss)',itemValue:'datetime'},
                                    {itemText:'文件',itemValue:'file'},
                                    {itemText:'多行文本',itemValue:'textarea'},
                                    {itemText:'下拉框',itemValue:'list'},
                                    {itemText:'下拉多选框',itemValue:'"list_multi"'},
                                    {itemText:'下拉搜索框',itemValue:'sel_search'},
                                    {itemText:'popup弹出框',itemValue:'popup'},
                                    {itemText:'图片',itemValue:'image'},
                                    {itemText:'富文本编辑器',itemValue:'umeditor'},
                                ]
                            },
                            {
                                label: '控件长度',
                                prop: 'fieldLength',
                                type: 'number',
                                cell: true,
                            },
                            {
                                label: '是否查询',
                                prop: 'isQuery',
                                cell: true,
                                slot : true
                            },
                            {
                                label: '查询类型',
                                prop: 'queryMode',
                                type : 'select',
                                cell : true,
                                dicData : [
                                    {itemText : '普通查询',itemValue:'single'},
                                    {itemText : '范围查询',itemValue:'group'},
                                ]
                            },
                            {
                                label: '扩展参数',
                                prop: 'fieldExtendJson',
                                cell: true,
                            },
                            {
                                label: '填值规则',
                                prop: 'fieldValueRuleCode',
                                cell: true,
                            },
                        ]
                    },
                    loading: false,
                    selection: []
                },
            }
        },
        methods: {
            setPageInfo() {
                this.table = {
                    ...this.table,
                    loading: true
                }
                this.table = {
                    ...this.table,
                    data: this.data
                }
                this.$nextTick(() => {
                    this.data.forEach((item, index) => {
                        this.$refs.crud.rowCell(item, index)
                    })
                })
                this.table = {
                    ...this.table,
                    loading: false
                }
            }
        },
        mounted() {
            this.setPageInfo()
        }
    }
</script>

<style scoped>

</style>