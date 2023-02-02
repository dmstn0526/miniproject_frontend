const SERVER_URL = 'http://127.0.0.1:8000';

async function getArticle() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function insertArticle(){
    let data = await getArticle();
    data.forEach((element) => {
        document.body.insertAdjacentHTML('afterBegin', `
        <div id='${element.id}'>
            <h1>글쓴사람:${element.author}</h1>
            <h1>${element.title}</h1>
            <p>${element.content}</p>
            <button onclick='deleteArticle(${element.id})'>삭제하기</button>
        </div>
        `);
    })
}

async function deleteArticle(id) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 204) {
        let post = document.getElementById(id);
        post.remove();
    }
}