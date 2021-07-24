const STORAGE_KEY = "bookshelfApps";
 
let incompleteBookshelfList = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false;
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(incompleteBookshelfList);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       incompleteBookshelfList = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composebookObject(dataJudul, dataPenulis, dataTahun, isCompleted) {
   return {
       id: +new Date(),
       dataJudul,
       dataPenulis,
       dataTahun,
       isCompleted
   };
}
 
function findbook(bookId) {
   for(book of incompleteBookshelfList){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function findbookIndex(bookId) {
   let index = 0
   for (book of incompleteBookshelfList) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
}
 

 
