# vite-plugin-brotli

## Description
A Vite plugin that compresses your HTML, CSS, and JS files using Brotli compression.

## Installation
To install the plugin, run the following command:

```
npm install vite-plugin-brotli --save-dev
```

## Usage
To use the plugin in your Vite project, add it to your `vite.config.js` file:

```javascript
import { defineConfig } from 'vite'
import vitePluginBrotli from 'vite-plugin-brotli'

export default defineConfig({
  plugins: [vitePluginBrotli()]
})
```

## Options
You can customize the plugin's behavior by passing options:

```javascript
vitePluginBrotli({
  // Options go here
})
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the ISC License.
