
 const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        
        nav.classList.toggle('show-menu')
 
        
        toggle.classList.toggle('show-icon')
    })
 }

 function confirmarAcao() {
    
    let confirmacao = confirm("Tem certeza que deseja realizar essa ação?");

    
    if (confirmacao) {
        
        alert("Ação confirmada!");
        
    } else {
       
        alert("Ação cancelada!");
        
    }
}