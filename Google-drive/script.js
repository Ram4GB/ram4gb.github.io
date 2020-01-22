const url = "https://gallery-ram4gb.herokuapp.com";
let currentPage = 0;
const limit = 4;

$(document).ready(async function() {
  // $(document).ajaxStart(() => {
  //   $("#content").html(`<img class="gif" src="./giphy.gif" />`);
  // });

  $("#form-submit").submit(e => {
    e.preventDefault();
    if (!$("#file").val()) return toastr.error("Missing file");
    if (!$("#file-title").val()) return toastr.error("Missing title");

    $("#submit-btn").prop("disabled", true);

    $("#form-submit").ajaxSubmit({
      url: url + "/upload",
      type: "POST",
      success: async function(data) {
        $("#file-title").val("");
        $("#file").val(null);
        toastr.success("Upload image successfully");
        await getData(0);
      },
      error: function(error) {
        console.log(error);
      }
    });

    $("#submit-btn").prop("disabled", false);
  });
  await getData(0);
});

async function getData(page) {
  currentPage = page;
  await $.ajax({
    method: "GET",
    url: url + "/list-images" + `?page=${page}&limit=${limit}`,
    success: function(value) {
      let s = "";
      value.data.forEach(value => {
        s += `
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="gallery-item">
                <img
                  src="https://drive.google.com/uc?id=${value.idImage}"
                  alt=""
                />
                <h4>${value.title}</h4>
              </div>
            </div>        
        `;
      });
      $("#content").html(s);
      let pagination = "";
      const range = Math.ceil(parseInt(value.count) / limit);
      for (let i = 1; i <= range; i++) {
        if (i - 1 == currentPage)
          pagination += `
          <li class="active" onClick="changePage(${i - 1})">${i}</li>
        `;
        else
          pagination += `
        <li onClick="changePage(${i - 1})">${i}</li>
      `;
      }
      $("#content-li").html(pagination);
    }
  });
}

async function changePage(page) {
  await getData(page);
}
