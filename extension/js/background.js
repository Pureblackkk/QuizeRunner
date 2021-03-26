var contentText = null

// connect the server to run the code
chrome.contextMenus.create({
    title: 'QuizRun：%s', // %s select the content
    contexts: ['all'], // only show when there are contents
    onclick: function(params)
    {
        var url = "http://47.110.33.143:8000/quizrunner";
        // run python scripts on server
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(contentText),
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

// listen to the message from content-scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    contentText = request
    sendResponse('我是后台，我已收到你的消息');
});
