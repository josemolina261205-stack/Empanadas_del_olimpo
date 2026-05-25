import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14; --surface: #161920; --surface2: #1c2030;
    --border: #252a35; --accent: #c8a96e; --accent2: #7e6baa;
    --text: #e8e4dc; --muted: #6b7180;
    --green: #6ec8a0; --red: #e07070; --yellow: #e0b870; --blue: #5ba3d9;
    --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sk-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    padding: 32px 20px;
    background-image:
      radial-gradient(ellipse 50% 40% at 100% 10%, rgba(110,200,160,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 0% 90%, rgba(91,163,217,0.06) 0%, transparent 60%);
  }

  .sk-header {
    max-width: 1000px;
    margin: 0 auto 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sk-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    margin-bottom: 4px;
  }

  .sk-header p { font-size: 13.5px; color: var(--muted); }

  .sk-actions { display: flex; gap: 8px; }

  .sk-btn-sm {
    padding: 8px 16px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .sk-btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .sk-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .sk-btn-accent {
    background: linear-gradient(135deg, #c8a96e, #b89358);
    border: none;
    color: #0d0f14;
    font-weight: 500;
  }
  .sk-btn-accent:hover { opacity: 0.88; }

  .sk-kpis {
    max-width: 1000px;
    margin: 0 auto 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (max-width: 700px) {
    .sk-kpis { grid-template-columns: 1fr 1fr; }
  }

  .sk-kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    position: relative;
    overflow: hidden;
  }

  .sk-kpi-dot {
    position: absolute;
    top: 14px; right: 14px;
    width: 8px; height: 8px;
    border-radius: 50%;
  }

  .sk-kpi-label {
    font-size: 10.5px;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .sk-kpi-value {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    margin-bottom: 3px;
  }

  .sk-kpi-sub { font-size: 12px; color: var(--muted); }

  .sk-toolbar {
    max-width: 1000px;
    margin: 0 auto 18px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .sk-search {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: var(--text);
    outline: none;
    flex: 1;
    min-width: 180px;
    max-width: 260px;
  }
  .sk-search::placeholder { color: var(--muted); }
  .sk-search:focus { border-color: var(--accent); }

  .sk-pill {
    padding: 7px 15px;
    border-radius: 20px;
    font-size: 12.5px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .sk-pill.active {
    background: rgba(200,169,110,0.1);
    border-color: rgba(200,169,110,0.35);
    color: var(--accent);
  }

  .sk-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }

  .sk-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
    animation: fadeUp 0.35s ease forwards;
  }

  .sk-card:hover {
    border-color: #353c4e;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sk-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .sk-card-emoji {
    width: 44px; height: 44px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .sk-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }

  .status-ok { background: rgba(110,200,160,0.1); color: var(--green); }
  .status-low { background: rgba(224,184,112,0.1); color: var(--yellow); }
  .status-out { background: rgba(224,112,112,0.1); color: var(--red); }

  .sk-card-name {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text);
  }

  .sk-card-meta {
    font-size: 12px;
    color: var(--muted);
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .sk-sep { color: var(--border); }

  .sk-stock-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .sk-stock-label { font-size: 10.5px; color: var(--muted); letter-spacing: 0.5px; text-transform: uppercase; }
  .sk-stock-val { font-family: 'Playfair Display', serif; font-size: 22px; }

  .val-ok { color: var(--green); }
  .val-low { color: var(--yellow); }
  .val-out { color: var(--red); }

  .sk-progress {
    height: 5px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .sk-prog-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s ease;
  }

  .sk-card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 11.5px;
    color: var(--muted);
    padding-top: 8px;
    border-top: 1px solid var(--border);
  }

  .sk-reorder-btn {
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11.5px;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
  }
  .sk-reorder-btn:hover { border-color: var(--accent); color: var(--accent); }

  .sk-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
    grid-column: 1 / -1;
    font-size: 14px;
  }

  .sk-alert-banner {
    max-width: 1000px;
    margin: 0 auto 18px;
    background: rgba(224,184,112,0.07);
    border: 1px solid rgba(224,184,112,0.25);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--yellow);
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const PRODUCTS = [
  { id: 1, emoji: "👟", name: "Zapatillas Air Runner 2024", cat: "Calzado", sku: "ZAP-001", stock: 45, min: 20, max: 100, location: "A-12" },
  { id: 2, emoji: "🎧", name: "Audífonos BT-500 NC", cat: "Electrónica", sku: "ELE-023", stock: 8, min: 15, max: 60, location: "C-03" },
  { id: 3, emoji: "🧥", name: "Chaqueta Impermeable Pro", cat: "Ropa", sku: "ROP-014", stock: 0, min: 10, max: 50, location: "B-07" },
  { id: 4, emoji: "⌚", name: "Reloj Smartband Flex", cat: "Electrónica", sku: "ELE-045", stock: 22, min: 10, max: 40, location: "C-11" },
  { id: 5, emoji: "🎒", name: "Mochila Urban Explorer", cat: "Accesorios", sku: "ACC-007", stock: 38, min: 15, max: 80, location: "D-02" },
  { id: 6, emoji: "👖", name: "Pantalón Cargo Slim", cat: "Ropa", sku: "ROP-031", stock: 5, min: 12, max: 50, location: "B-14" },
  { id: 7, emoji: "🕶", name: "Gafas Polarizadas Classic", cat: "Accesorios", sku: "ACC-012", stock: 67, min: 20, max: 100, location: "D-09" },
  { id: 8, emoji: "👟", name: "Zapatillas Trail Max", cat: "Calzado", sku: "ZAP-009", stock: 0, min: 10, max: 60, location: "A-18" },
  { id: 9, emoji: "📱", name: "Cargador Portátil 20000mAh", cat: "Electrónica", sku: "ELE-067", stock: 31, min: 10, max: 50, location: "C-22" },
  { id: 10, emoji: "🧢", name: "Gorra Performance UV", cat: "Accesorios", sku: "ACC-019", stock: 11, min: 15, max: 60, location: "D-14" },
];

function getStatus(stock, min) {
  if (stock === 0) return "out";
  if (stock <= min) return "low";
  return "ok";
}

function getStatusLabel(s) {
  if (s === "out") return "Sin stock";
  if (s === "low") return "Stock bajo";
  return "Disponible";
}

function getColor(s) {
  if (s === "out") return "var(--red)";
  if (s === "low") return "var(--yellow)";
  return "var(--green)";
}

const FILTERS = ["Todos", "Disponible", "Stock bajo", "Sin stock", "Electrónica", "Ropa", "Calzado", "Accesorios"];

export default function Stock() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  const filtered = PRODUCTS.filter((p) => {
    const s = getStatus(p.stock, p.min);
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filter === "Todos") return true;
    if (filter === "Disponible") return s === "ok";
    if (filter === "Stock bajo") return s === "low";
    if (filter === "Sin stock") return s === "out";
    return p.cat === filter;
  });

  const totalItems = PRODUCTS.reduce((s, p) => s + p.stock, 0);
  const lowCount = PRODUCTS.filter((p) => getStatus(p.stock, p.min) === "low").length;
  const outCount = PRODUCTS.filter((p) => p.stock === 0).length;
  const okCount = PRODUCTS.filter((p) => getStatus(p.stock, p.min) === "ok").length;

  return (
    <>
      <style>{styles}</style>
      <div className="sk-root">
        <div className="sk-header">
          <div>
            <h1>Inventario en Stock</h1>
            <p>Estado actual de productos disponibles en bodega</p>
          </div>
          <div className="sk-actions">
            <button className="sk-btn-sm sk-btn-outline">+ Agregar producto</button>
            <button className="sk-btn-sm sk-btn-accent">📤 Exportar</button>
          </div>
        </div>

        {(lowCount + outCount) > 0 && (
          <div className="sk-alert-banner">
            ⚠ {outCount} producto{outCount !== 1 ? "s" : ""} sin stock y {lowCount} con stock bajo — revisa tu pedido.
          </div>
        )}

        <div className="sk-kpis">
          <div className="sk-kpi">
            <div className="sk-kpi-dot" style={{ background: "var(--blue)" }} />
            <div className="sk-kpi-label">Total unidades</div>
            <div className="sk-kpi-value" style={{ color: "var(--blue)" }}>{totalItems}</div>
            <div className="sk-kpi-sub">en bodega</div>
          </div>
          <div className="sk-kpi">
            <div className="sk-kpi-dot" style={{ background: "var(--green)" }} />
            <div className="sk-kpi-label">Con stock</div>
            <div className="sk-kpi-value" style={{ color: "var(--green)" }}>{okCount}</div>
            <div className="sk-kpi-sub">productos disponibles</div>
          </div>
          <div className="sk-kpi">
            <div className="sk-kpi-dot" style={{ background: "var(--yellow)" }} />
            <div className="sk-kpi-label">Stock bajo</div>
            <div className="sk-kpi-value" style={{ color: "var(--yellow)" }}>{lowCount}</div>
            <div className="sk-kpi-sub">requieren reabastecimiento</div>
          </div>
          <div className="sk-kpi">
            <div className="sk-kpi-dot" style={{ background: "var(--red)" }} />
            <div className="sk-kpi-label">Sin stock</div>
            <div className="sk-kpi-value" style={{ color: "var(--red)" }}>{outCount}</div>
            <div className="sk-kpi-sub">agotados</div>
          </div>
        </div>

        <div className="sk-toolbar">
          <input
            className="sk-search"
            placeholder="🔍  Buscar producto, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {FILTERS.map((f) => (
            <button key={f} className={`sk-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="sk-grid">
          {filtered.length === 0 && (
            <div className="sk-empty">No se encontraron productos para este filtro.</div>
          )}
          {filtered.map((p, i) => {
            const status = getStatus(p.stock, p.min);
            const pct = Math.min((p.stock / p.max) * 100, 100);
            return (
              <div key={p.id} className="sk-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="sk-card-top">
                  <div className="sk-card-emoji">{p.emoji}</div>
                  <span className={`sk-status status-${status}`}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: getColor(status), flexShrink: 0 }} />
                    {getStatusLabel(status)}
                  </span>
                </div>

                <div>
                  <div className="sk-card-name">{p.name}</div>
                  <div className="sk-card-meta">
                    <span>{p.cat}</span>
                    <span className="sk-sep">|</span>
                    <span>{p.sku}</span>
                  </div>
                </div>

                <div>
                  <div className="sk-stock-row">
                    <div>
                      <div className="sk-stock-label">Unidades</div>
                      <div className={`sk-stock-val val-${status}`}>{p.stock}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="sk-stock-label">Mín / Máx</div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{p.min} / {p.max}</div>
                    </div>
                  </div>
                  <div style={{ height: 6 }} />
                  <div className="sk-progress">
                    <div
                      className="sk-prog-fill"
                      style={{ width: pct + "%", background: getColor(status) }}
                    />
                  </div>
                </div>

                <div className="sk-card-footer">
                  <span>📍 {p.location}</span>
                  {(status === "low" || status === "out") && (
                    <button className="sk-reorder-btn">Repedir</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
