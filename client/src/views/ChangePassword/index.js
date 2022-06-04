
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


  const checkConfirmPwd = () => {
    var newPwd = document.getElementById("newPwd").value;
    var confirmPwd = document.getElementById("confirmPwd").value;

    if (newPwd !== confirmPwd) {
      setErrorMessage("New password doesn't match !");
    } else {
      setErrorMessage(" ");
    }
  };


  return (
    <div>

      <div className="no-auth-form change-pwd-form ml-2 mr-2">
        <div className="s-line">
          <div>
            <h1 className="mt-1 mb-1">Thay đổi mật khẩu</h1>
            <span>Cho Administrator@gmail.com</span>
          </div>
          <div className="logo">
              <img src="/images/logo.png" alt="" />
          </div>
        </div>

        <form className="mt-2">
          <div className="input-container">
            <label>Mật khẩu hiện tại</label>
            <input id="currentPwd" type="password" name="password" required/>
          </div>

          <div className="input-container">
            <label>Mật khẩu mới</label>
            <input id="newPwd" type="password" name="password" required/>
          </div>

          <div className="input-container">
            <label>Xác nhận mật khẩu</label>
            <input id="confirmPwd" type="password" name="password" onChange={checkConfirmPwd} required/>
          </div>

          <div className="mt-1 mb-1 msg-height err-msg">
            <span>{errorMessage}</span>
          </div>

          <button type="submit" className="btn btn--primary mt-2 mb-2 btn-login">THAY ĐỔI MẬT KHẨU</button>

          <span className="guide-line">Trở về  <a href="/" className="guide-link"> Trang chủ</a></span>
        </form>
      </div>
    </div>
  );
}


export default App;