using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homecheck_be.DatabaseSettings
{
    public class DatabaseSetting : IDatabaseSetting
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSetting
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
