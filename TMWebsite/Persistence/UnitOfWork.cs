using TMWebsite.Persistence.Repository;
using System;
using System.Runtime.InteropServices;
using TMWebsite.Models;
namespace TMWebsite.Persistence
{
    public class UnitOfWork :  IDisposable
    {
      
        ApplicationDbContext _db;
        public EventsReposittory EventsReposittory { set; get; }
        public UnitOfWork(ApplicationDbContext context)
        {
            _db = context;
            EventsReposittory = new EventsReposittory(context);

        }

        public int Persist()
        {
            return _db.SaveChanges();
        }

        #region Dispose
        private IntPtr nativeResource = Marshal.AllocHGlobal(100);
        ~UnitOfWork()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_db != null)
                {
                    _db.Dispose();
                    _db = null;
                }
            }
            if (nativeResource != IntPtr.Zero)
            {
                Marshal.FreeHGlobal(nativeResource);
                nativeResource = IntPtr.Zero;
            }
        }
        #endregion

    }
}