let posts = [];

const handleAllPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    // showLoadingSpinner();
    const data = await res.json();
    posts = data.posts;
    displayPosts(posts);
    handleMessageButton(posts);
}

const postCardArea = document.getElementById('card-area');
const displayPosts = (posts) => {
    postCardArea.innerHTML = ''
    posts.forEach(card => {
        const div = document.createElement('div');
        const badgeColor = card.isActive ? 'online' : 'offline';
        div.innerHTML = `
        <div class="flex flex-row gap-10 bg-white mt-5 p-5">
                    <div class="avatar ${badgeColor} placeholder h-12">
                        <div class="bg-neutral text-neutral-content rounded-xl w-16">
                        <img src="${card.image}" alt="" class="">
                        </div>
                    </div>
                    <!--Rest Part-->
                    <div>
                        <div class="flex flex-row gap-10">
                            <div class="inline"># &nbsp;<h3 class="inline">${card.category}</h3>
                            </div>
                            <div>Author: <h3 class="inline">${card.author.name}</h3>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-1xl font-bold">${card.title}</h3>
                        </div>
                        <div>
                            <p>${card.description}</p>
                        </div>
                        <div class="divider"></div>

                        <div class="flex flex-row justify-between">

                            <div class="flex flex-row gap-10">
                                <div><i class="fa-regular fa-message"></i> &nbsp;${card.comment_count}</div>
                                <div><i class="fa-regular fa-eye"></i> &nbsp;${card.view_count}</div>
                                <div><i class="fa-regular fa-clock"></i> &nbsp;${card.posted_time} min</div>
                            </div>
                            <div class="h-8 w-8 rounded-full bg-green-700">
                            <button type="button" class="msg-btn"><i
                            class="fa-solid fa-envelope-open text-white pl-2 pt-2"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
        `;
        postCardArea.appendChild(div);
    });
}

let buttonCount = 0;

const handleMessageButton = (posts) => {
    const messageButtonArea = document.querySelectorAll('.msg-btn');
    messageButtonArea.forEach((messageButton, index) => {
        messageButton.addEventListener('click', () => {
            const clickdPost = posts[index];
            const postSetArea = document.getElementById('post-set-right')
            const div = document.createElement('div');
            div.innerHTML = `
            <div  class="flex justify-between bg-white rounded-lg mx-5 p-5 mt-5">
                <div>
                    <h3 class="font-bold">${clickdPost.title}</h3>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <i class="fa-regular fa-eye inline"></i> ${clickdPost.view_count}
                </div>
            </div>
            `;
            postSetArea.appendChild(div);
            buttonCount++
            const buttonCountArea = document.getElementById('btn-count');
            buttonCountArea.innerText = buttonCount;
        })
    });

}

const handleLetestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPosts(data);
}

const latestPostArea = document.getElementById('latest-post');
const displayLatestPosts = (data) => {
    data.forEach(card => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img class="w-80 rounded-2xl mt-9" src="${card.cover_image}" alt="Shoes" /></figure>
            <div class="card-body">
                <div class="flex gap-2"><i class="fa-regular fa-calendar"></i>
                    <h3>${card?.author?.posted_date || 'No Publish Date'}</h3>
                </div>
                <h3 class="font-bold">${card.title}</h3>
        
                <p> ${card.description}</p>
        
                <div class="flex gap-5 mt-2">
                    <div>
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img
                                    src="${card.profile_image}" />
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="font-bold">${card.author.name}</h3>
                        <p>${card?.author?.designation || 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        latestPostArea.appendChild(div);
    });
}

const toggleLoadingSpinner = (isLoadding) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoadding) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const searchBtnValue = document.getElementById('search-input').value.toLowerCase();
    toggleLoadingSpinner(true);
    setTimeout(() => {
        const matchingCategory = posts.filter(post => post.category.toLowerCase().includes(searchBtnValue));
        displayPosts(matchingCategory);
        toggleLoadingSpinner(false);
        handleMessageButton(matchingCategory);
    }, 2000)
});
handleAllPost();
handleLetestPosts();