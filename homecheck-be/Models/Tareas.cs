using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace homecheck_be.Models
{
    public class Tareas
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string descripcion { get; set;  }

        public string persona { get; set;  }

        public DateTime fechaAsignada { get; set;  }

        public DateTime fechaLimite { get; set;  }

        public string estado { get; set; }  //posibles estados: completada, no se realizo



    }
}
