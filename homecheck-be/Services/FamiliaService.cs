using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using homecheck_be.Models;
using homecheck_be.DatabaseSettings;

namespace homecheck_be.Services
{
    public class FamiliaService
    {
        private readonly IMongoCollection<Familia> _familias;

        public FamiliaService(IDatabaseSetting settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _familias = database.GetCollection<Familia>("Familias");
        }

        public List<Familia> Get() =>

           _familias.Find(familia => true).ToList();

        public Familia Get(string id) =>
            _familias.Find<Familia>(familia => familia.Id == id).FirstOrDefault();


        public Familia GetFamilia(string id)
        {
            return _familias.Find<Familia>(familia => familia.Id == id).FirstOrDefault();
        }
            
           
           


        public Familia Create(Familia familia)
        {
            _familias.InsertOne(familia);
            return familia;
        }

        public void Update(string id, Familia familiaIn) =>
            _familias.ReplaceOne(familia => familia.Id == id, familiaIn);

        public void Remove(Familia familiaIn) =>
            _familias.DeleteOne(familia => familia.Id == familiaIn.Id);

        public void Remove(string id) =>
            _familias.DeleteOne(familia => familia.Id == id);

    }
}
