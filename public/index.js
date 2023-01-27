const form = document.querySelector('#form');



const success_text = document.getElementById('success-text');
success_text.style.display = 'none';


// * GETTING BOOK NAME AND AUTHOR NAME FROM WEBPAGE INPUT
form.addEventListener('submit', async (e) => {
	//* PREVENTS AUTO SUBMITTING
	e.preventDefault()

	const name = document.getElementById('addBook').value;
	const authorName = document.getElementById('addAuthor').value;

	// * API CALL FOR ADDING BOOK TO ALL BOOKS DIRECTORY
	try {
		await axios.post('/api/v1/home', { name, authorName });
		success_text.style.display = 'block';
	} catch (error) {
		console.log({msg:error});
	}


	setTimeout(() => {
		success_text.style.display = 'none';
	}, 3000);
})
