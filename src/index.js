import {initializeApp} from 'firebase/app'
import {
    collection,
    getDocs,
    getFirestore, addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAs0mBmSPMzwWxnJPFZvbB0XByH7uthSeM",
    authDomain: "learning-firebase-d3454.firebaseapp.com",
    projectId: "learning-firebase-d3454",
    storageBucket: "learning-firebase-d3454.appspot.com",
    messagingSenderId: "654183269849",
    appId: "1:654183269849:web:61175fdf63aae013b205c8"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        //console.log(snapshot.docs)
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    })
    .then(() => {
        addBookForm.reset()
    })

})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
})
