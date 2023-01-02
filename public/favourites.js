const favs_div = document.querySelector('.root');

const showFavBooks = async () => {
	console.log('running');

	try {

		const { data: { books } } = await axios.get('api/v1/home/favourites');
		console.log(books);
		if (books.length < 1) {
			favs_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>'
			return;
		}
		const favouriteBooks = books.map((book) => {
			const { name, authorName, _id:bookID } = book;
			return (`<div class="single-book">
			<div class="name-author-div">
			<h4>${name}</h4>
			<p class="author-name">${authorName}</p>
			</div>

			<a class="delete-btn" data-id="${bookID}"><img src="./icons/dlt.svg" alt="bin-icon"></a>
			</div>`);
		}).join('');

		favs_div.innerHTML = favouriteBooks;
		console.log(favouriteBooks);

	} catch (error) {
		console.log(error);
	}
}

showFavBooks();


favs_div.addEventListener('click', async (e) => {
	const el = e.target

	console.log(el);
	if (el.parentElement.classList.contains('delete-btn')) {
		const id = el.parentElement.dataset.id;
		console.log(id);
		try {
			await axios.delete(`api/v1/home/favourites/${id}`)
			showFavBooks();
		} catch (error) {
			console.log(error)
		}
	}
}
);