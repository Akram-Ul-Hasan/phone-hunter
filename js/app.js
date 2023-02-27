const loadPhones = async(searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = phones => {
    //console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = "";
    const noPhoneMessage = document.getElementById('no-phone-message');
    phones = phones.slice(0,10);
    if(phones.length===0){
        noPhoneMessage.classList.remove('d-none');
    }
    else{
        noPhoneMessage.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    spinner(false);
}

const spinner = isStart => {
    const spinnerContainer = document.getElementById('spinner-section');
    if(isStart)
        spinnerContainer.classList.remove('d-none');
    else
        spinnerContainer.classList.add('d-none');
};

document.getElementById('btn-search').addEventListener('click', function(){
    spinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';
})