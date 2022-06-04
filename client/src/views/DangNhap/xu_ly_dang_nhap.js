
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
    <div className="container">
      
    </div>
  );
}


export default App;