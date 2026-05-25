import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14; --surface: #161920; --surface2: #1c2030;
    --border: #252a35; --accent: #c8a96e; --accent2: #7e6baa;
    --text: #e8e4dc; --muted: #6b7180;
    --info: #5ba3d9; --warn: #e0b870;
    --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .nf-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    padding: 32px 20px;
    background-image:
      radial-gradient(ellipse 50% 40% at 90% 10%, rgba(91,163,217,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 10% 80%, rgba(200,169,110,0.06) 0%, transparent 60%);
  }

  .nf-header {
    max-width: 860px;
    margin: 0 auto 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .nf-header-left h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    margin-bottom: 4px;
  }

  .nf-header-left p {
    font-size: 13.5px;
    color: var(--muted);
  }

  .nf-badge-count {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(91,163,217,0.1);
    border: 1px solid rgba(91,163,217,0.25);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 12px;
    color: var(--info);
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  .nf-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .nf-btn-sm {
    padding: 8px 16px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nf-btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .nf-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .nf-btn-accent {
    background: linear-gradient(135deg, #c8a96e, #b89358);
    border: none;
    color: #0d0f14;
    font-weight: 500;
  }
  .nf-btn-accent:hover { opacity: 0.88; }

  .nf-filter-row {
    max-width: 860px;
    margin: 0 auto 20px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .nf-pill {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12.5px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .nf-pill.active {
    background: rgba(200,169,110,0.12);
    border-color: rgba(200,169,110,0.4);
    color: var(--accent);
  }

  .nf-list {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .nf-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 0.2s, transform 0.15s;
    cursor: default;
    animation: fadeUp 0.35s ease forwards;
    position: relative;
    overflow: hidden;
  }

  .nf-item:hover { border-color: #353c4e; transform: translateX(2px); }

  .nf-item.unread::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--info);
    border-radius: 3px 0 0 3px;
  }

  .nf-item.spike::before { background: var(--warn); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .nf-item-icon {
    width: 42px; height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .icon-info { background: rgba(91,163,217,0.12); }
  .icon-spike { background: rgba(224,184,112,0.12); }
  .icon-trend { background: rgba(126,107,170,0.12); }

  .nf-item-body { flex: 1; min-width: 0; }

  .nf-item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nf-item-meta {
    font-size: 12.5px;
    color: var(--muted);
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .nf-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 11px;
    letter-spacing: 0.4px;
  }

  .tag-info { background: rgba(91,163,217,0.12); color: var(--info); }
  .tag-spike { background: rgba(224,184,112,0.12); color: var(--warn); }
  .tag-trend { background: rgba(126,107,170,0.12); color: var(--accent2); }

  .nf-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
  }

  .nf-views {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--accent);
  }

  .nf-views-sub {
    font-size: 10.5px;
    color: var(--muted);
    text-align: right;
  }

  .nf-time {
    font-size: 11px;
    color: var(--muted);
  }

  .nf-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
    font-size: 14px;
  }

  .nf-summary {
    max-width: 860px;
    margin: 0 auto 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .nf-stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
  }

  .nf-stat-label {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .nf-stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--text);
    margin-bottom: 2px;
  }

  .nf-stat-sub {
    font-size: 12px;
    color: var(--muted);
  }

  .nf-unread-dot {
    width: 8px; height: 8px;
    background: var(--info);
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (max-width: 580px) {
    .nf-summary { grid-template-columns: 1fr 1fr; }
  }
`;

const NOTIFS = [
  { id: 1, type: "spike", icon: "🔥", title: "Zapatillas Air Runner 2024", views: 1240, delta: "+38%", time: "hace 5 min", unread: true, cat: "Calzado" },
  { id: 2, type: "info", icon: "👁", title: "Chaqueta Impermeable Pro", views: 876, delta: "+12%", time: "hace 22 min", unread: true, cat: "Ropa" },
  { id: 3, type: "trend", icon: "📈", title: "Mochila Urban Explorer", views: 654, delta: "+5%", time: "hace 1h", unread: false, cat: "Accesorios" },
  { id: 4, type: "info", icon: "👁", title: "Audífonos BT-500 Noise Cancel", views: 520, delta: "+8%", time: "hace 2h", unread: false, cat: "Electrónica" },
  { id: 5, type: "spike", icon: "🔥", title: "Reloj Smartband Flex", views: 390, delta: "+45%", time: "hace 3h", unread: true, cat: "Electrónica" },
  { id: 6, type: "trend", icon: "📈", title: "Pantalón Cargo Slim", views: 310, delta: "+3%", time: "hace 5h", unread: false, cat: "Ropa" },
  { id: 7, type: "info", icon: "👁", title: "Gafas Polarizadas Classic", views: 270, delta: "+1%", time: "ayer", unread: false, cat: "Accesorios" },
];

const FILTERS = ["Todas", "Tendencia 🔥", "Nuevas", "Electrónica", "Ropa"];

export default function Notificaciones() {
  const [filter, setFilter] = useState("Todas");
  const [notifs, setNotifs] = useState(NOTIFS);

  const markAll = () => setNotifs((n) => n.map((x) => ({ ...x, unread: false })));

  const filtered = notifs.filter((n) => {
    if (filter === "Todas") return true;
    if (filter === "Tendencia 🔥") return n.type === "spike";
    if (filter === "Nuevas") return n.unread;
    return n.cat === filter;
  });

  const unreadCount = notifs.filter((n) => n.unread).length;
  const totalViews = notifs.reduce((s, n) => s + n.views, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="nf-root">
        <div className="nf-header">
          <div className="nf-header-left">
            <h1>Notificaciones</h1>
            <p>Actividad de visualización de productos</p>
            {unreadCount > 0 && (
              <span className="nf-badge-count">● {unreadCount} nuevas notificaciones</span>
            )}
          </div>
          <div className="nf-actions">
            <button className="nf-btn-sm nf-btn-outline" onClick={markAll}>Marcar todo leído</button>
            <button className="nf-btn-sm nf-btn-accent">Exportar</button>
          </div>
        </div>

        <div className="nf-summary">
          <div className="nf-stat-card">
            <div className="nf-stat-label">Vistas totales hoy</div>
            <div className="nf-stat-value">{totalViews.toLocaleString()}</div>
            <div className="nf-stat-sub">+18% vs ayer</div>
          </div>
          <div className="nf-stat-card">
            <div className="nf-stat-label">Productos con pico</div>
            <div className="nf-stat-value">{notifs.filter((n) => n.type === "spike").length}</div>
            <div className="nf-stat-sub">Tendencia alta</div>
          </div>
          <div className="nf-stat-card">
            <div className="nf-stat-label">Producto más visto</div>
            <div className="nf-stat-value">1,240</div>
            <div className="nf-stat-sub">Zapatillas Air Runner</div>
          </div>
        </div>

        <div className="nf-filter-row">
          {FILTERS.map((f) => (
            <button key={f} className={`nf-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="nf-list">
          {filtered.length === 0 && (
            <div className="nf-empty">No hay notificaciones para este filtro.</div>
          )}
          {filtered.map((n, i) => (
            <div
              key={n.id}
              className={`nf-item ${n.unread ? "unread" : ""} ${n.type === "spike" ? "spike" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
            >
              {n.unread && <div className="nf-unread-dot" />}
              <div className={`nf-item-icon icon-${n.type}`}>{n.icon}</div>
              <div className="nf-item-body">
                <div className="nf-item-title">{n.title}</div>
                <div className="nf-item-meta">
                  <span className={`nf-tag tag-${n.type}`}>
                    {n.type === "spike" ? "Pico de vistas" : n.type === "info" ? "Seguimiento" : "Tendencia"}
                  </span>
                  <span>{n.cat}</span>
                </div>
              </div>
              <div className="nf-item-right">
                <div className="nf-views">{n.views.toLocaleString()}</div>
                <div className="nf-views-sub">{n.delta} vistas</div>
                <div className="nf-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
