// connect the server to run the code
chrome.contextMenus.create({
    title: 'QuizRun：%s', // %s select the content
    contexts: ['all'], // only show when there are contents
    onclick: function(params)
    {
        alert(window.getSelection().toString());
        var url = "http://127.0.0.1:8000/quizrunner";
        // run python scripts on server
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({"code":params.selectionText}),
            datatype: "json",
            success: function(response){
                var output = response;
                alert(output);
            },
            error: function (){
                alert("Something Wrong happened!\nMake sure the code is formatted correctly!")
            }
        })
    }
});
