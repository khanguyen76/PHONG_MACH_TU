
import React from "react";
import { Redirect } from 'react-router-dom'

function App() {
  const [data, setData] = React.useState(null);

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

        <form className="mt-2">
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input type="text" name="username" required/>
          </div>

          <div className="input-container">
            <label>Mật khẩu</label>
            <div className="pwd-display">
              <input type="password" name="password" className="pwd-field" required/>
              <span className="show-pwd-icon">b</span>
            </div>
          </div>

          <div className="s-line mt-2 mb-2">
            <label>
              <input type="checkbox" name="remember"/> Ghi nhớ đăng nhập
            </label>

            <a href="/auth/forgotPassword">Quên mật khẩu ?</a>
          </div>

          <button type="submit" className="btn btn--primary mb-2 btn-login">ĐĂNG NHẬP</button>

          <span className="guide-line">Bạn chưa có tài khoản ?<a href="" className="guide-link">Hãy liên hệ Admin </a></span>
        </form>

      </div>
    </div>
  );
}


export default App;