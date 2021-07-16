import path from 'path';
import React from 'react';
import { render } from 'react-dom';
import App from './app/App';

(window as any).__static = path.join(__dirname, '../../static');

render(<App />, document.getElementById('root'));
