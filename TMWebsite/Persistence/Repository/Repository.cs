using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

using TMWebsite.Models;

namespace TMWebsite.Persistence.Repository
{
    public class Repository<T>  where T : class
    {
        protected readonly ApplicationDbContext _db;
        public Repository(ApplicationDbContext context)
        {
            _db = context;
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _db.Set<T>().Where(predicate).ToList();
        }

        public T Get(int id)
        {
            return _db.Set<T>().Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return _db.Set<T>().ToList();
        }

        public void Add(T item)
        {
            _db.Set<T>().Add(item);
        }

        public void AddRange(IEnumerable<T> items)
        {
            _db.Set<T>().AddRange(items);
        }


        public void Remove(T item)
        {
            _db.Set<T>().Remove(item);
        }

        public void RemoveRange(IEnumerable<T> items)
        {
            _db.Set<T>().RemoveRange(items);
        }

        public void Update(T item)
        {
            _db.Entry(item).State = System.Data.Entity.EntityState.Modified;
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _db.Set<T>().FirstOrDefault(predicate);
        }
    }
}