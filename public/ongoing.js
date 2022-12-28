const ongoing_div = document.querySelector('.ongoingBooks-root');	

const showOngoingBooks = async () => {
	console.log('running');

	try {

		const { data: { books } } = await axios.get('api/v1/home/ongoing');
		console.log(books);
		if (books.length < 1) {
			ongoing_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>'
			return
		}
		const allBooks = books.map((book) => {
			const { name, authorName } = book;
			return (`<div>
			<h5>${name}</h5>
			<p>${authorName}</p>
			</div>`);
		}).join('');

		ongoing_div.innerHTML = allBooks;

	} catch (error) {
		console.log(error);
	}
}

showOngoingBooks();