const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//img preview
function previewFile() {
    const preview = $("#img-preview");
    const file = $("#avartar").files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function() {
            // convert image file to base64 string
            preview.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

//list user
function render(url, div) {
    axios({
        method: "GET",
        url: url,
        responseType: "JSON",
    }).then(({ data }) => {
        console.log("data");
        var html =
            data &&
            JSON.parse(data).map((item) => {
                return `<tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.status == 0 ? "Active" : "InActive"}</td>
                    <td>${item.role.name}</td>
                    <td><img src="${item.avartar}" width="150"></td>
                    <td> <a href="edit-user.html?id=${
                      item.id
                    }" class="btn btn-warning">Edit </a> </td>
                    </tr>`;
            });
        $(div).innerHTML = html.join("");
    });
}

//load role
axios({
    method: "GET",
    url: "http://localhost:3000/roles",
    responseType: "JSON",
}).then(({ data }) => {
    var html =
        data &&
        JSON.parse(data).map((item) => {
            return `<option value="${item.id}">${item.name}</option>`;
        });
    $("#role").innerHTML = html.join("");
});