document.write(`    
   <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark"> 
		<a class="navbar-brand" href="#">CheckList</a> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="home.html">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hábitos</a>
		               <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item" href="checklist.html">Modo 1</a>
                          <a class="dropdown-item" href="checklist2.html">Modo 2</a>
                            <div class="dropdown-divider"></div>
                             <a class="dropdown-item" href="#">....</a>
                         </div>

                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="new_coach_user.html">Usuários</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="new_event.html">Eventos</a>
                    </li>
                
                </ul>
            
                <a style="color: gray" id="logout" href="#">Logout</a>
            
        </div> 
    </nav> `);