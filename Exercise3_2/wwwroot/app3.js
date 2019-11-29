define (["knockout", "postService", "app"], function (ko, ps, app) {
    return function (shared) {
        console.log("hello from app3");

      
        var prev = ko.observable("");
        var next = ko.observable("");
        var showPrev = ko.observable(true);
        var showNext = ko.observable(true);
        var posts = ko.observableArray([]);
        var currentContent = shared.current;

        function getPosts() {
            ps.getPosts(function (data) {
                prev(data.prev);
                next(data.next);
                posts(data.items);
                shared.pages = Math.ceil(data.total / shared.size);
            }, shared.page, shared.size);
        }

        getPosts();

        function checkShow() {
            if (shared.page < 1)
                showPrev(false);
            else
                showPrev(true);

            if (shared.page > 3)
                showNext(false);
            else
                showNext(true);
        }

        checkShow();

        var getPrev = function () {
            shared.page = shared.page - 1;
            getPosts();
            checkShow();

        };

        var getNext = function () {
            shared.page = shared.page + 1;
            getPosts();
            checkShow();
        };
        
        var changeView = function (link) {
            link = link.slice(link.lastIndexOf("/") + 1 , link.length);
            shared.postId = parseInt(link);
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
            changeView
        }
    };
});