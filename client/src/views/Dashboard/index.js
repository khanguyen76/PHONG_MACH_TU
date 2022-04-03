
import React from "react";
import BenhNhanApi from "../../api/BenhNhanApi";
import Button from '@material-ui/core/Button';
function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    BenhNhanApi.getAll({
      token: "121212",
      params:{
        page:1
      }
    }).then(res=>setData(res))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
        <p>{!data ? "Loading..." : JSON.stringify(data.doc)}</p>
        <Button variant="contained">Hello World</Button>
      </header>
    </div>
  );
}

export default App;