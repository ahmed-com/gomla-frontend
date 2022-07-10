import { T } from 'ramda';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import TestFooter from '../layout/TestFooter.vue';
import TestHeader from '../layout/TestHeader.vue';
import TestLeftDrawer from '../layout/TestLeftDrawer.vue';
import Chat from '../views/DealView/Chat.vue';
import DealView from '../views/DealView/Index.vue';
import Info from '../views/DealView/Info.vue';
import TestViewVue from '../views/TestView.vue';

type FunctionMode = (to: RouteLocationNormalized) => Record<string, any>;
const extractSearchToProps: FunctionMode = (route) => ({
	term: route.query.term,
	lat: route.query.lat,
	lng: route.query.lng,
});

const routes: RouteRecordRaw[] = [
	{
		path: '/deals/:dealId',
		components: {
			main: DealView,
			leftDrawer: TestLeftDrawer,
			rightDrawer: TestLeftDrawer,
			header: TestHeader,
			footer: TestFooter,
		},
		children: [
			{
				path: '',
				name: 'Deal',
				component: Info,
				alias: 'info',
			},
			{
				path: 'discussion',
				component: Chat,
                name: 'DealDiscussion'
			},
		],
		props: {main: true, leftDrawer: true},
		beforeEnter: T,
	},

	{
		path: '/test',
		components: {
			main: TestViewVue,
			leftDrawer: TestLeftDrawer,
			rightDrawer: TestLeftDrawer,
			header: TestHeader,
			footer: TestFooter
		},
		props: {main: true, leftDrawer: true},
		beforeEnter: T
	}
];

export default routes;
