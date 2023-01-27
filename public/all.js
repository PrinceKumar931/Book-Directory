
const books_div = document.querySelector('.root');


const showAllBooks = async () => {
	console.log('running');

	try {

		// * MAKING THE API CALL TO GET ALL THE BOOKS FROM ALL BOOKS DIRECTORY
		const { data: { books } } = await axios.get('api/v1/home/all');

		if (books.length < 1) {
			books_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>';
			return;
		}

		// * MAPPING OVER ALL THE BOOKS AND RETURNING THE CORRESPONDING HTML
		const allBooks = books.map(async (book) => {

			const { name, authorName, _id: bookID, readingStatus, favourites } = book;
			console.log(favourites);
			var reading = 'Start Reading';

			if (readingStatus === 1) {
				reading = 'Ongoing';
			} else if (readingStatus === 2) {
				reading = 'Completed';
			}
			return (
				`<div class="single-book">
					<div class="name-author-div">
						<h6>${name}</h6>
						<p class="author-name">${authorName}</p>
					</div>
					<div class="right-div">
						<div class="icon-div">
							<a class="favourite-btn" data-id="${bookID}" data-favStatus="${favourites}"><img src="./assets/icons/heart-regular.svg"></a>
							<a class="delete-btn" data-id="${bookID}"><img src="./assets/icons/trash-solid.svg"></a>
						</div>
							<a><button class="btn reading-status" data-id="${bookID}">${reading}</button></a>
					</div>
				</div>`
			);
		});

		// * RESOLVING ARRAY OF PROMISES.
		books_div.innerHTML = await Promise.all(allBooks).then((res) => {
			return res.join('');
		});

		// * DISABLING THE READING-STATUS BUTTON FOR COMPLETED BOOOKS.
		const readingStatusButton = document.querySelectorAll('.reading-status');
		console.log(readingStatusButton);

		readingStatusButton.forEach((button) => {
			console.log(button.textContent);
			if (button.textContent === 'Completed') {
				button.disabled = true;
				button.classList.add('reading-status-disabled');
			}
		});

		const favStat = document.querySelectorAll('.favourite-btn');
		console.log(favStat);

		favStat.forEach((button) => {
			console.log(button.dataset.favstatus);
			if (button.dataset.favstatus === 'true') {
				button.innerHTML = '<img src="./assets/icons/heart-solid.svg">';
			}
		})

		// if (favStat.dataset.favStatus) {
		// }

	} catch (error) {
		console.log(error);
	}
};


showAllBooks();

books_div.addEventListener('click', async (e) => {
	// * GETTING THE CLICKED ELEMENT
	const el = e.target
	console.log(el);

	// * API CALL FOR DELETING BOOK FROM THE ALL BOOKS DIRECTORY ( IT DELTES THE BOOK FROM ALL THE DIRECTORIES ).
	if (el.parentElement.classList.contains('delete-btn')) {
		console.log(el.parentElement);

		const id = el.parentElement.dataset.id;
		console.log(id);

		try {
			await axios.delete(`api/v1/home/all/${id}`)
			showAllBooks();
		} catch (error) {
			console.log(error)
		}
	}

	// * API CALL FOR ADDING BOOK TO FAVOURITES DIRECTORY
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


	// * API CALL FOR ADDING BOOK TO ONGOING DIRECTORY
	if (el.classList.contains('reading-status')) {

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




