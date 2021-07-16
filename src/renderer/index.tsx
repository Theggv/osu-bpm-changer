import { app } from 'electron';
import path from 'path';
import React from 'react';
import { render } from 'react-dom';

import App from './app/App';

render(<App />, document.getElementById('root'));
