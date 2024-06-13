const APIURL = "https://api.github.com/users/";

const main = document.querySelector("#main");

const getUser = async (username) => {
    try {

        let response = await fetch(APIURL + username);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('User not found');
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }
        const data = await response.json();

        response = await fetch(data.repos_url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const repos = await response.json();

        const card = `
            <div class="card">
                <div class="image">
                    <img src="${data.avatar_url}" alt="${data.login}" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || "No bio available"}</p>
                    <ul class="info">
                        <li>${data.followers}<strong> Followers</strong></li>
                        <li>${data.following}<strong> Following</strong></li>
                        <li>${data.public_repos}<strong> Repos</strong></li>
                    </ul>
                    <div id="repos">
                        ${repos.map(repo => `<div class="repo_border"><a href="${repo.html_url}" class="repo" target="_blank">${repo.name}</a></div>`).join('')}
                    </div>
                </div>
            </div>`;

        main.innerHTML = card;

    } catch (error) {

        console.error('Fetch error:', error);
        let errorMessage = '';
        if (error.message === 'User not found') {
            errorMessage = `
            <div class="error">
                <img src="assets/user.jpg" alt="User not found">
                <span>User not found</span>
                <span>Please check the username and try again.</span>
            </div>`;
        } else {
            errorMessage = `
            <div class="error">
                <img src="assets/network.jpg" alt="Network Error">
                <span>Something went wrong!</span>
                <span> ${error.message}</span>
            </div>`;
        }
        main.innerHTML = errorMessage;
    }
}

const fromSubmit = () => {
    const username = document.querySelector('#search').value;
    if (username) {
        getUser(username);
        document.querySelector('#search').value = '';
    }
    return false;
}

// getUser("taylorotwell");
// getUser("sash-84");
// getUser("SakshiKatale");
