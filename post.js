document.addEventListener("DOMContentLoaded", function () {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip;
            console.log(data);

            let ip = ipAddress; // for example
            let token = '36aee7b01d78d2'; // Wrap your token in quotes
            let url = `https://ipinfo.io/${ip}/geo?token=${token}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Update the HTML content
                    let loc = data.loc.split(',');

                    let latitude = loc[0];
                    let longitude = loc[1];
                    document.getElementById('first-div').innerHTML = `
                                                                    <h2>IP Address : <span>${ipAddress}</span></h2>
                                                                    <div id = 'lco'>
                                                                    <h2>Lat : ${latitude}</h2>
                                                                    <h2>City : ${data.city}</h2>
                                                                    <h2>Organisation : ${data.org}</h2>
                                                                    </div>
                                                                    <div id = 'lrh'>
                                                                    <h2>Long : ${longitude}</h2>
                                                                    <h2>Region : ${data.region}</h2>
                                                                    <h2>Country : ${data.country}</h2>
                                                                    </div>
                                                                    
                                                                `;
                    const iframeSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

                    const mapIframe = document.getElementById('mapIframe');
                    mapIframe.src = iframeSrc;

                    let datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

                    document.getElementById('more-info').innerHTML = `
                                                                        <h2 class = 'heading'>More Information About You</h2>
                                                                        <div>
                                                                        <h2>Time Zone : ${data.timezone}</h2>
                                                                        <h2>Date and Time : ${datetime_str}</h2>
                                                                        <h2>Pincode : ${data.postal}</h2>
                                                                        </div>
                                                                    `
                    let pincode = data.postal;
                    let postalUrl = `https://api.postalpincode.in/pincode/${pincode}`;

                    fetch(postalUrl)
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data);
                            let arr = data;
                            console.log(arr)
                            console.log(arr[0].Message)

                            let div1 = document.createElement('h2');
                            div1.setAttribute('id', 'miau');
                            div1.innerHTML = `Message : ${arr[0].Message}`;
                            document.getElementById('more-info').appendChild(div1);

                            for(let i = 0; i<arr[0].PostOffice.length; i++){
                                cards(arr, i);
                            }

                        })
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
});

function cards(arr, i) {
    let child = document.createElement('div');
    child.classList.add('p-card');
    child.innerHTML = `
                        <h3>Name : ${arr[0].PostOffice[i].Name}</h3>
                        <h3>Branch Type : ${arr[0].PostOffice[i].BranchType}</h3>
                        <h3>Delivery Status : ${arr[0].PostOffice[i].DeliveryStatus}</h3>
                        <h3>District : ${arr[0].PostOffice[i].District}</h3>
                        <h3>Division : ${arr[0].PostOffice[i].Division}</h3>
                    `
    let container = document.getElementById('post');
    container.appendChild(child) ;
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    const flexItems = document.querySelectorAll('.p-card');

    flexItems.forEach(item => {
        const textContent = item.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
});
