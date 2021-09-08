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

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <div className='container main-wrapper'>
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
