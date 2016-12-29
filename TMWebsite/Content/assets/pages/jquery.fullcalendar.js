/**
* Theme: Qu?n Lý Công Vi?c Admin Template
* Author: Coderthemes
* Component: Full-Calendar
* 
*/




!function ($) {
    "use strict";

    var CalendarApp = function () {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#calendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) {
        alert('lonz');
        var $this = this;
        // retrieve the dropped element's stored Event Object
        var originalEventObject = eventObj.data('eventObject');
        var $categoryClass = eventObj.attr('data-class');
        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);
        // assign it the date that was reported
        copiedEventObject.start = date;
        if ($categoryClass)
            copiedEventObject['className'] = [$categoryClass];
        // render the event on the calendar
        $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            eventObj.remove();
        }
    },
    /* on click on event */
    CalendarApp.prototype.onEventClick = function (calEvent, jsEvent, view) {
        // redirec to detail event        

        //var $this = this;
        //    var form = $("<form></form>");
        //    form.append("<label>lonz</label>");
        //    form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.id + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Save</button></span></div>");
        //    $this.$modal.modal({
        //        backdrop: 'static'
        //    });
        //    $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
        //        $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
        //            return (ev._id == calEvent._id);
        //        });
        //        $this.$modal.modal('hide');
        //    });
        //    $this.$modal.find('form').on('submit', function () {
        //        calEvent.title = form.find("input[type=text]").val();
        //        $this.$calendarObj.fullCalendar('updateEvent', calEvent);
        //        $this.$modal.modal('hide');
        //        return false;
        //    });
    },
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        //var $this = this;
        //    $this.$modal.modal({
        //        backdrop: 'static'
        //    });
        //    var form = $("<form></form>");
        //    form.append("<div class='row'></div>");
        //    form.find(".row")
        //        .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Event Name</label><input class='form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>")
        //        .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>")
        //        .find("select[name='category']")
        //        .append("<option value='bg-danger'>Danger</option>")
        //        .append("<option value='bg-success'>Success</option>")
        //        .append("<option value='bg-purple'>Purple</option>")
        //        .append("<option value='bg-primary'>Primary</option>")
        //        .append("<option value='bg-pink'>Pink</option>")
        //        .append("<option value='bg-info'>Info</option>")
        //        .append("<option value='bg-warning'>Warning</option></div></div>");
        //    $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
        //        form.submit();
        //    });
        //    $this.$modal.find('form').on('submit', function () {
        //        var title = form.find("input[name='title']").val();
        //        var beginning = form.find("input[name='beginning']").val();
        //        var ending = form.find("input[name='ending']").val();
        //        var categoryClass = form.find("select[name='category'] option:checked").val();
        //        if (title !== null && title.length != 0) {
        //            $this.$calendarObj.fullCalendar('renderEvent', {
        //                title: title,
        //                start:start,
        //                end: end,
        //                allDay: false,
        //                className: categoryClass
        //            }, true);  
        //            $this.$modal.modal('hide');
        //        }
        //        else{
        //            alert('You have to give a title to your event');
        //        }
        //        return false;

        //    });
        //    $this.$calendarObj.fullCalendar('unselect');
    },
    CalendarApp.prototype.enableDrag = function () {
        //init events
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }
    /* Initializing */
    CalendarApp.prototype.init = function () {
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());
        var defaultEvents;
        // lay du lieu 
        $.ajax({
            type: 'GET',
            url: '/Customers/GetTaskCurrentUser',
            datatype: "json",
            async: false,
        }).done(function (d) {
            defaultEvents = d;
            var i = 0
            // for (i; i < d.length; i++) {
            //d[i].start = new Date(d[i].start.substr(6))
            //}
        });

        //var defaultEvents =  [{
        //        title: 'Hey!',
        //        start: new Date($.now() + 158000000),
        //        className: 'bg-purple'
        //    }, {
        //        title: 'See John Deo',
        //        start: today,
        //        end: today,
        //        className: 'bg-danger'
        //    }, {
        //        title: 'Buy a Theme',
        //        start: new Date($.now() + 338000000),
        //        className: 'bg-primary'
        //    }];

        var $this = this;
        var currenday = new Date();
        $this.$calendarObj = $this.$calendar.fullCalendar({
            //defaultDate: '2016-11-11',
            //slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            //minTime: '08:00:00',
            //maxTime: '19:00:00',  
            defaultView: 'month',
            handleWindowResize: true,
            height: $(window).height() - 150,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: defaultEvents,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            eventDrop: function (event, delta, revertFunc) {
                $this.updatetime(event.start.format(), '1991-1-1', event.id);
                //alert(event.title + " was dropped on " + event.start.format());

                //if (!confirm("Are you sure about this change?")) {
                //    revertFunc();
                //}

            },
            eventResize: function (event, delta, revertFunc) {
                $this.updatetime('1991-1-1', event.end.format(), event.id);
                //alert(event.title + " end is now " + event.end.format());

                //if (!confirm("is this okay?")) {
                //    revertFunc();
                //}

            },
            select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function (calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

        });
        CalendarApp.prototype.updatetime = function (start, end, id) {
            try {
                $.ajax({
                    type: 'GET',
                    url: '/Customers/UpdateTimeTask',//?startdate=2016-11-15&enddate=2016-12-01&idtanks=1', // get role
                    datatype: "json",
                    data: { startdate: start, enddate: end, id: id },
                    async: true,
                }).done(function (d) {
                }).fail(function (g) {
                    console.debug(g);
                });
            } catch (e) {
                console.debug(e);
            }
        }
        //on new event
        this.$saveCategoryBtn.on('click', function () {
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-move"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }

        });
    },

    //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp

}(window.jQuery),

//initializing CalendarApp
function ($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);

$(document).ready(function () {
    var cbodvi = $('#cbodvi');
    var cbopban = $('#cbopban');
    var cbonvien = $('#cbonvien');
    var cboLoaiCviec = $('#cboLoaiCviec');
    var btntimkiem = $('#btntimkiem');
    var btnPrivateTask = $('#btnPrivateTask');
    var madviqly;
    var mapban;
    var manvien;
    var maDuan;
    var maChuDe;
    var ngayHetHan;
    // get role
    $.ajax({
        type: 'GET',
        url: '/Customers/GetRoleUser', // get role
        datatype: "json",
        async: false,
    }).done(function (d) {
        if (d != true) // role duoc phep show combobox
        {
            $('#idx_frmtimkiem').hide();
        } else {
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
                getTaskCate();
                //cbodvi.selectmenu('refresh');
            });
            // $('$CategoryId').hide();
        }
        // for (i; i < d.length; i++) {
        //d[i].start = new Date(d[i].start.substr(6))
        //}
    });

    function getTaskCate()
    {
        $.ajax({
            type: 'GET',
            url: '/Customers/GetTaskCate', // get role
            datatype: "json",     
            async: false,
        }).done(function (d) {
            if (d.length > 0)
            {
                if (d.length > 1)
                {
                    cboLoaiCviec.append('<option value="' + "all" + '">' + "--- Chọn chủ đề ---" + '</option>');
                }                
                for (i = 0; i < d.length; i++) {
                    cboLoaiCviec.append('<option value="' + d[i].Id + '">' + d[i].Caption + '</option>');
                }
            }
            else
            {
                cboLoaiCviec.append('<option value="' + 0 + '">' + "Chưa có dữ liệu" + '</option>');
            }

            cboLoaiCviec.change(function (event) {
                maChuDe = this.value;
                //getnvien(iddvi);
            });
            maChuDe = d[0].Id;                       
        });
    }

    function getPhongBan(madviqly) {
        cbopban.html('');
        cbonvien.html('');
        $.ajax({
            type: 'GET',
            url: '/Customers/Getphongban', // get role
            datatype: "json",
            data: { madviqly: madviqly },
            async: false,
        }).done(function (d) {
            if (d.length > 0)
            {
                if (d.length > 1)
                {
                    cbopban.append('<option value="' + "all" + '">' + "--- Chọn phòng ban ---" + '</option>');
                }                
                for (i = 0; i < d.length; i++) {
                    cbopban.append('<option value="' + d[i].MA_PBAN + '">' + d[i].TEN_PBAN + '</option>');
                }
            }
            else
            {
                cbopban.append('<option value="' + 0 + '">' + "Chưa có dữ liệu" + '</option>');
            }
         
            cbopban.change(function (event) {
                mapban = this.value;
                getnvien(madviqly, mapban);
            });
            mapban = d[0].MA_PBAN;
            getnvien(madviqly, mapban);
            // cbopban.selectmenu('refresh');
        });
    }

    function getnvien(madviqly, mapban) {
        cbonvien.html('');
        $.ajax({
            type: 'GET',
            url: '/Customers/Getnhanvien', // get role
            datatype: "json",
            data: { madviqly: madviqly, maphongban: mapban },
            async: false,
        }).done(function (d) {
            if (d.length > 0)
            {
                cbonvien.append('<option value="' + "all" + '">' + "--- Chọn nhân viên ---" + '</option>');
                for (i = 0; i < d.length; i++) {
                    cbonvien.append('<option value="' + d[i].Id + '">' + d[i].FULL_NAME + '</option>');
                }
            }
            else {
                cbonvien.append('<option value="' + 0 + '">' + "Chưa có dữ liệu" + '</option>');
            }
         
            cbonvien.change(function (event) {
                manvien = this.value;
                //getnvien(iddvi);
            });
            manvien = d[0].Id;
            //                getdata(iddvi);
            //cbonvien.selectmenu('refresh'); 
            // $('$CategoryId').hide();

            // for (i; i < d.length; i++) {
            //d[i].start = new Date(d[i].start.substr(6))
            //}
        });
    }

    $('#btnPrivateTask').click(function () {
       
        // get event from userid
        $.ajax({
            type: 'GET',
            url: '/Customers/GetTaskCurrentUser',
            datatype: "json",
            data: { projectId: maDuan, categoryId: maChuDe, dueDate: ngayHetHan, userId: manvien },
            async: false,
        }).done(function (d) {

            $.CalendarApp.$calendar.fullCalendar('removeEvents', function (e) { return true });// remove all
            for (i = 0; i < d.length; ++i) {
                $.CalendarApp.$calendar.fullCalendar('renderEvent', {
                    title: d[i].title,
                    end: d[i].end,
                    start: d[i].start,
                    //allDay: true,
                    //defaultDate: currenday,
                    //nonstandard field
                    //isUserCreated: true,
                    //description: description,
                    url: "/TaskItems/Details/" + d[i].id,
                    id: d[i].id,
                }, true);
            }
        });

    });


    $('#btntimkiem').click(function () {

        // get event from userid
        manvien = cbonvien.val();
        maChuDe = cboLoaiCviec.val();
        
        $.ajax({
            type: 'GET',
            url: '/Customers/GetTaskUserById',
            datatype: "json",
            data: { projectId: maDuan, categoryId: maChuDe, dueDate: ngayHetHan,strmaDvi:madviqly,strMaPban:mapban, userId: manvien },
            async: false,
        }).done(function (d) {

            $.CalendarApp.$calendar.fullCalendar('removeEvents', function (e) { return true });// remove all
            for (i = 0; i < d.length; ++i) {
                $.CalendarApp.$calendar.fullCalendar('renderEvent', {
                    title: d[i].title,
                    end: d[i].end,
                    start: d[i].start,
                    //allDay: true,
                    //defaultDate: currenday,
                    //nonstandard field
                    //isUserCreated: true,
                    //description: description,
                    url: "/TaskItems/Details/" + d[i].id,
                    id: d[i].id,
                }, true);
            }
        });

    });

});