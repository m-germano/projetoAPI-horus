function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }


 function confirmarAcao() {
    
    let confirmacao = confirm("Tem certeza que deseja realizar essa ação?");

    
    if (confirmacao) {
        
        alert("Ação confirmada!");
        
    } else {
       
        alert("Ação cancelada!");
        
    }
}


// Fetch all details element
const details = Array.from(document.querySelectorAll("details"));

// Add onclick listeners
details.forEach(targetDetail => {
  targetDetail.addEventListener("click", () => {
    // Close all details that are not targetDetail
    details.forEach(detail => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
      }
    });
  });
});


window.sr = ScrollReveal({reset:true});

sr.reveal('.animated', {duration:1500});

sr.reveal('.animated-y', {
    rotate:{x:0, y:80, z:0},
    duration:2000
});



