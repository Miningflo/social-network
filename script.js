window.onload = function (){
    fetch("posts.xml").then(content => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(parser, "text/xml");
        console.log(xmlDoc)
    })
}
