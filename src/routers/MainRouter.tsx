import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import { BoothRouter } from './BoothRouter';

import { NotFoundPage, QRCodeReaderPage } from '../pages';

function MainRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Link to='/qr-code-reader'>해해</Link>
          <br />
          <Link to='/booth'>부스</Link>
        </Route>
        <Route path='/qr-code-reader' component={QRCodeReaderPage} />
        <Route path='/booth' component={BoothRouter} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect to='/404' path='*' />
      </Switch>
    </BrowserRouter>
  );
}

export { MainRouter };
