document.addEventListener('DOMContentLoaded', () => {
    submit()
});



 
    
   
// find list of users through input
function findUser(e) { 
    // input 
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
        .then(resp => resp.json())
        .then(git => displayGits(git.items))
};

// add event listener submitting form

function submit(){

    const form = document.getElementById('github-form')
    form.addEventListener('submit', findUser)
};

// build out a div and head to display the info we're retrieving
function displayGits(userData){
  // a for loop through every user we get from our GET request  
  for (user of userData) {
    const container = document.getElementById('user-list')   
    const userDiv = document.createElement('div')
    const name = document.createElement('h4')
    name.innerText = `Username: ${user.login}`
    // click on their name to get their repo list
    name.addEventListener('click', getRepos)
    const repoLink = document.createElement('a')
    repoLink.href = user.html_url
    name.id = user.login 
    userDiv.appendChild(name)
    userDiv.appendChild(repoLink)
    container.appendChild(userDiv)
}};
// get repos for the chosen user 
function getRepos(e) {
     fetch(`https://api.github.com/users/${e.target.id}/repos`)
        .then(resp => resp.json())
        .then(repo => displayRepos(repo))
};

// similar function to above for displaying a user's repo list
function displayRepos(repoData){
    for (repo of repoData) {
        const repoContainer = document.getElementById('repos-list')
        const repoDiv = document.createElement('div')
        const repoName = document.createElement('h4')
        repoName.innerText = repo.name
        repoName.id = repo.full_name
        const repoLink = document.createElement('a')
        repoLink.href = repo.html_url
        // add these to the repo container
        repoDiv.appendChild(repoName)
        repoDiv.appendChild(repoLink)
        repoContainer.appendChild(repoDiv)
    }
};