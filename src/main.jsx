import { render } from 'react-dom';
import history from './routerHistory';

// React UI core CSS
import '@react-ui-org/react-ui/src/lib/theme.scss';
import '@react-ui-org/react-ui/src/lib/foundation.scss';

// App and theme CSS
import './styles/theme.scss';

// React UI CSS helpers
import '@react-ui-org/react-ui/src/lib/helpers.scss';

import store from './store';
import app from './app';

render(
  app(store, history),
  document.getElementById('app'),
);
