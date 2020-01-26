// this is script for website

const url = "https://5ce2c23be3ced20014d35e3d.mockapi.io/api/todos";

async function getDataFromMockAPI() {
  let result = await $.ajax({
    url,
    type: "GET",
    success: function(data) {
      let s = "";
      data.forEach(element => {
        s += `
            <div class="todo-item">
                <i class="fas fa-tag"></i>
                <div class="date">${
                  element && element.date ? element.date : "NULL"
                } / No.<span>${
          element && element.id ? element.id : "NULL"
        }</span></div> 
                ${
                  element && element.completed == "true"
                    ? `<input onClick="updateStatus(${element.id},${element.completed})" type="checkbox" checked />`
                    : `<input onClick="updateStatus(${element.id},${element.completed})" type="checkbox" />`
                }<span class="${
          element && element.completed == "true" ? "line-through" : ""
        }">${element && element.title ? element.title : "NULL"}</span>
                <div class="action">
                <button class="pencil" onClick="updateTodo(${element.id},'${
          element.title
        }')"><i class="fas fa-pencil-alt"></i></button>
                <button onClick="deleteTodo(${
                  element.id
                })" class="trash"><i class="fas fa-trash"></i></button>
                </div>
            </div>        
        `;
      });
      $("#result").html(s);
    },
    error: function(errors) {
      console.log(errors);
    }
  });
}

async function deleteTodo(idTodo) {
  let result = await $.ajax({
    type: "DELETE",
    url: `${url}/${idTodo}`,
    success: async function(data) {
      toastr.success("Delete successfully");
      await getDataFromMockAPI();
    },
    error: function(errors) {
      console.log(errors);
    }
  });
}

$(document).ready(async function() {
  toastr.info("Welcome to my Todo App.");
  await getDataFromMockAPI();
});

// When user click submit
$("#form").submit(async function(e) {
  e.preventDefault();
  await submitFunction();
});

async function submitFunction() {
  let p = $("#todo-input").val();
  if (p === "") {
    toastr.error("Please enter your Todo name");
  } else {
    let date = new Date();
    let s = `${date.getDate()}-${date.getMonth() +
      1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    await $.ajax({
      type: "POST",
      data: {
        title: p,
        date: s
      },
      url,
      success: async function() {
        toastr.success("Add todo successfully");
        await getDataFromMockAPI();
        $("#todo-input").val("");
      },
      error: function(errors) {
        console.log(errors);
      }
    });
  }
}

$("#btn-submit").click(async function() {
  await submitFunction();
});

async function updateStatus(idTodo, status) {
  console.log(status);
  await $.ajax({
    type: "PUT",
    data: {
      completed: status === true ? false : true
    },
    url: `${url}/${idTodo}`,
    success: async function() {
      toastr.success(`Update Todo #${idTodo} successfully`);
      await getDataFromMockAPI();
    }
  });
}

function updateTodo(id, title) {
  $("#input-title").val(title);
  $("#id-todo").val(id);
  $("#modal").modal("show");
}

$("#form-modal").submit(async function(e) {
  e.preventDefault();
  let id = $("#id-todo").val();
  let p = $("#input-title").val();
  if (p === "") {
    toastr.error("Please enter new todo name");
  } else {
    await $.ajax({
      url: `${url}/${id}`,
      data: {
        title: p
      },
      type: "PUT",
      success: async function() {
        toastr.success("Update todo successfully"), $("#id-todo").val("");
        $("#modal").modal("hide");
        await getDataFromMockAPI();
      }
    });
  }
});

$(document).ajaxStart(function() {
  $("#overplay").removeClass("hide");
  $("#overplay").addClass("show");
});

$(document).ajaxStop(function() {
  $("#overplay").removeClass("show");
  $("#overplay").addClass("hide");
});
