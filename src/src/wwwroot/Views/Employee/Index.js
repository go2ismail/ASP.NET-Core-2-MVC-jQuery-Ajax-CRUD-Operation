$(document).ready(function () {


    //make function inside closure global, delegate can be used for alternative approach
    window.EditData = EditData;
    window.DeleteData = DeleteData;
    window.UpdateData = UpdateData;
    window.DeleteData = DeleteData;
    window.CreateData = CreateData;
    window.AddData = AddData;

    GenerateGridList();

    function GetToken() {
        $.ajax({
            type: "GET",
            url: "/API/Token/RequestToken",
            success: function (result) {
                jwt = result;
            },
            error: function () {
                Message("Fail to get Token.");
            }
        });
    }

    function AddData() {
        $('#employeeId').val(0);
        $('#ModalForm').modal('toggle');
    }

    function CreateData() {

        $.ajax({
            type: "GET",
            url: "/API/Token/RequestToken",
            success: function (result) {
                var formEmployee = $('#formEmployee').serialize();
                $.ajax({
                    type: "POST",
                    url: "/API/Employee/PostEmployee",
                    headers: { 'Authorization': 'Bearer ' + result },
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
            },
            error: function () {
                Message("Fail get the token.");
            }
        });


    }

    function EditData(employeeId) {

        $.ajax({
            type: "GET",
            url: "/API/Token/RequestToken",
            success: function (result) {
                if (employeeId != null && employeeId > 0) {

                    $.ajax({
                        type: "GET",
                        url: "/API/Employee/GetEmployeeByID",
                        headers: { 'Authorization': 'Bearer ' + result },
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
            },
            error: function () {
                Message("Fail to get Token.");
            }
        });



    }

    function UpdateData() {

        $.ajax({
            type: "GET",
            url: "/API/Token/RequestToken",
            success: function (result) {

                var formEmployee = $('#formEmployee').serialize();

                $.ajax({
                    type: "PUT",
                    url: "/API/Employee/PutEmployee",
                    headers: { 'Authorization': 'Bearer ' + result },
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
            },
            error: function () {
                Message("Fail to get Token.");
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
                    type: "GET",
                    url: "/API/Token/RequestToken",
                    success: function (result) {
                        $.ajax({
                            type: "DELETE",
                            url: "/API/Employee/DeleteEmployee",
                            headers: { 'Authorization': 'Bearer ' + result },
                            data: { id: employeeId },
                            success: function () {
                                GenerateGridList();
                                swal("Deleted!", "Your file has been deleted.", "success");
                            },
                            error: function () {
                                Message('Delete failed!');
                            }
                        });
                    },
                    error: function () {
                        Message("Fail to get Token.");
                    }
                });


            }

        });

    }

    function GenerateGridList() {

        $.ajax({
            type: "GET",
            url: "/API/Token/RequestToken",
            success: function (result) {

                ResetForm();

                $.ajax({

                    type: "GET",
                    url: "/API/Employee/GetEmployee",
                    headers: { 'Authorization': 'Bearer ' + result },
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
                                tr += "<td>" + "<button class='btn btn-info' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#ModalForm' onclick='EditData(" + result[i].employeeId + ")'>" + "Edit";
                                tr += "<td>" + "<button class='btn btn-danger' onclick=DeleteData(" + result[i].employeeId + ")>" + "Delete";
                                tbody.append(tr);
                            });
                        }
                    }

                });
            },
            error: function () {
                Message("Fail to get Token.");
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

});


