

GenerateGridList();


function CreateData() {
    var formEmployee = $('#formEmployee').serialize();
    $.ajax({
        type: "POST",
        url: "/API/Employee/PostEmployee",
        data: formEmployee,
        success: function () {

            $('#ModalForm').modal('toggle');

            Message("Data successfuly saved.");

            GenerateGridList();
        },
        error: function () {
            Message("Data fail to saved.");
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

            $('#ModalForm').modal('toggle');

            $('#Create').removeClass('hidden');
            $('#Update').addClass('hidden');

            Message('Update success!');

            GenerateGridList();
        },
        error: function () {
            Message('Update failed!');
        }
    });
}

function DeleteData(employeeId) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to undo the process!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        if (employeeId != null) {
            $.ajax({
                type: "DELETE",
                url: "/API/Employee/DeleteEmployee",
                data: { id: employeeId },
                success: function () {
                    GenerateGridList();
                    swal("Deleted!", "Your file has been deleted.", "success");
                },
                error: function () {
                    Message('Delete failed!');
                }
            });
        }

    });

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
                    tr += "<td>" + "<button class='btn btn-info' data-toggle='modal' data-target='#ModalForm' onclick=EditData(" + result[i].employeeId + ")>" + "Edit";
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

function Message(text) {
    toastr.success(text)
}