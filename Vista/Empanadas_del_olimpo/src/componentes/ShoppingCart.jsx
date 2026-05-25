import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_CART = [
  { id: 1, name: "Camiseta Urbana", price: 45000, qty: 2, stock: 10, image: "👕" },
  { id: 2, name: "Zapatos Running", price: 180000, qty: 1, stock: 3, image: "👟" },
  { id: 3, name: "Gorra Vintage", price: 32000, qty: 1, stock: 0, image: "🧢" },
];

const CATALOG_ITEMS = [
  { id: 4, name: "Chaqueta Denim", price: 220000, stock: 5, image: "🧥" },
  { id: 5, name: "Bolso Cuero", price: 150000, stock: 0, image: "👜" },
  { id: 6, name: "Reloj Casual", price: 95000, stock: 8, image: "⌚" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const generateInvoiceHTML = (cart, total) => {
  const date = new Date().toLocaleString("es-CO");
  const rows = cart
    .map(
      (i) =>
        `<tr><td>${i.image} ${i.name}</td><td>${i.qty}</td><td>${fmt(i.price)}</td><td>${fmt(i.price * i.qty)}</td></tr>`
    )
    .join("");
  return `
    <html><head><title>Factura Electrónica</title>
    <style>
      body{font-family:Georgia,serif;padding:40px;color:#1a1a1a;max-width:600px;margin:0 auto}
      h1{color:#b5813c;border-bottom:2px solid #b5813c;padding-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:20px}
      th{background:#1a1a1a;color:#fff;padding:10px;text-align:left}
      td{padding:10px;border-bottom:1px solid #ddd}
      .total{font-size:1.3rem;font-weight:bold;text-align:right;margin-top:16px;color:#b5813c}
      .footer{margin-top:40px;font-size:.8rem;color:#999;text-align:center}
    </style></head>
    <body>
      <h1>🧾 Factura Electrónica</h1>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>N° Factura:</strong> FC-${Date.now()}</p>
      <table>
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio Unit.</th><th>Subtotal</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="total">TOTAL: ${fmt(total)}</p>
      <p class="footer">Gracias por tu compra · Este documento tiene validez fiscal</p>
    </body></html>`;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toast({ msg, onClose }) {
  return (
    <div style={styles.toast}>
      <span>{msg}</span>
      <button onClick={onClose} style={styles.toastClose}>✕</button>
    </div>
  );
}

function CartItem({ item, onAdd, onRemove, onDelete }) {
  return (
    <div style={styles.cartItem}>
      <div style={styles.cartItemLeft}>
        <span style={styles.itemEmoji}>{item.image}</span>
        <div>
          <p style={styles.itemName}>{item.name}</p>
          <p style={styles.itemPrice}>{fmt(item.price)} c/u</p>
          {item.stock === 0 && (
            <span style={styles.outOfStockBadge}>⚠ Agotado (pedido especial)</span>
          )}
        </div>
      </div>
      <div style={styles.cartItemRight}>
        <div style={styles.qtyControl}>
          <button onClick={() => onRemove(item.id)} style={styles.qtyBtn}>−</button>
          <span style={styles.qtyNum}>{item.qty}</span>
          <button onClick={() => onAdd(item.id)} style={styles.qtyBtn}>+</button>
        </div>
        <p style={styles.itemSubtotal}>{fmt(item.price * item.qty)}</p>
        <button onClick={() => onDelete(item.id)} style={styles.deleteBtn} title="Eliminar del carrito">
          🗑
        </button>
      </div>
    </div>
  );
}

function PaymentModal({ total, onClose }) {
  const account = "001-123456789-0";
  const bank = "Bancolombia";
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>💳 Instrucciones de Pago</h2>
        <p style={styles.modalText}>
          Por favor realiza una transferencia o consignación por el valor de:
        </p>
        <p style={styles.modalAmount}>{fmt(total)}</p>
        <div style={styles.bankInfo}>
          <p><strong>Banco:</strong> {bank}</p>
          <p><strong>Cuenta:</strong> {account}</p>
          <p><strong>Titular:</strong> Mi Tienda S.A.S</p>
          <p><strong>Concepto:</strong> Pedido #{Date.now().toString().slice(-6)}</p>
        </div>
        <p style={styles.modalNote}>
          📧 Una vez realizado el pago, envía el comprobante a <em>pagos@mitienda.com</em>
        </p>
        <button onClick={onClose} style={styles.primaryBtn}>Entendido</button>
      </div>
    </div>
  );
}

function InvoiceModal({ cart, total, onClose }) {
  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(generateInvoiceHTML(cart, total));
    win.document.close();
    win.print();
  };
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>🧾 Factura Electrónica</h2>
        <p style={styles.modalText}>Tu factura ha sido generada exitosamente.</p>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr>
              {["Producto", "Cant.", "Precio", "Subtotal"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((i) => (
              <tr key={i.id}>
                <td style={styles.td}>{i.image} {i.name}</td>
                <td style={styles.td}>{i.qty}</td>
                <td style={styles.td}>{fmt(i.price)}</td>
                <td style={styles.td}>{fmt(i.price * i.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ textAlign: "right", fontWeight: "bold", color: "#b5813c", fontSize: "1.1rem" }}>
          Total: {fmt(total)}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={handlePrint} style={styles.primaryBtn}>🖨 Imprimir / Descargar</button>
          <button onClick={onClose} style={styles.secondaryBtn}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

function CatalogModal({ onClose, onAddToCart }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, maxWidth: 560 }}>
        <h2 style={styles.modalTitle}>🛍 Catálogo de Productos</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CATALOG_ITEMS.map((item) => (
            <div key={item.id} style={styles.catalogItem}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "2rem" }}>{item.image}</span>
                <div>
                  <p style={{ fontWeight: 700, margin: 0 }}>{item.name}</p>
                  <p style={{ color: "#b5813c", margin: 0 }}>{fmt(item.price)}</p>
                  {item.stock === 0 ? (
                    <span style={styles.outOfStockBadge}>Agotado</span>
                  ) : (
                    <span style={styles.inStockBadge}>En stock: {item.stock}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => { onAddToCart(item); onClose(); }}
                style={item.stock === 0 ? styles.preorderBtn : styles.primaryBtn}
              >
                {item.stock === 0 ? "📦 Pre-pedir" : "Agregar"}
              </button>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ ...styles.secondaryBtn, marginTop: 20, width: "100%" }}>
          Cerrar catálogo
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShoppingCart() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [modal, setModal] = useState(null); // "payment" | "invoice" | "catalog"
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  // RF 5.3 – Agregar cantidad
  const handleAdd = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  // RF 5.3 – Quitar cantidad o eliminar si llega a 0
  const handleRemove = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  // RF 5.3 – Eliminar elemento
  const handleDelete = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast("Producto eliminado del carrito.");
  };

  // RF 5.6 – Ir al catálogo
  const handleCatalog = () => setModal("catalog");

  // RF 5.8 – Agregar productos agotados como pre-pedido
  const handleAddToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      handleAdd(item.id);
    } else {
      setCart((prev) => [...prev, { ...item, qty: 1 }]);
    }
    showToast(
      item.stock === 0
        ? `📦 "${item.name}" agregado como pre-pedido.`
        : `"${item.name}" agregado al carrito.`
    );
  };

  // RF 5.4 / RF 5.5 – Proceder con la compra
  const handleCheckout = () => {
    if (cart.length === 0) return showToast("Tu carrito está vacío.");
    // RF 5.5: si solo hay 1 producto, ir directo al pago
    setModal("payment");
  };

  // RF 5.7 – Generar factura
  const handleInvoice = () => {
    if (cart.length === 0) return showToast("No hay productos para facturar.");
    setModal("invoice");
  };

  return (
    <div style={styles.root}>
      {/* Toast RF feedback */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Modals */}
      {modal === "payment" && (
        <PaymentModal total={total} onClose={() => setModal(null)} />
      )}
      {modal === "invoice" && (
        <InvoiceModal cart={cart} total={total} onClose={() => setModal(null)} />
      )}
      {modal === "catalog" && (
        <CatalogModal onClose={() => setModal(null)} onAddToCart={handleAddToCart} />
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>🛒 Mi Carrito</h1>
        {/* RF 5.6 */}
        <button onClick={handleCatalog} style={styles.catalogBtn}>
          📦 Ver Catálogo
        </button>
      </div>

      {/* Cart items */}
      {cart.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: "3rem" }}>🛒</p>
          <p style={{ color: "#888" }}>Tu carrito está vacío.</p>
          <button onClick={handleCatalog} style={styles.primaryBtn}>
            Ir al catálogo
          </button>
        </div>
      ) : (
        <>
          <div style={styles.itemsList}>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* RF 5.5 – Aviso de producto único */}
          {cart.length === 1 && (
            <div style={styles.singleProductBanner}>
              ⚡ Tienes un solo producto — serás enviado directamente al pago al confirmar.
            </div>
          )}

          {/* Totals */}
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalAmount}>{fmt(total)}</span>
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            {/* RF 5.4 / RF 5.5 */}
            <button onClick={handleCheckout} style={styles.primaryBtn}>
              💳 Proceder al Pago
            </button>
            {/* RF 5.7 */}
            <button onClick={handleInvoice} style={styles.secondaryBtn}>
              🧾 Generar Factura
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    maxWidth: 680,
    margin: "0 auto",
    padding: "24px 20px",
    background: "#faf8f5",
    minHeight: "100vh",
    color: "#1a1a1a",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottom: "2px solid #1a1a1a",
    paddingBottom: 16,
  },
  heading: {
    margin: 0,
    fontSize: "1.8rem",
    letterSpacing: "-0.5px",
  },
  catalogBtn: {
    background: "transparent",
    border: "2px solid #1a1a1a",
    padding: "8px 16px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    fontWeight: 600,
    transition: "all .2s",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  cartItem: {
    background: "#fff",
    border: "1px solid #e0dbd3",
    borderRadius: 4,
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  cartItemLeft: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    flex: 1,
  },
  cartItemRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  itemEmoji: { fontSize: "2.2rem" },
  itemName: { margin: 0, fontWeight: 700, fontSize: "1rem" },
  itemPrice: { margin: 0, color: "#777", fontSize: "0.85rem" },
  itemSubtotal: { margin: 0, fontWeight: 700, color: "#b5813c", minWidth: 90, textAlign: "right" },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid #ddd",
    borderRadius: 2,
    overflow: "hidden",
  },
  qtyBtn: {
    background: "#f5f5f5",
    border: "none",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: 700,
    transition: "background .15s",
  },
  qtyNum: {
    width: 32,
    textAlign: "center",
    fontWeight: 700,
    fontSize: "0.95rem",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    opacity: 0.6,
    transition: "opacity .2s",
  },
  outOfStockBadge: {
    fontSize: "0.72rem",
    background: "#fff3cd",
    color: "#856404",
    padding: "2px 7px",
    borderRadius: 20,
    fontWeight: 600,
    display: "inline-block",
    marginTop: 4,
  },
  inStockBadge: {
    fontSize: "0.72rem",
    background: "#d4edda",
    color: "#155724",
    padding: "2px 7px",
    borderRadius: 20,
    fontWeight: 600,
    display: "inline-block",
    marginTop: 4,
  },
  singleProductBanner: {
    background: "#fff3cd",
    border: "1px solid #ffc107",
    borderRadius: 4,
    padding: "10px 16px",
    fontSize: "0.88rem",
    marginBottom: 16,
    color: "#856404",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "2px solid #1a1a1a",
    paddingTop: 16,
    marginBottom: 20,
  },
  totalLabel: { fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 },
  totalAmount: { fontSize: "1.5rem", fontWeight: 700, color: "#b5813c" },
  actions: { display: "flex", gap: 12, flexWrap: "wrap" },
  primaryBtn: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    transition: "background .2s",
    flex: 1,
    minWidth: 160,
  },
  secondaryBtn: {
    background: "transparent",
    color: "#1a1a1a",
    border: "2px solid #1a1a1a",
    padding: "12px 24px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    flex: 1,
    minWidth: 160,
  },
  preorderBtn: {
    background: "#856404",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.88rem",
    fontWeight: 700,
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: "#fff",
    maxWidth: 480,
    width: "100%",
    padding: "32px 28px",
    borderTop: "4px solid #b5813c",
    borderRadius: 2,
    fontFamily: "Georgia, serif",
  },
  modalTitle: { margin: "0 0 16px", fontSize: "1.4rem" },
  modalText: { color: "#555", marginBottom: 12 },
  modalAmount: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#b5813c",
    textAlign: "center",
    margin: "16px 0",
  },
  bankInfo: {
    background: "#faf8f5",
    border: "1px solid #e0dbd3",
    padding: "14px 18px",
    borderRadius: 4,
    lineHeight: 1.9,
    marginBottom: 16,
  },
  modalNote: { fontSize: "0.85rem", color: "#555", marginBottom: 20 },
  th: {
    background: "#1a1a1a",
    color: "#fff",
    padding: "8px 10px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "0.85rem",
  },
  td: {
    padding: "8px 10px",
    borderBottom: "1px solid #eee",
    fontSize: "0.9rem",
  },
  catalogItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    border: "1px solid #e0dbd3",
    borderRadius: 4,
    background: "#faf8f5",
  },
  // Toast
  toast: {
    position: "fixed",
    bottom: 24,
    right: 24,
    background: "#1a1a1a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 4,
    display: "flex",
    gap: 12,
    alignItems: "center",
    zIndex: 2000,
    fontSize: "0.9rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  toastClose: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    opacity: 0.7,
  },
};
