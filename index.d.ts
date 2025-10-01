import type { Plugin } from 'vite'

interface Options {
  /**
   * Files larger than this threshold will be compressed. Unit is bytes.
   * @default 4096
   */
  threshold?: number
}

declare function vitePluginBrotli(options?: Options): Plugin

export { vitePluginBrotli as default }
