import { useEffect, useState } from 'react'
import ContactTable from './components/ContactTable'
import ContactModal from './components/ContactModal'
import { formatPhone } from './utils/formatPhone'

/* Deixei a url hardcoded para facilitar a execução mas o ideal
era ter uma variável de ambiente para isso */
const API_URL = 'http://localhost:5000/contacts'

const emptyForm = { name: '', email: '', phone: '' }

export default function App() {
  const [contacts, setContacts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(API_URL)

      if (!res.ok) {
        throw new Error('Erro ao carregar contatos!')
      }

      setContacts(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? 'PUT' : 'POST'

      //Aqui eu estou apenas removendo a mascara do telefone
      const payload = { ...form, phone: form.phone.replace(/\D/g, '') }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json()
          const messages = Object.values(data.errors || {}).flat()
          throw new Error(messages.join('\n'))
        } else if (res.status === 409) {
          const data = await res.json()
          throw new Error(data.message)
        } else {
          throw new Error('Erro ao salvar contato!')
        }
      }

      setForm(emptyForm)
      setEditingId(null)
      setShowModal(false)
      await fetchContacts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError(null)
    setShowModal(true)
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id)
    setForm({ name: contact.name, email: contact.email, phone: formatPhone(contact.phone) })
    setError(null)
    setShowModal(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este contato?')) return

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })

      if (!res.ok) throw new Error('Erro ao excluir contato')

      await fetchContacts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crud de Contatos</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Contato
        </button>
      </div>

      {error && !showModal && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <ContactTable
        contacts={contacts}
        loading={loading}
        menuOpenId={menuOpenId}
        onMenuToggle={id => setMenuOpenId(menuOpenId === id ? null : id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <ContactModal
          editingId={editingId}
          form={form}
          error={error}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
