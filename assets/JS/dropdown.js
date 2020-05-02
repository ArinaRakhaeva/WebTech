function dropdownToggle() {
    const target = this;
    let header = null;
    let panel = null;
    Array.from(target.children).forEach(el => {
        if (el.classList.contains('dropdown-header')) {
            header = el;
        }
        if (el.classList.contains('dropdown-panel')) {
            panel = el;
        }
    });
    const arr = Array.from(header.children);
    let arrow = null;
    arr.forEach((el) => {
        if (el.classList.contains('dropdown-arrow')) {
            arrow = el.children[0];
        }
    });
    arrow.classList.toggle('active');
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }

}

const dropdownWrapper = document.querySelectorAll('.dropdown-wrapper');
dropdownWrapper.forEach(el =>
    el.addEventListener(
        'click',
        function (e) {
            dropdownToggle.call(this);
        },
        false),
);
