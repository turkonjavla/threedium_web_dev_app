import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import { configureStore } from './app/store/configureStore';
const store = configureStore();

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ReduxToastr
          timeOut={2000}
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          preventDuplicates
        />
        <App />
      </Router>
    </Provider>,
    rootElement
  )
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render();
serviceWorker.unregister();
