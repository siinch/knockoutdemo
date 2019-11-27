define([], function () {

    const getPosts = async function (callback, page, size) {
        const response = await
            fetch("api/posts?page=" + page + "&pageSize=" + size);
        const data = await
            response.json();
        callback(data);
    };
    
    const getPost = async function (callback, postId) {
        const response = await
            fetch("api/posts/" + postId);
        const data = await
            response.json();
        callback(data);        
    };
    
    const getAnswers = async function (callback, postId) {
        const response = await
            fetch("api/posts/" + postId + "/answers");    
        const data = await
            response.json();
        callback(data);
    };
    
    return {
        getPosts,
        getPost,
        getAnswers
    }
});