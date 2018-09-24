import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo2.png';

import 'intro.js/introjs.css';

import { Steps, Hints } from 'intro.js-react';const { Content, Header, Footer } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: '.welcome',
        intro: 'Welcome to the order display web app tutorial.',
      },
      {
        element: '.tour_search',
        intro: 'You can search for different orders on the search panel.',
      },
      {
        element: '.tour_firstRow',
        intro: 'You can find elements by sidemark, status, price and others. ',
      },
      {
        element: '.tour_secondRow',
        intro: 'You can also find your orders by date.',
      },
      {
        element: '.tour_button_hideSearch',
        intro: 'If you wish to maximize the order display space, you can hide the search form by clicking this button. ',
      },
      {
        element: '.world',
        intro: 'Once the app loads or a search is performed, you will find the sales orders on this table. From here you can execute actions such as "Show" for order details and "Print" to print the order.',
      },
    ],
    hintsEnabled: false,
    hints: [
      {
      }
    ]  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
    //dispatch added to collapse the sidemenu
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: true,
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - `;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return 'orders';
    }
    return redirect;
  }
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      //localStorage.clear();
      localStorage.removeItem('userName');
      localStorage.removeItem('antd-pro-authority');
      localStorage.removeItem('userType');


      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  handleNoticeVisibleChange = (visible) => {
    /* if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    } */
  }
 onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
    //localStorage.setItem('tourFlag',true);
    //alert("Exit")
  };
  
  toggleSteps = () => {
    this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
    //
  };

  addStep = () => {
    const newStep = {
      element: '.alive',
      intro: 'Alive step',
    };

    this.setState(prevState => ({ steps: [...prevState.steps, newStep] }));
  };

  toggleHints = () => {
    this.setState(prevState => ({ hintsEnabled: !prevState.hintsEnabled }));
  };

  addHint = () => {
    const newHint = {
      element: '.alive',
      hint: 'Alive hint',
      hintPosition: 'middle-right',
    };

    this.setState(prevState => ({ hints: [...prevState.hints, newHint] }));
  };
  render() {
	const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          //collapsed={true}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={{ name: localStorage.getItem('userName'), notifyCount:10}}
             
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
			  onShowTour = {this.toggleSteps}
            />

            {/* <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            /> */}
          </Header>
          <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={()=>{this.onExit()}}
          onComplete={()=>{
            console.log(this);
            localStorage.setItem('tourFlag',true);
            }}

        />
        <Hints
          enabled={hintsEnabled}
          hints={hints}
        />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                )
              }
              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                )
              }
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              links={[{
                key: 'Pro Home',
                title: 'CogentIBS',
                href: 'http://pro.ant.design',
                blankTarget: true,
              }]}
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  eye: global.eye
}))(BasicLayout);
