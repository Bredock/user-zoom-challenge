import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import List from './pages/List';
import Details from './pages/Details';
import Header from './components/Header';
import Alerts from './components/Alerts';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { setAlert } from './actions/alert';

function App() {

  useEffect(() => {
    store.dispatch(setAlert('Testing alerts', 'warning'));
    store.dispatch(setAlert('Testing alerts', 'danger'));
    store.dispatch(setAlert('Testing alerts', 'success'));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          {/* <header className='App-header'>
            <p>UserZoom Fullstack JS Challenge</p>
          </header> */}
          <Header />
          <div className='container'>
            <Alerts />
            <Switch>
              <Route exact path='/' component={List} />
              <Route exact path='/details' component={Details} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
