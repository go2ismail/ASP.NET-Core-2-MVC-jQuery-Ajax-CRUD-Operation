

GenerateGridList();


function CreateData() {
    var formEmployee = $('#formEmployee').serialize();
    console.log(formEmployee);
    $.ajax({
        type: "POST",
        url: "/API/Employee/PostEmployee",
        data: formEmployee,
        success: function () {

            Message("success", "Data successfuly saved.");

            GenerateGridList();
        },
        error: function () {
            Message("danger", "Data fail to saved.");
        }
    });
}

function EditData(employeeId) {
    if (employeeId != null && employeeId > 0) {

        $.ajax({
            type: "GET",
            url: "/API/Employee/GetEmployeeByID",
            data: { id: employeeId },
            success: function (result) {
                console.log(result);
                $('#employeeId').val(result.employeeId);
                $('#fullName').val(result.fullName);
                $('#address').val(result.address);

                $('#Create').addClass('hidden');
                $('#Update').removeClass('hidden');
            }
        });

    }
}

function UpdateData() {

    var formEmployee = $('#formEmployee').serialize();
    $.ajax({
        type: "PUT",
        url: "/API/Employee/PutEmployee",
        data: formEmployee,
        success: function () {

            $('#Create').removeClass('hidden');
            $('#Update').addClass('hidden');

            Message('success', 'Update success!');

            GenerateGridList();
        },
        error: function () {
            Message('danger', 'Update failed!');
        }
    });
}

function DeleteData(employeeId) {

    var confirmation = confirm('Are you sure you want to delete the data?');
    if (confirmation) {

        if (employeeId != null) {
            $.ajax({
                type: "DELETE",
                url: "/API/Employee/DeleteEmployee",
                data: { id: employeeId },
                success: function () {
                    GenerateGridList();
                    Message('success', 'Data deleted succesufully.');
                },
                error: function () {
                    Message('danger', 'Delete failed!');
                }
            });
        }

    }
}

function GenerateGridList() {
    ResetForm();

    $.ajax({

        type: "GET",
        url: "/API/Employee/GetEmployee",
        success: function (result) {
            if (result.length == 0) {
                $('table').addClass('hidden');
            } else {
                $('table').removeClass('hidden');
                $('#tbody').children().remove();
                $(result).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + result[i].fullName;
                    tr += "<td>" + result[i].address;
                    tr += "<td>" + "<button class='btn btn-info' onclick=EditData(" + result[i].employeeId + ")>" + "Edit";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=DeleteData(" + result[i].employeeId + ")>" + "Delete";
                    tbody.append(tr);
                });
            }
        }

    });
}

function ResetForm() {
    $('#formEmployee').each(function () {
        this.reset();
    });
}

function Message(kelas, text) {
    $("#message").remove();

    setTimeout(function () {
        $('#formEmployee').append("<div class='alert alert-" + kelas + "' id=info role=alert>" + text + "</div>");
    }, 10);
}