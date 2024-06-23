
const navBarToggle = (id) => {
    const element = document.querySelector(id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        element.classList.add('flex');
    } else {
        element.classList.remove('flex');
        element.classList.add('hidden');
    }
}