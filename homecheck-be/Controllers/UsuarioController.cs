using Microsoft.AspNetCore.Mvc;
using homecheck_be.Models;
using homecheck_be.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace homecheck_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
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


        [HttpGet("{id:length(24)}", Name = "usuario")]
        public ActionResult<Usuario> Get(string id)
        {
            var usuario = _usuarioService.Get(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpGet("{id_familia:length(24)}")]
        public ActionResult<List<Usuario>> UsuariosFamilia(string id_familia, string id_user)
        {
            Familia f = _familiaService.Get(id_familia);

            if(f != null)
            {
                var usuariosFamilia = _usuarioService.GetUsuariosFamilia(id_user);

                if (usuariosFamilia == null)
                {
                    return NotFound();
                }

                return usuariosFamilia;
            }
            return NotFound();

        }


        [HttpGet("{id_familia:length(24)}")]
        public ActionResult<Usuario> AdminFamilia(string id_familia)
        {

            Familia f = _familiaService.Get(id_familia);

            if (f != null)
            {
                var adminFamilia = _usuarioService.GetAdminFamilia(id_familia);

                if (adminFamilia == null)
                {
                    return NotFound();
                }

                return adminFamilia;
            }
            return NotFound();
        }


        [HttpGet("{id_familia:length(24)}")]
        public ActionResult<List<Usuario>> MiembrosFamilia(string id_familia)
        {

            Familia f = _familiaService.Get(id_familia);

            if (f != null)
            {
                var adminFamilia = _usuarioService.GetMiembrosFamilia(id_familia);

                if (adminFamilia == null)
                {
                    return NotFound();
                }

                return adminFamilia;
            }
            return NotFound();
        }


        [HttpPost("{id_familia:length(24)}")]
        public ActionResult<Usuario> Create(string id_familia, Usuario usuario)
        {
            Familia f = _familiaService.Get(id_familia);

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

        [HttpPut("{id_familia:length(24)}/{id_user:length(24)}")]
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

        [HttpDelete("{id:length(24)}")]
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
