// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import {createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import i18n from './i18n'
import { useI18n } from 'vue-i18n'

export default createVuetify({
  components,
  // directives,
  locale: createVueI18nAdapter({ i18n, useI18n})
})
