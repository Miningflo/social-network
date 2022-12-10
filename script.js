window.onload = function () {
    fetch("posts.xml").then(content => content.text()).then(text => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(text, "text/xml");
            let posts = xmlDoc.getElementsByTagName("post")
            console.log(posts)
            for (let i = 0; i < posts.length; i++) {
                let post = posts[i]
                console.log(post)

                let container = document.createElement("div")
                container.classList.add("post")

                let h1 = document.createElement("h1")
                h1.innerText = (i + 1) + ": " + get(post, "title")
                container.appendChild(h1)

                let aut = document.createElement("p")
                aut.classList.add("author")
                aut.innerText = "@" + get(post, "author")
                container.appendChild(aut)

                let d = document.createElement("div")
                let content = post.getElementsByTagName("content")[0].children[0].tagName
                if (content === "photo") {
                    let img = document.createElement("img")
                    img.src = get(post, "photo")
                    d.appendChild(img)
                }
                if (content === "video") {
                    let pausebutton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    pausebutton.setAttribute("width", "75")
                    pausebutton.setAttribute("height", "90")
                    pausebutton.innerHTML = '<polygon points="10,10 75,50 10,90" style="fill:white;stroke:black;stroke-width:1;fill-rule:evenodd;" />'
                    pausebutton.classList.add("pause")
                    d.appendChild(pausebutton)

                    let vid = document.createElement("video")
                    vid.src = get(post, "video")
                    vid.loop = true
                    vid.onclick = function () {
                        if (vid.paused) {
                            vid.play();
                            pausebutton.style.visibility = "hidden"

                        } else {
                            vid.pause();
                            pausebutton.style.visibility = "visible"
                        }
                    }
                    d.appendChild(vid)
                }
                container.appendChild(d)

                let desc = document.createElement("p")
                desc.classList.add("description")
                desc.innerText = get(post, "description").trim()
                container.appendChild(desc)

                if(post.getElementsByTagName("link").length > 0){
                    let link = get(post, "link")
                    container.onclick = () => {
                        window.open(link)
                    }
                }

                document.getElementById("posts").appendChild(container)


            }
        }
    )
}


function get(post, key) {
    return post.getElementsByTagName(key)[0].innerHTML
}
