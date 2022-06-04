
import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { Redirect } from "react-router-dom"
import { stateContext } from "../../contexts"
import { saveProfile } from '../../contexts/actions';
function App() {
  const dispatch = React.useContext(stateContext).dispatch;
  const { auth } = useContext(stateContext).state;
  const { register, handleSubmit, watch } = useForm();

  const handleLogin = (dataHookForm) => {
    console.log(dataHookForm);
  }

  return (
    <div>
      <div className="no-auth-form login-form ml-2 mr-2">
        <div className="s-line">
          <h1 className="mt-1">Đăng nhập</h1>
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-2">
          <div className="input-container">
            <label>Email</label>
            <input
              type="text"
              name="email"
              register=""
            />
          </div>

          <div className="input-container">
            <label>Mật khẩu</label>
            <input type="password" name="password" className="pwd-field" required />
          </div>

          <div className="s-line mt-2 mb-2">
            <label>
              <input type="checkbox" name="remember" /> Ghi nhớ đăng nhập
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