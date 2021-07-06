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
        <Route exact path='/login' component={BoothLoginPage} />
        <Route exact path='/payment' component={withLogin(BoothPayPage)} />
        <Route exact path='/history' component={withLogin(BoothHistoryPage)} />
        <Route exact path='/' component={withLogin(BoothHomePage)} />
        <Route
          component={() => {
            const daBoindaHaetje = 'https://www.youtube.com/watch?v=DDYJysAYVWo';

            window.location.href = daBoindaHaetje;

            return null;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export { App };
