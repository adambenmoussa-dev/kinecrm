import React, { useState } from "react";

const COLORS = {
  forest: "#1C3A2E", forestMid: "#2D5240", forestLight: "#3D6B54",
  sage: "#7FA688", sageLight: "#A8C4AF", cream: "#F4EFE6", creamDark: "#EAE3D6",
  coral: "#D4694A", coralLight: "#E8957E", gold: "#C9A84C", goldLight: "#E2C97A",
  white: "#FFFFFF", textDark: "#1A2820", textMid: "#4A6358", textLight: "#7A9388",
  border: "#DDD8CE",
};

const patients = [
  { id: 1, name: "Marie Dupont", age: 42, pathology: "Lombalgie chronique", sessions: 12, nextRdv: "14 mars 09:00", status: "actif", progress: 72, avatar: "MD" },
  { id: 2, name: "Jean-Pierre Martin", age: 67, pathology: "Prothèse genou", sessions: 8, nextRdv: "14 mars 10:30", status: "actif", progress: 45, avatar: "JM" },
  { id: 3, name: "Sophie Leclerc", age: 28, pathology: "Entorse cheville", sessions: 4, nextRdv: "15 mars 14:00", status: "actif", progress: 88, avatar: "SL" },
  { id: 4, name: "Ahmed Benali", age: 35, pathology: "Épaule opérée", sessions: 15, nextRdv: "16 mars 11:00", status: "actif", progress: 60, avatar: "AB" },
  { id: 5, name: "Claire Fontaine", age: 55, pathology: "Cervicalgies", sessions: 6, nextRdv: "17 mars 08:30", status: "actif", progress: 55, avatar: "CF" },
  { id: 6, name: "Lucas Bernard", age: 22, pathology: "Tendinopathie rotulienne", sessions: 3, nextRdv: "18 mars 15:00", status: "actif", progress: 30, avatar: "LB" },
];

const appointments = [
  { time: "08:30", patient: "Claire Fontaine", type: "Rééducation cervicale", duration: 45, room: "Salle 1", status: "confirmé", avatar: "CF" },
  { time: "09:15", patient: "Marie Dupont", type: "Bilan lombaire", duration: 60, room: "Salle 2", status: "confirmé", avatar: "MD" },
  { time: "10:00", patient: "Lucas Bernard", type: "Massage thérapeutique", duration: 30, room: "Salle 1", status: "confirmé", avatar: "LB" },
  { time: "10:30", patient: "Jean-Pierre Martin", type: "Post-op genou", duration: 60, room: "Salle 3", status: "en attente", avatar: "JM" },
  { time: "11:30", patient: "Sophie Leclerc", type: "Rééducation entorse", duration: 45, room: "Salle 2", status: "confirmé", avatar: "SL" },
  { time: "14:00", patient: "Isabelle Roy", type: "Électrothérapie", duration: 30, room: "Salle 1", status: "confirmé", avatar: "IR" },
  { time: "14:30", patient: "Marc Pellerin", type: "Kinésithérapie respiratoire", duration: 45, room: "Salle 2", status: "confirmé", avatar: "MP" },
  { time: "15:15", patient: "Ahmed Benali", type: "Post-op épaule", duration: 60, room: "Salle 3", status: "en attente", avatar: "AB" },
];

const navItems = [
  { id: "dashboard", label: "Tableau de bord", icon: "⊞" },
  { id: "agenda", label: "Agenda", icon: "◫" },
  { id: "patients", label: "Patients", icon: "⊕" },
  { id: "billing", label: "Facturation", icon: "◎" },
  { id: "exercises", label: "Exercices vidéo", icon: "▶" },
  { id: "ai", label: "Assistant IA", icon: "◉" },
  { id: "rosp", label: "ROSP & Qualité", icon: "◈" },
  { id: "pricing", label: "Nos formules", icon: "✦" },
];

function Avatar({ initials, size = 36, color = COLORS.forestMid }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, color: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5 }}>
      {initials}
    </div>
  );
}

function Badge({ label }) {
  const map = { "confirmé": { bg: "#D4EDDA", text: "#1C5E2E" }, "en attente": { bg: "#FFF3CD", text: "#7A5800" }, "actif": { bg: "#D4EDDA", text: "#1C5E2E" }, "rejeté": { bg: "#F8D7DA", text: "#7A1C28" }, "télétransmis": { bg: "#D4EDDA", text: "#1C5E2E" }, "Télétransmis": { bg: "#D4EDDA", text: "#1C5E2E" }, "En attente": { bg: "#FFF3CD", text: "#7A5800" }, "Rejeté": { bg: "#F8D7DA", text: "#7A1C28" } };
  const s = map[label] || { bg: COLORS.creamDark, text: COLORS.textMid };
  return <span style={{ background: s.bg, color: s.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 0.3, whiteSpace: "nowrap" }}>{label}</span>;
}

function ProgressBar({ value }) {
  const c = value > 75 ? COLORS.forestLight : value > 50 ? COLORS.sage : COLORS.gold;
  return (
    <div style={{ background: COLORS.border, borderRadius: 4, height: 6, overflow: "hidden", width: "100%" }}>
      <div style={{ width: `${value}%`, height: "100%", borderRadius: 4, background: c }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 12px rgba(28,58,46,0.05)", ...style }}>{children}</div>;
}

function StatCard({ label, value, sub, icon, trend, color = COLORS.forest }) {
  return (
    <Card style={{ padding: "20px 22px", borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, color: COLORS.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{label}</p>
          <p style={{ margin: "6px 0 4px", fontSize: 28, fontWeight: 900, color: COLORS.textDark, lineHeight: 1, fontFamily: "Georgia, serif" }}>{value}</p>
          <p style={{ margin: 0, fontSize: 11.5, color: trend >= 0 ? "#1C5E2E" : COLORS.coral, fontWeight: 600 }}>{trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs mois dernier</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: color, flexShrink: 0 }}>{icon}</div>
      </div>
      {sub && <p style={{ margin: "10px 0 0", fontSize: 11.5, color: COLORS.textLight, borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 }}>{sub}</p>}
    </Card>
  );
}

function Dashboard({ setActiveNav }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Bonjour, Dr. Moreau 👋</h2>
        <p style={{ margin: "4px 0 0", color: COLORS.textLight, fontSize: 13.5 }}>Vendredi 14 mars 2025 · 8 rendez-vous aujourd'hui</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Patients actifs" value="94" trend={8} icon="👤" color={COLORS.forest} sub="12 nouveaux ce mois" />
        <StatCard label="RDV ce mois" value="186" trend={12} icon="📅" color={COLORS.sage} sub="Taux présence 94%" />
        <StatCard label="CA mensuel" value="7 820€" trend={5} icon="💶" color={COLORS.gold} sub="62 feuilles transmises" />
        <StatCard label="Score ROSP" value="87/100" trend={15} icon="⭐" color={COLORS.coral} sub="+420€ estimés ce trim." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 18 }}>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Agenda du jour</h3>
            <button onClick={() => setActiveNav("agenda")} style={{ background: "none", border: "none", color: COLORS.forest, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Voir tout →</button>
          </div>
          <div>
            {appointments.slice(0, 6).map((apt, i) => (
              <div key={i} style={{ padding: "11px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12, background: i === 1 ? `${COLORS.forest}06` : "transparent" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.forest, minWidth: 44 }}>{apt.time}</span>
                <div style={{ width: 3, height: 32, borderRadius: 2, background: i === 1 ? COLORS.coral : COLORS.sageLight, flexShrink: 0 }} />
                <Avatar initials={apt.avatar} size={30} color={i % 2 === 0 ? COLORS.forest : COLORS.forestLight} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 12.5, color: COLORS.textDark }}>{apt.patient}</p>
                  <p style={{ margin: 0, fontSize: 11, color: COLORS.textLight }}>{apt.type} · {apt.duration} min · {apt.room}</p>
                </div>
                <Badge label={apt.status} />
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}` }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Progression patients</h3>
          </div>
          <div style={{ padding: "6px 0" }}>
            {patients.slice(0, 5).map((p, i) => (
              <div key={i} style={{ padding: "9px 22px", display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar initials={p.avatar} size={30} color={i % 2 === 0 ? COLORS.forest : COLORS.forestLight} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: COLORS.textDark }}>{p.name}</p>
                  <div style={{ marginTop: 4 }}><ProgressBar value={p.progress} /></div>
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.forestMid, minWidth: 34, textAlign: "right" }}>{p.progress}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestLight})`, borderRadius: 14, padding: "18px 24px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: COLORS.cream, fontSize: 13, fontWeight: 700, marginRight: 4 }}>Actions rapides :</span>
        {[
          { label: "+ Nouveau patient", nav: "patients" },
          { label: "📅 Ajouter RDV", nav: "agenda" },
          { label: "🎥 Envoyer exercices", nav: "exercises" },
          { label: "🤖 Dicter CR", nav: "ai" },
          { label: "📄 Feuille de soins", nav: "billing" },
        ].map((a, i) => (
          <button key={i} onClick={() => setActiveNav(a.nav)} style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", color: COLORS.white, padding: "7px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{a.label}</button>
        ))}
      </div>
    </div>
  );
}

function Agenda() {
  const [view, setView] = useState("week");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patient: "", type: "", time: "", duration: "45", room: "Salle 1" });
  const [localApts, setLocalApts] = useState(appointments);
  const days = ["Lun 10", "Mar 11", "Mer 12", "Jeu 13", "Ven 14", "Sam 15"];
  const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  const aptColors = [COLORS.sage, COLORS.coral, COLORS.gold, COLORS.forestLight, "#9B7ED8", "#4A90D9"];

  const addApt = () => {
    if (!form.patient || !form.time) return;
    setLocalApts([...localApts, { ...form, status: "confirmé", avatar: form.patient.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() }]);
    setShowModal(false);
    setForm({ patient: "", type: "", time: "", duration: "45", room: "Salle 1" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Agenda</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", background: COLORS.creamDark, borderRadius: 8, padding: 3 }}>
            {["Semaine","Jour"].map((v, i) => (
              <button key={i} onClick={() => setView(v === "Semaine" ? "week" : "day")} style={{ padding: "6px 14px", borderRadius: 6, border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer", background: (view === "week" && v === "Semaine") || (view === "day" && v === "Jour") ? COLORS.white : "transparent", color: COLORS.textDark }}>{v}</button>
            ))}
          </div>
          <select style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 12.5, color: COLORS.textDark }}>
            <option>Dr. Moreau</option><option>Dr. Lambert</option><option>Tous</option>
          </select>
          <button onClick={() => setShowModal(true)} style={{ padding: "8px 18px", borderRadius: 8, background: COLORS.forest, color: COLORS.white, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Nouveau RDV</button>
        </div>
      </div>
      <Card style={{ overflow: "hidden", marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "72px repeat(6,1fr)", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ padding: 10 }} />
          {days.map((d, i) => (
            <div key={i} style={{ padding: "10px 6px", textAlign: "center", background: i === 4 ? `${COLORS.forest}10` : "transparent", borderLeft: `1px solid ${COLORS.border}` }}>
              <p style={{ margin: 0, fontSize: 10, color: COLORS.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{d.split(" ")[0]}</p>
              <p style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 900, color: i === 4 ? COLORS.forest : COLORS.textDark, fontFamily: "Georgia, serif" }}>{d.split(" ")[1]}</p>
            </div>
          ))}
        </div>
        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          {hours.map((h, hi) => (
            <div key={hi} style={{ display: "grid", gridTemplateColumns: "72px repeat(6,1fr)", minHeight: 58 }}>
              <div style={{ padding: "6px 10px", fontSize: 11, color: COLORS.textLight, fontWeight: 600, paddingTop: 10 }}>{h}</div>
              {days.map((d, di) => {
                const aptIdx = localApts.findIndex((a, ai) => {
                  const hr = parseInt(a.time.split(":")[0]);
                  return hr === parseInt(h.split(":")[0]) && ai % 6 === di;
                });
                const apt = aptIdx !== -1 ? localApts[aptIdx] : null;
                return (
                  <div key={di} style={{ borderLeft: `1px solid ${COLORS.border}`, borderTop: `1px solid ${COLORS.border}`, padding: 3, background: di === 4 ? `${COLORS.forest}03` : "transparent" }}>
                    {apt && (
                      <div style={{ background: aptColors[di % aptColors.length], borderRadius: 6, padding: "5px 7px", fontSize: 10.5, color: COLORS.white, fontWeight: 600, cursor: "pointer", lineHeight: 1.4 }}>
                        <div>{apt.time}</div>
                        <div style={{ fontWeight: 400, opacity: 0.9 }}>{apt.patient.split(" ")[0]}</div>
                        <div style={{ opacity: 0.75, fontSize: 10 }}>{apt.duration}min</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: COLORS.textDark }}>Rendez-vous du jour — Vendredi 14 mars</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {localApts.slice(0,4).map((apt, i) => (
            <Card key={i} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: aptColors[i % aptColors.length], flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.forest }}>{apt.time}</span>
                <Badge label={apt.status} />
              </div>
              <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>{apt.patient}</p>
              <p style={{ margin: "0 0 6px", fontSize: 11, color: COLORS.textLight }}>{apt.type}</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.textLight }}>{apt.duration} min · {apt.room}</p>
            </Card>
          ))}
        </div>
      </div>
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: COLORS.white, borderRadius: 18, padding: 28, width: 440, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: COLORS.textDark }}>Nouveau rendez-vous</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textLight }}>×</button>
            </div>
            {[
              { label: "Patient", key: "patient", placeholder: "Nom du patient" },
              { label: "Type de séance", key: "type", placeholder: "Ex: Rééducation lombaire" },
              { label: "Heure", key: "time", placeholder: "Ex: 10:30", type: "time" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>{f.label}</label>
                <input type={f.type || "text"} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.textDark, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Durée</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                  <option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>Salle</label>
                <select value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                  <option>Salle 1</option><option>Salle 2</option><option>Salle 3</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, background: COLORS.creamDark, color: COLORS.textMid, border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Annuler</button>
              <button onClick={addApt} style={{ flex: 2, padding: "11px", borderRadius: 10, background: COLORS.forest, color: COLORS.white, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Confirmer le RDV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Patients() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", pathology: "" });
  const [localPatients, setLocalPatients] = useState(patients);
  const [activeTab, setActiveTab] = useState("bilan");
  const filtered = localPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.pathology.toLowerCase().includes(search.toLowerCase()));

  const addPatient = () => {
    if (!newPatient.name) return;
    const p = { id: Date.now(), ...newPatient, sessions: 0, nextRdv: "—", status: "actif", progress: 0, avatar: newPatient.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() };
    setLocalPatients([...localPatients, p]);
    setShowAddModal(false);
    setNewPatient({ name: "", age: "", pathology: "" });
  };

  if (selected) {
    const p = localPatients.find(x => x.id === selected);
    const tabs = ["bilan", "séances", "exercices", "facturation"];
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: COLORS.forest, cursor: "pointer", fontSize: 13.5, fontWeight: 700, marginBottom: 20, padding: 0 }}>← Retour aux patients</button>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          <div>
            <Card style={{ padding: 22, textAlign: "center", marginBottom: 14 }}>
              <Avatar initials={p.avatar} size={64} color={COLORS.forest} />
              <h3 style={{ margin: "12px 0 4px", fontFamily: "Georgia, serif", color: COLORS.textDark, fontSize: 18 }}>{p.name}</h3>
              <p style={{ margin: "0 0 14px", color: COLORS.textLight, fontSize: 13 }}>{p.age} ans · {p.pathology}</p>
              <div style={{ background: COLORS.cream, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
                <p style={{ margin: 0, fontSize: 11, color: COLORS.textLight, fontWeight: 600 }}>PROGRESSION DU TRAITEMENT</p>
                <p style={{ margin: "4px 0 8px", fontSize: 30, fontWeight: 900, color: COLORS.forest, fontFamily: "Georgia, serif" }}>{p.progress}%</p>
                <ProgressBar value={p.progress} />
              </div>
              <div style={{ textAlign: "left" }}>
                {[{ l: "Séances", v: `${p.sessions}` }, { l: "Prochain RDV", v: p.nextRdv }, { l: "Mutuelle", v: "MGEN" }, { l: "Médecin traitant", v: "Dr. Rousseau" }, { l: "Consentement", v: "✓ Signé" }].map((info, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: idx < 4 ? `1px solid ${COLORS.border}` : "none" }}>
                    <span style={{ fontSize: 12, color: COLORS.textLight }}>{info.l}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textDark }}>{info.v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ padding: 16 }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: COLORS.textMid, textTransform: "uppercase", letterSpacing: 0.8 }}>Alertes</p>
              <div style={{ background: "#FFF3CD", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#7A5800", marginBottom: 8 }}>⚠️ Ordonnance expire le 28/03</div>
              <div style={{ background: "#D4EDDA", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#1C5E2E" }}>✓ Rappel SMS envoyé il y a 2h</div>
            </Card>
          </div>
          <div>
            <div style={{ display: "flex", gap: 4, marginBottom: 16, background: COLORS.creamDark, padding: 4, borderRadius: 10, width: "fit-content" }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "7px 16px", borderRadius: 7, border: "none", fontWeight: 600, fontSize: 12.5, cursor: "pointer", background: activeTab === t ? COLORS.white : "transparent", color: activeTab === t ? COLORS.textDark : COLORS.textLight, textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
            {activeTab === "bilan" && (
              <Card style={{ overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}`, background: `${COLORS.forest}06` }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Bilan initial & évolution</h3>
                </div>
                <div style={{ padding: 22 }}>
                  {[{ label: "Douleur (EVA)", before: 7, after: 3 }, { label: "Mobilité (%)", before: 45, after: 72 }, { label: "Autonomie (%)", before: 40, after: 78 }].map((m, i) => (
                    <div key={i} style={{ marginBottom: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{m.label}</span>
                        <span style={{ fontSize: 12, color: COLORS.textLight }}>{m.before} → <strong style={{ color: "#1C5E2E" }}>{m.after}</strong></span>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <span style={{ fontSize: 10, color: COLORS.textLight, minWidth: 40 }}>Initial</span>
                        <ProgressBar value={m.before * 10} />
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: COLORS.textLight, minWidth: 40 }}>Actuel</span>
                        <ProgressBar value={m.after * 10} />
                      </div>
                    </div>
                  ))}
                  <div style={{ background: COLORS.cream, borderRadius: 10, padding: 16, marginTop: 8 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: COLORS.textMid, textTransform: "uppercase", letterSpacing: 0.8 }}>Notes cliniques</p>
                    <p style={{ margin: 0, fontSize: 13, color: COLORS.textMid, lineHeight: 1.7 }}>Patient motivé, bonne compliance aux exercices à domicile. Amélioration notable de la mobilité en flexion (+15°). Objectif : retour à la marche sans douleur sous 3 semaines.</p>
                  </div>
                </div>
              </Card>
            )}
            {activeTab === "séances" && (
              <Card style={{ overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Historique des séances</h3>
                </div>
                {[
                  { date: "12/03/2025", type: "Rééducation active", note: "Flexion +15°, EVA 3/10. Exercices paravertébraux 3×12." },
                  { date: "07/03/2025", type: "Massage + mobilisation", note: "Décontraction musculaire. Mobilisation L4-L5. Amélioration." },
                  { date: "03/03/2025", type: "Bilan + première séance", note: "EVA 7/10. Limitation flexion. Plan de traitement établi sur 15 séances." },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 22px", borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>{s.type}</span>
                      <span style={{ fontSize: 11, color: COLORS.textLight }}>{s.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12.5, color: COLORS.textMid, lineHeight: 1.6 }}>{s.note}</p>
                  </div>
                ))}
              </Card>
            )}
            {activeTab === "exercices" && (
              <Card style={{ overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Programme d'exercices</h3>
                  <button style={{ padding: "6px 14px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>🎥 Envoyer vidéos</button>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { name: "Étirement lombaire", freq: "2×/jour", done: true, video: true },
                    { name: "Gainage abdominal", freq: "1×/jour", done: true, video: true },
                    { name: "Renforcement fessiers", freq: "1×/jour", done: false, video: false },
                    { name: "Stretching ischio-jambiers", freq: "2×/jour", done: false, video: true },
                  ].map((ex, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: COLORS.cream, borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: ex.done ? "#1C5E2E" : COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: COLORS.white, fontWeight: 700, flexShrink: 0 }}>{ex.done ? "✓" : ""}</div>
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{ex.name}</p>
                          <p style={{ margin: 0, fontSize: 11, color: COLORS.textLight }}>{ex.freq}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {ex.video && <span style={{ fontSize: 10, background: `${COLORS.forest}15`, color: COLORS.forest, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>▶ vidéo</span>}
                        <Badge label={ex.done ? "confirmé" : "en attente"} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {activeTab === "facturation" && (
              <Card style={{ overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Historique facturation</h3>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: COLORS.cream }}>
                    {["N° Feuille","Date","Montant","Statut"].map((h,i) => <th key={i} style={{ padding: "9px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[
                      { id: "FS-2025-0186", date: "12/03/2025", amount: "63,00€", status: "Télétransmis" },
                      { id: "FS-2025-0151", date: "07/03/2025", amount: "54,00€", status: "Télétransmis" },
                      { id: "FS-2025-0120", date: "03/03/2025", amount: "63,00€", status: "Télétransmis" },
                    ].map((inv, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "12px 18px", fontSize: 12.5, fontWeight: 700, color: COLORS.forest, fontFamily: "monospace" }}>{inv.id}</td>
                        <td style={{ padding: "12px 18px", fontSize: 12.5, color: COLORS.textLight }}>{inv.date}</td>
                        <td style={{ padding: "12px 18px", fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>{inv.amount}</td>
                        <td style={{ padding: "12px 18px" }}><Badge label={inv.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Patients ({filtered.length})</h2>
        <button onClick={() => setShowAddModal(true)} style={{ padding: "9px 20px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Nouveau patient</button>
      </div>
      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 12 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Rechercher..." style={{ flex: 1, padding: "8px 13px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.textDark, outline: "none" }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: COLORS.cream }}>
            {["Patient","Pathologie","Séances","Progression","Prochain RDV","Statut",""].map((h, i) => (
              <th key={i} style={{ padding: "9px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderTop: `1px solid ${COLORS.border}`, cursor: "pointer" }} onClick={() => setSelected(p.id)}>
                <td style={{ padding: "13px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={p.avatar} size={34} color={i % 2 === 0 ? COLORS.forest : COLORS.forestLight} />
                    <div><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>{p.name}</p><p style={{ margin: 0, fontSize: 11, color: COLORS.textLight }}>{p.age} ans</p></div>
                  </div>
                </td>
                <td style={{ padding: "13px 18px", fontSize: 13, color: COLORS.textMid }}>{p.pathology}</td>
                <td style={{ padding: "13px 18px", fontSize: 13, fontWeight: 700, color: COLORS.textDark, textAlign: "center" }}>{p.sessions}</td>
                <td style={{ padding: "13px 18px", minWidth: 130 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><ProgressBar value={p.progress} /><span style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMid, minWidth: 32 }}>{p.progress}%</span></div>
                </td>
                <td style={{ padding: "13px 18px", fontSize: 12, color: COLORS.textLight }}>{p.nextRdv}</td>
                <td style={{ padding: "13px 18px" }}><Badge label={p.status} /></td>
                <td style={{ padding: "13px 18px" }}><button style={{ background: `${COLORS.forest}12`, border: "none", color: COLORS.forest, padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Ouvrir →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: COLORS.white, borderRadius: 18, padding: 28, width: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: COLORS.textDark }}>Nouveau patient</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textLight }}>×</button>
            </div>
            {[{ label: "Nom complet", key: "name", placeholder: "Prénom Nom" }, { label: "Âge", key: "age", placeholder: "Ex: 45" }, { label: "Pathologie", key: "pathology", placeholder: "Ex: Lombalgie chronique" }].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>{f.label}</label>
                <input value={newPatient[f.key]} onChange={e => setNewPatient({ ...newPatient, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, background: COLORS.creamDark, color: COLORS.textMid, border: "none", fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={addPatient} style={{ flex: 2, padding: "11px", borderRadius: 10, background: COLORS.forest, color: COLORS.white, border: "none", fontWeight: 700, cursor: "pointer" }}>Créer le dossier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Billing() {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([
    { id: "FS-2025-0186", patient: "Marie Dupont", date: "13/03/2025", amount: "63,00€", status: "Télétransmis", cpam: "Remboursé" },
    { id: "FS-2025-0185", patient: "Jean-Pierre Martin", date: "12/03/2025", amount: "54,00€", status: "En attente", cpam: "En cours" },
    { id: "FS-2025-0184", patient: "Sophie Leclerc", date: "12/03/2025", amount: "45,00€", status: "Télétransmis", cpam: "Remboursé" },
    { id: "FS-2025-0183", patient: "Ahmed Benali", date: "11/03/2025", amount: "81,00€", status: "Télétransmis", cpam: "Remboursé" },
    { id: "FS-2025-0182", patient: "Claire Fontaine", date: "11/03/2025", amount: "45,00€", status: "Rejeté", cpam: "Rejeté" },
  ]);
  const [form, setForm] = useState({ patient: "", amount: "", actes: "" });

  const addInvoice = () => {
    if (!form.patient || !form.amount) return;
    const newInv = { id: `FS-2025-0${187 + invoices.length}`, patient: form.patient, date: "14/03/2025", amount: `${form.amount}€`, status: "En attente", cpam: "En cours" };
    setInvoices([newInv, ...invoices]);
    setShowModal(false);
    setForm({ patient: "", amount: "", actes: "" });
  };

  const transmit = (id) => setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "Télétransmis", cpam: "En cours" } : inv));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Facturation & Télétransmission</h2>
        <button onClick={() => setShowModal(true)} style={{ padding: "9px 20px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Nouvelle feuille</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { label: "CA Mars", value: "7 820€", color: COLORS.gold },
          { label: "Télétransmis", value: `${invoices.filter(i => i.status === "Télétransmis").length}`, color: COLORS.forestLight },
          { label: "En attente CPAM", value: `${invoices.filter(i => i.status === "En attente").length}`, color: COLORS.coral },
          { label: "Rejetés", value: `${invoices.filter(i => i.status === "Rejeté").length}`, color: COLORS.coral },
        ].map((s, i) => (
          <Card key={i} style={{ padding: "18px 20px", borderTop: `4px solid ${s.color}` }}>
            <p style={{ margin: 0, fontSize: 10.5, color: COLORS.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</p>
            <p style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>{s.value}</p>
          </Card>
        ))}
      </div>
      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "15px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Feuilles de soins</h3>
          <button onClick={() => setInvoices(invoices.map(inv => inv.status === "En attente" ? { ...inv, status: "Télétransmis", cpam: "En cours" } : inv))} style={{ padding: "6px 14px", background: `${COLORS.forest}12`, color: COLORS.forest, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📤 Tout télétransmettre</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: COLORS.cream }}>
            {["N° Feuille","Patient","Date","Montant","Statut","CPAM","Action"].map((h, i) => <th key={i} style={{ padding: "9px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "13px 18px", fontSize: 12.5, fontWeight: 700, color: COLORS.forest, fontFamily: "monospace" }}>{inv.id}</td>
                <td style={{ padding: "13px 18px", fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{inv.patient}</td>
                <td style={{ padding: "13px 18px", fontSize: 12.5, color: COLORS.textLight }}>{inv.date}</td>
                <td style={{ padding: "13px 18px", fontSize: 13, fontWeight: 700, color: COLORS.textDark }}>{inv.amount}</td>
                <td style={{ padding: "13px 18px" }}><Badge label={inv.status} /></td>
                <td style={{ padding: "13px 18px", fontSize: 12.5, color: COLORS.textLight }}>{inv.cpam}</td>
                <td style={{ padding: "13px 18px" }}>
                  {inv.status === "En attente" ? (
                    <button onClick={() => transmit(inv.id)} style={{ background: COLORS.forest, border: "none", color: COLORS.white, padding: "5px 12px", borderRadius: 6, fontSize: 11.5, cursor: "pointer", fontWeight: 600 }}>Transmettre</button>
                  ) : (
                    <button style={{ background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.textMid, padding: "5px 10px", borderRadius: 6, fontSize: 11.5, cursor: "pointer" }}>PDF</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: COLORS.white, borderRadius: 18, padding: 28, width: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: COLORS.textDark }}>Nouvelle feuille de soins</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: COLORS.textLight }}>×</button>
            </div>
            {[
              { label: "Patient", key: "patient", placeholder: "Nom du patient" },
              { label: "Montant (€)", key: "amount", placeholder: "Ex: 63" },
              { label: "Actes réalisés", key: "actes", placeholder: "Ex: AMK 8.5 × 6" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.textMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.6 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, background: COLORS.creamDark, color: COLORS.textMid, border: "none", fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={addInvoice} style={{ flex: 2, padding: "11px", borderRadius: 10, background: COLORS.forest, color: COLORS.white, border: "none", fontWeight: 700, cursor: "pointer" }}>Créer la feuille</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Exercises() {
  const [catFilter, setCatFilter] = useState("Tous");
  const [showSend, setShowSend] = useState(null);
  const [sent, setSent] = useState([]);
  const categories = ["Tous", "Lombalgie", "Post-op genou", "Épaule", "Cervicalgies", "Respiratoire"];
  const exercises = [
    { id: 1, name: "Étirement psoas-iliaque", category: "Lombalgie", views: 142, duration: "45s × 3", level: "Débutant" },
    { id: 2, name: "Gainage latéral", category: "Lombalgie", views: 98, duration: "30s × 4", level: "Intermédiaire" },
    { id: 3, name: "Mobilisation genou en flexion", category: "Post-op genou", views: 76, duration: "15 rép × 3", level: "Post-op" },
    { id: 4, name: "Renforcement quadriceps", category: "Post-op genou", views: 112, duration: "20 rép × 3", level: "Intermédiaire" },
    { id: 5, name: "Pendulum épaule", category: "Épaule", views: 58, duration: "2 min × 2", level: "Post-op" },
    { id: 6, name: "Étirement cervical latéral", category: "Cervicalgies", views: 203, duration: "30s × 3", level: "Débutant" },
    { id: 7, name: "Renforcement coiffe rotateurs", category: "Épaule", views: 87, duration: "15 rép × 3", level: "Avancé" },
    { id: 8, name: "Exercices respiratoires", category: "Respiratoire", views: 44, duration: "5 min", level: "Tous niveaux" },
  ];
  const filtered = catFilter === "Tous" ? exercises : exercises.filter(e => e.category === catFilter);
  const levelColors = { "Débutant": "#D4EDDA", "Intermédiaire": "#FFF3CD", "Avancé": "#F8D7DA", "Post-op": "#D4E8FF", "Tous niveaux": COLORS.creamDark };
  const levelTexts = { "Débutant": "#1C5E2E", "Intermédiaire": "#7A5800", "Avancé": "#7A1C28", "Post-op": "#1C4A7A", "Tous niveaux": COLORS.textMid };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Bibliothèque d'exercices</h2>
        <button style={{ padding: "9px 20px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Ajouter une vidéo</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map((c, i) => (
          <button key={i} onClick={() => setCatFilter(c)} style={{ padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${catFilter === c ? COLORS.forest : COLORS.border}`, background: catFilter === c ? COLORS.forest : COLORS.white, color: catFilter === c ? COLORS.white : COLORS.textMid, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {filtered.map((ex) => (
          <Card key={ex.id} style={{ overflow: "hidden" }}>
            <div style={{ height: 110, background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestLight})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: COLORS.white }}>▶</div>
              <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.4)", color: COLORS.white, padding: "2px 8px", borderRadius: 10, fontSize: 10.5, fontWeight: 600 }}>{ex.duration}</span>
              {sent.includes(ex.id) && <div style={{ position: "absolute", inset: 0, background: "rgba(28,58,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>}
            </div>
            <div style={{ padding: "13px 14px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: levelColors[ex.level], color: levelTexts[ex.level], padding: "2px 8px", borderRadius: 10 }}>{ex.level}</span>
              <p style={{ margin: "8px 0 3px", fontWeight: 700, fontSize: 13, color: COLORS.textDark, lineHeight: 1.3 }}>{ex.name}</p>
              <p style={{ margin: "0 0 10px", fontSize: 11, color: COLORS.textLight }}>{ex.category} · {ex.views} vues</p>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setShowSend(ex)} style={{ flex: 1, padding: "7px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 8, fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>📤 Envoyer</button>
                <button style={{ padding: "7px 10px", background: COLORS.creamDark, color: COLORS.textMid, border: "none", borderRadius: 8, fontSize: 11.5, cursor: "pointer" }}>✏️</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showSend && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: COLORS.white, borderRadius: 18, padding: 28, width: 400, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: COLORS.textDark }}>Envoyer l'exercice</h3>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: COLORS.textLight }}>"{showSend.name}"</p>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 }}>Sélectionner le patient</label>
            <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, marginBottom: 16, boxSizing: "border-box" }}>
              {patients.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 }}>Message</label>
            <textarea defaultValue={`Bonjour, voici l'exercice "${showSend.name}" à réaliser ${showSend.duration}. Bon courage !`} style={{ width: "100%", height: 80, padding: "9px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 12.5, resize: "none", boxSizing: "border-box", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowSend(null)} style={{ flex: 1, padding: "11px", borderRadius: 10, background: COLORS.creamDark, color: COLORS.textMid, border: "none", fontWeight: 600, cursor: "pointer" }}>Annuler</button>
              <button onClick={() => { setSent([...sent, showSend.id]); setShowSend(null); }} style={{ flex: 2, padding: "11px", borderRadius: 10, background: COLORS.forest, color: COLORS.white, border: "none", fontWeight: 700, cursor: "pointer" }}>📤 Envoyer via appli patient</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AIAssistant() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const demoText = `Le patient se présente ce matin pour sa huitième séance de rééducation post-opératoire d'une prothèse totale de genou droite. Il rapporte une amélioration notable de la douleur, évaluée à 3 sur 10 contre 5 la semaine dernière. La flexion active atteint maintenant 110 degrés. On a travaillé le renforcement du quadriceps avec des séries de 3 fois 15 répétitions, et la proprioception sur plateau instable. La marche sans cannes est réalisée sur 100 mètres sans boiterie notable.`;

  const generate = async () => {
    if (!transcript || loading) return;
    setLoading(true); setResult(""); setSaved(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Tu es un assistant clinique spécialisé en kinésithérapie. Génère un compte-rendu de séance structuré, professionnel et concis en français. Utilise exactement ces sections : **Motif / Contexte**, **Bilan objectif**, **Traitement réalisé**, **Évolution clinique**, **Plan de traitement**. Vocabulaire médical précis. 200-300 mots maximum.",
          messages: [{ role: "user", content: `Génère un compte-rendu structuré à partir de cette dictée : "${transcript}"` }],
        }),
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Erreur lors de la génération.");
    } catch (e) {
      setResult("Erreur de connexion à l'API.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Assistant IA · Comptes-rendus</h2>
        <p style={{ margin: "5px 0 0", color: COLORS.textLight, fontSize: 13.5 }}>Dictez votre consultation — l'IA génère un CR structuré en quelques secondes.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <Card style={{ overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "15px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.textDark }}>🎙 Dictée / Saisie libre</h3>
              <button onClick={() => setTranscript(demoText)} style={{ padding: "5px 13px", background: `${COLORS.forest}12`, color: COLORS.forest, border: "none", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>Démo →</button>
            </div>
            <div style={{ padding: 16 }}>
              <textarea value={transcript} onChange={e => setTranscript(e.target.value)} placeholder="Racontez librement le déroulé de la séance..." style={{ width: "100%", minHeight: 200, padding: 13, borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13, color: COLORS.textDark, lineHeight: 1.7, resize: "vertical", background: COLORS.cream, boxSizing: "border-box", outline: "none" }} />
              <button onClick={generate} disabled={!transcript || loading} style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 10, background: transcript && !loading ? `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestLight})` : COLORS.creamDark, color: transcript && !loading ? COLORS.white : COLORS.textLight, border: "none", fontWeight: 700, fontSize: 14, cursor: transcript && !loading ? "pointer" : "default" }}>
                {loading ? "⏳  Génération en cours..." : "🤖  Générer le compte-rendu"}
              </button>
            </div>
          </Card>
        </div>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "15px 20px", borderBottom: `1px solid ${COLORS.border}`, background: `${COLORS.forest}05` }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.textDark }}>📋 Compte-rendu généré</h3>
          </div>
          <div style={{ padding: 18, minHeight: 300 }}>
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 260, gap: 16, color: COLORS.textLight }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid ${COLORS.sageLight}`, borderTopColor: COLORS.forest, animation: "spin 0.9s linear infinite" }} />
                <p style={{ margin: 0, fontSize: 13 }}>Analyse de la dictée...</p>
              </div>
            )}
            {result && !loading && (
              <div>
                <div style={{ background: COLORS.cream, borderRadius: 10, padding: 16, fontSize: 13, color: COLORS.textMid, lineHeight: 1.8, whiteSpace: "pre-line", maxHeight: 320, overflowY: "auto" }}>{result}</div>
                {saved && <div style={{ marginTop: 10, padding: "8px 14px", background: "#D4EDDA", borderRadius: 8, fontSize: 12.5, color: "#1C5E2E", fontWeight: 600 }}>✓ Compte-rendu enregistré</div>}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button onClick={() => setSaved(true)} style={{ flex: 1, padding: "9px", background: COLORS.forest, color: COLORS.white, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>✓ Valider</button>
                  <button onClick={() => setResult("")} style={{ padding: "9px 13px", background: COLORS.creamDark, color: COLORS.textMid, border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>↩</button>
                </div>
              </div>
            )}
            {!result && !loading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 260, color: COLORS.textLight, gap: 10 }}>
                <span style={{ fontSize: 52, opacity: 0.2 }}>🤖</span>
                <p style={{ margin: 0, fontSize: 13 }}>Le compte-rendu apparaîtra ici</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ROSP() {
  const [year, setYear] = useState(2025);
  const indicators = [
    { name: "Taux de télétransmission", current: 94, target: 90, gain: 280, status: "ok" },
    { name: "Patients avec ordonnance valide", current: 88, target: 80, gain: 180, status: "ok" },
    { name: "Utilisation du DMP", current: 42, target: 60, gain: 0, status: "warning" },
    { name: "Délai prise en charge < 5j", current: 72, target: 70, gain: 150, status: "ok" },
    { name: "Prescriptions conformes AMM", current: 96, target: 85, gain: 320, status: "ok" },
    { name: "Formation DPC à jour", current: 100, target: 100, gain: 200, status: "ok" },
  ];
  const totalGain = indicators.reduce((s, i) => s + i.gain, 0);
  const score = Math.round(indicators.reduce((s, i) => s + (i.current / i.target) * (100 / indicators.length), 0));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Tableau de bord ROSP</h2>
          <p style={{ margin: "4px 0 0", color: COLORS.textLight, fontSize: 13 }}>Rémunération sur Objectifs de Santé Publique</p>
        </div>
        <select value={year} onChange={e => setYear(Number(e.target.value))} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.textDark }}>
          <option value={2025}>Exercice 2025</option>
          <option value={2024}>Exercice 2024</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.forestLight})`, borderRadius: 16, padding: 24, color: COLORS.white }}>
          <p style={{ margin: 0, fontSize: 10.5, opacity: 0.75, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Score global ROSP</p>
          <p style={{ margin: "8px 0 4px", fontSize: 52, fontWeight: 900, fontFamily: "Georgia, serif", lineHeight: 1 }}>{score}<span style={{ fontSize: 20, fontWeight: 400 }}>/100</span></p>
          <p style={{ margin: 0, fontSize: 12.5, opacity: 0.85 }}>↑ +12 pts vs {year - 1}</p>
        </div>
        <Card style={{ padding: 24 }}>
          <p style={{ margin: 0, fontSize: 10.5, color: COLORS.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>Gain estimé</p>
          <p style={{ margin: "8px 0 4px", fontSize: 42, fontWeight: 900, fontFamily: "Georgia, serif", color: COLORS.gold, lineHeight: 1 }}>{totalGain.toLocaleString()}€</p>
          <p style={{ margin: 0, fontSize: 12.5, color: COLORS.textLight }}>Versement prévu juin {year}</p>
        </Card>
        <Card style={{ padding: 24 }}>
          <p style={{ margin: 0, fontSize: 10.5, color: COLORS.textLight, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>À améliorer</p>
          <p style={{ margin: "8px 0 4px", fontSize: 32, fontWeight: 900, fontFamily: "Georgia, serif", color: COLORS.coral, lineHeight: 1 }}>DMP</p>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: COLORS.textLight }}>42% atteint / 60% cible</p>
          <div style={{ marginTop: 8, padding: "6px 10px", background: "#FFF3CD", borderRadius: 8, fontSize: 11.5, color: "#7A5800", fontWeight: 600 }}>⚠️ +320€ potentiels non captés</div>
        </Card>
      </div>
      <Card style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ padding: "15px 22px", borderBottom: `1px solid ${COLORS.border}` }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>Indicateurs détaillés</h3>
        </div>
        {indicators.map((ind, i) => (
          <div key={i} style={{ padding: "16px 22px", borderBottom: i < indicators.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ind.status === "ok" ? "#1C5E2E" : COLORS.coral, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{ind.name}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: ind.current >= ind.target ? "#1C5E2E" : COLORS.coral }}>
                  {ind.current}% / cible {ind.target}%
                </span>
              </div>
              <ProgressBar value={Math.min(100, (ind.current / ind.target) * 100)} />
            </div>
            <div style={{ textAlign: "right", minWidth: 72, flexShrink: 0 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: ind.gain > 0 ? "#1C5E2E" : COLORS.coral }}>+{ind.gain}€</p>
            </div>
          </div>
        ))}
      </Card>
      <Card style={{ padding: 22 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: COLORS.textDark }}>💡 Recommandations automatiques</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { color: "#FFF3CD", text: "#7A5800", icon: "📱", tip: "Activez le DMP pour 18 patients non encore enregistrés — gain potentiel +320€" },
            { color: "#D4EDDA", text: "#1C5E2E", icon: "✅", tip: "Votre taux de télétransmission (94%) dépasse l'objectif. Continuez ainsi !" },
            { color: "#D4E8FF", text: "#1C4A7A", icon: "📚", tip: "Formation DPC : votre attestation est à jour. Prochain renouvellement : déc. 2025." },
            { color: "#F8D7DA", text: "#7A1C28", icon: "⚠️", tip: "2 feuilles de soins rejetées. Vérifiez les codes actes AMK dans l'onglet facturation." },
          ].map((r, i) => (
            <div key={i} style={{ background: r.color, borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: r.text, lineHeight: 1.5 }}>
              <span style={{ fontSize: 16, marginRight: 6 }}>{r.icon}</span>{r.tip}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Pricing() {
  const plans = [
    { name: "Solo", price: "59", sub: "Kiné libéral seul", color: COLORS.sage, icon: "👤", features: ["Agenda intelligent", "Dossier patient enrichi", "Facturation & télétransmission", "Rappels SMS/email automatiques", "Application patient incluse", "Hébergement HDS", "Support email 5j/7"] },
    { name: "Cabinet", price: "109", sub: "Cabinet multi-praticiens", color: COLORS.forest, popular: true, icon: "🏥", features: ["Tout Solo inclus", "Planning multi-praticiens", "Gestion des remplaçants", "Statistiques d'équipe", "Bibliothèque vidéos exercices", "ROSP automatisé", "Intégration DMP", "Support prioritaire"] },
    { name: "Premium", price: "149", sub: "Kinés spécialisés", color: COLORS.gold, icon: "⭐", features: ["Tout Cabinet inclus", "Assistant IA comptes-rendus", "Modules sport & pédiatrie", "Analytics avancés", "API & intégrations tierces", "Onboarding dédié 1:1", "Support téléphonique 7j/7", "SLA 99,9%"] },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: COLORS.textDark, fontFamily: "Georgia, serif" }}>Des tarifs pensés pour les kinés</h2>
        <p style={{ margin: "10px auto 0", color: COLORS.textLight, fontSize: 14, maxWidth: 460 }}>Hébergement HDS inclus. Conformité RGPD native. Essai gratuit 30 jours, sans engagement.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 36 }}>
        {plans.map((p, i) => (
          <div key={i} style={{ borderRadius: 20, padding: 26, position: "relative", background: p.popular ? `linear-gradient(160deg, ${COLORS.forest}, ${COLORS.forestMid})` : COLORS.white, border: p.popular ? "none" : `1px solid ${COLORS.border}`, boxShadow: p.popular ? "0 24px 60px rgba(28,58,46,0.25)" : "0 2px 12px rgba(28,58,46,0.05)", transform: p.popular ? "scale(1.03)" : "none" }}>
            {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.gold, color: COLORS.textDark, padding: "4px 18px", borderRadius: 20, fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>⭐ Plus populaire</div>}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: p.popular ? "rgba(255,255,255,0.14)" : `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{p.icon}</div>
            <h3 style={{ margin: "0 0 3px", fontSize: 22, fontWeight: 900, color: p.popular ? COLORS.white : COLORS.textDark, fontFamily: "Georgia, serif" }}>{p.name}</h3>
            <p style={{ margin: "0 0 16px", fontSize: 12.5, color: p.popular ? "rgba(255,255,255,0.65)" : COLORS.textLight }}>{p.sub}</p>
            <div style={{ marginBottom: 22 }}>
              <span style={{ fontSize: 44, fontWeight: 900, color: p.popular ? COLORS.white : COLORS.textDark, fontFamily: "Georgia, serif" }}>{p.price}€</span>
              <span style={{ fontSize: 13, color: p.popular ? "rgba(255,255,255,0.55)" : COLORS.textLight }}>/mois HT</span>
            </div>
            <div style={{ marginBottom: 22 }}>
              {p.features.map((f, fi) => (
                <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 7 }}>
                  <span style={{ color: p.popular ? COLORS.goldLight : COLORS.forest, fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 12.5, color: p.popular ? "rgba(255,255,255,0.82)" : COLORS.textMid, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", padding: "12px", borderRadius: 12, background: p.popular ? COLORS.gold : COLORS.forest, color: p.popular ? COLORS.textDark : COLORS.white, border: "none", fontWeight: 800, fontSize: 13.5, cursor: "pointer" }}>
              {i === 0 ? "Démarrer l'essai gratuit" : `Choisir ${p.name}`}
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {[
          { icon: "🏥", title: "Hébergement HDS", desc: "Données hébergées en France, certifiées HDS" },
          { icon: "🔒", title: "RGPD natif", desc: "Consentements, exports DCP, suppression automatisés" },
          { icon: "🔗", title: "DMP intégré", desc: "Partage sécurisé avec le Dossier Médical Partagé" },
          { icon: "📱", title: "App patient", desc: "iOS & Android inclus dans toutes les formules" },
        ].map((f, i) => (
          <Card key={i} style={{ padding: 20, textAlign: "center" }}>
            <span style={{ fontSize: 28 }}>{f.icon}</span>
            <p style={{ margin: "10px 0 4px", fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>{f.title}</p>
            <p style={{ margin: 0, fontSize: 11.5, color: COLORS.textLight, lineHeight: 1.5 }}>{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard": return <Dashboard setActiveNav={setActiveNav} />;
      case "agenda": return <Agenda />;
      case "patients": return <Patients />;
      case "billing": return <Billing />;
      case "exercises": return <Exercises />;
      case "ai": return <AIAssistant />;
      case "rosp": return <ROSP />;
      case "pricing": return <Pricing />;
      default: return <Dashboard setActiveNav={setActiveNav} />;
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F4EFE6; font-family: 'Georgia', serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: #A8C4AF; border-radius: 3px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        button { font-family: inherit; }
        input, textarea, select { font-family: inherit; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <aside style={{ width: 218, background: COLORS.forest, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: COLORS.white, flexShrink: 0 }}>K</div>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 900, fontSize: 15.5, fontFamily: "Georgia, serif" }}>KinéCRM</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>Pro Cabinet</div>
              </div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "12px 10px" }}>
            <div style={{ marginBottom: 6, padding: "4px 10px", fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>Principal</div>
            {navItems.slice(0, 4).map(item => (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${activeNav === item.id ? "rgba(255,255,255,0.15)" : "transparent"}`, cursor: "pointer", background: activeNav === item.id ? "rgba(255,255,255,0.12)" : "transparent", color: activeNav === item.id ? COLORS.white : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: activeNav === item.id ? 700 : 500, marginBottom: 1, display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontSize: 15, opacity: activeNav === item.id ? 1 : 0.7 }}>{item.icon}</span>{item.label}
              </button>
            ))}
            <div style={{ margin: "14px 0 6px", padding: "4px 10px", fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>Outils avancés</div>
            {navItems.slice(4).map(item => (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 9, border: `1.5px solid ${activeNav === item.id ? "rgba(255,255,255,0.15)" : "transparent"}`, cursor: "pointer", background: activeNav === item.id ? "rgba(255,255,255,0.12)" : "transparent", color: activeNav === item.id ? COLORS.white : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: activeNav === item.id ? 700 : 500, marginBottom: 1, display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontSize: 15, opacity: activeNav === item.id ? 1 : 0.7 }}>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "14px 14px 18px", borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Avatar initials="CM" size={32} color={COLORS.sage} />
              <div>
                <div style={{ color: COLORS.white, fontSize: 12.5, fontWeight: 700 }}>Dr. C. Moreau</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Cabinet Santé+</div>
              </div>
            </div>
          </div>
        </aside>
        <main style={{ flex: 1, overflowY: "auto", padding: "30px 32px", background: COLORS.cream }}>
          {renderPage()}
        </main>
      </div>
    </>
  );
}
