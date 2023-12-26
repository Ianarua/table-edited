import MyTable from './MyTable/MyTable.vue';

const components: any = {
    MyTable
};

export {
    MyTable
};

export default {
    install (app: any) {
        app.component('MyTable', MyTable);
        for (let c in components) {
            app.component(c, components[c]);
        }
    }
};