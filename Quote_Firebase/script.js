let db = firebase.firestore()
var storageRef = firebase.storage().ref('photos/quotes')

let isEditing = false
let idQuote = null

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

function editQuote (id) {
  db.collection('quotes')
    .doc(id)
    .get()
    .then(doc => {
      const author = $('#author'),
        description = $('#description')
      doc = doc.data()
      author.val(doc.author)
      description.val(doc.description)
      isEditing = true
      idQuote = id
      openModal()
    })
}

function deleteQuote (id) {
  if (confirm('Are you sure to delete this quotes')) {
    db.collection('quotes')
      .doc(id)
      .delete()
      .then(() => {
        toastr.success('Delete quotes successfully')
      })
  }
}

function closeModal () {
  const author = $('#author'),
    description = $('#description')
  image = document.getElementById('image')
  $('.overplay:eq(0)').removeClass('show')
  $('.overplay:eq(0)').addClass('hide')
  author.val('')
  description.val('')
  image.value = ''
  isEditing = false
  idQuote = null
}

function openModal () {
  $('.overplay:eq(0)').removeClass('hide')
  $('.overplay:eq(0)').addClass('show')
}

$(document).ready(function () {
  // open create modal form
  $('#create-new').click(function () {
    openModal()
  })
  //close modal form
  $('#close-button').click(function () {
    closeModal()
  })

  $('#my-form').submit(function (e) {
    e.preventDefault()
    const author = $('#author'),
      description = $('#description')
    image = document.getElementById('image')

    if (author.val() === '') {
      return toastr.warning('Please enter author')
    }
    if (description.val() === '') {
      return toastr.warning('Please enter description')
    }

    if (!isEditing) {
      if (image && image.files[0]) {
        storageRef
          .child(ID()) // child of ref above /photo/quotes/idRadom
          .put(image.files[0])
          .then(function (doc) {
            return doc.ref.getDownloadURL()
          })
          .then(downloadUrl => {
            db.collection('quotes')
              .add({
                author: author.val(),
                description: description.val(),
                date: JSON.stringify(new Date()),
                downloadUrl
              })
              .then(function (doc) {
                toastr.success(`New quote have been posted`)
                closeModal()
              })
          })
          .catch(e => {
            console.log(e)
          })
      } else
        db.collection('quotes')
          .add({
            author: author.val(),
            description: description.val(),
            date: JSON.stringify(new Date())
          })
          .then(function (doc) {
            toastr.success(`New quote have been posted`)
            author.val('')
            description.val('')
            closeModal()
          })
    } else {
      db.collection('quotes')
        .doc(idQuote)
        .update({
          author: author.val(),
          description: description.val()
        })
        .then(function (doc) {
          toastr.success(`New quote have been updated`)
          closeModal()
        })
    }
  })

  db.collection('quotes').onSnapshot(function (data) {
    let s = ''
    data.docs.forEach(element => {
      s += `
        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="my-card">
              <img src=${
                element.data().downloadUrl
                  ? element.data().downloadUrl
                  : 'https://i.picsum.photos/id/966/300/300.jpg'
              } />
              <p class="title">${element.data().author}</p>
              <quote class="description">
                ${element.data().description}
              </quote>
              <div class="group-button">
                <i onclick="deleteQuote('${
                  element.id
                }')" class="fas fa-trash-alt delete"></i>
                <i onclick="editQuote('${element.id}')" class="fas fa-edit"></i>
              </div>
            </div>
            
        </div>
        `
    })
    $('#container').html(s)
  })
})
