const SERVER_URL = 'http://127.0.0.1:8000';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function postCategory(article) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(article),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
    let data = await response.json();
    return data
}

async function submitCategory() {
    let category = {
        name: document.getElementById('category').value
    }
    let result = await postCategory(category);
    console.log(result);
}




// async function insertCategory() {
//     let categorys = await getCategory();
//     categorys.forEach(category => {
//         document.body.insertAdjacentHTML('beforeend', `
//             <div id="${post.id}">
//                 <h1>${post.title}</h1>
//                 <p>${post.content}</p>
//                 <button onclick="deletePost(${post.id})">삭제</button>
//             </div>
//         `)
//     })
// }