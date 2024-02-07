import logo from './logo.svg';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChildrenList} from "./Components/ChildrenList/ChildrenList";
import {Container} from "@mui/material";

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
            <Container>
                <ChildrenList/>
            </Container>
        </div>
      </QueryClientProvider>
  );
}

export default App;
