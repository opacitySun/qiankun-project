import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Routers from './routes';

const BASE_NAME = (window as any).__POWERED_BY_QIANKUN__ ? "/micro/react" : "/";
const BasicRoute = () => (
  <Router basename={BASE_NAME}>
    <Switch>
        {
          Routers.map((item,index) => {
            if(item.path == '/'){
              return <Route key={index} path={item.path} exact component={item.component} />
            }else{
              return <Route key={index} path={item.path} component={item.component} />
            }
          })
        }
        <Redirect from="/*" to="/404" />
    </Switch>
  </Router>
);

export default BasicRoute;
