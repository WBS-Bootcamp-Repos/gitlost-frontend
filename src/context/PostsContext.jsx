import React, { createContext, useState, useContext, useEffect } from 'react';
import { postService } from '../services/posts.api.js';

// Create a context for posts data and operations
const PostsContext = createContext();

// Provider component that wraps your app and makes posts data available
export const PostsProvider = ({ children }) => {
  // State for storing posts, loading status, and errors
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get a single post by ID
  const getPost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getPostById(id);
      return data;
    } catch (err) {
      setError(`Failed to fetch post with ID ${id}`);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await postService.createPost(postData);
      setPosts([newPost, ...posts]); // Add to the beginning of the array
      return newPost;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to create post. Please try again.');
      }
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing post
  const updatePost = async (id, postData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await postService.updatePost(id, postData);
      
      // Update the post in the local state
      setPosts(posts.map(post => 
        post.id === parseInt(id) ? updatedPost : post
      ));
      
      return updatedPost;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(`Failed to update post with ID ${id}`);
      }
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await postService.deletePost(id);
      
      // Remove the post from the local state
      setPosts(posts.filter(post => post.id !== parseInt(id)));
      
      return true;
    } catch (err) {
      setError(`Failed to delete post with ID ${id}`);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Value object containing state and functions to be provided to consumers
  const contextValue = {
    posts,
    loading,
    error,
    fetchPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook for using the posts context
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};