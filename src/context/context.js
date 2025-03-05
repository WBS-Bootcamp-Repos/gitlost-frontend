import { createContext, useContext } from "react";

const PostsContext = createContext();

// Custom hook for using the posts context
const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePosts must be used within a PostsProvider");
    }
    return context;
};

export { PostsContext, usePosts };
