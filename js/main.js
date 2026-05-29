
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    const success_msg = document.getElementById('success-msg');
    form.addEventListener("submit", function(e) {
        success_msg.style.display = "none";
        // Find the submit button inside the form
        const $submitButton = $(this).find('input[type=submit]');
        
        // Get the data-wait value and original value
        const waitText = $submitButton.attr('data-wait');
        const originalText = $submitButton.attr('value');
        
        // Apply wait text and disable the button
        if (waitText) {
          $submitButton.val(waitText).prop('disabled', true);
        }
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
        method: 'POST',
        body: data,
        })
        .then(() => {
        success_msg.style.display = "block";
        this.reset();
        // Apply wait text and disable the button
        if (waitText) {
          $submitButton.val("Send Answer").prop('disabled', false);
        }
        // form.style.display = "none";
        })
    });
});


$(document).ready(function () {
  $('[data-toggle="modal"]').on('click', function () {
    console.log('clicked TEST');
    $('#myModal').modal('show');
  });
  $('[data-dismiss="modal"]').on('click', function () {
    console.log('clicked hide');
    $('#myModal').modal('hide');
  });
});