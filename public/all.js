const books_div = document.querySelector('.allBooks-root');

const showAllBooks = async () => {
	console.log('running');

	try {

		const { data :{books} } = await axios.get('api/v1/home/all');
		console.log(books);
		if (books.length < 1) {
			books_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>'
			return
		}
		const allBooks = books.map((book) => {
			const { name, authorName } = book;
			return (`<div>
			<h5>${name}</h5>
			<p>${authorName}</p>
			</div>`);
		}).join('');

		books_div.innerHTML = allBooks;
		console.log(`here is the book div ${books_div}`);
		
	} catch (error) {
		console.log(error);
	}
}

showAllBooks();