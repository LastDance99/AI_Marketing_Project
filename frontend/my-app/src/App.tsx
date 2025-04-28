import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm'; 

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/write" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="/sign" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
