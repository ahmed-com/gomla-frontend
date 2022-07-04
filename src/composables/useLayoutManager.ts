import { computed, ref } from "vue";
import { useDisplay } from 'vuetify';
import { useLayout } from "vuetify";

function initLayout() {
    const { mdAndUp } = useDisplay()
    
    isDesktop.value = mdAndUp.value;
    leftDrawer.value = mdAndUp.value;
    rightDrawer.value = mdAndUp.value;
    footerOrder.value = mdAndUp.value ? -1 : 0;
    contentStyle.value = mdAndUp.value ? {'padding-left': '0px','padding-right': '0px'} : undefined;
}


const leftDrawer = ref<boolean>(false);
const rightDrawer = ref<boolean>(false);
const headerSize = ref<number>(0);
const drawerSize = ref<number>(256);
const footerOrder = ref<-1 | 0>(0);
const isDesktop = ref<boolean>(false);
const contentStyle = ref()

const desktopDrawerStyle = computed(()=>({
    top: `${headerSize.value}px`,
    left: '0px',
    position: 'sticky',
    "align-self": 'flex-start',
    'margin-top': "0px",
    'margin-bottom': "0px",
    height: `calc(100vh - ${headerSize.value}px)`
}))


export default () => ({
    initLayout,
    leftDrawer,
    rightDrawer,
    isDesktop,
    headerSize,
    drawerSize,
    desktopDrawerStyle,
    contentStyle,
    footerOrder,
    calculateHeaderSize: (key: string)=> () => headerSize.value = useLayout().getLayoutItem(key)?.size,
    calculateDrawerSize: (key: string)=> () => drawerSize.value = useLayout().getLayoutItem(key)?.size,
    toggleLeftDrawer: ()=> leftDrawer.value = !leftDrawer.value,
    toggleRightDrawer: ()=> rightDrawer.value = !rightDrawer.value,
})