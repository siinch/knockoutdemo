require.config({
    //baseUrl: "",
    paths: {
        jquery: "lib/jquery/dist/jquery",
        knockout: "lib/knockout/build/output/knockout-latest.debug",
        bootstrap: "lib/bootstrap/dist/css/bootstrap.css",
        text: "lib/requirejs-text/text" 
    }
});

require(["knockout", "app"], function (ko, app) {
    
    ko.components.register("manyPosts", {
        viewModel: {require: "app3"},
        template: {require: "text!manyPosts.html"}
    });
    ko.components.register("singlePost", {
        viewModel: {require: "app2"},
        template: {require: "text!singlePost.html"}
    });
});

require(["jquery", "knockout", "text", "app", "postService"], function(jq, ko, txt, app, ps){
    console.log("hello from main");
    ko.applyBindings(app);
});