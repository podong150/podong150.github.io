var engine = document.getElementById("engine");

document.getElementById("input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        performSearch();
    }
});
document.addEventListener("DOMContentLoaded",function(){
    loadEngine();
})

var urls =  {
    "百度": "https://www.baidu.com/s?wd=",
    "必应": "https://www.bing.com/search?q=",
    "谷歌": "https://www.google.com/search?q="
};

function changeEngine(){
    if (engine.innerHTML === "百度") {
        engine.innerHTML = "必应";
    } else if (engine.innerHTML === "必应") {
        engine.innerHTML = "谷歌";
    } else {
        engine.innerHTML = "百度";
    }
    saveEngine();
}

function performSearch(){
    var input = document.getElementById("input");
    var query = input.value.trim();
    var searchUrl=urls[engine.innerHTML] + encodeURIComponent(query);
    window.open(searchUrl,'_blank');
}

function saveEngine(){
    localStorage.setItem("searchEngine" ,engine.innerHTML);
}

function loadEngine(){
    var savedEngine = localStorage.getItem("searchEngine");
    if(savedEngine){
        engine.innerHTML = savedEngine;
    }

}
