import { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';

const withNeedAuth = <Props extends {}>(Component: ComponentType<Props>) => {
  return (params: Props) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) throw new Error('Cannot find access token');

      return <Component {...params} />;
    } catch {
      return <Redirect to='/login' />;
    }
  };
};

export default withNeedAuth;
