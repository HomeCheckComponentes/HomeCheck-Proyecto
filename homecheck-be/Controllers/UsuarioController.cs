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

        [HttpGet("get02", Name = "Get02")]
        public string Get02()
        {
            return "Get 2";
        }

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




        [HttpGet("{id}")]
        public ActionResult<List<Usuario>> UsuariosFamilia(string id)
        {
            var usuariosFamilia = _usuarioService.GetUsuariosFamilia(id);

            if (usuariosFamilia == null)
            {
                return NotFound();
            }

            return usuariosFamilia;

        }

        [HttpGet("{id}")]
        public ActionResult<Usuario> AdminFamilia(string id)
        {

            var adminFamilia = _usuarioService.GetAdminFamilia(id);

            if (adminFamilia == null)
            {
                return NotFound();
            }

            return adminFamilia;
        }


        [HttpGet("{id}")]
        public ActionResult<List<Usuario>> MiembrosFamilia(string id)
        {
            var adminFamilia = _usuarioService.GetMiembrosFamilia(id);

            if (adminFamilia == null)
            {
                return NotFound();
            }

            return adminFamilia;
        }

        [HttpGet]
        public ActionResult<Usuario> LoginUsuario(Usuario usuario)
        {
            var user = _usuarioService.GetByEmail(usuario.Email, usuario.Password);
            if (usuario == null)
                return NotFound(new { message = "Usuario o Contraseña incorrecta." });
            return Ok(user);
        }


        [HttpPost]
        public ActionResult<Usuario> Nuevo(Usuario usuario)
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

        [HttpPut("{id}")]
        public IActionResult Update(string id, Usuario usuarioIn)
        {
            var usuario = _usuarioService.Get(id);

            if (usuario == null)
            {
                return NotFound();
            }
            usuario.IdFamilia = id;
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
