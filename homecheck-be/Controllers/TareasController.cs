using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using homecheck_be.Models;
using homecheck_be.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace homecheck_be.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TareasController : ControllerBase
    {

        private readonly TareaService _tareaService;

        public TareasController(TareaService tareaService)
        {
            _tareaService = tareaService;
        }

        [HttpGet(Name ="GetTareas")]
        public ActionResult<List<Tareas>> Get() =>
            _tareaService.Get();

        [HttpGet("{id:length(24)}", Name = "GetTarea")]
        public ActionResult<Tareas> Get(string id)
        {
            var tarea = _tareaService.Get(id); 

            if (tarea == null)
            {
                return NotFound();
            }

            return tarea;
        }

        [HttpPost]
        public ActionResult<Tareas> Create(Tareas tareas)
        {
           

            try
            {
                return _tareaService.Create(tareas); 

            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message); 
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, Tareas tarea)
        {
            var tareas = _tareaService.Get(id);

            if (tareas == null)
            {
                return NotFound();

            }

            _tareaService.Update(id, tarea);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var tareas = _tareaService.Get(id);

            if (tareas == null)
            {
                return NotFound();
            }

            _tareaService.Remove(tareas.Id);

            return NoContent();
        }
    }
}
