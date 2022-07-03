const technologiesElement = document.getElementById("technologies");

const technologies = [

    {
        url: "https://www.python.org/",
        name: "Python",
        icon: "py.svg",
    },
    {
        url: "https://www.javascript.com/",
        name: "JavaScript",
        icon: "javascript.svg",
    },
    {
        url: "https://nodejs.org/en/",
        name: "NodeJS",
        icon: "nodejs.svg",
    },
    {
        url: "https://en.wikipedia.org/wiki/HTML",
        name: "HTML",
        icon: "html.svg",
    },
    {
        url: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)",
        name: "C#",
        icon: "csharp.svg",
    },
    {
        url: "https://github.com/",
        name: "GitHub",
        icon: "github.svg",
    },
    {
        url: "https://pages.github.com/",
        name: "GitHub Pages",
        icon: "githubpages.svg",
    },
    {
        url: "https://code.visualstudio.com/",
        name: "Visual Studio Code",
        icon: "vscode.svg",
    },
    {
        url: "https://visualstudio.microsoft.com/",
        name: "Visual Studio",
        icon: "visualstudio.svg",
    },
    {
        url: "https://store.steampowered.com/app/682130",
        name: "Discord Bot Maker",
        icon: "discord.svg",
    },
    {
        url: "https://notepad-plus-plus.org/",
        name: "Notepad++",
        icon: "notepadplusplus.svg",
    },
    {
        url: "https://azure.microsoft.com/en-us/",
        name: "Microsoft Azure",
        icon: "microsoftazure.svg",
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
        url: "https://www.adobe.com/tr/products/aftereffects.html",
        name: "After Effects",
        icon: "ae.svg",
    },
    {
        url: "https://www.getpaint.net/",
        name: "Paint.NET",
        icon: "pn.svg",
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
