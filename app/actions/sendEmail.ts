'use server'

import nodemailer from 'nodemailer'

export async function sendEmail(formData: {
  nome: string
  cognome: string
  azienda: string
  telefono: string
  email: string
  messaggio: string
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  try {
    await transporter.verify()

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: formData.email,
      subject: `Nuovo Contatto: ${formData.nome} ${formData.cognome}`,
      text: `
                Nome: ${formData.nome} ${formData.cognome}
                Azienda: ${formData.azienda || 'Non specificata'}
                Telefono: ${formData.telefono || 'Non specificato'}
                Email: ${formData.email}
                
                Messaggio:
                ${formData.messaggio}
            `,
      html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #22d3ee;">Nuovo Messaggio dal Sito</h2>
                    <p><strong>Nome:</strong> ${formData.nome} ${formData.cognome}</p>
                    <p><strong>Azienda:</strong> ${formData.azienda || 'Non specificata'}</p>
                    <p><strong>Telefono:</strong> ${formData.telefono || 'Non specificato'}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Messaggio:</strong></p>
                    <p style="white-space: pre-wrap;">${formData.messaggio}</p>
                </div>
            `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to send email' }
  }
}
