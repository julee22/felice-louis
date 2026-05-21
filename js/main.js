
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    const success_msg = document.getElementById('success-msg');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
        method: 'POST',
        body: data,
        })
        .then(() => {
        success_msg.style.display = "block";
        form.style.display = "none";
        })
    });
});