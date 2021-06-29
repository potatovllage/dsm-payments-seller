import { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Header, SocketConnectionCondition, withNavigation, withNeedAuth } from '../components';
import { BoothHistoryPage, BoothLoginPage, BoothHomePage, BoothPayPage } from '../pages';

const withLogin = (Component: FC) => withNeedAuth(withNavigation(Component));

export const BoothRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <SocketConnectionCondition />
      <Switch>
        <Route path='/booth/login' component={BoothLoginPage} />
        <Route path='/booth/payment' component={withLogin(BoothPayPage)} />
        <Route path='/booth/history' component={withLogin(BoothHistoryPage)} />
        <Redirect to='/booth' path='/booth/*' />
        <Route path='/booth' component={withLogin(BoothHomePage)} />
      </Switch>
    </BrowserRouter>
  );
};
