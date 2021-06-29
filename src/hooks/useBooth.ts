import { useRecoilState } from 'recoil';

import { useLoading } from './useLoading';

import { getBooth } from '../apis/booth';
import { boothState } from '../recoils/booth';

export const useBooth = () => {
  const [booth, setBooth] = useRecoilState(boothState);
  const { loading, startLoading, endLoading } = useLoading(false);

  const fetchBooth = async () => {
    startLoading();
    try {
      const { data } = await getBooth();

      setBooth(data);
    } catch (err) {
      alert('부스 정보 가져오기 실패');
    }
    endLoading();
  };

  return { booth, fetchBooth, loading } as const;
};
