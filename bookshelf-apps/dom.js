const incompleteBookId = "incompleteBookshelfList";
const completeBookId = "completeBookshelfList";
const bookItemId = "itemId";

function tambahBuku() {
	const incompleteBook = document.getElementById(incompleteBookId);

	const judul = document.getElementById('inputBookTitle').value;
	const penulis = document.getElementById('inputBookAuthor').value;
	const tahun = document.getElementById('inputBookYear').value;
	console.log("Judul"+ " " + judul);
	console.log("Penulis" + " " + penulis);
	console.log("Tahun" + " " + tahun);

	
		const buku = buatBuku(judul, penulis, tahun, false);
		const bukuObject = composebookObject(judul,penulis,tahun,false);

		buku[bookItemId] = bukuObject.id;
		incompleteBookshelfList.push(bukuObject);

		incompleteBook.append(buku);
		updateDataToStorage();
	
}

function buatBuku(dataJudul, dataPenulis, dataTahun, isCompleted) {
	const isiId = document.createElement("h4");
	isiId.innerText = new Date();

	const isiJudul = document.createElement("h3");
	isiJudul.innerText = dataJudul;

	const isiPenulis = document.createElement("P");
	isiPenulis.innerText = "Penulis: " + dataPenulis;

	const isiTahun = document.createElement('p');
	isiTahun.innerText ='Tahun: ' + dataTahun;

	const tombol = document.createElement('div');
	tombol.classList.add('action');

	const isiContainer = document.createElement('article');
	isiContainer.classList.add("book_item");
	isiContainer.append(isiJudul, isiPenulis, isiTahun);

	if(isCompleted){
        tombol.append(createUndoButton(),createTrashButton());
    } else {
        tombol.append(createCheckButton(),createTrashButton());
    }

	isiContainer.append(tombol);

    return isiContainer;
}

function createButton(buttonTypeClass ,buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function tambahKeComplete(taskElement) {
	const bookJudul = taskElement.querySelector('.book_item > h3').innerText;
	const bookPenulis = taskElement.querySelector('.book_item > p').innerText;
	const bookTahun = taskElement.querySelector('.book_item > p').innerText;

	const bukuBaru = buatBuku(bookJudul, bookPenulis, bookTahun, true);
	const completedBook = document.getElementById(completeBookId);

	const buku = findbook(taskElement[bookItemId]);
    buku.isCompleted = true;
    bukuBaru[bookItemId] = buku.id;

	completedBook.append(bukuBaru);
	taskElement.remove();

	updateDataToStorage();
}

function createCheckButton() {
	return createButton("green", "Selesai Dibaca", function(event){
		tambahKeComplete(event.target.parentElement.parentElement);
	});
}

function removeTaskFromCompleted(taskElement) {
	const todoPosition = findbookIndex(taskElement[bookItemId]);
   	incompleteBookshelfList.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("red", "Hapus Buku", function(event){
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){
    
    const incompleteBook = document.getElementById(incompleteBookId);
	const bookJudul = taskElement.querySelector('.book_item > h3').innerText;
	const bookPenulis = taskElement.querySelector('.book_item > p').innerText;
	const bookTahun = taskElement.querySelector('.book_item > p').innerText;
 
    const bukuBaru = buatBuku(bookJudul, bookPenulis, bookTahun, false);

    const buku = findbook(taskElement[bookItemId]);
   	buku.isCompleted = false;
   	bukuBaru[bookItemId] = buku.id;
 
    incompleteBook.append(bukuBaru);
    taskElement.remove();

    updateDataToStorage();
    
 
}

function createUndoButton() {
    return createButton("green", "Belum Selesai Dibaca", function(event){
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    });
}



























