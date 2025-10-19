const reposContainer = document.getElementById("repos");

async function getRepo(user) {
    try {
        const result = await fetch(`https://api.github.com/users/byiyuel/repos`);
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        let repos = await result.json();
        repos = filterRepos(repos);
        return repos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

function filterRepos(repos) {
    const foundRepos = [];

    for (const repo of repos) {
        if (repo.fork) continue;

        repo.created_at = new Date(repo.created_at);
        foundRepos.push(repo);
    }

    const sortRepo = foundRepos.sort((a, b) => b.created_at - a.created_at);
    return sortRepo.slice(0, 12);
}

function showLoading() {
    if (!reposContainer) return;
    
    reposContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid rgba(16, 185, 129, 0.2); border-top: 4px solid #10b981; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: #cbd5e1; margin-top: 1.5rem; font-size: 1.1rem;">GitHub repoları yükleniyor...</p>
        </div>
    `;
}

function showError() {
    if (!reposContainer) return;
    
    reposContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <p style="color: #ef4444; font-size: 1.1rem; margin-bottom: 1rem;">⚠️ Repolar yüklenemedi</p>
            <button onclick="initRepos()" style="padding: 1rem 2rem; background: linear-gradient(135deg, #10b981 0%, #34d399 100%); border: none; border-radius: 12px; color: #000; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                🔄 Tekrar Dene
            </button>
        </div>
    `;
}

async function addRepos() {
    if (!reposContainer) return;
    
    showLoading();
    
    try {
        const repos = await getRepo("byiyuel");
        
        // Clear loading
        reposContainer.innerHTML = '';
        
        // Add repos with animation delay
        repos.forEach((repo, index) => {
            const repoDiv = document.createElement("div");
            repoDiv.className = "repo";
            repoDiv.style.opacity = '0';
            repoDiv.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;

            const repoTitle = document.createElement("div");
            repoTitle.className = "repo-title";

            const repoUrl = document.createElement("a");
            repoUrl.innerText =
                repo.name.length > 30
                    ? `${repo.name.substring(0, 27)}...`
                    : repo.name;
            repoUrl.href = repo.html_url;
            repoUrl.target = "_blank";
            repoUrl.rel = "noopener noreferrer";

            const tempDiv = document.createElement("div");

            const starCount = document.createElement("p");
            starCount.innerText = repo.stargazers_count;

            const imgFile = document.createElement("img");
            imgFile.src = "./static/images/star.svg";
            imgFile.alt = "Stars";

            tempDiv.append(starCount, imgFile);
            repoTitle.append(repoUrl, tempDiv);

            const repoDescription = document.createElement("p");
            repoDescription.innerText =
                repo.description && repo.description.length > 120
                    ? `${repo.description.substring(0, 117)}...`
                    : repo.description || "Açıklama bulunmuyor";

            repoDiv.append(repoTitle, repoDescription);
            reposContainer.appendChild(repoDiv);
        });
    } catch (error) {
        console.error('Error displaying repositories:', error);
        showError();
    }
}

// Initialize function for retry button
function initRepos() {
    addRepos();
}

// Make it global for retry button
window.initRepos = initRepos;

// Load repos when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRepos);
} else {
    addRepos();
}

