using Microsoft.AspNetCore.Mvc;
using homecheck_be.Models;
using homecheck_be.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace homecheck_be.Controllers
{
  
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class FamiliasController : ControllerBase
    {
        private readonly FamiliaService _familiaService;

        public FamiliasController(FamiliaService familiaService)
        {
            _familiaService = familiaService;
        }

        [HttpGet]
        public ActionResult<List<Familia>> Get() =>
            _familiaService.Get();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Familia> Get(string id)
        {
            var familia = _familiaService.Get(id);

            if (familia == null)
            {
                return NotFound();
            }

            return familia;
        }

        [HttpPost]
        public IActionResult Create(Familia familia)
        {
           

            //return CreatedAtRoute("GetFamilia", new { id = familia.Id.ToString() }, familia);
            try
            {
                _familiaService.Create(familia);
                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Familia familiaIn)
        {
            var familia = _familiaService.Get(id);

            if (familia == null)
            {
                return NotFound();
            }

            _familiaService.Update(id, familiaIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var familia = _familiaService.Get(id);

            if (familia == null)
            {
                return NotFound();
            }

            _familiaService.Remove(familia.Id);

            return NoContent();
        }

    }
}
