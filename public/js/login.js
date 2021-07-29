const loginForm =async (event) => {
    event.preventDefault();
    const email=document.getElementById('email-login').value.trim();
    const password=document.getElementById('email-login').value.trim();

    if(email&&password){
        const res = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(res.ok){
            document.location.replace('/profile');
        }else {
            alert(res.statusText);
        }
    }
};

const signUp= async (event) => {
    event.preventDefault();
    const name=document.getElementById('name-signup').value.trim();
    const email=document.getElementById('email-signup').value.trim();
    const password=document.getElementById('password-signup').value.trim();

    if(name&&email&&password){
        const res = await fetch ('/api/user', {
            method: 'POST',
            body: JSON.stringify({name,email,password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(res.ok){
            document.location.replace('/profile');
        }else {
            alert(res.statusText);
        }
    }
};

document.getElementsByClassName('login-form');
document.addEventListener('submit',loginForm);
document.getElementsByClassName('signup-form');
document.addEventListener('submit',signUp);