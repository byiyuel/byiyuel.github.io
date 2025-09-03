const technologiesElement = document.getElementById("technologies");

const technologies = [
  {
    name: "Python",
    icon: "./static/images/python.svg"
  },
  {
    name: "JavaScript",
    icon: "./static/images/javascript.svg"
  },
  {
    name: "C#",
    icon: "./static/images/csharp.svg"
  },
  {
    name: "HTML",
    icon: "./static/images/html.svg"
  },
  {
    name: "CSS",
    icon: "./static/images/css.svg"
  },
  {
    name: "Node.js",
    icon: "./static/images/nodejs.svg"
  },
  {
    name: "SQL",
    icon: "./static/images/sql.svg"
  },
  {
    name: "Pandas",
    icon: "./static/images/pandas.svg"
  },
  {
    name: "NumPy",
    icon: "./static/images/numpy.svg"
  },
  {
    name: "Excel",
    icon: "./static/images/excel.svg"
  },
  {
    name: "SPSS",
    icon: "./static/images/spss.svg"
  },
  {
    name: "Git & GitHub",
    icon: "./static/images/github.svg"
  },
  {
    name: "VS Code",
    icon: "./static/images/vscode.svg"
  }
];

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
