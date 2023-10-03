document.addEventListener("DOMContentLoaded", function () {
    // Your code here

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log(ipAddress);
            document.getElementById('right').innerHTML = `<h2>Your Current IP Address is: <span>${ipAddress}</span></h2>
                                                            <button id="btn">Get Started</button>
                                                        `
        })
        .catch(error => {
            console.error(error);
        });
});


document.addEventListener('click', (event) =>{
    if (event.target.matches('#btn'))
    window.location.href = 'second.html' ;
})

