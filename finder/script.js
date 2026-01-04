const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const main = document.querySelector('#main');

searchBtn.addEventListener('click', () => {
    const username = searchInput.value;

    if (username.trim() === ''){
        alert('Введите никнейм');
    } else {
        getUser(username);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getUser(username) {
    console.log(`Ищем пользователя: ${username}...`);

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('Пользователь не найден');
        }
        const data = await response.json();

        console.log('Данные:', data);

        createUserCard(data);
    } catch (error) {
        console.log("Ошибка:", error);
        showError('Пользователь не найден');
    }

}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name || user.login}</h2>
                <p>${user.bio || 'Нет описания профиля'}</p>
                
                <div class="stats">
                    <div>
                        <strong>${user.followers}</strong> Подписчики
                    </div>
                    <div>
                        <strong>${user.following}</strong> Подписки
                    </div>
                    <div>
                        <strong>${user.public_repos}</strong> Репозитории
                    </div>
                </div>
                
                <a href="${user.html_url}" target="_blank" style="display:block; margin-top:15px; color:#8e44ad; text-decoration:none;">
                    Перейти в профиль →
                </a>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function showError(message){
    main.innerHTML = `
        <div class="card" style="text-align: center; color: #e74c3c;">
            <h1>${message}</h1>
        </div>
    `;
}