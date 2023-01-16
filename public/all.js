
const books_div = document.querySelector('.root');

const target = -1;

const showAllBooks = async () => {
	console.log('running');

	try {

		const { data: { books } } = await axios.get('api/v1/home/all');
		console.log(books);
		if (books.length < 1) {
			books_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>'
			return
		}
		const allBooks = books.map(async (book) => {
			// TODO : add read again feature. //
			const { name, authorName, _id: bookID, readingStatus } = book;
			var reading = 'Start Reading';
			if (readingStatus===1) {
				reading = 'Ongoing';
			} else if (readingStatus === 2)
			{
				reading = 'Completed';
				}
			return (
				`<div class="single-book">
				<div class="name-author-div">
				<h4>${name}</h4>
			<p class="author-name">${authorName}</p>
			</div>
			
			<div class="right-div">
			<div class="icon-div">
			<a class="favourite-btn" data-id="${bookID}"><img src="./icons/fav.svg" alt="star-icon"></a>
			<a class="delete-btn" data-id="${bookID}"><img src="./icons/dlt.svg" alt="bin-icon"></a>
			</div>
	
			<a ><button class="btn reading-status" data-id="${bookID}">${reading}</button></a>
			</div>
			</div>`
			);
		});
		// const allBooks= Promise.map(books, (book) => {
		// 		const { name, authorName, _id: bookID } = book;
		// 		// const { data: { books: ongoingBooks } } = await axios.get(`api/v1/home/ongoing/${name}`);
		// 		console.log(book);
		// 		// console.log(ongoingBooks);

		// 		var readingStatus = 'Start Reading';
		// 		// if (ongoingBooks.length !== 0) {
		// 		// 	readingStatus = 'Ongoing'
		// 		// }

		// 		// console.log(readingStatus);
		// 		return (
		// 			`<div class="single-book">
		// 			<div class="name-author-div">
		// 			<h4>${name}</h4>
		// 		<p class="author-name">${authorName}</p>
		// 		</div>

		// 		<div class="right-div">
		// 		<div class="icon-div">
		// 		<a class="favourite-btn" data-id="${bookID}"><img src="./icons/fav.svg" alt="star-icon"></a>
		// 		<a class="delete-btn" data-id="${bookID}"><img src="./icons/dlt.svg" alt="bin-icon"></a>
		// 		</div>

		// 		<button class="btn reading-status" data-id="${bookID}">Start Reading</button>
		// 		</div>
		// 		</div>`
		// 		);
		// 	}).then((res)=>{
		// 		console.log(res);
		// 		return res.join('');
		// 	});

		books_div.innerHTML = await Promise.all(allBooks).then((res) => {
			return res.join('');
		});
		console.log(`here is the book div ${books_div}`);

	} catch (error) {
		console.log(error);
	}
}


showAllBooks();

books_div.addEventListener('click', async (e) => {
	const el = e.target
	console.log('clicked');
	console.log(el);
	if (el.parentElement.classList.contains('delete-btn')) {
		const id = el.parentElement.dataset.id;
		console.log("delete initiated", el.parentElement);
		console.log(id);
		try {
			await axios.delete(`api/v1/home/all/${id}`)
			showAllBooks();
		} catch (error) {
			console.log(error)
		}
	}


	if (el.parentElement.classList.contains('favourite-btn')) {
		const id = el.parentElement.dataset.id;
		console.log(id);
		try {
			await axios.patch(`api/v1/home/all/${id}`);
			showAllBooks();
		} catch (error) {
			console.log(error)
		}
	}

	if (el.classList.contains('reading-status')) {
		console.log(el.classList);
		const id = el.dataset.id;
		console.log(id);
		try {
			await axios.patch(`api/v1/home/ongoing/${id}`)
			console.log('book added');
			showAllBooks();
		} catch (error) {
			console.log(error)
		}
	}
}
);




