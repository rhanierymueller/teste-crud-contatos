import { formatPhone } from '../utils/formatPhone'

export default function ContactTable({ contacts, loading, menuOpenId, onMenuToggle, onEdit, onDelete }) {
  if (loading) {
    return <p className="text-gray-400 text-center py-8">Carregando...</p>
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="px-4 py-3 font-semibold">Nome</th>
          <th className="px-4 py-3 font-semibold">E-mail</th>
          <th className="px-4 py-3 font-semibold">Telefone</th>
          <th className="px-4 py-3" />
        </tr>
      </thead>
      <tbody>
        {contacts.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center text-gray-400 py-8">
              Nenhum contato cadastrado ainda.
            </td>
          </tr>
        ) : (
          contacts.map(contact => (
            <tr key={contact.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{contact.name}</td>
              <td className="px-4 py-3 text-gray-500">{contact.email}</td>
              <td className="px-4 py-3 text-gray-500">{formatPhone(contact.phone)}</td>
              <td className="px-4 py-3 text-right relative">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    onMenuToggle(contact.id)
                  }}
                  className="text-gray-400 hover:text-gray-700 px-2 py-1 rounded text-lg leading-none"
                >
                  ⋮
                </button>
                {menuOpenId === contact.id && (
                  <div className="absolute right-4 top-8 bg-white border rounded shadow-lg z-10 min-w-32">
                    <button
                      onClick={() => onEdit(contact)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
