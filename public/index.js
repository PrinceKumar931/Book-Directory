const form = document.querySelector('#form');




form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const name = document.getElementById('addBook').value;
	const authorName = document.getElementById('addAuthor').value;
	console.log('working');
	try {
		await axios.post('/api/v1/home', { name,authorName })
		console.log('working');
	} catch (error) {
		console.log(error);
	}
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