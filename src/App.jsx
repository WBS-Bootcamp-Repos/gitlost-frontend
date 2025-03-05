import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./MainLayout";
import Homepage from "./components/Homepage.jsx";
import PostDetails from "./components/PostDetails.jsx";
import CreatePost from "./components/CreatePost.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/posts/:postId" element={<PostDetails />} />
                    <Route path="/create" element={<CreatePost />} />
                    {/* <Route path="/posts/:postId/edit" element={<UpdatePost />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
