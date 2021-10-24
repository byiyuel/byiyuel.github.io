const technologiesElement = document.getElementById("technologies");

const technologies = [

    {
        url: "https://www.python.org/",
        name: "Python",
        icon: "py.svg",
    },
    {
        url: "https://tr.wikipedia.org/wiki/C_Sharp",
        name: "C#",
        icon: "csharp.svg",
    },
    {
        url: "https://www.javascript.com/",
        name: "JavaScript",
        icon: "javascript.svg",
    },
    {
        url: "https://en.wikipedia.org/wiki/HTML",
        name: "HTML",
        icon: "html.svg",
    },
    {
        url: "https://www.mongodb.com/",
        name: "MongoDB",
        icon: "mongodb.svg",
    },
    {
        url: "https://code.visualstudio.com/",
        name: "Visual Studio Code",
        icon: "vscode.svg",
    },
    {
        url: "https://www.adobe.com/tr/products/photoshop.html",
        name: "Photoshop",
        icon: "ps.svg",
    },
    {
        url: "https://www.adobe.com/tr/products/premiere.html",
        name: "Premiere Pro",
        icon: "pp.svg",
    },
    {
        url: "https://www.getpaint.net/",
        name: "Paint.NET",
        icon: "pn.svg",
    },
    {
        url: "https://nodejs.org/en/",
        name: "NodeJS",
        icon: "nodejs.svg",
    },
];

for (let technology of technologies) {
    const techSpan = document.createElement("span");
    techSpan.className = "technology";

    const logo = document.createElement("img");
    logo.src = `./static/images/technologies/${technology.icon}`;

    const text = document.createElement("a");
    text.href = technology.url;
    text.target = "_blank";
    text.innerText = technology.name;

    techSpan.append(logo, text);
    technologiesElement.appendChild(techSpan);
}
