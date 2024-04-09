
 const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        
        nav.classList.toggle('show-menu')
 
        
        toggle.classList.toggle('show-icon')
    })
 }
 
const link = document.getElementById('mvp');
const mensagem = document.getElementById('mensagem');

 // Adiciona eventos de mouseover e mouseout ao link
link.addEventListener('mouseover', () => {
     // Exibe a mensagem quando o mouse entra no link
     mensagem.style.display = 'block';
});

link.addEventListener('mouseout', () => {
     // Esconde a mensagem quando o mouse sai do link
     mensagem.style.display = 'none';
});