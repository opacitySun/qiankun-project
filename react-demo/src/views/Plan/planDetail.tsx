import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as planApi from '@src/api/plan';
import { UtilsService } from '@src/utils/utils';
import './style.scss';

const utils = new UtilsService();

type Info = {
  readonly _id: string;
  readonly title: string;
  readonly time: number;
  readonly desc: string;
  readonly article: string;
}

const PlanDetail: React.FC<{}> = () => {
  const { state: { id } } = useLocation<any>();
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    (async () => {
      const dataInfo: any = await planApi.getPlanById({
        params: {id: id}
      });
      setInfo(dataInfo)
    })();
  }, []);

  return (
    <div className="planDetail">
      <h1>{info?.title}</h1>
      <p className="time">{utils.dateToStringFormat(new Date(info?.time || ''))}</p>
      <article dangerouslySetInnerHTML={{__html: info?.article || ''}}></article>
    </div>
  )
}

export default PlanDetail;