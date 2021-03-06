import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Redirect } from "react-router-dom"
// API
import { useQuery, useMutation } from "@apollo/client"
import { login } from '../../graphql-queries/TAI_KHOAN'
// Contexts
import { stateContext } from "../../contexts"
import { saveProfile } from '../../contexts/actions'

function App() {
  const history = useHistory();
  const dispatch = React.useContext(stateContext).dispatch;
  const { auth } = useContext(stateContext).state;
  const { register, handleSubmit, watch } = useForm();
  const [loginSystem] = useMutation(login)
  
  const handleLogin = async (dataHookForm) => {
    console.log(dataHookForm);
    let res = await loginSystem({variables:{
      email: dataHookForm.email,
      matKhau: dataHookForm.password
    }})
    let data = res.data.DANG_NHAP
    saveProfile({
      account: {
        accessToken: data.accessToken,
        profile: data.doc
      },
      dispatch
    })
    history.push('/')
  }

  return (
    <div className="no-auth-form login-form ml-2 mr-2">
      <div className="s-line">
        <h1 className="mt-1">Đăng nhập</h1>
        <div className="logo">
          <img src="/images/logo.png" alt="" />
        </div>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="mt-2" >
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            // autoComplete='off'
            {...register('email',{ required:true })}
          />
        </div>

        <div className="input-container">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="pwd-field"
            autoComplete='off'
            {...register('password',{ required:true })}
          />
        </div>

        <div className="s-line mt-2 mb-2 login-option">
          <label>
            <input type="checkbox" name="remember" defaultChecked={true} /><span> Ghi nhớ đăng nhập</span>
          </label>
          <a href="/auth/forgotPassword" className="forget-password">Quên mật khẩu?</a>
        </div>

        <button type="submit" className="btn btn--primary mb-2 btn-login">ĐĂNG NHẬP</button>

        <span className="guide-line"> Bạn chưa có tài khoản? <div>&nbsp;</div><a href="" className="guide-link"> Hãy liên hệ Admin </a></span>
      </form>

    </div>
  );
}

export default App;