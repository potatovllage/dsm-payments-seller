import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header, withNavigation, withNeedAuth } from '../components';
import { NotFoundPage, BoothHomePage, BoothLoginPage, BoothPayPage } from '../pages';

const withLogin = (Component: FC) => withNeedAuth(withNavigation(Component));

export const BoothRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/booth/login' component={BoothLoginPage} />
        <Route path='/booth/payment' component={withLogin(BoothPayPage)} />
        <Route path='/booth/history' component={withLogin(BoothHomePage)} />
        <Route path='/booth' component={withLogin(BoothHomePage)} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
