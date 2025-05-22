# TaskLogger

TaskLogger is a Vite-powered browser extension for managing and tracking your daily tasks efficiently. It features a modern React UI, persistent storage, and customizable filters.

## Features
- Add, edit, and delete tasks
- Filter tasks by status
- Light and dark mode support
- Persistent storage using browser APIs
- Responsive and user-friendly interface

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd tasklogger
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```

### Development
To start a development server with hot reload:
```sh
npm run dev
```

### Packaging as Extension
1. After building, the extension files will be in the `dist/` directory.
2. Load the `dist/` directory as an unpacked extension in your browser (see your browser's extension documentation).

## Project Structure
- `src/` - React components, hooks, and styles
- `background.js` - Background script for extension
- `manifest.json` - Extension manifest
- `popup.html` / `popup.jsx` - Popup UI
- `vite.config.mjs` - Vite configuration

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
