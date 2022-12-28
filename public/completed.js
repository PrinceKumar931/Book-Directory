const completed_div = document.querySelector('.completedBooks-root');

const showCompletedBooks = async () => {
	console.log('running');

	try {

		const { data: { books } } = await axios.get('api/v1/home/completed');
		console.log(books);
		if (books.length < 1) {
			completed_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>'
			return
		}
		const completedBooks = books.map((book) => {
			const { name, authorName } = book;
			return (`<div>
			<h5>${name}</h5>
			<p>${authorName}</p>
			</div>`);
		}).join('');

		completed_div.innerHTML = completedBooks;

	} catch (error) {
		console.log(error);
	}
}

showCompletedBooks();