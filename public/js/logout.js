const logout =async () => {
    const res = await fetch ('/api/user/logout', {
            method: 'POST',
            
            headers: {'Content-Type': 'application/json'},
        });
      
        if(res.ok){
            document.location.replace('/dashboard');
        }else {
            alert(res.statusText);
        }
    };

    document.getElementsById('logout').addEventListener('click',logout);