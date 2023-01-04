import axios from 'axios'
import {setUser} from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://itransition-final-server.onrender.com/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const deleteuser = async (id) => {
    try {
        await axios.delete(`https://itransition-final-server.onrender.com/api/auth/delete/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateStatus = async (id) => {
    try {
        await axios.patch(`https://itransition-final-server.onrender.com/api/auth/user/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateRole = async (id) => {
    try {
        await axios.patch(`https://itransition-final-server.onrender.com/api/auth/userrole/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}



// post recomendation

export const sendPost = async (formData) => {
    try {
        const response = await axios.post(`https://itransition-final-server.onrender.com/api/auth/post`, formData)
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(`https://itransition-final-server.onrender.com/api/auth/deletepost/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updatePost = async (id, title, content, rate, category, hashtags) => {
    try {
        await axios.patch(`https://itransition-final-server.onrender.com/api/auth/post/${id}`, {
            title, content, rate, category, hashtags
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const likePost = async (id, username) => {
    try {
        await axios.patch(`https://itransition-final-server.onrender.com/api/auth/likepost/${id}`, {
            username
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const dislikePost = async (id, username) => {
    try {
        await axios.patch(`https://itransition-final-server.onrender.com/api/auth/likepost/${id}`, {
            username
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

// comment

export const sendComment = async (postId, comment, author) => {
    try {
        const response = await axios.post(`https://itransition-final-server.onrender.com/api/auth/comment`, {
            postId, comment, author
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}



