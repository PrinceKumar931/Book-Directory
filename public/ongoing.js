const ongoing_div = document.querySelector(".root");



const showOngoingBooks = async () => {
    console.log("running");
    const targetDates = {};
    var targetText = 'Set Target'
    try {
        const { data: { books } } = await axios.get("api/v1/home/ongoing");
        console.log(books);
        if (books.length < 1) {
            ongoing_div.innerHTML = '<h5 class="empty-list">No Books in your Directory</h5>';
            return;
        }
        const allBooks = books.map(book => {
            const { name, authorName, _id: bookID, createdAt } = book;
            var { targetDate } = book;
            console.log(` default target date: ${targetDate}`);
            var createdDate = new Date(createdAt);
            console.log(targetDate);
            // generateCountdown(createdDate)
    

            if (targetDate) {
                targetDate = new Date(targetDate);
                targetDates[name] = targetDate;
                // generateCountdown(targetDate,targetText,tar_days,tar_hours,tar_minutes,tar_seconds);
            }


            return( `<div class="single-book">
			<div class="name-author-div">
			<h4>${name}</h4>
			<p class="author-name">${authorName}</p>
			</div>

            <div class="icon-div">
			<a class="delete-btn" data-id="${bookID}"><img src="./icons/dlt.svg" alt="bin-icon"></a>
            <a class="mark-completed" data-id="${bookID}"><img src="./icons/Completed.svg"></a>
            </div>

            <div class="btn">${createdDate.toDateString()}</div>
            <div class="btn set-target" data-created="${createdDate}" data-name="${name}">${targetText}</div >
         
			</div>
        
            `);

        }).join("");

        ongoing_div.innerHTML = allBooks;
        const targetButton = document.querySelectorAll('.set-target');
        console.log(`this is target button : ${targetButton}`);
        console.log(targetDates);

        console.log(`---------object method----------`);


            targetButton.forEach(button => {
                const name = button.dataset.name;
                var target_date = targetDates[name];
                console.log(target_date);


                var interval = setInterval(() => {
                    var now = new Date().getTime();
                    // console.log('current Date  '+now);
                    var distance = target_date.getTime() - now;
                    // console.log('distance  '+   distance);

                    var tar_days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var tar_hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var tar_minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var tar_seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance < 0) {
                        clearInterval(interval);
                        button.innerHTML = `00 : 00 : 00 : 00`;
                    } else {
                        console.log(`${tar_days} : ${tar_hours} : ${tar_minutes} : ${tar_seconds}`);
                        var targetText = `${tar_days} : ${tar_hours} : ${tar_minutes} : ${tar_seconds}`;
                        button.innerHTML = targetText;
                    }



                }, 1000);

            });
        
        

    } catch (error) {
        console.log(error);
        
    }
};

showOngoingBooks();



ongoing_div.addEventListener("click", async e => {
    const el = e.target;

    console.log(el);
    if (el.parentElement.classList.contains("delete-btn")) {
        const id = el.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`api/v1/home/ongoing/${id}`);
            showOngoingBooks();
        } catch (error) {
            console.log(error);
        }
    }

    if (el.parentElement.classList.contains("mark-completed")) {
        const id = el.parentElement.dataset.id;
        console.log(id);
        try {
            console.log('-------adding to completed--------');
            await axios.patch(`api/v1/home/completed/${id}`);
            showOngoingBooks();
            console.log('-------added to completed--------');
        } catch (error) {
            console.log(error);
        }
    }

    if (el.classList.contains("set-target")) {
        const bookName = el.dataset.name;
        console.log(bookName);
        const createdDate = new Date(el.dataset.created);
        console.log(createdDate);
        const target_days = Number(prompt("enter the number of days You need to finish the book :"));

        const targetDate = new Date(createdDate.setDate(createdDate.getDate() + target_days));
        console.log(new Date(targetDate));


        try {
            console.log('---------- adding target date ----------');
            await axios.patch(`api/v1/home/ongoing/edit/${bookName}`, { targetDate });
            showOngoingBooks();
            console.log('---------- added target date ----------');
        } catch (error) {
            console.log(error);
        }

        // console.log('-----------countDown Starts------------');
        // generateCountdown(targetDate);

    }
});









// * order preservation can be done in following way.
// * 1. run the timer function when the ongoing section is fired up.
// *    for that we need the timer function to be global and all the variables used should be global too
// *    the idea is to fire the timer function in the main showOngoingBooks() method.
// *    the problem in that is it will run the timer function for all the books in ongoing section but this is not what we want.
// *    we want the timer function to be set manually for each book but also run the timer all the books for which timer has been set earlier

// *    the solution is to change the schema of ongoing section and include one thing
// *    --> storing the target date acc to which the timer could be set during the loading of the ongoing page.


