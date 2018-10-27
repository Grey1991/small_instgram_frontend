// importing named exports we use brackets
import { createPostTile, uploadImage } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';


var token = -1;
const api  = new API('http://127.0.0.1:5000');

// we can use this single api request multiple times

document.getElementById('loginBtn').onclick = function () {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    api.login(u, p).then(response => {
        handleLoginResponse(response);
    });
};

document.getElementById('signupBtn').onclick = function () {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const e = document.getElementById('email').value;
    const n = document.getElementById('name').value;

    api.signup(u, p, e, n).then(response => {
        handleLoginResponse(response);
    });
};

function handleLoginResponse(resp) {
	if (resp.status == 200) {
		resp.json().then(data=>{
			token = data.token;
			// alert('success');
			loginSuccess();
		});
    } else {
		errorAlert(resp);
	}
}

function loginSuccess() {
	document.getElementById('content').style.display = 'block';
	document.getElementById('login').style.display = 'none';
	// getFeed();
}

function errorAlert(resp) {
	resp.json().then(data=>{alert(data.message)});
}

document.getElementById('postBtn').onclick = function() {
	const d = document.getElementById('description_text').value;
	const a = document.getElementById('file').value;
	if(a == '') {
		alert('please select an image')
	} else if(d == '') {
		alert('please input some description')
	}
	else {
		const s = document.getElementById('uploadI').src;
		const i = s.substring(s.indexOf('base64,')+('base64,'.length));
		api.post(token, d, i).then(resp=>{
			if(resp.status == 200) {
				alert('success');
				document.getElementById('file').value = '';
				document.getElementById('description_text').value = '';
				document.getElementById('postIMG').innerHTML = '';
			} else {
				errorAlert(resp);
			}
		})
	}
};

document.getElementById('profileBtn').onclick = function() {
	api.getMe(token).then(resp=>{
		if(resp.status == 200) {
			resp.json().then(data=>{
				document.getElementById('ue').innerHTML = data['username'];
				document.getElementById('ne').innerHTML = data['name'];
				document.getElementById('el').innerHTML = data['email'];
				document.getElementById('fg').innerHTML = data['following'].length;
				document.getElementById('fd').innerHTML = data['followed_num'];
				document.getElementById('yt').innerHTML = data['posts'].length;
			})
		} else {
			errorAlert(resp);
		}
	})
}

// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);




