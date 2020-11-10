<template>
  <iframe
    v-if="url"
    :src="url"
    :style="style"
    title="Vue Hooks Form Demo"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</template>

<script>
import { getParameters } from 'codesandbox/lib/api/define'

export default {
  props: ['path', 'height', 'defaultUrl'],
  data() {
    const { height } = this
    return {
      url: '',
      style: {
        width: '100%',
        height: height || '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      },
    }
  },
  mounted() {
    if (this.defaultUrl) {
      this.url = this.defaultUrl
      return
    }
    if (this.path) {
      const code = require(`!!raw-loader!../demos/${this.path}`).default
      const html = require('!!raw-loader!./index.html').default
      const main = require('!!raw-loader!./main.js').default
      const css = require('!!raw-loader!./style.css').default
      const packageJson = require('./package.json.js')
      const parameters = getParameters({
        files: {
          'src/App.vue': {
            content: code,
          },
          'src/style.css': {
            content: css,
          },
          'index.html': {
            content: html,
          },
          'src/main.js': {
            content: main,
          },
          'package.json': {
            content: packageJson,
          },
        },
      })
      const sandboxOptions = {
        autoresize: 1,
        theme: 'dark',
        module: '/src/App.vue',
        hidenavigation: 1,
        fontsize: 14,
        view: 'split',
      }
      const createQueryString = (data) => Object.keys(data)
        .map((key) => {
          let val = data[key]
          if (typeof val === 'object') val = createQueryString(val)
          return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
        })
        .join('&')
      const query = createQueryString({
        parameters,
        query: sandboxOptions,
        embed: 1,
      })
      this.url = `https://codesandbox.io/api/v1/sandboxes/define?${query}`
    }
  },
}
</script>

<style>
</style>
