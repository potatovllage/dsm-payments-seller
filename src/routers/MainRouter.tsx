import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { NotFoundPage } from '../pages/NotFoundPage';
import { QrCodeReaderPage } from '../pages/QrCodeReaderPage';

function MainRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Link to='qr-code-reader'>해해</Link>
        </Route>
        <Route path='/qr-code-reader' exact={true} component={QrCodeReaderPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export { MainRouter };
