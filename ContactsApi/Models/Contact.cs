using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models;

public class Contact
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O campo Nome é obrigatório!")]
    [MaxLength(100, ErrorMessage = "O campo Nome deve ter no máximo 100 caracteres!")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo email é obrigatório!")]
    [MaxLength(200, ErrorMessage = "O campo email deve ter no máximo 200 caracteres!")]
    [EmailAddress(ErrorMessage = "Informe um endereço de e-mail válido!")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo telefone é obrigatório!")]
    [RegularExpression(@"^\d{10,11}$", ErrorMessage = "O telefone deve conter 10 ou 11 dígitos numéricos")]
    public string Phone { get; set; } = string.Empty;
}
