using ContactsApi.Data;
using ContactsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var contacts = await _context.Contacts.ToListAsync();
        return Ok(contacts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var contact = await _context.Contacts.FindAsync(id);

        if (contact == null)
        {
            return NotFound();
        }

        return Ok(contact);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Contact contact)
    {
        var exists = await _context.Contacts.AnyAsync(c => c.Email == contact.Email);

        if (exists)
        {
            return Conflict(new { message = "Já existe um contato com este e-mail!" });
        }

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Contact updated)
    {
        var contact = await _context.Contacts.FindAsync(id);

        if (contact == null)
        {
            return NotFound();
        }

        var exists = await _context.Contacts.AnyAsync(c => c.Email == updated.Email && c.Id != id);

        if (exists)
        {
            return Conflict(new { message = "Já existe um contato com este e-mail!" });
        }

        contact.Name = updated.Name;
        contact.Email = updated.Email;
        contact.Phone = updated.Phone;

        await _context.SaveChangesAsync();

        return Ok(contact);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var contact = await _context.Contacts.FindAsync(id);

        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
