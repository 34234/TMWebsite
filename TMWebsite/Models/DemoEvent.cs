using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMWebsite.Models
{
    public class DemoEvent
    {
        public DemoEvent()
        {

        }
        public string title { set; get; }
        public string diachi { set; get; }
        public string chude { set; get; }
        public string noidung { set; get; }
        public string start { set; get; }
        public string end { set; get; }
        public List<string>  lienquan { set; get; }
        public string ketqua { set; get; }
        public List<string> files { set; get; }
        public string className { set; get; }
        public string tinhtrang { set; get; }// tinh trạng có thể gồm có kết quả, chưa có kq (kq,ckq)
        public List<DemoEvent> getDataExamble()
        {
            List<DemoEvent> events = new List<DemoEvent>();
            events.Add(new Models.DemoEvent()
            {
                title = "Giao ban ngày 9/1/2017",
                diachi = "42 Đinh Tiên Hoàng",
                chude = "Họp giao ban",
                lienquan = new List<string>() { "PGD Nguyễn Văn A", "TPKD Nguyễn Văn B", "Phòng Kỹ Thuật" },
                noidung = "Họp giao ban định hướng kế hoạch đầu năm, và chúc tết toàn thể cán bộ",
                start = "2017-01-09T08:00:00",
                end = "2017-01-09T11:00:00",
                tinhtrang = "ckq"
            });
            events.Add(new Models.DemoEvent()
            {
                title = "Họp kỹ thuật 3/1/2017",
                diachi = "42 Đinh Tiên Hoàng",
                chude = "", 
                lienquan = new List<string>() { "TP Nguyễn Văn A", "Phòng Kỹ Thuật" },
                noidung = "Định hướng phát triển kỹ thuật, bàn về giải pháp giao tiếp giữa client, server",
                start = "2017-01-03T08:00:00",
                end = "2017-01-03T11:00:00",
                tinhtrang = "kq",
                ketqua = "xem chi tiết file đính kèm",
                files = new List<string>() { "truongphongphatbieu.pdf","ketluan.pdf," }
            });
            return events;
        }
    }
}