/**
* Theme: Uplon Admin Template
* Author: Coderthemes
* Component: Full-Calendar
* 
*/




!function($) {
    "use strict";

    var CalendarApp = function() {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#calendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
        this.$sourceCompelete=['Nguyễn Văn A','Nguyễn Văn B','Công ty điện lực A','Phòng Kinh Doanh','Phòng CNTT','GD Phạm Văn A', 'Tổng giám đốc','Thư ký B']
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) { 
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
    CalendarApp.prototype.onEventClick =  function (e, jsEvent, view) {
        var $this = this;
        var demoevent = { title: e.title, diachi: e.diachi, chude: e.chude, noidung: e.noidung, start: e.start.format(), end: e.end.format(), lienquan: e.lienquan, ketqua: e.ketqua, files: e.files, className: e.className, tinhtrang: e.tinhtrang } ;       
        $.ajax({
            type: 'get',
            url: '/Event/UpdateEvent',
            datatype: 'json',
            contentType: 'application/json',
            data: demoevent,
            async: false,
        }).done(function (d) {
            $('#update-event-modal').modal({
                    backdrop: 'static'
            });
            $('#update-event-modal').find('.modal-body').empty().prepend(d).end().find('.btn-success').unbind('click').click(function () {
            });
            $this.binddata(e);           
        });
          
    },
     CalendarApp.prototype.binddata = function (e) {
         var $this = this;
         //$('#txtlienquan').val(data.title);
         $('#txtlienquan').tagEditor({
             autocomplete: {
                 delay: 0, // show suggestions immediately                 
                 source: $this.$sourceCompelete,
             },
             initialTags:e.lienquan,
             forceLowercase: false,
             placeholder: 'Nhập các bên liên quan'
         });
         var badau = e.start.format('DD/MM/YYYY h.mm');
         var ketthuc = e.end.format('DD/MM/YYYY h.mm');
         $('#txtngaybd').val(badau);
         $('#txtngaykt').val(ketthuc);
         // format datetime picker
         $('#txtngaybd').datetimepicker({                  
             format: 'd/m/Y H:i'
         });

         $('#txtngaykt').datetimepicker({             
             format: 'd/m/Y H:i'
         });

    }
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        var $this = this;
        $.ajax({
            type: 'get',
            url: '/Event/ADDEvent',
            datatype: 'json',
            contentType: 'application/json',           
            async: false,
        }).done(function (d) {
            $('#update-event-modal').modal({
                backdrop: 'static'
            });
            $('#update-event-modal').find('.modal-body').empty().prepend(d).end().find('.btn-success').unbind('click').click(function () {
                var title = $("#txttieude").val();
                var noidung = $("#txtnoidung").val();
                var ending = $('#txtsongay').val();
                var lienquan = $('#txtlienquan').tagEditor('getTags')[0].tags;
                if (title !== null && title.length != 0) {
                    $this.$calendarObj.fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: end,
                        allDay: true,
                        lienquan: lienquan,                        
                    }, true);
                    $('#update-event-modal').modal('hide');                    
                }
                else {
                    alert('You have to give a title to your event');
                }
               
            });

            

            $('#txtlienquan').tagEditor({
                autocomplete: {
                    delay: 0, // show suggestions immediately                 
                    source: $this.$sourceCompelete,
                },
                initialTags: "",
                forceLowercase: false,
                placeholder: 'Nhập các bên liên quan'
            });
        });
                             
            $this.$calendarObj.fullCalendar('unselect');
    },
    CalendarApp.prototype.enableDrag = function() {
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
    CalendarApp.prototype.init = function() {
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());
        var defaultEvents;
        //get data for event 
        $.ajax({
            type: 'GET',
            url: '/Event/GetDemoData',
            datatype: "json",
            async: false,
        }).done(function (d) {
            defaultEvents = d;
            var i = 0
           
        });


        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            //slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
           // minTime: '08:00:00',
           // maxTime: '19:00:00',  
            defaultView: 'month',  
            handleWindowResize: true,   
            height: $(window).height() - 200,   
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
            drop: function (date) { $this.onDrop($(this), date); },
            eventResize: function (event, delta, revertFunc) {               
            },
            select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

        });

        //on new event
        this.$saveCategoryBtn.on('click', function(){
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
function($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);
