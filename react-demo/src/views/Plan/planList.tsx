import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getPlanListAction } from '@src/store/actions/plan';
import * as planApi from '@src/api/plan';
import './style.scss';

interface PlanItem {
  readonly _id: string;
  readonly title: string;
  readonly time: number;
  readonly desc: string;
}

const PlanList: React.FC<{}> = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const routerHistory = useHistory();

  useEffect(() => {
    (async () => {
      const planList: any = await planApi.getPlanList({});
      // dispatch(getPlanListAction({planList}));
      setList(planList)
    })();
  }, []);

  //跳转到详情页
  const goDetail = (id: string) => {
    routerHistory.push({
      pathname: '/planDetail',
      state: {
        id: id
      }
    });
  }

  let getList = (list: Array<PlanItem>) => {
    return list.map(item => {
      return (
        <li className="item" onClick={() => goDetail(item._id)}>
          <div className="p1">
            <div className="item-title">{item.title}</div>
            <div className="item-time">{item.time}</div>
          </div>
          <div className="p2">{item.desc}</div>
        </li>
      )
    })
  }

  return (
    <div className="planList">
      <ul>
        {getList(list)}
      </ul>
    </div>
  )
}

export default PlanList;