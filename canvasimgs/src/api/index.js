function sendRequest(url, method = 'GET', data = {}) {
    let params = {
        method,
        headers: {
            "content-type": "application/json"
        }
    };
    // 判断如果是一个post请求，带上请求体信息
    if (method == 'POST') {
        params.body = JSON.stringify(data);
    }
    // 判断请求查询url是否携带query
    if (url.indexOf('?') == -1) {
        url += `?_=${+new Date()}`
    } else {
        url += `&_=${+new Date()}`
    }
    // 拼接登陆态token
    // url += `&token=${getToken()}`;
    return fetch(url, params)
        .then(res => res.json())
        .then(body => body);
}

// 上传base64图片
export let uploadBase64 = (base64) => {
    return sendRequest("http://123.206.55.50:11000/upload_base64", "POST", { base64 })
}

// 图片转baes64
export let imgTobase64 = (url) => {
    return sendRequest("http://123.206.55.50:11000/tobase64", "POST", { url })
}