const buttonAdd = document.getElementById('add')
const buttonRemove = document.getElementById('clearNotes')

const notes = JSON.parse(localStorage.getItem('notes'))
let notesCount = 0

let notescheck = notes ? notes.length : 0

if (notescheck === 0) {
    localStorage.setItem('notesCount', 0)
    notesCount = JSON.parse(localStorage.getItem('notesCount'))
} else if (notes) {
    notes.forEach(note => addNewNote(note.content, note.title))
    if (notes.length > 1) {
        localStorage.setItem('notesCount', notes.length)
        notesCount = JSON.parse(localStorage.getItem('notesCount'))
        buttonRemove.style.opacity = '1'
        buttonRemove.disabled = false
    }
}



buttonAdd.addEventListener('click', () => {
    addNewNote()
    notesCount++
    localStorage.setItem('notesCount', JSON.stringify(notesCount))
    if (notesCount > 1) {
        buttonRemove.style.opacity = '1'
        buttonRemove.disabled = false
    }
})

buttonRemove.addEventListener('click', () => {
    const notes = document.querySelectorAll('.note')
    localStorage.setItem('notesCount', 0)
    notesCount = JSON.parse(localStorage.getItem('notesCount'))

    notes.forEach(note => {
        note.style.width = '0px'
        note.style.overflow = 'hidden'
        note.style.margin = '30px 0'
        setTimeout(() => {
            note.remove()
            updateLS()

        }, 400)
    })
    buttonRemove.style.opacity = '0'
    buttonRemove.disabled = true
})


function addNewNote(text = '', title = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.style.transform = 'rotateY(90deg)'
    note.innerHTML = `
        <div class="tools">
            <input type="text" placeholder="Title..." class="noteTitle" value="${title ? title : ""}">
            <button class="close"><i class="fa-solid fa-chevron-down"></i></button>
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea name="" id="" class = "${text ? "hidden" : ""}"></textarea>
    `
    const noteTitle = note.querySelector('.noteTitle')
    const close = note.querySelector('.close')
    const edit = note.querySelector('.edit')
    const deleteNote = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)
    noteTitle.value = title

    close.addEventListener('click', (e) => {
        note.classList.toggle('close')
    })

    deleteNote.addEventListener('click', () => {
        note.style.width = '0px'
        note.style.overflow = 'hidden'
        note.style.margin = '30px 0'
        setTimeout(() => {
            note.remove()
            updateLS()

        }, 400)
    })

    edit.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
        note.classList.remove('close')
    })

    textArea.addEventListener('input', (e) => {
        console.log(e)
        const { value } = e.target
        main.innerHTML = marked.parse(value)
        updateLS()
    })

    noteTitle.addEventListener('input', (e) => {
        updateLS()
    })

    setTimeout(() => {
        note.style.transform = 'rotateY(0)'
    }, 0)
    document.body.appendChild(note)
}

function updateLS() {
    const notesQ = document.querySelectorAll('.note')

    const notes = []

    notesQ.forEach(note => {
        const ttarea = note.querySelector('textArea')
        const title = note.querySelector('.noteTitle')
        notes.push({ content: ttarea.value, title: title.value })
    })
    localStorage.setItem('notes', JSON.stringify(notes))
}