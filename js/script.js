// call api
const loadData = async (catgId = '1000') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catgId}`);
    const data = await res.json();
    const dataItem = data.data;
    // display card function calling here.
    displayCard(dataItem);
    // sorting function calling here.
    document.getElementById('sort-btn').addEventListener('click', function () {
        sortData(dataItem);
    });
}

// display card
const displayCategory = async (dataItem) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const datas = data.data;

    // show card on html
    const categoryContainer = document.getElementById('category-container');

    datas.forEach(catg => {
        var callFunc = `activeTab(event); loadData(${catg.category_id})`;
        const li = document.createElement('li');
        li.setAttribute('onclick', callFunc);
        li.classList = `btn-color light-gray py-2 px-6 rounded cursor-pointer`;
        li.id = 'category-tab';
        li.classList.add('active');
        li.innerText = catg.category;
        categoryContainer.appendChild(li);
    });
}


//display card
const displayCard = (dataItem) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.classList.add('grid');
    removeAllChild('card-container');

    if (dataItem.length > 0) {
        dataItem.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="featured-img cursor-pointer relative">
                    <img class="w-full h-[12rem] rounded-md" src="${item?.thumbnail}" alt="">
                    ${(item?.others?.posted_date) ? showTime(item?.others?.posted_date) : ''}
                </div>
                <div class="flex gap-2 mt-4">
                    <div>
                        <img class="w-[40px] h-[40px] rounded-full" src="${item?.authors[0]?.profile_picture}" alt="">
                    </div>
                    <div>
                        <h1 class="text-base font-bold">${item.title}</h1>
                        <p class="flex gap-2 light-gray text-sm my-1"><span>${item?.authors[0]?.profile_name}</span><img src="${(item?.authors[0]?.verified) ? "" : './images/badge.svg'}"></img></p>
                        <p class="text-[rgba(23, 23, 23, 0.70)] text-sm">${item?.others?.views}</p>  
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
        });
    } else {
        removeAllChild('card-container');
        const cardContainer = document.getElementById('card-container');
        cardContainer.classList.remove('grid');
        cardContainer.innerHTML = `
            <div class='mt-32 flex justify-center items-center'>
                <div class="flex flex-col justify-center items-center">
                    <img class="mb-4 w-16 h-16" src="./images/Icon.png" alt="">
                    <h2 class="text-2xl text-center font-bold">Opps!! Sorry, There is no<br> content here.</h2>
                </div>
            </div>`;
    }
}

// remove child element
function removeAllChild(parentId) {
    const parentElement = document.getElementById(parentId);
    if (parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
}

// show video post time
const showTime = (sec) => {
    const totalSeconds = parseInt(sec);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (` <div class="absolute bottom-2 right-3">
    <p class="bg-[#171717] rounded py-[2px] px-3 text-[12px] text-white">
    ${`${hours}hrs ${minutes}min ago`}</p>
    </div>`);
}

// sorting data
const sortData = async (dataItem) => {
    dataItem.sort((a, b) => {
        console.log(a);
        const x = parseInt(a.others.views.slice(0, -1)) * 1000;
        const y = parseInt(b.others.views.slice(0, -1)) * 1000;
        return y - x;
    });
    displayCard(dataItem);
};

// active tab
function activeTab(e) {
    let allTabs = document.querySelectorAll('#category-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.classList.remove('current-tab');
    });
    e.target.classList.add('current-tab');
}

// calling global functions
displayCategory();
loadData();

