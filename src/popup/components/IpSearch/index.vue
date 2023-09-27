<template>
    <div>
        <div style="margin-bottom: 10px">
            IP查询
        </div>
        <el-input v-model="inputVal">
            <template #append>
                <el-button type="primary" @click="convert">查询</el-button>
            </template>
        </el-input>

        <el-descriptions
            v-show="outputVal.location"
            :column="1"
            size="small"
            border
            style="margin-top: 10px;"
        >
            <el-descriptions-item label="归属地">{{ outputVal.location }}</el-descriptions-item>
            <el-descriptions-item label="经纬度">{{ outputVal.lonlat }}</el-descriptions-item>
        </el-descriptions>

        <div v-show="errorVal" style="margin-top: 10px;">
            {{errorVal}}
        </div>
    </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'

let inputVal = ref('')
let errorVal = ref('')
let outputVal = reactive({
    lonlat: '',
    location: ''
})


const convert = async () => {
    if (!inputVal) return
    const response = await fetch(`http://ip-api.com/json/${inputVal.value}?lang=zh-CN`)
    const res = await response.json()
    if (res.status === 'fail') {
        errorVal = "输入有误"
    } else {
        outputVal.location = `${res.country} ${res.regionName} ${res.city}`
        outputVal.lonlat = `${res.lon}, ${res.lat}`
    }
}

</script>

<style scoped>
/*.container {*/
/*    padding: 20px;*/
/*}*/
</style>