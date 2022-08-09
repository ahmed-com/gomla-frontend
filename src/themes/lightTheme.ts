import { ThemeDefinition } from "vuetify/lib/framework.mjs";

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#E5E5E5',
        surface: '#E5E5E5',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        mark: '#FFFF00',
    },
    variables: {
        texture: 'repeating-linear-gradient(122deg, hsla(238,0%,76%,0.12) 0px,transparent 2px,hsla(238,0%,76%,0.12) 5px,transparent 8px,hsla(238,0%,76%,0.12) 11px),repeating-linear-gradient(218deg, hsla(238,0%,76%,0.12) 0px,transparent 2px,hsla(238,0%,76%,0.12) 5px,transparent 8px,hsla(238,0%,76%,0.12) 11px),repeating-linear-gradient(0deg, hsla(238,0%,76%,0.15) 0px, hsla(238,0%,76%,0.15) 0px,transparent 0px, transparent 1px,hsla(238,0%,76%,0.15) 1px, hsla(238,0%,76%,0.15) 4px,transparent 4px, transparent 5px,hsla(238,0%,76%,0.15) 5px, hsla(238,0%,76%,0.15) 8px),repeating-linear-gradient(90deg, hsla(238,0%,76%,0.15) 0px, hsla(238,0%,76%,0.15) 0px,transparent 0px, transparent 1px,hsla(238,0%,76%,0.15) 1px, hsla(238,0%,76%,0.15) 4px,transparent 4px, transparent 5px,hsla(238,0%,76%,0.15) 5px, hsla(238,0%,76%,0.15) 8px),linear-gradient(90deg, rgb(247,247,247),rgb(247,247,247))'
    }
}