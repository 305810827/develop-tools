<template>
    <div>
        <div style="margin-bottom: 10px">
            十六进制转rgb/rgb转十六进制
        </div>
        <el-input v-model="inputVal">
            <template #append>
                <el-button type="primary" @click="colorConvert">转换</el-button>
            </template>
        </el-input>

        <div class="box" style="margin-top: 10px;display: flex; align-items: center">
            <span>{{outputVal}}</span>
            <span :style="{width: '15px',height: '15px', display: 'inline-block', marginLeft: '5px', backgroundColor: outputVal}"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import hex2Rgb from '../../../utils/hex2Rgb.js'
import rgb2Hex from '../../../utils/rgb2Hex.js'
let inputVal = ref('')
let outputVal = ref('')

const isHexColor = (color:string) => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(color);
}

const isRGBColor = (color:string) => {
    const rgbColorRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
    return rgbColorRegex.test(color);
}

const colorConvert = () => {
    console.log(inputVal.value)
    if(isHexColor(inputVal.value)) {
        /*16进制转换为RGB颜色*/
        outputVal.value = hex2Rgb(inputVal.value)
    } else if(isRGBColor(inputVal.value)) {
        /*RGB颜色转换为16进制*/
        outputVal.value = rgb2Hex(inputVal.value)
    } else {
        outputVal.value = '输入颜色有误'
    }
    console.log(outputVal.value)
}

</script>

<style scoped>
/*.container {*/
/*    padding: 20px;*/
/*}*/
</style>