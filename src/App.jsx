import { BrowserRouter, Routes, Route } from 'react-router';
import Homepage from "./components/Homepage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:postId/edit" element={<UpdatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;