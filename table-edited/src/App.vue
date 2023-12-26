<template>
    <my-table
        :data="tableData"
        @submit="editData"
    />
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import MyTable from './my-ui/MyTable/MyTable.vue';
import { editDataArgs, tableData } from './interface/my-table';

const tableData: Ref<tableData> = ref({
    tHead: [
        {
            key: 'id',
            text: '学号',
            editable: false
        },
        {
            key: 'name',
            text: '姓名',
            editable: false
        },
        {
            key: 'age',
            text: '年龄',
            editable: false
        },
        {
            key: 'chinese',
            text: '语文',
            editable: true
        },
        {
            key: 'math',
            text: '数学',
            editable: true
        },
        {
            key: 'english',
            text: '英语',
            editable: true
        },
    ],
    tBody: [
        {
            id: 1,
            name: '张三',
            age: 16,
            chinese: 121,
            math: 132,
            english: 138
        },
        {
            id: 2,
            name: '李四',
            age: 18,
            chinese: 100,
            math: 120,
            english: 131
        },
        {
            id: 3,
            name: '王五',
            age: 19,
            chinese: 98,
            math: 150,
            english: 67
        }
    ]
});

/**
 *
 * @param index 第几项
 * @param key   是哪个值
 * @param value 新值
 * @param text  这个值的tHead的text
 * @param removeInput
 */
const editData = ({index, key, value, text}: editDataArgs, removeInput: Function) => {
    if (tableData.value.tBody[index][key] != value) {
        const cfm: boolean = window.confirm(`你要确定将数据下标为[${ index }]项的${ text }的内容修改为${ value }吗`);
        if (cfm) {
            tableData.value.tBody.forEach((item: any, idx: any) => {
                idx === index && (item[key] = value);
            });
        } else {
            removeInput();
        }
    }
};

</script>

<style scoped lang="scss">

</style>