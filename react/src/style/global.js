const icon = document.querySelectorAll('.icon');

icon.forEach(icon => {
    const TargetID = icon.getAttribute('data-target');
    const TargetElement = document.getElementById(TargetID);

    icon.addEventListener('mouseenter', () => {
    TargetElement.style.display = 'inline-block'
    });

    icon.addEventListener('mouseleave', () => {
    TargetElement.style.display = 'none';
    })
})

const img = document.getElementById("pfp");
const menu = document.getElementById("list");

img.addEventListener("mouseenter", () =>{
    menu.classList.add("active")
});
menu.addEventListener("mouseenter", () => {
    menu.classList.add('active')
})

img.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!menu.matches(":hover")) {
            menu.classList.remove("active");
        }
    }, 100); // Small delay to ensure smoothness
});

menu.addEventListener("mouseleave", () => {
    menu.classList.remove("active");
});





   //
    const header = document.getElementById('Navigation_container');
    const nav = document.getElementById('nav')
    const user = document.getElementById('ul-to-move')
    const parent = document.getElementById('parent-nav');
    const logo = document.getElementById('logo');
    const home = document.getElementById('home')

    function remove(){
        const width = window.innerWidth;
        if(width  <= 480){
            header.insertBefore(user, header.firstChild);
            if(logo){
                parent.insertBefore(home, parent.children[4])
                header.insertBefore(logo, header.firstChild)
                console.log("item remove")
            };
        }else{
            nav.append(user);
                parent.insertBefore(home,parent.firstChild);
                parent.insertBefore(logo, parent.firstChild);
                removedelement = null;
                console.log("return logo")

        }
    }

    window.addEventListener('resize', remove)
    remove()

    const container = document.querySelector('.course_list');

    let isDragging = false;
    let startY, scrollTop;

    
// Mouse Down Event
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.classList.add('dragging');
    startY = e.pageY - container.offsetTop; // Get initial Y position
    scrollTop = container.scrollTop; // Get the current scroll position
});

// Mouse Up and Leave Events
container.addEventListener('mouseup', () => {
    isDragging = false;
    container.classList.remove('dragging');
});
container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.classList.remove('dragging');
});

// Mouse Move Event
container.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Stop function if not dragging
    e.preventDefault(); // Prevent default text selection
    const y = e.pageY - container.offsetTop; // Get current Y position
    const walk = (y - startY) * 2; // Adjust scrolling speed
    container.scrollTop = scrollTop - walk; // Scroll container
});
