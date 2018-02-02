import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const rootDiv = document.getElementById('root');

ReactDOM.render(<App />, rootDiv);
registerServiceWorker();
