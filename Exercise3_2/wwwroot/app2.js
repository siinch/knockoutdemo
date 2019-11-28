define (["knockout", "postService", "app"], function (ko, ps, app) {
    return function (shared) {
        console.log("hello from app2");
        
        var postTitle = ko.observable("");
        var postBody = ko.observable("");
        var answers = ko.observableArray([]);
        var currentContent = shared.current;

        var back = function () {
            currentContent("manyPosts");
        };

        var getSinglePost = function () {
            console.log(shared.postId);
            ps.getPost(function (data) {
                postTitle(data.title);
                postBody(data.body);
            }, shared.postId);

            ps.getAnswers(function (data) {
                answers(data);
            }, shared.postId);
        };
        getSinglePost();

        return {
            postTitle,
            postBody,
            answers,
            back
        };
    };
});