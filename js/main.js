// Random User API
RANDOM_USER_API = "https://randomuser.me/api/?results=5"

fetch(RANDOM_USER_API)
  .then(response => response.json())
  .then(json_data => {
    buildDraggableList(json_data)
    draggableListener()
  });

// Build the draggable list
function buildDraggableList(json_source ){
  const draggable_column = document.querySelector(".column_one")

  json_source["results"].forEach(function(record) {
    let draggable_div = document.createElement("div")
    draggable_div.setAttribute("class","draggable")
    draggable_div.setAttribute("draggable", "true");

    let draggable_img_div = document.createElement("div")
    draggable_img_div.setAttribute("class","card__img__container")
    let draggable_img_el = document.createElement("img")
    draggable_img_el.setAttribute("class","card__img")
    draggable_img_el.setAttribute("src", record.picture.medium)

    draggable_img_div.appendChild(draggable_img_el)
    draggable_div.appendChild(draggable_img_div)

    let draggable_body_div = document.createElement("div")
    draggable_body_div.setAttribute("class","card__header")

    let draggable_body_header = document.createElement("h3")
    draggable_body_header.setAttribute("class","card__header__text")
    let card__header = document.createTextNode(record.name.first)
    draggable_body_header.appendChild(card__header)
    draggable_body_div.appendChild(draggable_body_header)

    let draggable_body_text = document.createElement("p")
    draggable_body_text.setAttribute("class","card__text")
    let card__text = document.createTextNode(record.name.country)
    draggable_body_text.appendChild(card__text)
    draggable_body_div.appendChild(draggable_body_text)
    draggable_div.appendChild(draggable_body_div)

    draggable_column.appendChild(draggable_div)

  });

}

// Initialize the draggable elements
const containers = document.querySelectorAll('.draggable_container')

// Add event listeners to style the dragged element

function draggableListener(){
  const draggables = document.querySelectorAll('.draggable')
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })

    // remove the class after the end of dragging
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })}

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = calAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function calAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
