$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let useranme = e.target.value;

        // requet vers github
        $.ajax({
            url: 'https://api.github.com/users/'+useranme,
            data:{
                client_id:'Iv1.80cc5e84fac49081',
                client_secret:'475328d7c23e8467c91e2851e03561dbbb388bfb'
            }
        }).done(function(user){

            $.ajax({
                url: 'https://api.github.com/users/'+useranme+'/repos',
                data:{
                    client_id:'Iv1.80cc5e84fac49081',
                    client_secret:'475328d7c23e8467c91e2851e03561dbbb388bfb'
                }
            }).done(function(repos){
                $.each(repos, function(index, repo) {
                    $('#repos').append(`

                    <div class="card my-2">
                        <div class="card-body">
                            <div class="row">

                                <div class="col-md-5">
                                    <strong>  ${repo.name} </strong> : ${repo.description} 
                                </div>

                                <div class="col-md-4">
                                    <span class="badge badge-primary">Forks : ${repo.forks_count} </span>
                                    <span class="badge badge-secondary">Watchers : ${repo.watchers_count} </span>
                                    <span class="badge badge-success">Stargazers : ${repo.stargazers_count} </span>
                                    <span class="badge badge-warning">Date De Creation : ${repo.created_at} </span>
                                    <span class="badge badge-info">Mise à Jours : ${repo.updated_at} </span>
                                    <span class="badge badge-danger">Branch Par Defaut : ${repo.default_branch} </span>
                                </div>
            

                                <div class="col-md-3">
                                    <a href="${repo.clone_url}" target="_blank"  class="btn btn-success mt-2">Clone</a>
                                    <a href="${repo.html_url}" target="_blank"  class="btn btn-danger mt-2">Ripos</a>
                                </div>

                            </div>
                        </div>
                    </div>

                    `)
                })
            });

            $('#profile').html(`
            <div class="card">
                <div class="card-header">
                    ${user.name}
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" alt="" class="thumbnail avatar">
                            <a href="${user.html_url}" target="_blank"  class="btn btn-primary btn-block mt-2">Lien Profile</a>
                        </div>
                        <div class="col-md-9">
                            <!-- Badge -->
                            <span class="badge badge-primary">Ripos Ouverts : ${user.public_repos}</span>
                            <span class="badge badge-secondary">Gists Ouverts : ${user.public_gists}</span>
                            <span class="badge badge-success">Followers : ${user.followers}</span>
                            <span class="badge badge-danger">Following : ${user.following}</span>


                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Entrprise : ${user.company}</li>
                                <li class="list-group-item">
                                    <a href="${user.blog}" target="_blank" >
                                        Site web / Portfolio 
                                    </a>
                                </li>
                                <li class="list-group-item">Adresse : ${user.location}</li>
                                <li class="list-group-item">Date d'inscription : ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="page-header">Derniers Ripos</h3>
            <div id="repos"></div>
            `)
        })


    });
});