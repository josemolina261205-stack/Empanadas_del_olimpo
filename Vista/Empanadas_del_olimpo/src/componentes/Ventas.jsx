import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14; --surface: #161920; --surface2: #1c2030;
    --border: #252a35; --accent: #c8a96e; --accent2: #7e6baa;
    --text: #e8e4dc; --muted: #6b7180;
    --green: #6ec8a0; --red: #e07070; --blue: #5ba3d9;
    --radius: 10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sv-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    padding: 32px 20px;
    background-image:
      radial-gradient(ellipse 50% 40% at 100% 0%, rgba(110,200,160,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 0% 100%, rgba(200,169,110,0.06) 0%, transparent 60%);
  }

  .sv-header {
    max-width: 960px;
    margin: 0 auto 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sv-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    margin-bottom: 4px;
  }

  .sv-header p { font-size: 13.5px; color: var(--muted); }

  .sv-actions { display: flex; gap: 8px; }

  .sv-btn-sm {
    padding: 8px 16px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .sv-btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .sv-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .sv-btn-accent {
    background: linear-gradient(135deg, #c8a96e, #b89358);
    border: none;
    color: #0d0f14;
    font-weight: 500;
  }
  .sv-btn-accent:hover { opacity: 0.88; }

  .sv-kpis {
    max-width: 960px;
    margin: 0 auto 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (max-width: 700px) {
    .sv-kpis { grid-template-columns: 1fr 1fr; }
  }

  .sv-kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px 16px;
  }

  .sv-kpi-label {
    font-size: 10.5px;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .sv-kpi-value {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: var(--text);
    margin-bottom: 4px;
  }

  .sv-kpi-delta {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .delta-up { color: var(--green); }
  .delta-down { color: var(--red); }

  .sv-content {
    max-width: 960px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 16px;
  }

  @media (max-width: 700px) {
    .sv-content { grid-template-columns: 1fr; }
  }

  .sv-table-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .sv-table-header {
    padding: 16px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    gap: 10px;
    flex-wrap: wrap;
  }

  .sv-table-title { font-size: 15px; font-weight: 500; }

  .sv-search {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 7px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text);
    outline: none;
    width: 180px;
  }
  .sv-search::placeholder { color: var(--muted); }
  .sv-search:focus { border-color: var(--accent); }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
  }

  thead th {
    padding: 12px 18px;
    text-align: left;
    font-size: 10.5px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }

  thead th:hover { color: var(--accent); }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--surface2); }

  tbody td { padding: 13px 18px; vertical-align: middle; }

  .sv-prod-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sv-prod-thumb {
    width: 36px; height: 36px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .sv-prod-name { font-weight: 500; color: var(--text); line-height: 1.2; }
  .sv-prod-cat { font-size: 11px; color: var(--muted); }

  .sv-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }

  .badge-cat-Calzado { background: rgba(91,163,217,0.12); color: #5ba3d9; }
  .badge-cat-Ropa { background: rgba(126,107,170,0.12); color: var(--accent2); }
  .badge-cat-Electrónica { background: rgba(200,169,110,0.12); color: var(--accent); }
  .badge-cat-Accesorios { background: rgba(110,200,160,0.12); color: var(--green); }

  .sv-bar-mini {
    height: 4px;
    background: var(--border);
    border-radius: 4px;
    margin-top: 4px;
    overflow: hidden;
  }

  .sv-bar-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #c8a96e, #7e6baa);
  }

  .sv-sidebar { display: flex; flex-direction: column; gap: 14px; }

  .sv-side-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 16px;
  }

  .sv-side-title {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 14px;
    color: var(--text);
  }

  .sv-cat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
  }

  .sv-cat-name { color: var(--muted); }
  .sv-cat-val { font-weight: 500; }

  .sv-cat-bar {
    height: 3px;
    background: var(--border);
    border-radius: 4px;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .sv-cat-fill { height: 100%; border-radius: 4px; }

  .sv-top-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
  }
  .sv-top-item:last-child { border-bottom: none; }

  .sv-rank {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--muted);
    width: 24px;
    flex-shrink: 0;
  }
  .sv-rank.first { color: var(--accent); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sv-anim { animation: fadeUp 0.4s ease forwards; }
`;

const PRODUCTS = [
  { id: 1, emoji: "👟", name: "Zapatillas Air Runner 2024", cat: "Calzado", sku: "ZAP-001", qty: 142, revenue: 8520000, delta: 22 },
  { id: 2, emoji: "🎧", name: "Audífonos BT-500 NC", cat: "Electrónica", sku: "ELE-023", qty: 98, revenue: 6860000, delta: 8 },
  { id: 3, emoji: "🧥", name: "Chaqueta Impermeable Pro", cat: "Ropa", sku: "ROP-014", qty: 87, revenue: 4350000, delta: 15 },
  { id: 4, emoji: "⌚", name: "Reloj Smartband Flex", cat: "Electrónica", sku: "ELE-045", qty: 76, revenue: 5320000, delta: -4 },
  { id: 5, emoji: "🎒", name: "Mochila Urban Explorer", cat: "Accesorios", sku: "ACC-007", qty: 65, revenue: 2600000, delta: 11 },
  { id: 6, emoji: "👖", name: "Pantalón Cargo Slim", cat: "Ropa", sku: "ROP-031", qty: 54, revenue: 1890000, delta: 3 },
  { id: 7, emoji: "🕶", name: "Gafas Polarizadas Classic", cat: "Accesorios", sku: "ACC-012", qty: 43, revenue: 1290000, delta: -8 },
  { id: 8, emoji: "👟", name: "Zapatillas Trail Max", cat: "Calzado", sku: "ZAP-009", qty: 38, revenue: 2660000, delta: 6 },
];

const CATS = [
  { name: "Electrónica", pct: 42, color: "#c8a96e" },
  { name: "Calzado", pct: 28, color: "#5ba3d9" },
  { name: "Ropa", pct: 18, color: "#7e6baa" },
  { name: "Accesorios", pct: 12, color: "#6ec8a0" },
];

const maxQty = Math.max(...PRODUCTS.map((p) => p.qty));

export default function Ventas() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("qty");
  const [sortDir, setSortDir] = useState(-1);

  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => -d);
    else { setSortKey(key); setSortDir(-1); }
  };

  const filtered = PRODUCTS
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir * (a[sortKey] > b[sortKey] ? 1 : -1));

  const totalQty = PRODUCTS.reduce((s, p) => s + p.qty, 0);
  const totalRev = PRODUCTS.reduce((s, p) => s + p.revenue, 0);

  const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.3 }}>
      {sortKey === k && sortDir === 1 ? "↑" : "↓"}
    </span>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="sv-root">
        <div className="sv-header">
          <div>
            <h1>Reporte de Ventas</h1>
            <p>Productos vendidos — Mayo 2026</p>
          </div>
          <div className="sv-actions">
            <button className="sv-btn-sm sv-btn-outline">Filtrar por fecha</button>
            <button className="sv-btn-sm sv-btn-accent">📤 Exportar</button>
          </div>
        </div>

        <div className="sv-kpis">
          <div className="sv-kpi">
            <div className="sv-kpi-label">Unidades vendidas</div>
            <div className="sv-kpi-value">{totalQty}</div>
            <div className="sv-kpi-delta delta-up">↑ 14% vs mes anterior</div>
          </div>
          <div className="sv-kpi">
            <div className="sv-kpi-label">Ingresos totales</div>
            <div className="sv-kpi-value">{fmt(totalRev)}</div>
            <div className="sv-kpi-delta delta-up">↑ 9% vs mes anterior</div>
          </div>
          <div className="sv-kpi">
            <div className="sv-kpi-label">Productos vendidos</div>
            <div className="sv-kpi-value">{PRODUCTS.length}</div>
            <div className="sv-kpi-delta" style={{ color: "var(--muted)" }}>referencias activas</div>
          </div>
          <div className="sv-kpi">
            <div className="sv-kpi-label">Ticket promedio</div>
            <div className="sv-kpi-value">{fmt(Math.round(totalRev / totalQty))}</div>
            <div className="sv-kpi-delta delta-down">↓ 2% vs mes anterior</div>
          </div>
        </div>

        <div className="sv-content">
          <div className="sv-table-wrap sv-anim">
            <div className="sv-table-header">
              <span className="sv-table-title">Productos vendidos</span>
              <input
                className="sv-search"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th onClick={() => handleSort("cat")}>Categoría <SortIcon k="cat" /></th>
                  <th>SKU</th>
                  <th onClick={() => handleSort("qty")}>Unidades <SortIcon k="qty" /></th>
                  <th onClick={() => handleSort("revenue")}>Ingresos <SortIcon k="revenue" /></th>
                  <th onClick={() => handleSort("delta")}>Variación <SortIcon k="delta" /></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="sv-prod-cell">
                        <div className="sv-prod-thumb">{p.emoji}</div>
                        <div>
                          <div className="sv-prod-name">{p.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`sv-badge badge-cat-${p.cat}`}>{p.cat}</span>
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: 12 }}>{p.sku}</td>
                    <td>
                      <div>{p.qty}</div>
                      <div className="sv-bar-mini">
                        <div className="sv-bar-fill" style={{ width: `${(p.qty / maxQty) * 100}%` }} />
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{fmt(p.revenue)}</td>
                    <td>
                      <span style={{ color: p.delta >= 0 ? "var(--green)" : "var(--red)", fontSize: 13 }}>
                        {p.delta >= 0 ? "↑" : "↓"} {Math.abs(p.delta)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sv-sidebar">
            <div className="sv-side-card sv-anim" style={{ animationDelay: "0.1s" }}>
              <div className="sv-side-title">Ventas por categoría</div>
              {CATS.map((c) => (
                <div key={c.name}>
                  <div className="sv-cat-row">
                    <span className="sv-cat-name">{c.name}</span>
                    <span className="sv-cat-val">{c.pct}%</span>
                  </div>
                  <div className="sv-cat-bar">
                    <div className="sv-cat-fill" style={{ width: c.pct + "%", background: c.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="sv-side-card sv-anim" style={{ animationDelay: "0.18s" }}>
              <div className="sv-side-title">Top 3 más vendidos</div>
              {PRODUCTS.slice(0, 3).map((p, i) => (
                <div key={p.id} className="sv-top-item">
                  <div className={`sv-rank ${i === 0 ? "first" : ""}`}>{i + 1}</div>
                  <div style={{ fontSize: 22 }}>{p.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{p.qty} unidades</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
