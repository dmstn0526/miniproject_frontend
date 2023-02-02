const SERVER_URL = 'http://127.0.0.1:8000';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function postArticle(article) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data
}

async function submitArticle() {
    let form = document.getElementById('form')
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result);
}

async function getCategory() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data
}

async function insertCategory(){
    let data = await getCategory();
    let select = document.getElementById('category');
    data.forEach((category) => {
        select.insertAdjacentHTML('afterBegin', `
        <option value='${category.id}'>
            ${category.name}
        </option>
        `);
    })
}
insertCategory()




// async function postCategory(article) {
//     let token = getCookie('access_token')
//     let response = await fetch(`${SERVER_URL}/blog/category`, {
//         method: 'POST',
//         body: JSON.stringify(article),
//         headers: {
//           'Content-type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//     })
//     let data = await response.json();
//     return data
// }

// async function submitCategory() {
//     let category = {
//         name: document.getElementById('category').value
//     }
//     let result = await postCategory(category);
//     console.log(result);
// }