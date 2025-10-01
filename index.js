import buffer from 'node:buffer'
import zlib from 'node:zlib'

export default function vitePluginBrotli() {
  const threshold = 4096 // 4kb

  return {
    name: 'vite-plugin-brotli',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'asset' && file.source && isCompressible(fileName)) {
          const fileSize = buffer.Buffer.byteLength(file.source)
          if (fileSize > threshold) {
            const compressed = compress(file.source)
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

function compress(source) {
  return zlib.brotliCompressSync(source)
}

function isCompressible(fileName) {
  return ['.html', '.css', '.js'].some(ext => fileName.endsWith(ext))
}
