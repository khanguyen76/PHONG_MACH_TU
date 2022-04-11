
import React from "react";
import BenhNhanApi from "../../api/BenhNhanApi";
import Button from '@material-ui/core/Button';

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

function App() {
  const [data, setData] = React.useState(null);

  const client = new ApolloClient({
    url: '/graphql',
    cache: new InMemoryCache()
  })

  React.useEffect(() => {
    
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