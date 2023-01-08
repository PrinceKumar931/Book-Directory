
const ongoing_div = document.querySelector(".root");

const showOngoingBooks = async () => {
    console.log("running");

    try {
        const { data: { books } } = await axios.get("api/v1/home/ongoing");
        console.log(books);
        if (books.length < 1) {
            ongoing_div.innerHTML ='<h5 class="empty-list">No Books in your Directory</h5>';
            return;
        }
        const allBooks = books
            .map(book => {
                const { name, authorName, _id: bookID, createdAt } = book;
        
                var createdDate = new Date("Jan 10,2023 00:00:00").getTime();
                // generateCountdown(createdDate)

                return `<div class="single-book">
			<div class="name-author-div">
			<h4>${name}</h4>
			<p class="author-name">${authorName}</p>
			</div>

            <div class="icon-div">
			<a class="delete-btn" data-id="${bookID}"><img src="./icons/dlt.svg" alt="bin-icon"></a>
            <a class="mark-completed" data-id="${bookID}"><img src="./icons/Completed.svg"></a>
            </div>

            <div class="countdown">${createdDate}</div>

			</div>`;
            })
            .join("");

        ongoing_div.innerHTML = allBooks;
    } catch (error) {
        console.log(error);
    }
};

showOngoingBooks();



ongoing_div.addEventListener("click", async e => {
    const el = e.target;

    console.log(el);
    if (el.parentElement.classList.contains("delete-btn")) {
        const id = el.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`api/v1/home/ongoing/${id}`);
            showOngoingBooks();
        } catch (error) {
            console.log(error);
        }
    }

    if (el.parentElement.classList.contains("mark-completed"))
    {
        const id = el.parentElement.dataset.id;
        console.log(id);
        try {
            console.log('-------adding to completed--------');
            await axios.patch(`api/v1/home/completed/${id}`);
            showOngoingBooks();
            console.log('-------added to completed--------');
        } catch (error) {
            console.log(error);
        }
    }
});
