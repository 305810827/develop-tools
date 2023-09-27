<template>
    <el-tabs v-model="activeName" class="container" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="查询类" name="first">
            <el-row :gutter="12">
                <el-col :span="12" v-for="data in dataList" :key="data.id">
                    <el-card class="box-card">
                        <component :is="data.component"></component>
                    </el-card>
                </el-col>
            </el-row>

        </el-tab-pane>
        <el-tab-pane label="文档转换" name="second">文档转换</el-tab-pane>
        <el-tab-pane label="热搜榜" name="third">
            <hotBand :active="activeName === 'third'"></hotBand>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import ColorConvert from "./components/ColorConvert/index.vue"
import IpSearch from "./components/IpSearch/index.vue"
import hotBand from "./components/hotBand/index.vue"
import {ref, reactive} from "vue";

let activeName = ref('first')
// let curTab = ref('first')
let dataList = reactive([
        {
            id: 'ColorConvert',
            component: ColorConvert
        },
        {
            id: 'IpSearch',
            component: IpSearch
        }
    ])

// const handleClick = (tab, event) => {
//     curTab = tab
//     console.log(tab, curTab, event, 'activeName')
// }
</script>

<style scoped>
.container {
    height: 580px;
    width: 600px;
    margin: 0;
    padding: 0;
    overflow: hidden; /* 隐藏滚动条 */
}
</style>