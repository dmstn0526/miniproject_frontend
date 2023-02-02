const SERVER_URL = 'http://127.0.0.1:8000';

async function getArticle() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function postArticle(article) {
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: JSON.stringify(article),
        headers:{
            'Content-type':'application/json'
        }
    })
    let data = await response.json();
    return data
}

async function deleteArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'DELETE',
    });
    // 요청이 성공했을때만 해당 글을 삭제 -> 새로고침하지 않아도 삭제된게 보여짐
    if (response.status === 204) {
        let post = document.getElementById(id);
        post.remove();
    }
}

async function updateArticle(article, id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`,{
      method: 'PUT',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json',
      },
    });
    let data = await response.json();
    return data
}

async function submitArticle() {
    let article = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value
    }
    // let result = await updateArticle(article);
    let result = await postArticle(article);
    console.log(result);
}

async function insertArticle(){
    let data = await getArticle();

    data.forEach((element) => {
        document.body.insertAdjacentHTML('afterBegin', `
        <div id="modal">
            <div id='${element.id}'>
                <h1>${element.title}</h1>
                <p>${element.content}</p>
                <button onclick='deleteArticle(${element.id})'>삭제하기</button>
                <button onclick="closeModal()">닫기</button>
            </div>
        </div>
        `);
    })
}

const showModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein 2s';
}
const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.animation = 'fadeout 2s';
    setTimeout(() => modal.style.display = 'none', 2000);
}