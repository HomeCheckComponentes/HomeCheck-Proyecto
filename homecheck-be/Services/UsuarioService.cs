using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using homecheck_be.Models;
using homecheck_be.DatabaseSettings;

namespace homecheck_be.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarios;

        public UsuarioService(IDatabaseSetting settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _usuarios = database.GetCollection<Usuario>("Usuarios");
        }

        public List<Usuario> Get() =>
           _usuarios.Find(usuario => true).ToList();


        public List<Usuario> GetUsuariosFamilia(string id) =>
            _usuarios.Find(usuario => usuario.IdFamilia.Equals(id)).ToList();

        
        public List<Usuario> GetMiembrosFamilia(string id) =>
         _usuarios.Find(usuario => usuario.IdFamilia.Equals(id) && usuario.Member.Equals("Integrante")).ToList();


        public Usuario Get(string id) =>
            _usuarios.Find<Usuario>(usuario => usuario.Id == id).FirstOrDefault();


        public Usuario GetAdminFamilia(string id) =>
          _usuarios.Find<Usuario>(usuario => usuario.IdFamilia.Equals(id) && usuario.Usertype.Equals("AdminFamilia"))
            .FirstOrDefault();

        public Usuario Create(Usuario usuario)
        {
            _usuarios.InsertOne(usuario);
            return usuario;
        }

        public void Update(string id, Usuario usuarioIn) =>
            _usuarios.ReplaceOne(usuario => usuario.Id == id, usuarioIn);

        public void Remove(Usuario usuarioIn) =>
            _usuarios.DeleteOne(usuario => usuario.Id == usuarioIn.Id);

        public void Remove(string id) =>
            _usuarios.DeleteOne(usuario => usuario.Id == id);
    }
}
