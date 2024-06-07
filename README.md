# Todo List Micro Frontend

## Overview

This project is a React Micro Frontend (MFE) Todo List application. It demonstrates the ability to create a standalone React component that can be integrated into various host applications. The application includes features for creating todos, marking them as completed or incomplete, and persisting them using `localStorage`.

## Features

- **Todo Creation:** Users can input a new todo task description and add it to the list.
- **Todo Status:** Tasks have a checkbox to mark them as completed or incomplete, with visual distinction for completed items.
- **Todo Persistence:** Todos are saved using the browser’s `localStorage` to persist across page refreshes and sessions.
- **Filtering:** Provides buttons to filter the list: “All”, “Active”, “Completed”.

## Technical Details

- **TypeScript:** The project is written in TypeScript for type safety and maintainability.
- **Testing:** Includes unit tests with meaningful coverage for core component logic using React Testing Library and Jest.
- **State Management:** Uses React’s built-in state management.
- **Edge Cases:** Handles `localStorage` unavailability and invalid input gracefully.

# Packaging

-Create webpack.config.js file in the root directory
-Add the following code to the file:

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
    entry: './src/index.tsx', // Punto de entrada principal de tu aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Carpeta de salida para los archivos construidos
        filename: 'bundle.js', // Nombre del archivo empaquetado
        publicPath: '/', // Ruta pública para todos los recursos en la aplicación
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // Extensiones que Webpack resolverá
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/, // Aplícalo a todos los archivos .ts y .tsx
            use: 'ts-loader', // Usa ts-loader para compilar TypeScript
            exclude: /node_modules/, // Excluye la carpeta node_modules
        },
        {
            test: /\.css$/, // Aplícalo a todos los archivos .css
            use: ['style-loader', 'css-loader'], // Usa style-loader y css-loader para manejar CSS
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './public/index.html', // Plantilla HTML personalizada
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Carpeta para el servidor de desarrollo
        compress: true, // Habilita la compresión gzip
        port: 3000, // Puerto del servidor de desarrollo
        historyApiFallback: true, // Redirige todas las solicitudes a index.html
    },
    };

-Update package.json file with the following scripts:
{
"name": "todo-mfe",
"version": "1.0.0",
"scripts": {
"start": "webpack serve --mode development",
"build": "webpack --mode production",
"test": "react-scripts test"
},
"dependencies": {
"react": "^17.0.2",
"react-dom": "^17.0.2",
"uuid": "^8.3.2"
},
"devDependencies": {
"@testing-library/jest-dom": "^5.14.1",
"@testing-library/react": "^11.2.7",
"@testing-library/user-event": "^12.8.3",
"@types/jest": "^26.0.24",
"@types/node": "^15.12.2",
"@types/react": "^17.0.11",
"@types/react-dom": "^17.0.8",
"@types/uuid": "^8.3.0",
"css-loader": "^5.2.6",
"html-webpack-plugin": "^5.3.1",
"jest": "^27.0.1",
"style-loader": "^2.0.0",
"ts-loader": "^9.2.3",
"typescript": "^4.3.2",
"webpack": "^5.37.1",
"webpack-cli": "^4.7.0",
"webpack-dev-server": "^3.11.2"
}
}

-Update index.tsx file with the following code:
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

    const render = (containerId: string, props: any) => {
    ReactDOM.render(<App {...props} />, document.getElementById(containerId));
    };

    export { render };

-Add the bundle file into your host application

<script src="path/to/your/mfe/bundle.js"></script>

-Render the component in the desired container

<div id="todo-mfe-container"></div>
<script>
render('todo-mfe-container', { initialTodos: [{ id: '1', task: 'Host Todo', completed: false }] });
</script>

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/todo-mfe.git
   cd todo-mfe
   ```
