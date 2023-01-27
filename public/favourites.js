const favs_div = document.querySelector('.root');

const showFavBooks = async () => {

	try {
		
		
		// * MAKING THE API CALL TO GET ALL THE BOOKS FROM FAVOURITES DIRECTORY
		const { data: { books } } = await axios.get('api/v1/home/favourites');

		if (books.length < 1) {
			favs_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>';
			return;
		}

		// * MAPPING OVER ALL THE BOOKS AND RETURNING THE CORRESPONDING HTML
		const favouriteBooks = books.map((book) => {

			const { name, authorName, _id:bookID } = book;

			return (
				`<div class="single-book">
					<div class="name-author-div">
						<h5>${name}</h5>
						<p class="author-name">${authorName}</p>
					</div>

					<a class="delete-btn" data-id="${bookID}" data-name="${name}"><img src="./assets/icons/trash-solid.svg"></a>
				</div>`
			);
		}).join('');

		favs_div.innerHTML = favouriteBooks;

	} catch (error) {
		console.log(error);
	}
}

showFavBooks();

// * API CALL FOR DELETING BOOKS FROM FAVOURITES DIRECTORY

favs_div.addEventListener('click', async (e) => {

	const el = e.target
	console.log(el);

	if (el.parentElement.classList.contains('delete-btn')) {
		console.log('not enterig if block');
		const id = el.parentElement.dataset.id;
		const name = el.dataset.name;
		console.log("this is id");
		try {
			console.log("is this working");
			await axios.delete(`api/v1/home/favourites/${id}/${name}`)
			showFavBooks();
		} catch (error) {
			console.log(error)
		}
	}
}
);