window.onload = function (){
    fetch("posts.xml").then(content => content.text()).then(text => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text, "text/xml");
        let posts = xmlDoc.getElementsByTagName("post")
        console.log(posts)
        for(let i = 0; i < posts.length; i++){
            let post = posts[i]
            console.log(post)

            let container = document.createElement("div")
            container.classList.add("post")

            let h1 = document.createElement("h1")
            h1.innerText = get(post, "title")
            container.appendChild(h1)

            let aut = document.createElement("p")
            aut.classList.add("author")
            aut.innerText = "@" + get(post, "author")
            container.appendChild(aut)

            let d = document.createElement("div")
            let img = document.createElement("img")
            img.src = get(post, "photo")
            d.appendChild(img)
            container.appendChild(d)

            let desc = document.createElement("p")
            desc.classList.add("description")
            desc.innerText = get(post, "description")
            container.appendChild(desc)

            document.body.appendChild(container)



        }
    })
}


function get(post, key){
    return post.getElementsByTagName(key)[0].innerHTML
}
