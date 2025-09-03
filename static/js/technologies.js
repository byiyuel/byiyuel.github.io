const technologiesElement = document.getElementById("technologies");

const technologies = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/csharp.svg" },

  { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/node-dot-js.svg" },

  { name: "SQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftsqlserver.svg" },
  { name: "SPSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ibm.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pandas.svg" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/numpy.svg" },

  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scikit-learn.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg" },

  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobephotoshop.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeillustrator.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg" },

  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobepremierepro.svg" },

  { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg" }
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
