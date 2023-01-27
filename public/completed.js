const completed_div = document.querySelector('.root');

const showCompletedBooks = async () => {
	console.log('running');

	try {


		// * MAKING THE API CALL TO GET ALL THE BOOKS FROM COMPLETED DIRECTORY
		const { data: { books } } = await axios.get('api/v1/home/completed');

		if (books.length < 1) {
			completed_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>';
			return;
		}

		// * MAPPING OVER ALL THE BOOKS AND RETURNING THE CORRESPONDING HTML.
		const completedBooks = books.map((book) => {

			const { name, authorName, _id: bookID, createdAt } = book;
			const createdDate = new Date(createdAt);

			return (
				`<div class="single-book">
					<div class="name-author-div">
						<h5>${name}</h5>
						<p class="author-name">${authorName}</p>
					</div>

					<div class="right-div">
						<a class="delete-btn" data-id="${bookID}"><img src="./assets/icons/trash-solid.svg"></a>
						<div class="btn reading-status">${createdDate.toDateString()}</div>
					</div>
				</div>`
			);
		}).join('');

		completed_div.innerHTML = completedBooks;

	} catch (error) {
		console.log(error);
	}
}

showCompletedBooks();

// * API CALL TO DELETE BOOK FROM COMPLETED DIRECTORY
completed_div.addEventListener("click", async e => {
	const el = e.target;
	
	if (el.parentElement.classList.contains("delete-btn")) {
		
        const id = el.parentElement.dataset.id;
		
        try {
            await axios.delete(`api/v1/home/completed/${id}`);
            showCompletedBooks();
        } catch (error) {
            console.log(error);
        }
    }
});