import React from "react";
import { Redirect } from 'react-router-dom'

function App() {
  const [data, setData] = React.useState(null);

  const [message, setMessage] = React.useState("");
  const [messageColor, setMessageColor] = React.useState("success-msg");

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  const checkEmailSendSuccess = (event) => {
    event.preventDefault();

    var email = document.getElementById("email").value;
    
    if (email !== "123123") {
      setMessageColor("err-msg");
    } else {
      setMessageColor("success-msg");
    }
  };

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
            <input id="email" type="text" name="email" required/>
          </div>

          <div className={'msg-height ' + messageColor}>
            <span>{message}</span>
          </div>

          <button type="submit" className="btn btn--primary mt-2 mb-2 btn-login" onClick={checkEmailSendSuccess}>GỬI EMAIL</button>

          <div className="guide-line">
            <span>Trở về trang <a href="/auth/login" className="guide-link">Đăng nhập</a></span>
          </div>
        </form>

      </div>
    </div>
  );
}
export default App;