import logo from './assets/logo.svg';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Link className="logo-image" to="/">
            <img src={logo} alt="DALL-E" className="logo" />
          </Link>
          <Link to="/createPost">
            <button className="create-button">Create</button>
          </Link>
        </header>
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
