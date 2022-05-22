
import React from "react";
import { Redirect } from 'react-router-dom'

function App() {
  const [data, setData] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <div className="no-auth-form forgot-pwd-form ml-2 mr-2">
        <div className="s-line">
          <div>
          <h1 className="mt-1 mb-1">Quên mật khẩu</h1>
          <span>Nhập địa chỉ Email của tài khoản để tạo lại mật khẩu mới</span>
          </div>
          <div className="logo">
              <img src="/images/logo.png" alt="" />
          </div>
        </div>

        <form className="mt-2">
          <div className="input-container">
            <label>Email</label>
            <input type="text" name="email" required/>
          </div>

          <button type="submit" className="btn btn--primary mt-2 mb-2 btn-login">GỬI EMAIL</button>

          <div className="guide-line">
            <span>Bạn đã có tài khoản ? <a href="/auth/login" className="guide-link">Đăng nhập</a></span>
          </div>
        </form>

      </div>
    </div>
  );
}


export default App;