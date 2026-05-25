import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14;
    --surface: #161920;
    --border: #252a35;
    --accent: #c8a96e;
    --accent2: #7e6baa;
    --text: #e8e4dc;
    --muted: #6b7180;
    --error: #e07070;
    --success: #6ec8a0;
    --input-bg: #1c2030;
    --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rg-root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 16px;
    background-image:
      radial-gradient(ellipse 60% 50% at 80% 10%, rgba(126,107,170,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 10% 90%, rgba(200,169,110,0.09) 0%, transparent 60%);
  }

  .rg-card {
    width: 100%;
    max-width: 520px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 44px 40px 36px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.5);
    animation: fadeUp 0.5s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rg-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(200,169,110,0.1);
    border: 1px solid rgba(200,169,110,0.25);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .rg-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--text);
    margin-bottom: 6px;
  }

  .rg-subtitle {
    font-size: 13.5px;
    color: var(--muted);
    margin-bottom: 28px;
  }

  .rg-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .rg-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
  }

  .rg-field.full { grid-column: 1 / -1; }

  .rg-label {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .rg-input {
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .rg-input::placeholder { color: #3d4354; }
  .rg-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.12);
  }

  .rg-input.err {
    border-color: var(--error);
    box-shadow: 0 0 0 3px rgba(224,112,112,0.10);
  }

  .rg-err-msg {
    font-size: 11px;
    color: var(--error);
    margin-top: 2px;
  }

  .rg-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7180' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  .rg-select option { background: var(--input-bg); color: var(--text); }

  .rg-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 20px 0;
  }

  .rg-btn {
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
    margin-top: 4px;
  }

  .rg-btn:hover { opacity: 0.9; }
  .rg-btn:active { transform: scale(0.99); }
  .rg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .rg-footer {
    text-align: center;
    margin-top: 20px;
    font-size: 13px;
    color: var(--muted);
  }

  .rg-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
  }
  .rg-link:hover { text-decoration: underline; }

  .rg-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
    color: var(--success);
    text-align: center;
  }

  .rg-success-icon {
    width: 56px; height: 56px;
    background: rgba(110,200,160,0.1);
    border: 1px solid rgba(110,200,160,0.3);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
  }

  .rg-strength {
    height: 3px;
    background: var(--border);
    border-radius: 4px;
    margin-top: 6px;
    overflow: hidden;
  }
  .rg-strength-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s, background 0.3s;
  }
`;

function validate(form) {
  const errors = {};
  if (!form.nombre.trim()) errors.nombre = "Campo requerido";
  if (!form.apellido.trim()) errors.apellido = "Campo requerido";
  if (!form.documento.trim()) errors.documento = "Campo requerido";
  if (!form.telefono.trim()) errors.telefono = "Campo requerido";
  if (!form.email.trim()) errors.email = "Campo requerido";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email inválido";
  if (!form.password) errors.password = "Campo requerido";
  else if (form.password.length < 6) errors.password = "Mínimo 6 caracteres";
  if (form.password !== form.confirmar) errors.confirmar = "Las contraseñas no coinciden";
  if (!form.tipoDoc) errors.tipoDoc = "Selecciona un tipo";
  return errors;
}

function passStrength(p) {
  if (!p) return { pct: 0, color: "transparent", label: "" };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const map = [
    { pct: 0, color: "transparent", label: "" },
    { pct: 25, color: "#e07070", label: "Débil" },
    { pct: 50, color: "#e0b870", label: "Regular" },
    { pct: 75, color: "#7eb8e0", label: "Buena" },
    { pct: 100, color: "#6ec8a0", label: "Fuerte" },
  ];
  return map[score];
}

export default function Register() {
  const [form, setForm] = useState({
    nombre: "", apellido: "", tipoDoc: "", documento: "",
    telefono: "", email: "", password: "", confirmar: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const strength = passStrength(form.password);

  return (
    <>
      <style>{styles}</style>
      <div className="rg-root">
        <div className="rg-card">
          <div className="rg-badge">✦ Nuevo usuario</div>
          <h1 className="rg-title">Crear cuenta</h1>
          <p className="rg-subtitle">Completa los datos para registrarte en el sistema.</p>

          {submitted ? (
            <div className="rg-success">
              <div className="rg-success-icon">✓</div>
              <strong style={{ fontSize: 16 }}>¡Registro exitoso!</strong>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                Bienvenido, {form.nombre}. Tu cuenta ha sido creada correctamente.
              </span>
              <button className="rg-btn" style={{ marginTop: 12 }} onClick={() => setSubmitted(false)}>
                Volver al formulario
              </button>
            </div>
          ) : (
            <>
              <div className="rg-row">
                <div className="rg-field">
                  <label className="rg-label">Nombre</label>
                  <input className={`rg-input${errors.nombre ? " err" : ""}`} placeholder="Juan" value={form.nombre} onChange={set("nombre")} />
                  {errors.nombre && <span className="rg-err-msg">{errors.nombre}</span>}
                </div>
                <div className="rg-field">
                  <label className="rg-label">Apellido</label>
                  <input className={`rg-input${errors.apellido ? " err" : ""}`} placeholder="Pérez" value={form.apellido} onChange={set("apellido")} />
                  {errors.apellido && <span className="rg-err-msg">{errors.apellido}</span>}
                </div>

                <div className="rg-field">
                  <label className="rg-label">Tipo doc.</label>
                  <select className={`rg-input rg-select${errors.tipoDoc ? " err" : ""}`} value={form.tipoDoc} onChange={set("tipoDoc")}>
                    <option value="">Seleccionar</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula extranjería</option>
                    <option value="PA">Pasaporte</option>
                    <option value="NIT">NIT</option>
                  </select>
                  {errors.tipoDoc && <span className="rg-err-msg">{errors.tipoDoc}</span>}
                </div>
                <div className="rg-field">
                  <label className="rg-label">N.º documento</label>
                  <input className={`rg-input${errors.documento ? " err" : ""}`} placeholder="1234567890" value={form.documento} onChange={set("documento")} />
                  {errors.documento && <span className="rg-err-msg">{errors.documento}</span>}
                </div>
              </div>

              <div className="rg-field">
                <label className="rg-label">Teléfono</label>
                <input className={`rg-input${errors.telefono ? " err" : ""}`} placeholder="+57 300 000 0000" value={form.telefono} onChange={set("telefono")} />
                {errors.telefono && <span className="rg-err-msg">{errors.telefono}</span>}
              </div>

              <div className="rg-field">
                <label className="rg-label">Correo electrónico</label>
                <input type="email" className={`rg-input${errors.email ? " err" : ""}`} placeholder="correo@ejemplo.com" value={form.email} onChange={set("email")} />
                {errors.email && <span className="rg-err-msg">{errors.email}</span>}
              </div>

              <hr className="rg-divider" />

              <div className="rg-field">
                <label className="rg-label">Contraseña</label>
                <input type="password" className={`rg-input${errors.password ? " err" : ""}`} placeholder="Mínimo 6 caracteres" value={form.password} onChange={set("password")} />
                {form.password && (
                  <div>
                    <div className="rg-strength">
                      <div className="rg-strength-bar" style={{ width: strength.pct + "%", background: strength.color }} />
                    </div>
                    <span style={{ fontSize: 11, color: strength.color }}>{strength.label}</span>
                  </div>
                )}
                {errors.password && <span className="rg-err-msg">{errors.password}</span>}
              </div>

              <div className="rg-field">
                <label className="rg-label">Confirmar contraseña</label>
                <input type="password" className={`rg-input${errors.confirmar ? " err" : ""}`} placeholder="Repite la contraseña" value={form.confirmar} onChange={set("confirmar")} />
                {errors.confirmar && <span className="rg-err-msg">{errors.confirmar}</span>}
              </div>

              <button className="rg-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Registrando..." : "Crear cuenta"}
              </button>

              <p className="rg-footer">
                ¿Ya tienes cuenta?{" "}
                <a href="#" className="rg-link">Iniciar sesión</a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
