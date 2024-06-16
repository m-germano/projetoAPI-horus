function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
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


const mobileBtn = document.getElementById('hamburger-icon')
const mobileMenu = document.getElementById('mobile-menu')
const mobileMenuicon = document.querySelector('#hamburger-icon i')

mobileBtn.addEventListener('click', () => {
// Open/hide mobile menu
mobileMenu.classList.toggle('hidden')

// Change mobile toggler icon on open/close
if(!mobileMenu.classList.contains('hidden')) {
  mobileMenuicon.classList.remove('fa-bars')
  mobileMenuicon.classList.add('fa-xmark')
} else {
  mobileMenuicon.classList.remove('fa-xmark')
  mobileMenuicon.classList.add('fa-bars')
}

})




