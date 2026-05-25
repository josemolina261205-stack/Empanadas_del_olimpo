import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14; --surface: #161920; --border: #252a35;
    --accent: #c8a96e; --text: #e8e4dc; --muted: #6b7180;
    --error: #e07070; --input-bg: #1c2030; --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background-image:
      radial-gradient(ellipse 50% 60% at 0% 50%, rgba(200,169,110,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 100% 0%, rgba(126,107,170,0.1) 0%, transparent 60%);
  }

  .lg-panel-left {
    flex: 1;
    display: none;
    background: linear-gradient(160deg, #13161f 0%, #0d0f14 100%);
    border-right: 1px solid var(--border);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 48px;
    gap: 24px;
  }

  @media (min-width: 800px) { .lg-panel-left { display: flex; } }

  .lg-brand-icon {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, #c8a96e33, #7e6baa33);
    border: 1px solid rgba(200,169,110,0.3);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
  }

  .lg-brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    color: var(--text);
    text-align: center;
    line-height: 1.2;
  }

  .lg-brand-desc {
    font-size: 14px;
    color: var(--muted);
    text-align: center;
    max-width: 280px;
    line-height: 1.7;
  }

  .lg-dots {
    display: flex; gap: 8px; margin-top: 12px;
  }
  .lg-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--border);
  }
  .lg-dot.active { background: var(--accent); width: 20px; border-radius: 4px; }

  .lg-panel-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
  }

  .lg-card {
    width: 100%;
    max-width: 400px;
    animation: fadeUp 0.45s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lg-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .lg-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    color: var(--text);
    margin-bottom: 6px;
  }

  .lg-sub {
    font-size: 13.5px;
    color: var(--muted);
    margin-bottom: 32px;
  }

  .lg-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .lg-label {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .lg-input-wrap {
    position: relative;
  }

  .lg-input {
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .lg-input::placeholder { color: #3d4354; }
  .lg-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.12);
  }
  .lg-input.err { border-color: var(--error); }

  .lg-eye {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: var(--muted); cursor: pointer;
    font-size: 16px; line-height: 1;
    padding: 4px;
  }

  .lg-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .lg-check-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    cursor: pointer;
  }

  .lg-check {
    width: 16px; height: 16px;
    accent-color: var(--accent);
  }

  .lg-forgot {
    font-size: 13px;
    color: var(--accent);
    text-decoration: none;
  }
  .lg-forgot:hover { text-decoration: underline; }

  .lg-btn {
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
    letter-spacing: 0.5px;
    transition: opacity 0.2s, transform 0.1s;
  }

  .lg-btn:hover { opacity: 0.9; }
  .lg-btn:active { transform: scale(0.99); }
  .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .lg-err-banner {
    background: rgba(224,112,112,0.08);
    border: 1px solid rgba(224,112,112,0.25);
    border-radius: var(--radius);
    padding: 10px 14px;
    font-size: 13px;
    color: var(--error);
    margin-bottom: 16px;
  }

  .lg-footer {
    text-align: center;
    margin-top: 22px;
    font-size: 13px;
    color: var(--muted);
  }

  .lg-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
  }
  .lg-link:hover { text-decoration: underline; }

  .lg-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 22px 0;
    font-size: 12px;
    color: var(--muted);
  }
  .lg-divider::before, .lg-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
  }
`;

export default function Login() {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.usuario || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Usuario o contraseña incorrectos. Intenta de nuevo.");
    }, 1000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lg-root">
        <div className="lg-panel-left">
          <div className="lg-brand-icon">🏪</div>
          <h2 className="lg-brand-title">Panel de Gestión Comercial</h2>
          <p className="lg-brand-desc">
            Administra inventario, ventas y reportes en un solo lugar. Accede con tu cuenta autorizada.
          </p>
          <div className="lg-dots">
            <div className="lg-dot active" />
            <div className="lg-dot" />
            <div className="lg-dot" />
          </div>
        </div>

        <div className="lg-panel-right">
          <div className="lg-card">
            <span className="lg-eyebrow">✦ Acceso al sistema</span>
            <h1 className="lg-title">Bienvenido</h1>
            <p className="lg-sub">Ingresa tus credenciales para continuar.</p>

            {error && <div className="lg-err-banner">⚠ {error}</div>}

            <div className="lg-field">
              <label className="lg-label">Usuario o correo</label>
              <input
                className="lg-input"
                placeholder="usuario@ejemplo.com"
                value={form.usuario}
                onChange={set("usuario")}
                autoComplete="username"
              />
            </div>

            <div className="lg-field">
              <label className="lg-label">Contraseña</label>
              <div className="lg-input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  className="lg-input"
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={set("password")}
                  style={{ paddingRight: 40 }}
                  autoComplete="current-password"
                />
                <button className="lg-eye" onClick={() => setShowPw(!showPw)}>
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="lg-row">
              <label className="lg-check-label">
                <input
                  type="checkbox"
                  className="lg-check"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Recordarme
              </label>
              <a href="#" className="lg-forgot">¿Olvidaste tu contraseña?</a>
            </div>

            <button className="lg-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Verificando..." : "Iniciar sesión"}
            </button>

            <p className="lg-footer">
              ¿No tienes cuenta?{" "}
              <a href="#" className="lg-link">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
