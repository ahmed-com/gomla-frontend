import { T } from 'ramda';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import TestFooter from '../layout/TestFooter.vue';
import TestHeader from '../layout/TestHeader.vue';
import TestLeftDrawer from '../layout/TestLeftDrawer.vue';
import ifAuth from './ifAuth.guard'
import ifNotAuth from './ifNotAuth.guard'
const Chat = ()=> import('../views/DealView/Chat.vue');
const DealView = ()=> import('../views/DealView/Index.vue');
const Dashboard = ()=> import('../views/Dashboard.vue');
const Info = ()=> import('../views/DealView/Info.vue');

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
		path: '/deals',
		alias: '/user',
		name: 'Dashboard',
		beforeEnter: ifAuth,
		components: {
			main: Dashboard,
			rightDrawer: TestLeftDrawer,
			header: TestHeader
		},
	},
];

export default routes;
