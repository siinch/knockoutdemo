define (["knockout", "postService"], function (ko, ps) {
    console.log("hello from app");
    
    var page = 0;
    var size = 10;
    var pages = 0;
    var prev = ko.observable("");
    var next = ko.observable("");
    var showPrev = ko.observable(true);
    var showNext = ko.observable(true);
    var posts = ko.observableArray([]);
    var postId = 0;
    var postTitle = ko.observable("");
    var postBody = ko.observable("");
    var answers = ko.observable([]);
    var currentContent = ko.observable("manyPosts");
    
    function getPosts () {
        ps.getPosts(function (data) {
            prev(data.prev);
            next(data.next);
            posts(data.items);
            pages=Math.ceil(data.total / size);
        }, page, size);
    }
    getPosts();
    
    function checkShow () {
        if(page < 1)
            showPrev(false);
        else
            showPrev(true);
        
        if(page > 3)
            showNext(false);
        else
            showNext(true);
    }
    checkShow();
    
    var getPrev = function() {
        page = page - 1;
        getPosts();
        checkShow();
        
    };
    
    var getNext = function() {
        page = page + 1;
        getPosts();
        checkShow();
    };

    var getSinglePost = function (link) {
        link = link.slice(link.lastIndexOf("/") + 1 , link.length);
        postId = parseInt(link);
        
        ps.getPost(function (data) {
            postTitle(data.title);
            postBody(data.body);
        }, postId);
        
        ps.getAnswers(function (data) {
            answers(data); 
        }, postId);
        
        currentContent("singlePost");
    };
    
    var changeTemplate = function () {
        if (currentContent() === "singlePost")
            currentContent("manyPosts");
        else
            currentContent("singlePost");
    };
    
    return {
        prev,
        next,
        showPrev,
        showNext,
        posts,
        getPrev,
        getNext,
        currentContent,
        postTitle,
        postBody,
        answers,
        getSinglePost,
        changeTemplate
    };
});