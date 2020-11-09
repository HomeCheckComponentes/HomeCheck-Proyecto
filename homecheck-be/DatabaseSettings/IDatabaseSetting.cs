using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homecheck_be.Service
{
    public interface IDatabaseSetting
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
