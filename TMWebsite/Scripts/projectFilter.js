$(document).ready(function () {

    var cbodvi = $('#cbodvi');
    var cbopban = $('#cbopban');
    var btntimkiem = $('#btntimkiem');
    var madviqly;
    var mapban;

    // lay thong tin don vi
    $.ajax({
        type: 'GET',
        url: '/Customers/GetDviqly', // get role
        datatype: "json",
    }).done(function (d) {
        for (i = 0; i < d.length; i++) {
            cbodvi.append('<option value="' + d[i].MA_DVIQLY + '">' + d[i].TEN_DVIQLY + '</option>');
        }
        cbodvi.change(function (event) {
            madviqly = this.value;
            getPhongBan(madviqly);
        });
        madviqly = d[0].MA_DVIQLY;
        getPhongBan(madviqly);
        //cbodvi.selectmenu('refresh');
    });

    function getPhongBan(madviqly) {

        cbopban.html('');
        $.ajax({
            type: 'GET',
            url: '/Customers/Getphongban', // get role
            datatype: "json",
            data: { madviqly: madviqly },
            async: false,
        }).done(function (d) {
            if (d.length > 0) {
                if (d.length > 1) {
                    cbopban.append('<option value="' + "all" + '">' + "--- Chọn phòng ban ---" + '</option>');
                }
                for (i = 0; i < d.length; i++) {
                    cbopban.append('<option value="' + d[i].MA_PBAN + '">' + d[i].TEN_PBAN + '</option>');
                }
            }
            else {
                cbopban.append('<option value="' + 0 + '">' + "Chưa có dữ liệu" + '</option>');
            }
            mapban = d[0].MA_PBAN;
            // cbopban.selectmenu('refresh');
        });
    }


    $('#btntimkiem').click(function () {
        var selectDVi = $('#cbodvi').val();
        var selectPban = $('#cbopban').val();
        var currentSearh = $('#txtSearch').val();

        // get event from userid
        $.ajax({
            type: 'GET',
            url: '/Projects/ListProject',
            datatype: "json",
            data: { maDvi: selectDVi,maPban:selectPban  },
            async: false,
            error: function () {
                toastr.options.showEasing = 'swing';
                toastr.options.hideEasing = 'linear';
                toastr.options.closeEasing = 'linear';
                toastr.options.progressBar = true;
                toastr.options.showDuration = 300;
                toastr.options.hideDuration = 1000;
                toastr.options.timeOut = 5000;
                toastr.options.extendedTimeOut = 1000;
                toastr.error('Không lấy được dữ liệu!', 'Thông báo!')
            }
        }).done(function (d) {         
            $("#listProject").html("");
            $("#listProject").html(d);
        });

    });

});