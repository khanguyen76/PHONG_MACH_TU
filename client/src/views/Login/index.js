import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React from "react";
import { Redirect } from 'react-router-dom'

function App() {
  const [data, setData] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState(" ");

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div>
      <div className="no-auth-form login-form ml-2 mr-2">
        <div className="s-line">
          <h1 className="mt-1">Đăng nhập</h1>
          <div className="logo">
              <img src="/images/logo.png" alt="" />
          </div>
        </div>

        <form className="mt-2" >
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input id="usename" type="text" name="username" required/>
          </div>

          <div className="input-container">
            <label>Mật khẩu</label>
            <input id="password" type="password" name="password" className="pwd-field" required 
             />
          </div>

          <div className="msg-height err-msg">
            <span>{errorMessage}</span>
          </div>

          <div className="s-line mt-2 mb-2 login-option">
            <label>
              <input type="checkbox" name="remember"/> Ghi nhớ đăng nhập
            </label>

            <a href="/auth/forgotPassword" className="forget-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn btn--primary mb-2 btn-login">ĐĂNG NHẬP</button>

          <span className="guide-line"> Bạn chưa có tài khoản? <div>&nbsp;</div><a href="" className="guide-link"> Hãy liên hệ Admin </a></span>
        </form>

      </div>
    </div>
  );
}


export default App;