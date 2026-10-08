import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Info, Zap, BookOpen, CheckCircle2 } from 'lucide-react';

export default function FuelCellSimulation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overall');

  // Helper component for chemical formulas
  const Chem = ({ formula }) => {
    // Basic parser for subscripts and superscripts (e.g. H2O, OH-, e-)
    const formatted = formula.split(/(\d+|[+-])/).map((part, i) => {
      if (/\d+/.test(part)) return <sub key={i} className="text-xs">{part}</sub>;
      if (/[+-]/.test(part)) return <sup key={i} className="text-xs">{part}</sup>;
      return part;
    });
    return <span className="font-semibold tracking-wide">{formatted}</span>;
  };

  const tabs = [
    { id: 'overall', label: 'Overall Summary' },
    { id: 'anode', label: 'Electrode X (Anode)' },
    { id: 'cathode', label: 'Electrode Y (Cathode)' },
    { id: 'electrolyte', label: 'Electrolyte & Electrodes' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Zap className="text-yellow-500 fill-yellow-500" />
              Hydrogen-Oxygen Fuel Cell
            </h1>
            <p className="text-slate-500 mt-1">HKDSE Chemistry (Chapter 31) Interactive Simulation</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                isPlaying ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Start Simulation'}
            </button>
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Main Diagram Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" />
              Interactive Diagram
            </h2>
            
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-visible">
              
              {/* CSS Animations injected directly for particles */}
              <style>{`
                @keyframes flowRight {
                  0% { transform: translateX(0); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(110px); opacity: 0; }
                }
                @keyframes flowLeft {
                  0% { transform: translateX(0); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(-110px); opacity: 0; }
                }
                @keyframes flowOutLeft {
                  0% { transform: translateX(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateX(-110px); opacity: 0; }
                }
                @keyframes flowOutRight {
                  0% { transform: translateX(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateX(110px); opacity: 0; }
                }
                @keyframes flowIon {
                  0% { transform: translateX(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateX(-120px); opacity: 0; }
                }
                @keyframes flowIonRight {
                  0% { transform: translateX(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateX(120px); opacity: 0; }
                }
                @keyframes flowElectronUp {
                  0% { transform: translateY(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateY(-70px); opacity: 0; }
                }
                @keyframes flowElectronAcross {
                  0% { transform: translateX(0); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(160px); opacity: 0; }
                }
                @keyframes flowElectronDown {
                  0% { transform: translateY(0); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateY(70px); opacity: 0; }
                }
                @keyframes pulseOpacity {
                  0%, 100% { opacity: 0.5; }
                  50% { opacity: 1; }
                }
                @keyframes floatSlow {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
                @keyframes floatSlowReverse {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(8px); }
                }
                .particle-h2 { animation: flowRight 2s linear infinite; }
                .particle-o2 { animation: flowLeft 2s linear infinite; }
                .particle-out-h2 { animation: flowOutLeft 2s linear infinite; animation-delay: 1s; }
                .particle-out-o2 { animation: flowOutRight 2s linear infinite; animation-delay: 1s; }
                .particle-ion { animation: flowIon 3s linear infinite; }
                .particle-e-up { animation: flowElectronUp 1s linear infinite; }
                .particle-e-across { animation: flowElectronAcross 2s linear infinite; animation-delay: 1s; }
                .particle-e-down { animation: flowElectronDown 1s linear infinite; animation-delay: 3s; }
                .bulb-glow { filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.8)); }
                .pulse-text { animation: pulseOpacity 1.5s ease-in-out infinite; }
                .float-slow { animation: floatSlow 4s ease-in-out infinite; }
                .float-slow-reverse { animation: floatSlowReverse 5s ease-in-out infinite; }
              `}</style>

              <svg viewBox="-160 -10 920 420" className="w-full h-full">
                {/* Definitions */}
                <defs>
                  <pattern id="porous" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#64748b" />
                    <circle cx="7" cy="7" r="1.5" fill="#64748b" />
                  </pattern>
                  <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                  </marker>
                  <marker id="arrowBlack" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
                  </marker>
                </defs>

                {/* Central Electrolyte Compartment */}
                <rect x="230" y="100" width="140" height="200" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" 
                  onClick={() => setActiveTab('electrolyte')} className="cursor-pointer hover:fill-[#bae6fd] transition-colors" />
                
                {/* KOH(aq) Background Ions */}
                <g opacity="0.6">
                  {/* K+ Ions */}
                  {[
                    { x: 260, y: 130 }, { x: 330, y: 160 }, { x: 280, y: 220 }, { x: 340, y: 260 }, { x: 250, y: 280 }
                  ].map((pos, i) => (
                    <g key={`k-${i}`} transform={`translate(${pos.x}, ${pos.y})`} className="float-slow pointer-events-none">
                      <circle cx="0" cy="0" r="7" fill="#a855f7" />
                      <text x="0" y="3" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">K⁺</text>
                    </g>
                  ))}
                  {/* OH- Ions */}
                  {[
                    { x: 320, y: 120 }, { x: 270, y: 170 }, { x: 340, y: 210 }, { x: 260, y: 250 }, { x: 310, y: 280 }
                  ].map((pos, i) => (
                    <g key={`oh-bg-${i}`} transform={`translate(${pos.x}, ${pos.y})`} className="float-slow-reverse pointer-events-none">
                      <circle cx="0" cy="0" r="6" fill="#ef4444" />
                      <circle cx="6" cy="-2" r="4" fill="#3b82f6" />
                      <text x="-1" y="2" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">-</text>
                    </g>
                  ))}
                </g>

                {/* Electrolyte Text with semi-transparent background to prevent overlapping ions */}
                <rect x="240" y="180" width="120" height="50" fill="#f0f9ff" opacity="0.85" rx="4" className="pointer-events-none" />
                <text x="300" y="200" textAnchor="middle" fontSize="14" fill="#0284c7" fontWeight="bold" className="pointer-events-none">concentrated</text>
                <text x="300" y="220" textAnchor="middle" fontSize="14" fill="#0284c7" fontWeight="bold" className="pointer-events-none">KOH(aq)</text>

                {/* Electrodes */}
                {/* Electrode X (Anode) */}
                <rect x="210" y="90" width="20" height="220" fill="url(#porous)" stroke="#334155" strokeWidth="2" 
                  onClick={() => setActiveTab('anode')} className="cursor-pointer hover:stroke-blue-600 transition-colors" />
                
                {/* Electrode Y (Cathode) */}
                <rect x="370" y="90" width="20" height="220" fill="url(#porous)" stroke="#334155" strokeWidth="2" 
                  onClick={() => setActiveTab('cathode')} className="cursor-pointer hover:stroke-blue-600 transition-colors" />

                {/* Casing / Inlets & Outlets */}
                <path d="M 210 90 L 180 90 L 180 110 L 80 110" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 210 310 L 180 310 L 180 290 L 80 290" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 180 130 L 210 130" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 180 270 L 210 270" fill="none" stroke="#334155" strokeWidth="3" />
                <line x1="80" y1="130" x2="180" y2="130" stroke="#334155" strokeWidth="3" />
                <line x1="80" y1="270" x2="180" y2="270" stroke="#334155" strokeWidth="3" />
                
                <path d="M 390 90 L 420 90 L 420 110 L 520 110" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 390 310 L 420 310 L 420 290 L 520 290" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 420 130 L 390 130" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M 420 270 L 390 270" fill="none" stroke="#334155" strokeWidth="3" />
                <line x1="420" y1="130" x2="520" y2="130" stroke="#334155" strokeWidth="3" />
                <line x1="420" y1="270" x2="520" y2="270" stroke="#334155" strokeWidth="3" />

                {/* External Circuit */}
                <path d="M 220 90 L 220 30 L 280 30" fill="none" stroke="#1e293b" strokeWidth="3" />
                <path d="M 380 90 L 380 30 L 320 30" fill="none" stroke="#1e293b" strokeWidth="3" />
                
                {/* Load (Bulb or Resistor) */}
                <rect x="280" y="15" width="40" height="30" fill={isPlaying ? "#fef08a" : "#f1f5f9"} stroke="#1e293b" strokeWidth="3" 
                  className={isPlaying ? "bulb-glow transition-all duration-500" : "transition-all duration-500"} />
                <text x="300" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">LOAD</text>

                {/* Coils atop electrodes (from DSE diagram) */}
                <path d="M 220 90 Q 210 80 220 70 T 220 50" fill="none" stroke="#1e293b" strokeWidth="2" />
                <path d="M 380 90 Q 370 80 380 70 T 380 50" fill="none" stroke="#1e293b" strokeWidth="2" />

                {/* --- UPDATED: OUTSIDE LABELS & ARROWS --- */}
                <g fontSize="13" fill="#1e293b" className="pointer-events-none font-medium">
                  {/* H2 Inlet */}
                  <text x="35" y="124" textAnchor="end">
                    continuous supply of H<tspan baselineShift="sub" fontSize="10">2</tspan>(g)
                  </text>
                  <line x1="45" y1="120" x2="75" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                  {/* O2 Inlet */}
                  <text x="565" y="124" textAnchor="start">
                    continuous supply of O<tspan baselineShift="sub" fontSize="10">2</tspan>(g)
                  </text>
                  <line x1="555" y1="120" x2="525" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* H2 Outlet */}
                  <text x="35" y="276" textAnchor="end">
                    unreacted H<tspan baselineShift="sub" fontSize="10">2</tspan>(g)
                  </text>
                  <text x="35" y="294" textAnchor="end">and water vapour</text>
                  <line x1="75" y1="280" x2="45" y2="280" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                  {/* O2 Outlet */}
                  <text x="565" y="284" textAnchor="start">
                    unreacted O<tspan baselineShift="sub" fontSize="10">2</tspan>(g)
                  </text>
                  <line x1="525" y1="280" x2="555" y2="280" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* Electrode X Label */}
                  <text x="40" y="174" textAnchor="end" fontWeight="bold">porous platinum electrode X</text>
                  <line x1="50" y1="170" x2="205" y2="170" stroke="#1e293b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />

                  {/* Electrode Y Label */}
                  <text x="560" y="174" textAnchor="start" fontWeight="bold">porous platinum electrode Y</text>
                  <line x1="550" y1="170" x2="395" y2="170" stroke="#1e293b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                  
                  {/* Polarity */}
                  <text x="220" y="340" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="16">(-)</text>
                  <text x="380" y="340" textAnchor="middle" fill="#16a34a" fontWeight="bold" fontSize="16">(+)</text>
                </g>

                {/* Reaction Callouts for Electron Gain/Loss - Positioned safely below the diagram */}
                {isPlaying && (
                  <g className="pointer-events-none">
                    <g className="pulse-text" transform="translate(220, 365)">
                      <text x="0" y="0" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="bold">
                        H<tspan baselineShift="sub" fontSize="9">2</tspan> loses e<tspan baselineShift="super" fontSize="9">-</tspan>
                      </text>
                      <text x="0" y="14" textAnchor="middle" fontSize="11" fill="#dc2626">(Oxidation)</text>
                    </g>
                    <g className="pulse-text" transform="translate(380, 365)">
                      <text x="0" y="0" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">
                        O<tspan baselineShift="sub" fontSize="9">2</tspan> gains e<tspan baselineShift="super" fontSize="9">-</tspan>
                      </text>
                      <text x="0" y="14" textAnchor="middle" fontSize="11" fill="#16a34a">(Reduction)</text>
                    </g>
                  </g>
                )}

                {/* Animated Particles */}
                {isPlaying && (
                  <g className="pointer-events-none">
                    {/* H2 Inlet */}
                    {[0, 0.5, 1, 1.5].map((delay, i) => (
                      <g key={`h2-${i}`} transform={`translate(80, ${115 + (i%2)*15})`}>
                        <g style={{ animation: `flowRight 2s linear ${delay}s infinite` }}>
                          <circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" />
                        </g>
                      </g>
                    ))}
                    
                    {/* O2 Inlet */}
                    {[0, 0.5, 1, 1.5].map((delay, i) => (
                      <g key={`o2-${i}`} transform={`translate(520, ${115 + (i%2)*15})`}>
                        <g style={{ animation: `flowLeft 2s linear ${delay}s infinite` }}>
                          <circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" />
                        </g>
                      </g>
                    ))}

                    {/* H2 Out */}
                    {[0, 1].map((delay, i) => (
                      <g key={`h2out-${i}`} transform={`translate(190, ${270 + (i%2)*10})`}>
                        <g style={{ animation: `flowOutLeft 2.5s linear ${delay}s infinite` }} opacity="0.6">
                          <circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" />
                        </g>
                      </g>
                    ))}
                    {/* H2O Out */}
                    {[0.5, 1.5].map((delay, i) => (
                      <g key={`h2oout-${i}`} transform={`translate(190, ${285})`}>
                        <g style={{ animation: `flowOutLeft 2.5s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="5" fill="#ef4444" />
                          <circle cx="-4" cy="-4" r="3" fill="#3b82f6" />
                          <circle cx="4" cy="-4" r="3" fill="#3b82f6" />
                        </g>
                      </g>
                    ))}

                    {/* O2 Out */}
                    {[0, 1].map((delay, i) => (
                      <g key={`o2out-${i}`} transform={`translate(410, ${280})`}>
                        <g style={{ animation: `flowOutRight 2.5s linear ${delay}s infinite` }} opacity="0.6">
                          <circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" />
                        </g>
                      </g>
                    ))}

                    {/* OH- flowing through electrolyte (Y to X) */}
                    {[0, 0.7, 1.4, 2.1].map((delay, i) => (
                      <g key={`oh-${i}`} transform={`translate(360, ${130 + i * 40})`}>
                        <g style={{ animation: `flowIon 3s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="6" fill="#ef4444" />
                          <circle cx="6" cy="-2" r="4" fill="#3b82f6" />
                          <text x="-1" y="2" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">-</text>
                        </g>
                      </g>
                    ))}

                    {/* K+ flowing through electrolyte (X to Y) */}
                    {[0.3, 1.0, 1.7, 2.4].map((delay, i) => (
                      <g key={`k-flow-${i}`} transform={`translate(240, ${145 + i * 35})`}>
                        <g style={{ animation: `flowIonRight 3s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="7" fill="#a855f7" />
                          <text x="0" y="3" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">K⁺</text>
                        </g>
                      </g>
                    ))}

                    {/* Electrons moving in external circuit */}
                    {[0, 0.4, 0.8].map((delay, i) => (
                      <g key={`e-up-${i}`} transform="translate(220, 80)">
                        <g style={{ animation: `flowElectronUp 1.2s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="4" fill="#eab308" />
                          <text x="0" y="2" textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="bold">e⁻</text>
                        </g>
                      </g>
                    ))}
                    {[0, 0.4, 0.8, 1.2].map((delay, i) => (
                      <g key={`e-acr-${i}`} transform="translate(220, 30)">
                        <g style={{ animation: `flowElectronAcross 2.4s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="4" fill="#eab308" />
                          <text x="0" y="2" textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="bold">e⁻</text>
                        </g>
                      </g>
                    ))}
                    {[0, 0.4, 0.8].map((delay, i) => (
                      <g key={`e-dn-${i}`} transform="translate(380, 30)">
                        <g style={{ animation: `flowElectronDown 1.2s linear ${delay}s infinite` }}>
                          <circle cx="0" cy="0" r="4" fill="#eab308" />
                          <text x="0" y="2" textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="bold">e⁻</text>
                        </g>
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm justify-center bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="6" cy="10" r="4" fill="#3b82f6"/><circle cx="14" cy="10" r="4" fill="#3b82f6"/></svg>
                <Chem formula="H2" />
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="7" cy="12" r="5" fill="#ef4444"/><circle cx="17" cy="12" r="5" fill="#ef4444"/></svg>
                <Chem formula="O2" />
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="12" r="5" fill="#ef4444"/><circle cx="5" cy="7" r="3" fill="#3b82f6"/><circle cx="15" cy="7" r="3" fill="#3b82f6"/></svg>
                <Chem formula="H2O" />
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="8" cy="12" r="5" fill="#ef4444"/><circle cx="15" cy="9" r="3" fill="#3b82f6"/><text x="7" y="14" fontSize="8" fill="white" fontWeight="bold">-</text></svg>
                <Chem formula="OH-" />
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="6" fill="#a855f7"/><text x="10" y="13" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">K⁺</text></svg>
                <Chem formula="K+" />
              </div>
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="5" fill="#eab308"/><text x="10" y="13" textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="bold">e⁻</text></svg>
                Electron
              </div>
            </div>
          </div>

          {/* Side Panel: DSE Key Points */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="bg-blue-900 rounded-t-xl p-4 text-white">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="text-blue-300" size={20} />
                HKDSE Marking Scheme Guide
              </h3>
              <p className="text-blue-200 text-sm mt-1">Select a component to view exam points</p>
            </div>
            
            <div className="flex flex-wrap border-b border-l border-r border-slate-200 bg-white">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/50' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-white border-b border-l border-r border-slate-200 rounded-b-xl p-5 shadow-sm">
              {activeTab === 'overall' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Overall Reaction</h4>
                    <p className="text-xl font-mono bg-white p-2 text-center rounded border border-blue-200 shadow-sm">
                      2H<sub>2</sub>(g) + O<sub>2</sub>(g) &rarr; 2H<sub>2</sub>O(l)
                    </p>
                  </div>
                  <ul className="space-y-3 text-slate-700 list-disc pl-5">
                    <li><strong className="text-slate-900">Energy Conversion:</strong> From chemical energy to electrical energy.</li>
                    <li><strong className="text-slate-900">Continuous Working:</strong> The continuous supply of hydrogen and oxygen allows the fuel cell to work continuously.</li>
                    <li><strong className="text-slate-900">Recycling:</strong> Unreacted gases (hydrogen and oxygen) are recycled to save chemicals.</li>
                    <li><strong className="text-slate-900">Clean Energy:</strong> Water is the only product, making it environmentally friendly compared to fossil fuels.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'anode' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                    <h4 className="font-bold text-red-900 mb-2">Electrode X Reaction</h4>
                    <p className="text-lg font-mono bg-white p-2 text-center rounded border border-red-200 shadow-sm">
                      H<sub>2</sub> + 2OH<sup>-</sup> &rarr; 2H<sub>2</sub>O + 2e<sup>-</sup>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Identity:</span>
                      <span>Anode / the <strong className="text-red-600">negative electrode (-)</strong></span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Reactant Role:</span>
                      <span>H<sub>2</sub>(g) is the <strong>reducing agent</strong>.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Process:</span>
                      <span>H<sub>2</sub>(g) undergoes <strong>oxidation</strong> / loses electrons at electrode X.</span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'cathode' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2">Electrode Y Reaction</h4>
                    <p className="text-lg font-mono bg-white p-2 text-center rounded border border-green-200 shadow-sm">
                      O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>-</sup> &rarr; 4OH<sup>-</sup>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Identity:</span>
                      <span>Cathode / the <strong className="text-green-600">positive electrode (+)</strong></span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Reactant Role:</span>
                      <span>O<sub>2</sub>(g) is the <strong>oxidising agent</strong>.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 min-w-[100px]">Process:</span>
                      <span>O<sub>2</sub>(g) undergoes <strong>reduction</strong> / gains electrons at electrode Y.</span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'electrolyte' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="border-l-4 border-cyan-500 pl-4 py-2">
                    <h4 className="font-bold text-slate-900">Function of the Electrolyte (KOH)</h4>
                    <p className="text-slate-700 mt-2">
                      The (concentrated) KOH(aq) <strong>provides mobile ions</strong> (K<sup>+</sup> and OH<sup>-</sup>) which <strong>increases the electrical conductivity</strong> of the cell and completes the circuit.
                    </p>
                    <div className="mt-3 bg-white p-3 rounded border border-slate-200 text-sm">
                      <strong className="text-blue-700">Direction of Ion Migration:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700">
                        <li><strong>OH<sup>-</sup> moves towards the Anode (H<sub>2</sub> side)</strong> because it is consumed in the oxidation reaction.</li>
                        <li><strong>K<sup>+</sup> moves towards the Cathode (O<sub>2</sub> side)</strong> to balance the excess negative charge from the newly produced OH<sup>-</sup> ions.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-slate-500 pl-4 py-2 mt-4">
                    <h4 className="font-bold text-slate-900">Function of Platinum Electrodes</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-700">
                      <li>Platinum acts as a <strong>catalyst</strong> / an inert electrode to increase the reaction rate.</li>
                      <li>The <strong>porous</strong> structure of the electrodes increases the surface area to speed up the reactions between the gases and the electrolyte.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}