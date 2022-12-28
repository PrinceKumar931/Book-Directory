const favs_div = document.querySelector('.favBooks-root');

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
			const { name, authorName } = book;
			return (`<div>
			<h5>${name}</h5>
			<p>${authorName}</p>
			</div>`);
		}).join('');

		favs_div.innerHTML = favouriteBooks;
		console.log(favouriteBooks);

	} catch (error) {
		console.log(error);
	}
}

showFavBooks();