export const formStructure = [
  // Row 1
  [
    { name: 'nome', label: 'Nome', placeholder: 'Mario' },
    { name: 'cognome', label: 'Cognome', placeholder: 'Rossi' },
  ],
  // Row 2
  [
    { name: 'azienda', label: 'Azienda', placeholder: 'Nome Azienda' },
    { name: 'telefono', label: 'Telefono', placeholder: '+39 333...', type: 'tel' },
  ],
  // Row 3
  [{ name: 'email', label: 'Email', placeholder: 'mario.rossi@azienda.com', type: 'email' }],
  // Row 4
  [
    {
      name: 'messaggio',
      label: 'Messaggio',
      placeholder: 'Raccontaci il tuo progetto...',
      isTextArea: true,
    },
  ],
] as const
