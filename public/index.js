const form = document.querySelector('#form');


const success_text = document.getElementById('success-text');
success_text.style.display = 'none';


form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const name = document.getElementById('addBook').value;
	const authorName = document.getElementById('addAuthor').value;
	console.log('working');
	try {
		console.log('still working');
		await axios.post('/api/v1/home', { name, authorName });
		console.log('working');
		success_text.style.display = 'block';
	} catch (error) {
		console.log(error);
	}

	
	setTimeout(() => {
		success_text.style.display = 'none';
	}, 3000);
})



// const showBooks = async () => {
// 	console.log('running');

// 	try {

// 		const { data :{books} } = await axios.get('api/v1/home/all');
// 		console.log(books);
		
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// showBooks();