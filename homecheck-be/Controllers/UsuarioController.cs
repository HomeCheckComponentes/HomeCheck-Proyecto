using Microsoft.AspNetCore.Mvc;
using homecheck_be.Models;
using homecheck_be.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homecheck_be.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly FamiliaService _familiaService;
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService, FamiliaService familiaService)
        {
            _usuarioService = usuarioService;
            _familiaService = familiaService;
        }

        [HttpGet]
        public ActionResult<List<Usuario>> Get() =>
            _usuarioService.Get();


        [HttpGet("{id}", Name = "usuario")]
        public ActionResult<Usuario> Get(string id)
        {
            var usuario = _usuarioService.Get(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpGet]
        public ActionResult<List<Usuario>> UsuariosFamilia(string id)
        {
            Familia f = _familiaService.Get(id);

            if(f != null)
            {
                var usuariosFamilia = _usuarioService.GetUsuariosFamilia(id);

                if (usuariosFamilia == null)
                {
                    return NotFound();
                }

                return usuariosFamilia;
            }
            return NotFound();

        }


        [HttpGet]
        public ActionResult<Usuario> AdminFamilia(string id)
        {

            Familia f = _familiaService.Get(id);

            if (f != null)
            {
                var adminFamilia = _usuarioService.GetAdminFamilia(id);

                if (adminFamilia == null)
                {
                    return NotFound();
                }

                return adminFamilia;
            }
            return NotFound();
        }


        [HttpGet]
        public ActionResult<List<Usuario>> MiembrosFamilia(string id)
        {

            Familia f = _familiaService.Get(id);

            if (f != null)
            {
                var adminFamilia = _usuarioService.GetMiembrosFamilia(id);

                if (adminFamilia == null)
                {
                    return NotFound();
                }

                return adminFamilia;
            }
            return NotFound();
        }


        [HttpPost("{id:length(30)}")]
        public ActionResult<Usuario> Create(string id, Usuario usuario)
        {
            Familia f = _familiaService.Get(id);

            if (f != null)
            {
                try
                {
                    _usuarioService.Create(usuario);
                    return Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(new { message = "Error general al registrar el usuario. Vuelva a intertarlo en unos minutos." });
                }

            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, Usuario usuarioIn)
        {
            var usuario = _usuarioService.Get(id);

            if (usuario == null)
            {
                return NotFound();
            }

            _usuarioService.Update(id, usuarioIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var usuario = _usuarioService.Get(id);

            if (usuario == null)
            {
                return NotFound();
            }

            _usuarioService.Remove(usuario.Id);

            return NoContent();
        }

    }
}
