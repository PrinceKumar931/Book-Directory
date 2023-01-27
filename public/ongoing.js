
const ongoing_div = document.querySelector(".root");



const showOngoingBooks = async () => {

    

    //* API CALL FOR GETTING BOOKS FRON ONGOING DIRECTORY.
    try {
        const { data: { books } } = await axios.get("api/v1/home/ongoing");

        if (books.length < 1) {
            ongoing_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>';
            return;
        }

        // * MAPPING OVER ALL THE BOOKS AND RETURNING THE CORRESPONDING HTML
        const allBooks = books.map(book => {

            const { name, authorName, _id: bookID, createdAt } = book;
            var createdDate = new Date(createdAt);

            return (
                `<div class="single-book">
			        <div class="name-author-div">
			            <h5>${name}</h5>
			            <p class="author-name">${authorName}</p>
        			</div>

                    <div class="right-div">
                        <div class="icon-div">
			                <a class="delete-btn" data-id="${bookID}"><img src="./assets/icons/trash-solid.svg"></a>
                            <a class="mark-completed" data-id="${bookID}"><img src="./assets/icons/circle-check-solid.svg"></a>
                        </div>

                        <div class="btn reading-status">${createdDate.toDateString()}</div>
                    </div>         
			    </div>`
            );
        }).join("");

        ongoing_div.innerHTML = allBooks;
    
    } catch (error) {
        console.log(error);
    }
};

showOngoingBooks();

ongoing_div.addEventListener("click", async e => {
    
    const el = e.target;

    // * API CALL TO DELTE BOOK FROM ONGOING DIRECTORY
    if (el.parentElement.classList.contains("delete-btn")) {

        const id = el.parentElement.dataset.id;
        
        try {
            await axios.delete(`api/v1/home/ongoing/${id}`);
            showOngoingBooks();
        } catch (error) {
            console.log(error);
        }
    }

    // * API CALL TO ADD A BOOK FROM ONGOING TO COMPLETED DIRECTORY
    if (el.parentElement.classList.contains("mark-completed")) {

        const id = el.parentElement.dataset.id;

        try {
            await axios.patch(`api/v1/home/completed/${id}`);
            showOngoingBooks();
        } catch (error) {
            console.log(error);
        }
    }
});


