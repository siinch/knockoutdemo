define (["knockout"], function (ko) {
        console.log("hello from app");

        var currentContent =  ko.observable("manyPosts");
        
        var shared = ko.observable({
            current: currentContent,
            page: 0,
            size: 10,
            pages: 0,
            postId: 0
        });
        
        return {
            currentContent,
            shared
        };
});