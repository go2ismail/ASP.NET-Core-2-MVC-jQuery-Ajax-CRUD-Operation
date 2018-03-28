var selectedDepartmentId = $("#departmentId").val();

GenerateGridList(selectedDepartmentId);



function GenerateGridList(departmentId) {


    $.ajax({

        type: "GET",
        url: "/API/DepartmentEmployee/GetDepartmentEmployeeByDepartmentId",
        data: { id: departmentId },
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
                    tbody.append(tr);
                });
            }
        }

    });
}