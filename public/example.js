document.addEventListener("DOMContentLoaded",function() {
    // Grab the two forms
    let getForm = document.querySelector('#get-form');
    let postForm = document.querySelector('#post-form');
    console.log(getForm, postForm)

    // For the get form, register the event listener
    getForm.addEventListener('submit', async (event) => {
        // Form submits have default behavior that we don't want.
        event.preventDefault();
        
        // This line grabs all the names/values in the form
        const formData = new FormData(getForm);

        // This line property formats the values in the form to "query parameters"
        const params = new URLSearchParams(formData);

        // This line sends an HTTP GET request to the server with those
        // query parameters to the /form route, and waits for a response.
        let response = await fetch('/form?' + params);

        // Read the text to the user
        alert(await response.text());
    });

    // POST works a little differently, because we generally don't want 
    // to use query parameters to send the data.
    postForm.addEventListener('submit', async (event) => {
        // Form submits have default behavior that we don't want.
        event.preventDefault();
        
        // This line grabs all the names/values in the form and turn it into
        // an object, so it's easier to parse as JSON.
        const formData = new FormData(postForm);
        const formDataAsObject = Object.fromEntries(formData.entries())

        // This line sends an HTTP POST request to the server with the
        // form data as the body to the /form route, and waits for a response.
        let response = await fetch('/form', {
            method: 'POST',
            // we're expecting JSON on the back end, so we have to format our data as such.
            body: JSON.stringify(formDataAsObject), 

            // Tell the server we're sending JSON
            headers: {
                'Content-Type': 'application/json'
            }
        });

        alert(await response.text());
    });
});