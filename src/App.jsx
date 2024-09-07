import { ContextProviders } from "./hocs/ContextProviders";
import { Routers } from "./hocs/Routers";
import "./styles/App.css";

function App() {
  return (
    <>
      <ContextProviders>
        <Routers></Routers>
      </ContextProviders>
    </>
  );
}

export default App;
