function loadCategory() {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category));
}

const displayCategory = (categories) => {
    categories.forEach(category => {
        //console.log(category.category_name)
        //console.log(category.category_id);
        const categoriesContainer = document.getElementById('categories-container');

        const categoryDiv = document.createElement('li');
        categoryDiv.classList.add('nav-item');
        categoryDiv.innerHTML = `
        <li class="">
                    <a class="nav-link active" aria-current="page" onclick="categoryPost('${category.category_id}')" href="#">${category.category_name}</a>
                </li>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
}

const categoryPost = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryPost(data.data))
}

const displayCategoryPost = (posts) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    posts.forEach(post => {
        // console.log(post)

        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${post.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.details.slice(0, 250)}...</p>
                                <div class="d-flex justify-content-between align-items-center">
                            <div class="p-2 flex-fill">
                                <img src="${post.author.img}" alt="" width="50px" class="rounded-5">
                                <span>${post.author?.name}</span>
                            </div>
                            <div class="p-2 flex-fill">
                                <i class="fa-solid fa-eye"></i>
                                <span>${post.total_view}K</span>
                            </div>
                            <div class="p-2 flex-fill">
                                <button onclick="loadNewsDetails('${post._id}')" class="text-white btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Read More</button>
                            </div>
                        </div>
                            </div >
                        </div >
                    </div >
                </div >
    `;

        postContainer.appendChild(postDiv);

    })

}
const loadNewsDetails = (postId) => {
    const url = `https://openapi.programming-hero.com/api/news/${postId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = (details) => {
    details.forEach(detail => {
        console.log(detail.details);
        const newsTitle = document.getElementById('newsDetailModalLabel');
        newsTitle.innerText = detail.title;
        const newsBody = document.getElementById('news-body');
        newsBody.innerText = detail.details;
        const newsFooter = document.getElementById('news-footer');
        newsFooter.innerText = detail.rating.badge
    })
}

loadNewsDetails();
// displayCategoryPost();

categoryPost();


loadCategory();


