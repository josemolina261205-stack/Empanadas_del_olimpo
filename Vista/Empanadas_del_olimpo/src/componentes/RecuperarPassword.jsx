import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14; --surface: #161920; --border: #252a35;
    --accent: #c8a96e; --text: #e8e4dc; --muted: #6b7180;
    --error: #e07070; --success: #6ec8a0;
    --input-bg: #1c2030; --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rp-root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 16px;
    background-image:
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 30% 40% at 90% 100%, rgba(126,107,170,0.08) 0%, transparent 60%);
  }

  .rp-card {
    width: 100%;
    max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 44px 40px 36px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  }

  .rp-stepper {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 32px;
  }

  .rp-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    position: relative;
  }

  .rp-step-circle {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: var(--input-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    z-index: 1;
    transition: all 0.3s;
  }

  .rp-step.active .rp-step-circle {
    border-color: var(--accent);
    background: rgba(200,169,110,0.15);
    color: var(--accent);
  }

  .rp-step.done .rp-step-circle {
    border-color: var(--success);
    background: rgba(110,200,160,0.15);
    color: var(--success);
  }

  .rp-step-label {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.5px;
    text-align: center;
    white-space: nowrap;
  }

  .rp-step.active .rp-step-label { color: var(--accent); }
  .rp-step.done .rp-step-label { color: var(--success); }

  .rp-step-line {
    flex: 1;
    height: 1px;
    background: var(--border);
    margin-bottom: 20px;
    transition: background 0.3s;
  }

  .rp-step-line.done { background: var(--success); }

  .rp-icon {
    width: 52px; height: 52px;
    background: rgba(200,169,110,0.08);
    border: 1px solid rgba(200,169,110,0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }

  .rp-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: var(--text);
    margin-bottom: 6px;
  }

  .rp-sub {
    font-size: 13.5px;
    color: var(--muted);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .rp-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .rp-label {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .rp-input {
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    width: 100%;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .rp-input::placeholder { color: #3d4354; }
  .rp-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.12);
  }

  .rp-code-row {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .rp-code-digit {
    flex: 1;
    text-align: center;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px 4px;
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
  }

  .rp-code-digit:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.12);
  }

  .rp-resend {
    font-size: 12.5px;
    color: var(--muted);
    text-align: center;
    margin-bottom: 20px;
  }

  .rp-resend a { color: var(--accent); text-decoration: none; }
  .rp-resend a:hover { text-decoration: underline; }

  .rp-btn {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #c8a96e, #b89358);
    border: none;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    font-weight: 500;
    color: #0d0f14;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    letter-spacing: 0.5px;
  }

  .rp-btn:hover { opacity: 0.9; }
  .rp-btn:active { transform: scale(0.99); }
  .rp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .rp-btn-ghost {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--muted);
    cursor: pointer;
    margin-top: 10px;
    transition: border-color 0.2s, color 0.2s;
  }
  .rp-btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  .rp-success-wrap {
    text-align: center;
    padding: 8px 0;
  }

  .rp-success-icon {
    width: 60px; height: 60px;
    background: rgba(110,200,160,0.1);
    border: 1px solid rgba(110,200,160,0.3);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    margin: 0 auto 16px;
  }

  .rp-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--success);
    margin-bottom: 8px;
  }

  .rp-success-sub {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .rp-err-msg {
    font-size: 11px;
    color: var(--error);
    margin-top: 2px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rp-step-content { animation: fadeUp 0.35s ease forwards; }
`;

const STEPS = ["Correo", "Código", "Nueva clave"];

export default function RecuperarPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const handleEmailSend = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Ingresa un correo válido.");
      return;
    }
    setEmailErr("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(1); }, 1000);
  };

  const handleCodeChange = (i, v) => {
    const next = [...code];
    next[i] = v.replace(/\D/, "").slice(-1);
    setCode(next);
    if (v && i < 5) document.getElementById(`cd-${i + 1}`)?.focus();
  };

  const handleCodeVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 900);
  };

  const handleReset = () => {
    if (newPass.length < 6) { setPassErr("Mínimo 6 caracteres."); return; }
    if (newPass !== confirmPass) { setPassErr("Las contraseñas no coinciden."); return; }
    setPassErr("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1000);
  };

  const stepClass = (i) =>
    i < step ? "done" : i === step ? "active" : "";

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        <div className="rp-card">
          {/* Stepper */}
          <div className="rp-stepper">
            {STEPS.map((label, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div className={`rp-step ${stepClass(i)}`}>
                  <div className="rp-step-circle">
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="rp-step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`rp-step-line ${i < step ? "done" : ""}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 0 */}
          {step === 0 && (
            <div className="rp-step-content">
              <div className="rp-icon">📧</div>
              <h2 className="rp-title">Recuperar contraseña</h2>
              <p className="rp-sub">
                Ingresa tu correo electrónico y te enviaremos un código de verificación.
              </p>
              <div className="rp-field">
                <label className="rp-label">Correo electrónico</label>
                <input
                  type="email"
                  className="rp-input"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr && <span className="rp-err-msg">{emailErr}</span>}
              </div>
              <button className="rp-btn" onClick={handleEmailSend} disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
              <button className="rp-btn-ghost" onClick={() => {}}>← Volver al inicio de sesión</button>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div className="rp-step-content">
              <div className="rp-icon">🔑</div>
              <h2 className="rp-title">Verifica tu código</h2>
              <p className="rp-sub">
                Ingresamos un código de 6 dígitos al correo <strong style={{ color: "var(--text)" }}>{email}</strong>
              </p>
              <div className="rp-code-row">
                {code.map((d, i) => (
                  <input
                    key={i}
                    id={`cd-${i}`}
                    className="rp-code-digit"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !code[i] && i > 0)
                        document.getElementById(`cd-${i - 1}`)?.focus();
                    }}
                  />
                ))}
              </div>
              <p className="rp-resend">¿No recibiste el código? <a href="#">Reenviar</a></p>
              <button className="rp-btn" onClick={handleCodeVerify} disabled={loading || code.some((d) => !d)}>
                {loading ? "Verificando..." : "Verificar código"}
              </button>
              <button className="rp-btn-ghost" onClick={() => setStep(0)}>← Cambiar correo</button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="rp-step-content">
              <div className="rp-icon">🔒</div>
              <h2 className="rp-title">Nueva contraseña</h2>
              <p className="rp-sub">Elige una contraseña segura para tu cuenta.</p>
              <div className="rp-field">
                <label className="rp-label">Nueva contraseña</label>
                <input
                  type="password"
                  className="rp-input"
                  placeholder="Mínimo 6 caracteres"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div className="rp-field">
                <label className="rp-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="rp-input"
                  placeholder="Repite la contraseña"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                {passErr && <span className="rp-err-msg">{passErr}</span>}
              </div>
              <button className="rp-btn" onClick={handleReset} disabled={loading}>
                {loading ? "Guardando..." : "Restablecer contraseña"}
              </button>
            </div>
          )}

          {/* Step 3 — Éxito */}
          {step === 3 && (
            <div className="rp-step-content rp-success-wrap">
              <div className="rp-success-icon">✓</div>
              <h2 className="rp-success-title">¡Contraseña restablecida!</h2>
              <p className="rp-success-sub">
                Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva clave.
              </p>
              <button className="rp-btn" onClick={() => setStep(0)}>Ir al inicio de sesión</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
