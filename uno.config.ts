// eslint-disable-next-line no-restricted-imports
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-x-center', 'flex justify-center'],
    ['flex-y-center', 'flex items-center'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
