window.onload = function (){
    fetch("posts.xml").then(content => content.text()).then(text => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text, "text/xml");
        let posts = xmlDoc.getElementsByTagName("post")
        for(let post of posts){
            let container = document.createElement("div")
            container.innerHTML = "<h1>" + get(post, "title") + "</h1>"
            let content = document.createElement("img")
            content.src = get(post, "photo")
            container.appendChild(content)
            let desc = "<p>" + get(post, "description") + "</p>"
            container.innerHTML += desc
            document.body.appendChild(container)
        }
    })
}


function get(post, key){
    console.log(post)
    return post.getElementsByTagName(key)[0].innerHTML
}
