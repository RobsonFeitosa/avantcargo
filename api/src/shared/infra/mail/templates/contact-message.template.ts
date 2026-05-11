export function contactMessageTemplate(data: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nova mensagem de contato</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#0d4f3c;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">AVANT CARGO</h1>
              <p style="margin:6px 0 0;color:#6ee7b7;font-size:13px;">Nova mensagem via formulário de contato</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 24px;color:#0d4f3c;font-size:18px;">Detalhes do contato</h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Nome</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.name}</strong>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Empresa</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.company}</strong>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">E-mail</span><br/>
                    <a href="mailto:${data.email}" style="color:#0d9488;font-size:15px;font-weight:600;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Telefone</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.phone}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Serviço de interesse</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.service || "Não informado"}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Mensagem</span><br/>
                    <p style="margin:8px 0 0;color:#333;font-size:15px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">Esta mensagem foi enviada automaticamente pelo site <strong>avantcargo.com.br</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
