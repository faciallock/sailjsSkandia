import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'c',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    //const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          //type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  getUrlParam=(param)=>{
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }

  }

  componentDidMount() {
    console.log(this.getUrlParam("token"));
    let token= this.getUrlParam("token");
    if(token){
      this.props.dispatch({
        type: 'login/dealerSSO',
        payload: {
            payload:{
             token: token
            }
        },
    });
    }
    
  }
  componentWillMount = ()=> {
    UserName.defaultValue="Test";
   // alert("")
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    console.log(submitting);
    console.log(login);
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="c" tab="User Account">
            {
              login.status === 'error' &&
              login.type === 'c' &&
              !login.submitting &&
              this.renderMessage('Wrong account or password（admin/888888）')
            }
            <UserName name="userId" placeholder="User" />
            <Password name="password" placeholder="Password" />
          </Tab>
         
          <div>
            {/* <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>Remember</Checkbox>
            <a style={{ float: 'right' }} href="">Forgot Password?</a> */}
          </div>
          {/* <Submit loading={submitting}>Login</Submit> */}
          <Submit loading={false} className={styles.login}>Login</Submit>
          <div className={styles.other}>
            {/* Other login methods */}
            {/* <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" /> */}
            {/* <Link className={styles.register} to="/user/login">Sign Up</Link> */}
          </div>
        </Login>
      </div>
    );
  }
}
