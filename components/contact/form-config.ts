export const formStructure = [
  [
    { name: 'nome', label: 'Nome', placeholder: 'Mario' },
    { name: 'cognome', label: 'Cognome', placeholder: 'Rossi' },
  ],

  [
    { name: 'azienda', label: 'Azienda', placeholder: 'Nome Azienda' },
    { name: 'telefono', label: 'Telefono', placeholder: '+39 333...', type: 'tel' },
  ],

  [{ name: 'email', label: 'Email', placeholder: 'mario.rossi@azienda.com', type: 'email' }],

  [
    {
      name: 'messaggio',
      label: 'Messaggio',
      placeholder: 'Raccontaci il tuo progetto...',
      isTextArea: true,
    },
  ],
] as const
