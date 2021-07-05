import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header, SocketConnectionCondition, withNavigation, withNeedAuth } from './components';
import { BoothHistoryPage, BoothLoginPage, BoothHomePage, BoothPayPage } from './pages';

const withLogin = (Component: FC) => withNeedAuth(withNavigation(Component));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SocketConnectionCondition />
      <Switch>
        <Route path='/login' component={BoothLoginPage} />
        <Route path='/payment' component={withLogin(BoothPayPage)} />
        <Route path='/history' component={withLogin(BoothHistoryPage)} />
        <Route path='/' component={withLogin(BoothHomePage)} />
      </Switch>
    </BrowserRouter>
  );
}

export { App };
