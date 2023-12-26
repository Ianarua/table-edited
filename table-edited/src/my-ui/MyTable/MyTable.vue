<template>
    <table border="1" class="my-table">
        <thead>
        <tr>
            <th
                v-for="info of tHead"
                :key="info.key"
            >
                {{ info.text }}
            </th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="(item, index) of tBody"
            :key="item.id"
        >
            <td
                v-for="(value, key) in item"
                :key="key"
                @click.stop="showEditInput($event, key, index)"
            >
                {{ value }}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { createApp, reactive, toRefs } from 'vue';
import EditInput from './EditInput.vue';
import { stateType } from '../../interface/my-table';

let editInputApp: any = null;

const state: stateType = reactive({
    key: '',
    value: '',
    index: -1,
    text: ''
});

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            tHead: [],
            tBody: []
        })
    }
});

const emit: any = defineEmits(['submit']);

const {tHead, tBody} = toRefs(props.data);

const showEditInput = (event: any, key: string, index: number) => {
    console.log('event:', event, 'key:', key, 'index:', index);
    editInputApp && removeEditInputApp();
    if (!checkEditable(key)) return;

    const target = event.target;
    const oFrag = document.createDocumentFragment();

    editInputApp = createApp(EditInput, {
        value: target.textContent,
        setValue
    });

    if (editInputApp) {
        editInputApp.mount(oFrag);
        target.appendChild(oFrag);
        target.querySelector('.edit-input').select();
    }

    setData({index, key, text: findText(key), value: ''});
};

const setData = ({index, key, text, value = ''}: stateType) => {
    state.key = key;
    state.index = index;
    state.text = text;
    state.value = value;
};

const setValue = (value: number | string) => {
    state.value = value;
    emit('submit', {...state}, removeEditInputApp);
};

const findText = (key: string) => {
    const {text} = tHead.value.find((item: any) => item.key === key);
    return text;
};

const removeEditInputApp = () => {
    editInputApp && editInputApp.unmount();
    setData({
        index: -1,
        key: '',
        value: '',
        text: ''
    });
};

const checkEditable = (key: string) => {
    const {editable} = tHead.value.find((item: any) => item.key === key);
    return editable;
};

window.addEventListener('click', () => removeEditInputApp, false);

</script>

<style scoped lang="scss">
.my-table {
    width: 100%;
    border-collapse: collapse;
}

tr {
    height: 44px;

    td {
        position: relative;
        text-align: center;
        cursor: pointer;
    }
}
</style>