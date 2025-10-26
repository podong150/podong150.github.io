var addBtn = document.getElementById("addsite");
var siteWindow = document.querySelector(".addsitewindow");
var confirmBtn = document.getElementById("confirm");
var cancelBtn  = document.getElementById("cancel");
var urlInput = document.getElementById('url');

document.addEventListener("DOMContentLoaded" ,function(){
    loadCustomSites();
})
addBtn.addEventListener('click', function() {
        if(siteWindow.style.display ==='block')
        {
            siteWindow.style.display= "none";
            urlInput.value ="";
        }
        else siteWindow.style.display="block";
    });


cancelBtn.addEventListener('click', function() {
        siteWindow.style.display = 'none';
        urlInput.value ="";
    });

confirmBtn.addEventListener("click" , function(){
        var url = urlInput.value.trim();

        if(url){
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }

            createSiteElement(url);
            saveCustomSites();
        }
});

function saveCustomSites() {
    var sites = [];
    var siteLinks = document.querySelectorAll('.iconbar a[custom="true"]');
    
    siteLinks.forEach(function(link) {
        sites.push({
            url: link.href,
            title: link.title || ''
        });
    });
    
    localStorage.setItem('customSites', JSON.stringify(sites));
}

function loadCustomSites() {
    var savedSites = localStorage.getItem('customSites');
    
    if (savedSites) {
        var sites = JSON.parse(savedSites);
        sites.forEach(function(site) {
            createSiteElement(site.url);
        });
    }
}

function createSiteElement(url){
    var newSite =document.createElement("a");
            newSite.href = url;
            newSite.target = "_blank";
            newSite.setAttribute('custom','true');

            var newIcon = document.createElement("img");
            var domain  = new URL(url).hostname;
            newIcon.src = "https://" + domain  + "/favicon.ico" ;

            newIcon.onerror = function() {
            this.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAg
                MCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAv
                c3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNCIgZmlsbD0idHJh
                bnNwYXJlbnQiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5l
                PSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM1QTdDQjgiIGZvbnQt
                c2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWln
                aHQ9ImJvbGQiPlc8L3RleHQ+Cjwvc3ZnPg==`;

            this.style.borderRadius = '4px';
            };

            newSite.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            this.remove();
            saveCustomSites();
            });

            newSite.appendChild(newIcon);

            var customSites = document.getElementById("customsites");
            customSites.parentNode.insertBefore(newSite , addBtn);
            urlInput.value="";
            siteWindow.style.display = "none";
}