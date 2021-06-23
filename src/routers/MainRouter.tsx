import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { BoothRouter } from './BoothRouter';

import { NotFoundPage } from '../pages/NotFoundPage';
import { QrCodeReaderPage } from '../pages/QrCodeReaderPage';

function MainRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Link to='/qr-code-reader'>해해</Link>
          <br />
          <Link to='/booth'>부스</Link>
        </Route>
        <Route path='/qr-code-reader' exact={true} component={QrCodeReaderPage} />
        <Route path='/booth' component={BoothRouter} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export { MainRouter };
