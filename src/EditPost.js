import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = () => {
    const { posts, handleEdit, editBody, editTitle, setEditTitle, setEditBody } = useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (
        <main className='NewPost'>
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            type="text"
                            value={editTitle}
                            required
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                            id='postTitle'
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            type="text"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            id='postBody'
                        />

                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            )}

            {!editTitle &&
                <p>post not Found</p>
            }
        </main>
    );
};

export default EditPost;
