var postApi = 'https://TmpJjsonplaceholder.typicode.com/posts';

fetch(postApi)
    .then(function(response){
        return response.json();
    })
    .then(function(posts){
        var htmls = posts.map(function(post){
            if(post.userId === 1){
                return `
                    <div class="test-div wide m-6 c-12">
                        <p class="test-p">Userid: ${post.userId}</p>
                        <p>id: ${post.id}</p>
                        <h2>title: ${post.title}</h2>
                        <p class="test-body">body: ${post.body}</p>        
                    </div>`;            
            }
        });

        var html = htmls.join('');
        document.querySelector('.posts-box1').innerHTML = html;
        
    })
    .catch(function(err){
        console.log('co loi!');
    })