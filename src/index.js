import {initializeApp} from 'firebase/app'
import {
    collection,
    onSnapshot,
    getFirestore, addDoc, deleteDoc, doc,
    query, where, 
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// get collection data (first import getDocs above from firestore)
// getDocs(colRef)
//     .then((snapshot) => {
//         //console.log(snapshot.docs)
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})


// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
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

// get a single document
const docRef = doc(db, 'books', 'GxLEavjLqvGuwGRWDP0h')

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })
})