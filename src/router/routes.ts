import { T } from "ramda";
import { RouteRecordRaw } from "vue-router";
import TestFooter from "../layout/TestFooter.vue";
import TestHeader from "../layout/TestHeader.vue";
import TestLeftDrawer from "../layout/TestLeftDrawer.vue";
import TestView from '../views/TestView.vue';

const routes: RouteRecordRaw[]= [
    {
        path: '/test/:id',
        components: {
            main: TestView,
            leftDrawer: TestLeftDrawer,
            rightDrawer: TestLeftDrawer,
            header: TestHeader,
            footer: TestFooter,
        },
        props: true,
        name: "Test",
        beforeEnter: T
    }
]

export default routes;