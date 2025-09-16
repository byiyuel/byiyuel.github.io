// GitHub Profile Data
const GITHUB_USERNAME = 'byiyuel';

// Elements
const elements = {
    username: document.getElementById("username"),
    tag: document.getElementById("tag"),
    avatar: document.getElementById("avatar"),
    card: document.getElementById("profile"),
    durum: document.getElementById("durum"),
    aktiflikyeri: document.getElementById("aktiflikyeri"),
    spotifyArtist: document.getElementById("spotify-artist"),
    spotifySong: document.getElementById("spotify-song"),
    spotifyPic: document.getElementById("spotify-pic")
};

// GitHub API Functions
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const profile = await response.json();
        
        if (response.ok) {
            return profile;
        } else {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
}

async function fetchGitHubStats() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const profile = await response.json();
        
        if (response.ok) {
            return {
                publicRepos: profile.public_repos,
                followers: profile.followers,
                following: profile.following,
                createdAt: profile.created_at
            };
        } else {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
}

async function fetchRecentActivity() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`);
        const events = await response.json();
        
        if (response.ok) {
            return events;
        } else {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        return null;
    }
}

// Update Profile Display
function updateProfileDisplay(profile, stats, activity) {
    if (!profile) return;

    // Update avatar
    if (elements.avatar) {
        elements.avatar.src = profile.avatar_url;
        elements.avatar.alt = `${profile.name || profile.login}'s GitHub Avatar`;
    }

    // Update username
    if (elements.username) {
        elements.username.textContent = profile.name || profile.login;
    }

    // Update tag (GitHub username)
    if (elements.tag) {
        elements.tag.textContent = `@${profile.login}`;
    }

    // Update status
    if (elements.durum) {
        if (profile.bio) {
            elements.durum.textContent = `Hakkımda: ${profile.bio}`;
        } else {
            elements.durum.textContent = `GitHub Kullanıcısı: ${profile.login}`;
        }
    }

    // Update location/activity
    if (elements.aktiflikyeri) {
        if (profile.location) {
            elements.aktiflikyeri.textContent = `📍 ${profile.location}`;
        } else if (stats) {
            elements.aktiflikyeri.textContent = `📊 ${stats.publicRepos} repo • ${stats.followers} takipçi`;
        }
    }

    // Show profile card
    if (elements.card) {
        elements.card.style.opacity = "1";
    }

    // Update recent activity
    if (activity && activity.length > 0) {
        updateRecentActivity(activity[0]);
    }
}

function updateRecentActivity(latestEvent) {
    const activityText = getActivityText(latestEvent);
    if (elements.durum && activityText) {
        elements.durum.innerHTML += `<br><br>🔄 Son aktivite: ${activityText}`;
    }
}

function getActivityText(event) {
    const eventType = event.type;
    const repoName = event.repo.name;
    const actor = event.actor.login;

    switch (eventType) {
        case 'PushEvent':
            return `📝 ${repoName} reposuna kod push etti`;
        case 'CreateEvent':
            return `🆕 ${repoName} reposunu oluşturdu`;
        case 'WatchEvent':
            return `⭐ ${repoName} reposunu star'ladı`;
        case 'ForkEvent':
            return `🍴 ${repoName} reposunu fork'ladı`;
        case 'IssuesEvent':
            return `🐛 ${repoName} reposunda issue açtı`;
        case 'PullRequestEvent':
            return `🔀 ${repoName} reposunda PR oluşturdu`;
        default:
            return `📋 ${repoName} reposunda aktivite`;
    }
}

// Initialize GitHub Profile
async function initializeGitHubProfile() {
    try {
        // Show loading state
        if (elements.card) {
            elements.card.style.opacity = "0.5";
        }

        // Fetch all data in parallel
        const [profile, stats, activity] = await Promise.all([
            fetchGitHubProfile(),
            fetchGitHubStats(),
            fetchRecentActivity()
        ]);

        // Update display
        updateProfileDisplay(profile, stats, activity);

        // Add GitHub link with stats
        addGitHubLink(stats);

    } catch (error) {
        console.error('Error initializing GitHub profile:', error);
        
        // Fallback display
        if (elements.username) {
            elements.username.textContent = GITHUB_USERNAME;
        }
        if (elements.tag) {
            elements.tag.textContent = '@byiyuel';
        }
        if (elements.durum) {
            elements.durum.textContent = 'GitHub profil bilgileri yüklenemedi';
        }
        if (elements.card) {
            elements.card.style.opacity = "1";
        }
    }
}

// Add GitHub link and stats to profile
function addGitHubLink(stats) {
    if (elements.card) {
        // Create stats container
        const statsContainer = document.createElement('div');
        statsContainer.style.cssText = `
            margin-top: 1rem;
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
        `;

        // Add GitHub link
        const githubLink = document.createElement('a');
        githubLink.href = `https://github.com/${GITHUB_USERNAME}`;
        githubLink.target = '_blank';
        githubLink.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            color: #f8fafc;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        githubLink.innerHTML = '🔗 GitHub Profilim';
        
        githubLink.addEventListener('mouseenter', () => {
            githubLink.style.background = 'rgba(16, 185, 129, 0.2)';
            githubLink.style.borderColor = '#10b981';
            githubLink.style.transform = 'translateY(-2px)';
        });
        
        githubLink.addEventListener('mouseleave', () => {
            githubLink.style.background = 'rgba(16, 185, 129, 0.1)';
            githubLink.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            githubLink.style.transform = 'translateY(0)';
        });

        statsContainer.appendChild(githubLink);

        // Add stats if available
        if (stats) {
            const statsInfo = document.createElement('div');
            statsInfo.style.cssText = `
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
                font-size: 12px;
                color: #94a3b8;
            `;

            const reposStat = document.createElement('span');
            reposStat.innerHTML = `📦 ${stats.publicRepos} Repo`;

            const followersStat = document.createElement('span');
            followersStat.innerHTML = `👥 ${stats.followers} Takipçi`;

            const followingStat = document.createElement('span');
            followingStat.innerHTML = `👤 ${stats.following} Takip`;

            statsInfo.appendChild(reposStat);
            statsInfo.appendChild(followersStat);
            statsInfo.appendChild(followingStat);

            statsContainer.appendChild(statsInfo);
        }
        
        elements.card.appendChild(statsContainer);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGitHubProfile();
});

// Refresh data every 5 minutes
setInterval(initializeGitHubProfile, 5 * 60 * 1000);
