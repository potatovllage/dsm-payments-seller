import { useEffect } from 'react';

import { Html5QrcodeScanner, Html5QrcodeScannerConfig, Html5QrcodeFullConfig } from './@types/global';

import { MainRouter } from './routers/MainRouter';

function App() {
  useEffect(() => {
    window.makeHtml5QrcodeScanner = (
      elementId: string,
      config: Html5QrcodeScannerConfig | undefined,
      verbose: boolean | undefined
    ): Html5QrcodeScanner => {
      return new window.Html5QrcodeScanner(elementId, config, verbose);
    };

    window.makeHtml5QrCode = (elementId: string, configOrVerbosityFlag: boolean | Html5QrcodeFullConfig | undefined) => {
      return new window.Html5Qrcode(elementId, configOrVerbosityFlag);
    };
  }, []);

  return (
    <>
      <MainRouter />
    </>
  );
}

export { App };
