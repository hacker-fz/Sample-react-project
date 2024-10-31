import { createContext, useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editBody, setEditBody] = useState('');
    const { width } = useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

    const navigate = useNavigate();

    useEffect(() => {
        setPosts(data)
    }, [data]);

    useEffect(() => {
        const filterResult = posts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filterResult.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const date = format(new Date(), 'yyyy-MM-dd');
        const newPost = { id, title: postTitle, body: postBody, date };
        try {
            const response = await api.post('/posts', newPost);
            setPosts([...posts, response.data]);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEdit = async (id) => {
        const date = format(new Date(), 'yyyy-MM-dd');
        const updatedPost = { id, title: editTitle, body: editBody, date };
        try {
            const response = await api.put(`posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? response.data : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <DataContext.Provider value={{
            width, search, setSearch, posts, handleDelete, handleEdit, handleSubmit, editTitle, editBody, setEditTitle, setEditBody, postTitle, postBody, setPostTitle, setPostBody, setSearchResults, searchResults



        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
