import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
    const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext)
    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Title"
                    required
                    id='postTitle'
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    type="text"
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    required
                    id='postBody'
                />

                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}

export default NewPost