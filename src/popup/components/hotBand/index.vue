<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>热门榜</span>
            </div>
        </template>
        <div v-for="(item, index) in dataList" :key="item.word_scheme" class="text item">

            <a :href="`https://s.weibo.com/weibo?q=%23${item.note}%23&topic_ad=`" target="_blank">
                {{index+1}}、{{ item.word_scheme }}
            </a>
        </div>
    </el-card>
</template>

<script setup>
import {ref, defineProps, watch, reactive} from 'vue'
const props = defineProps({
    active: Boolean
})
let dataList = reactive([])
watch(() => props.active, (val) => {
    if (val) {
        getData()
    }
})
const getData = async () => {
    const response = await fetch(`https://weibo.com/ajax/statuses/hot_band`)
    const res = await response.json()
    res.data.band_list.filter((item, index) => item.word_scheme && dataList.length < 10 && dataList.push(item))
    console.log(dataList, 'data')
}

</script>

<style scoped>
/*.container {*/
/*    padding: 20px;*/
/*}*/
.item {
    margin-bottom: 10px;
    font-size: 22px;
}
</style>