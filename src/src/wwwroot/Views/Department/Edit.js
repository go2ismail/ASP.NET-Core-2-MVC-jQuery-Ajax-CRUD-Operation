
var selectedDepartmentId = $("#departmentId").val();

GenerateGridList(selectedDepartmentId);
GenerateEmployeeDDL();


function GenerateEmployeeDDL() {
    

    $.ajax({

        type: "GET",
        url: "/API/Employee/GetEmployee",
        success: function (result) {
            
            var ddlData = $.map(result, function (obj) {
                obj.id = obj.id || obj.employeeId;
                obj.text = obj.text || obj.fullName;
                return obj;
            });

            $("#employeeId").select2({
                placeholder: "Select a employee",
                theme: "classic",
                data: ddlData
            });
        }

    });



}

function CreateData() {
    var formDetail = $('#formDetail').serialize();
    $.ajax({
        type: "POST",
        url: "/API/DepartmentEmployee/PostDepartmentEmployee",
        data: formDetail,
        success: function () {

            $('#ModalForm').modal('toggle');

            Message("Data successfuly saved.");

            GenerateGridList(selectedDepartmentId);
        },
        error: function () {
            Message("Data fail to saved.");
        }
    });
}

function EditData(DepartmentEmployeeId) {
    
    if (DepartmentEmployeeId != null && DepartmentEmployeeId > 0) {

        $.ajax({
            type: "GET",
            url: "/API/DepartmentEmployee/GetDepartmentEmployeeById",
            data: { id: DepartmentEmployeeId },
            success: function (result) {
                

                $('#departmentEmployeeId').val(result.departmentEmployeeId);
               
                $('#formDetail .form-group #employeeId').val(result.employeeId).trigger('change');
                $('#formDetail .form-group #description').val(result.description);

                $('#Create').addClass('hidden');
                $('#Update').removeClass('hidden');

                $('#ModalForm').modal({ backdrop: 'static', keyboard: false })  
            }
        });

    }
}

function UpdateData() {

    var formDetail = $('#formDetail').serialize();

    $.ajax({
        type: "PUT",
        url: "/API/DepartmentEmployee/PutDepartmentEmployee",
        data: formDetail,
        success: function () {

            $('#ModalForm').modal('toggle');

            $('#Create').removeClass('hidden');
            $('#Update').addClass('hidden');

            Message('Update success!');

            GenerateGridList(selectedDepartmentId);
        },
        error: function () {
            Message('Update failed!');
        }
    });
}

function DeleteData(departmentEmployeeId) {

    swal({
        title: "Are you sure?",
        text: "You will not be able to undo the process!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        if (departmentEmployeeId != null) {
            $.ajax({
                type: "DELETE",
                url: "/API/DepartmentEmployee/DeleteDepartmentEmployee",
                data: { id: departmentEmployeeId },
                success: function () {
                    GenerateGridList(selectedDepartmentId);
                    swal("Deleted!", "Your file has been deleted.", "success");
                },
                error: function () {
                    Message('Delete failed!');
                }
            });
        }

    });

}

function GenerateGridList(departmentId) {

    ResetForm();

    $.ajax({

        type: "GET",
        url: "/API/DepartmentEmployee/GetDepartmentEmployeeByDepartmentId",
        data: { id: departmentId},
        success: function (result) {
           
            if (result.length == 0) {
                $('table').addClass('hidden');
            } else {
                $('table').removeClass('hidden');
                $('#tbody').children().remove();
                $(result).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + result[i].description;
                    tr += "<td>" + result[i].employee.fullName;
                    tr += "<td>" + "<button class='btn btn-info' onclick=EditData(" + result[i].departmentEmployeeId + ")>" + "Edit";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=DeleteData(" + result[i].departmentEmployeeId + ")>" + "Delete";
                    tbody.append(tr);
                });
            }
        }

    });
}

function ResetForm() {
    
    $('#formDetail').each(function () {
        this.reset();
    });
}

function Message(text) {
    toastr.success(text)
}