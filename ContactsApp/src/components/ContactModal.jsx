import { formatPhone } from '../utils/formatPhone'

export default function ContactModal({ editingId, form, error, onChange, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="font-semibold text-lg mb-4">
          {editingId ? 'Editar contato' : 'Novo contato'}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error.split('\n').map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          )}
          <input
            className="border rounded px-3 py-2"
            placeholder="Nome"
            value={form.name}
            onChange={e => onChange({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={e => onChange({ ...form, email: e.target.value })}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Telefone"
            value={form.phone}
            onChange={e => onChange({ ...form, phone: formatPhone(e.target.value) })}
            required
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
