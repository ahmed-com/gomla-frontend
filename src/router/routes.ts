import { T } from 'ramda';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import TestFooter from '../layout/TestFooter.vue';
import TestHeader from '../layout/TestHeader.vue';
import TestLeftDrawer from '../layout/TestLeftDrawer.vue';
import Chat from '../views/DealView/Chat.vue';
import DealView from '../views/DealView/Index.vue';
import Dashboard from '../views/Dashboard.vue';
import Info from '../views/DealView/Info.vue';
import ifAuth from './ifAuth.guard'
import ifNotAuth from './ifNotAuth.guard'

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
		meta: {
			hasLeftDrawer: true,
			hasRightDrawer: false
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
		meta: {
			hasRightDrawer: true,
			hasLeftDrawer: false
		}
	}
];

export default routes;
