<template>
  <div class="content-view">
      <textarea cols="30" rows="10" v-model="state.inputVal"></textarea>
  </div>
</template>
<script setup>
import { reactive, onMounted, computed, watch } from "vue";

const state = reactive({
    copyObject: {},
    inputVal: ''
});

watch(state.copyObject, (value) => {
    state.inputVal = JSON.stringify(value, null, 4)
})

onMounted(() => {
    let lastKeyPressTime = 0;
    let objectKeyIndex = 0;
    document.addEventListener('keydown', function(event) {
        // 按下键盘时触发的逻辑处理

        // 拷贝属性名
        if (event.key === 'c') {
            const currentTime = Date.now();
            if (currentTime - lastKeyPressTime <= 500) {
                // 在 500ms 内连续按两下 "C" 键的逻辑处理
                const selectedText = window.getSelection().toString();
                state.copyObject[selectedText] = ""
            }
            lastKeyPressTime = currentTime;
        }

        // 拷贝属性值
        if (event.key === 'v') {
            const currentTime = Date.now();
            if (currentTime - lastKeyPressTime <= 500) {
                // 在 500ms 内连续按两下 "v" 键的逻辑处理
                const selectedText = window.getSelection().toString();
                let arr = Object.keys(state.copyObject)
                for(let i = 0; i < arr.length; i++) {
                    if (i === objectKeyIndex) {
                        state.copyObject[arr[i]] = selectedText
                        objectKeyIndex++
                        break
                    }
                    if (i === arr.length - 1) {
                        objectKeyIndex = 0
                    }
                }

            }
            lastKeyPressTime = currentTime;
        }
    });
});

console.log(chrome, 'chrome')
const openDialog = () => {
  alert('openDialog')
}
</script>

<style>
.content-view {
  position: fixed;
  right: 100px;
  top: 100px;
  width: 200px;
  background-color: white;
  /*height: 40px;*/
  min-height: 50px;
  visibility: hidden;
}
/*.overlay {*/
/*  @apply fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50;*/
/*}*/

/*.popup {*/
/*  @apply absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72;*/
/*}*/
</style>
