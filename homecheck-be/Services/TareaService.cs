using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using homecheck_be.DatabaseSettings;
using homecheck_be.Models;
using MongoDB.Driver;

namespace homecheck_be.Services
{
    public class TareaService
    {

        private readonly IMongoCollection<Tareas> _tareas;

        public TareaService(IDatabaseSetting settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _tareas = database.GetCollection<Tareas>("Tareas");
        }

        public List<Tareas> Get() =>

           _tareas.Find(tarea => true).ToList();

        public Tareas Get(string id) =>
            _tareas.Find<Tareas>(tarea => tarea.Id == id).FirstOrDefault();

        public Tareas Create(Tareas tarea)
        {
            _tareas.InsertOne(tarea);
            return tarea;
        }

        public void Update(string id, Tareas tareaIn) =>
            _tareas.ReplaceOne(tarea => tarea.Id == id, tareaIn);

        public void Remove(Tareas tareaIn) =>
            _tareas.DeleteOne(tarea => tarea.Id == tareaIn.Id);

        public void Remove(string id) =>
            _tareas.DeleteOne(tarea => tarea.Id == id);


        public List<Tareas> GetTareasFamilia(string id) =>
            _tareas.Find(tarea => tarea.Id_familia.Equals(id)).ToList();
    }
}
