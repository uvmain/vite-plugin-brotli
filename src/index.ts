import type { Plugin } from 'vite'
import { Buffer } from 'node:buffer'
import { brotliCompressSync } from 'node:zlib'

export interface Options {
  /**
   * Files larger than this threshold will be compressed. Unit is bytes.
   * @default 4096
   */
  threshold?: number
}

export default function vitePluginBrotli(options: Options = {}): Plugin {
  const { threshold = 4096 } = options

  return {
    name: 'vite-plugin-brotli',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        // handle html and css assets
        if (
          file.type === 'asset'
          && file.source
          && isCompressible(fileName)
        ) {
          const fileSize = Buffer.byteLength(file.source as string | Buffer)
          if (fileSize > threshold) {
            const compressed = compress(file.source as string | Buffer)
            this.emitFile({
              type: 'asset',
              fileName: `${fileName}.br`,
              source: compressed,
            })
          }
        }
        // handle js chunks
        if (
          file.type === 'chunk'
          && isCompressible(fileName)
          && file.code
        ) {
          const fileSize = Buffer.byteLength(file.code)
          if (fileSize > threshold) {
            const compressed = compress(file.code)
            this.emitFile({
              type: 'asset',
              fileName: `${fileName}.br`,
              source: compressed,
            })
          }
        }
      }
    },
  }
}

function compress(source: string | Buffer): Buffer {
  return brotliCompressSync(source)
}

function isCompressible(fileName: string): boolean {
  return ['.html', '.css', '.js'].some(ext => fileName.endsWith(ext))
}
