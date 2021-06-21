import { useEffect, useState, Component } from 'react';

import QrReader from 'react-qr-reader';

import styled from '@emotion/styled';

import paymentSuccessSound from '../assets/sound/paymentSuccess.mp3';

// const Wrapper = styled.div<{
//   isScanning: boolean;
// }>`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   > div:first-of-type {
//     display: none;
//   }

//   > #qr-reader__scan_region {
//     > img {
//       width: 100px;
//     }
//   }

//   > #qr-reader__dashboard {
//     ${({ isScanning }) =>
//       isScanning &&
//       css`
//         position: fixed;
//       `}
//     bottom: 0;
//     z-index: 0;
//     height: 60px;
//     display: flex;
//     align-items: center;
//     background-color: ${({ isScanning }) => (isScanning ? '#00c250' : '#ffffff')};
//   }

//   #qr-reader__dashboard_section_csr {
//     > div {
//       > button {
//         border-radius: 4px;
//         border: none;
//         border: 1px solid black;
//         padding: 10px;
//       }
//     }

//     > span {
//       &:first-of-type {
//         > select {
//           > option {
//           }
//         }
//       }

//       &:last-of-type {
//         > button {
//           border: 1px solid black;
//           padding: 10px;
//         }
//       }
//     }
//   }

//   #qr-reader__dashboard_section {
//     > div:last-of-type {
//       display: none;
//     }
//   }
// `;

// function QrCodeReaderPage() {
//   const [isScanning, setIsScanning] = useState<boolean>(false);

//   useEffect(() => {
//     const targetNode = document.getElementById('qr-reader');

//     if (!targetNode) {
//       throw new Error('qr-reader 못 찾음.');
//     }

//     const config = { attributes: true, childList: true, subtree: true };

//     const callback = function (mutationsList: any) {
//       for (const mutation of mutationsList) {
//         if (mutation.target.id === 'qr-reader__dashboard_section_csr') {
//           if (mutation.addedNodes?.length) {
//             if (mutation.addedNodes.length === 1 && mutation.addedNodes[0].innerHTML.indexOf('<button>Start Scanning') !== -1) {
//               const cameraExplainElement = document.querySelector('#qr-reader__dashboard_section_csr > span');

//               if (!cameraExplainElement) {
//                 throw new Error('카메라 설명 엘리먼트를 찾지 못함.');
//               }

//               const element = cameraExplainElement.children[0];

//               cameraExplainElement.innerHTML = '';
//               cameraExplainElement.appendChild(element);

//               const [startButtonElement, stopButtonElement] = Array.from(
//                 document.querySelectorAll<HTMLButtonElement>('#qr-reader__dashboard_section_csr > span:last-child > button')
//               );

//               if (!startButtonElement || !stopButtonElement) {
//                 throw new Error('시작, 멈춤 버튼 이벤트 핸들러 등록 실패.');
//               }

//               startButtonElement.innerText = '시작';
//               startButtonElement.addEventListener('click', () => {
//                 setIsScanning(true);
//               });

//               stopButtonElement.innerText = '멈춤';
//               stopButtonElement.addEventListener('click', () => {
//                 setIsScanning(false);
//               });
//             }
//           }
//         } else if (mutation.target.id === 'qr-reader__scan_region') {
//           const qrCodeScanWrapperElement = document.querySelector('#qr-reader__scan_region');

//           if (qrCodeScanWrapperElement) {
//             console.log(qrCodeScanWrapperElement.children[0]?.tagName);
//             if (qrCodeScanWrapperElement.children[0]?.tagName === 'VIDEO') {
//               if (
//                 qrCodeScanWrapperElement.getAttribute('style') !==
//                 'width: 100%; min-height: 100px; text-align: center; position: absolute; top: 0;'
//               ) {
//                 qrCodeScanWrapperElement.setAttribute(
//                   'style',
//                   'width: 100%; min-height: 100px; text-align: center; position: absolute; top: 0;'
//                 );
//               }
//             } else if (qrCodeScanWrapperElement.children[0]?.tagName === 'BR') {
//               if (
//                 qrCodeScanWrapperElement.getAttribute('style') ===
//                 'width: 100%; min-height: 100px; text-align: center; position: absolute; top: 50%;'
//               ) {
//                 qrCodeScanWrapperElement.setAttribute(
//                   'style',
//                   'width: 100%; min-height: 100px; text-align: center; position: relative; top: 50%;'
//                 );
//               }
//             }
//           }
//         }
//       }
//     };

//     // Create an observer instance linked to the callback function
//     const observer = new MutationObserver(callback);

//     // Start observing the target node for configured mutations
//     observer.observe(targetNode, config);

//     // Later, you can stop observing

//     setTimeout(() => {
//       const onScanSuccess = (message: string) => {
//         console.log('onScanSuccess:', message);
//       };

//       const html5QrcodeScanner = window.makeHtml5QrcodeScanner('qr-reader', {
//         fps: 10,
//         qrbox: 250,
//       });

//       // html5QrcodeScanner;

//       html5QrcodeScanner.render(onScanSuccess);

//       const qrCodeElements = document.querySelectorAll('#qr-reader > div');

//       (document.querySelector('#qr-reader__dashboard_section_csr > div > button') as HTMLButtonElement).innerText = '카메라 권한 요청';
//     }, 0);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return <>{/* <Wrapper id='qr-reader' isScanning={isScanning}></Wrapper> */}</>;
// }

class Test extends Component {
  state = {
    result: 'No result',
  };

  handleScan = (data: any) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err: any) => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <QrReader delay={300} onError={this.handleError} onScan={this.handleScan} style={{ width: '100%' }} facingMode='environment' />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

type WProp = {
  deviceSize: {
    width: number;
    height: number;
  };
  isScanSuccess: boolean;
};

const W = styled.div<WProp>`
  background-color: rgba(0, 0, 0, 40%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;

  > .qr-code-reader {
    @media screen and (orientation: portrait) {
      width: ${({ deviceSize: { width } }) => width}px;
      height: ${({ deviceSize: { height } }) => height}px;
    }

    @media screen and (orientation: landscape) {
      width: ${({ deviceSize: { width } }) => width - 60}px;
      height: ${({ deviceSize: { height } }) => height - 60}px;
    }

    > section > div {
      box-shadow: inset ${({ isScanSuccess }) => (isScanSuccess ? '0 0 0 5px rgba(0, 255, 0, 50%)' : '0 0 0 5px rgba(255, 0, 0, 50%)')} !important;
    }
  }

  > footer {
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #00c250;
    display: flex;
    align-items: center;
    cursor: pointer;

    > p {
      width: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 24px;
    }
  }

  > .modal {
    z-index: 1;
    position: absolute;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 360px;
    padding: 24px;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > p {
      margin-top: 20px;
      margin-bottom: 50px;
    }

    > div {
      display: flex;
      justify-content: flex-end;

      > button {
        cursor: pointer;
        background: none;
        border: none;
        padding: 8px;
        color: #db808f;

        &:hover {
          background-color: rgba(0, 0, 0, 10%);
        }

        &:last-of-type {
          margin-left: 4px;
        }
      }
    }
  }
`;

function QrCodeReaderPage() {
  const [isSelfCameraMode, setIsSelfCameraMode] = useState<boolean>(true);
  const [deviceSize, setDeviceSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isEnableScan, setIsEnableScan] = useState<boolean>(true);

  useEffect(() => {
    const resizeHandler = () => {
      setDeviceSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const [isPaymentAgreeModal, setIsPaymentAgreeModal] = useState<boolean>(false);

  return (
    <W deviceSize={deviceSize} isScanSuccess={isScanSuccess}>
      <QrReader
        className='qr-code-reader'
        delay={1000}
        onError={() => {}}
        onScan={(data) => {
          console.log(data);
          if (isEnableScan && data) {
            setIsEnableScan(false);
            setIsScanSuccess(true);
            setIsPaymentAgreeModal(true);
            setTimeout(() => {
              setIsScanSuccess(false);
            }, 1000);
          }
        }}
        facingMode={isSelfCameraMode ? 'user' : 'environment'}
      />
      <footer
        onClick={() => {
          setIsSelfCameraMode((prev) => !prev);
        }}
      >
        <p>카메라 전환</p>
      </footer>
      {isPaymentAgreeModal && (
        <div className='modal'>
          <h4>라면 1개</h4>
          <p>5000원이 결제됩니다. 정말 결제하시겠습니까?</p>
          <div>
            <button
              onClick={() => {
                setIsPaymentAgreeModal(false);
                setIsEnableScan(true);
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                const audio = new Audio(paymentSuccessSound);
                audio.play();
                setIsPaymentAgreeModal(false);
                setIsEnableScan(true);
              }}
            >
              결제
            </button>
          </div>
        </div>
      )}
    </W>
  );
}

export { QrCodeReaderPage };
