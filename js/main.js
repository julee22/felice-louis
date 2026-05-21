
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    const success_msg = document.getElementById('success-msg');
    form.addEventListener("submit", function(e) {
        success_msg.style.display = "none";
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
        method: 'POST',
        body: data,
        })
        .then(() => {
        success_msg.style.display = "block";
        // form.style.display = "none";
        })
    });
});


$(document).ready(function () {
  $('[data-toggle="modal"]').on('click', function () {
    console.log('clicked TEST');
    $('#myModal').addClass('show');
  });
});