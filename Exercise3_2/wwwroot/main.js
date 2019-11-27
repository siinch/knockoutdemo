require.config({
    //baseUrl: "",
    paths: {
        jquery: "lib/jquery/dist/jquery",
        knockout: "lib/knockout/build/output/knockout-latest.debug",
        bootstrap: "lib/bootstrap/dist/css/bootstrap.css",
        text: "lib/requirejs-text/text" 
    }
});

require(["jquery", "knockout", "text", "app", "postService"], function(jq, ko, txt, app, ps){
    console.log("hello from main");
    ko.applyBindings(app);
});