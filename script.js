fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    const container = document.getElementById('user-container'); 

    users.forEach(user => {
      // Create div element
      const userDiv = document.createElement('div');
      userDiv.classList.add('user','col-md-5', 'mt-2'); 

      // Create h2 element for user's name
      const nameHeader = document.createElement('h2');
      nameHeader.innerHTML = user.name;
      nameHeader.classList.add('title');

      // Create p element for user's email
      const email = document.createElement('p');
      email.innerHTML = `<span class="keyword">Email : </span> ${user.email}`;

      // Create p element for user's phone number
      const phone = document.createElement('p');
      phone.innerHTML = `<span class="keyword">phone : </span> ${user.phone}`;

      // Create p element for user's address
      const address = document.createElement('p');
      address.innerHTML = `<span class="keyword">address : </span> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;      

      // create p element for user's company
      const company = document.createElement('p');
      company.innerHTML = `<span class="keyword">company : </span> ${user.company.name}, ${user.company.catchPhrase}`;

        // Create button to show comments
        const commentButton = document.createElement('button');
        commentButton.innerHTML = 'Show Comments';
        commentButton.classList.add('btn', 'btn-success');
        commentButton.addEventListener('click', () => {
          fetchComments(user.id, userDiv);
        });

      // Append h2 and p elements to the div
      userDiv.appendChild(nameHeader);
      userDiv.appendChild(email);
      userDiv.appendChild(phone);
      userDiv.appendChild(address);
      userDiv.appendChild(company);
      userDiv.appendChild(commentButton);

      // Append the div to the container in the DOM
      container.appendChild(userDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });

 //----------------------------------
 function fetchComments(userId, userDiv) {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(comments => {
      // Filter comments by userId
      const userComments = comments.filter(comment => comment.postId === userId);

      // Create a div to hold the comments
      const commentsDiv = document.createElement('div');
      commentsDiv.classList.add('mt-5');

      // Add comments to the div
      userComments.forEach(comment => {
        const commentPara = document.createElement('p');
        commentPara.innerHTML = `<span class="comment_name">${comment.name} : </span> <p class="text"> ${comment.body} </p>`;
        commentsDiv.appendChild(commentPara);
      });

      // Append comments div to userDiv
      userDiv.appendChild(commentsDiv);
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
}
