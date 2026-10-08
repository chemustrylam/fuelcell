<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HKDSE Fuel Cell Simulation</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
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
        .bulb-glow { filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.8)); }
        .pulse-text { animation: pulseOpacity 1.5s ease-in-out infinite; }
        .float-slow { animation: floatSlow 4s ease-in-out infinite; }
        .float-slow-reverse { animation: floatSlowReverse 5s ease-in-out infinite; }
        
        /* Animation classes toggled by JS */
        .anim-paused * { animation-play-state: paused !important; }
        .anim-running * { animation-play-state: running !important; }
        
        .tab-btn.active { border-bottom-width: 2px; border-color: #2563eb; color: #1d4ed8; background-color: #eff6ff; }
        .tab-btn.inactive { color: #64748b; }
        .tab-btn.inactive:hover { color: #334155; background-color: #f8fafc; }
    </style>
</head>
<body class="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
    <div class="max-w-6xl mx-auto space-y-6">
        
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    <i data-lucide="zap" class="text-yellow-500 fill-yellow-500"></i>
                    Hydrogen-Oxygen Fuel Cell
                </h1>
                <p class="text-slate-500 mt-1">HKDSE Chemistry (Chapter 31) Interactive Simulation</p>
            </div>
            <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button id="toggleBtn" onclick="toggleSimulation()" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors text-slate-600 hover:text-slate-900">
                    <i id="toggleIcon" data-lucide="play" class="w-4 h-4"></i>
                    <span id="toggleText">Start Simulation</span>
                </button>
                <button onclick="resetSimulation()" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                    Reset
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            <!-- Main Diagram Area -->
            <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
                <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i data-lucide="book-open" class="text-blue-600 w-5 h-5"></i>
                    Interactive Diagram
                </h2>
                
                <div class="relative w-full aspect-[4/3] lg:aspect-[16/10] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-visible">
                    <svg viewBox="-160 -10 920 420" class="w-full h-full">
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

                        <!-- Central Electrolyte Compartment -->
                        <rect x="230" y="100" width="140" height="200" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" onclick="switchTab('electrolyte')" class="cursor-pointer hover:fill-[#bae6fd] transition-colors" />
                        
                        <!-- KOH Background Ions -->
                        <g opacity="0.6">
                            <!-- K+ Ions -->
                            <g transform="translate(260, 130)" class="float-slow pointer-events-none"><circle r="7" fill="#a855f7" /><text y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g>
                            <g transform="translate(330, 160)" class="float-slow pointer-events-none" style="animation-delay: 0.5s"><circle r="7" fill="#a855f7" /><text y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g>
                            <g transform="translate(280, 220)" class="float-slow pointer-events-none" style="animation-delay: 1s"><circle r="7" fill="#a855f7" /><text y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g>
                            <g transform="translate(340, 260)" class="float-slow pointer-events-none" style="animation-delay: 1.5s"><circle r="7" fill="#a855f7" /><text y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g>
                            <g transform="translate(250, 280)" class="float-slow pointer-events-none" style="animation-delay: 2s"><circle r="7" fill="#a855f7" /><text y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g>
                            
                            <!-- OH- Ions -->
                            <g transform="translate(320, 120)" class="float-slow-reverse pointer-events-none"><circle r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g>
                            <g transform="translate(270, 170)" class="float-slow-reverse pointer-events-none" style="animation-delay: 0.5s"><circle r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g>
                            <g transform="translate(340, 210)" class="float-slow-reverse pointer-events-none" style="animation-delay: 1s"><circle r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g>
                            <g transform="translate(260, 250)" class="float-slow-reverse pointer-events-none" style="animation-delay: 1.5s"><circle r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g>
                            <g transform="translate(310, 280)" class="float-slow-reverse pointer-events-none" style="animation-delay: 2s"><circle r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g>
                        </g>

                        <!-- Electrolyte Text -->
                        <rect x="240" y="180" width="120" height="50" fill="#f0f9ff" opacity="0.85" rx="4" class="pointer-events-none" />
                        <text x="300" y="200" text-anchor="middle" font-size="14" fill="#0284c7" font-weight="bold" class="pointer-events-none">concentrated</text>
                        <text x="300" y="220" text-anchor="middle" font-size="14" fill="#0284c7" font-weight="bold" class="pointer-events-none">KOH(aq)</text>

                        <!-- Electrodes -->
                        <rect x="210" y="90" width="20" height="220" fill="url(#porous)" stroke="#334155" stroke-width="2" onclick="switchTab('anode')" class="cursor-pointer hover:stroke-blue-600 transition-colors" />
                        <rect x="370" y="90" width="20" height="220" fill="url(#porous)" stroke="#334155" stroke-width="2" onclick="switchTab('cathode')" class="cursor-pointer hover:stroke-blue-600 transition-colors" />

                        <!-- Casing -->
                        <path d="M 210 90 L 180 90 L 180 110 L 80 110" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 210 310 L 180 310 L 180 290 L 80 290" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 180 130 L 210 130" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 180 270 L 210 270" fill="none" stroke="#334155" stroke-width="3" />
                        <line x1="80" y1="130" x2="180" y2="130" stroke="#334155" stroke-width="3" />
                        <line x1="80" y1="270" x2="180" y2="270" stroke="#334155" stroke-width="3" />
                        
                        <path d="M 390 90 L 420 90 L 420 110 L 520 110" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 390 310 L 420 310 L 420 290 L 520 290" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 420 130 L 390 130" fill="none" stroke="#334155" stroke-width="3" />
                        <path d="M 420 270 L 390 270" fill="none" stroke="#334155" stroke-width="3" />
                        <line x1="420" y1="130" x2="520" y2="130" stroke="#334155" stroke-width="3" />
                        <line x1="420" y1="270" x2="520" y2="270" stroke="#334155" stroke-width="3" />

                        <!-- External Circuit -->
                        <path d="M 220 90 L 220 30 L 280 30" fill="none" stroke="#1e293b" stroke-width="3" />
                        <path d="M 380 90 L 380 30 L 320 30" fill="none" stroke="#1e293b" stroke-width="3" />
                        
                        <!-- Load -->
                        <rect id="loadBulb" x="280" y="15" width="40" height="30" fill="#f1f5f9" stroke="#1e293b" stroke-width="3" class="transition-all duration-500" />
                        <text x="300" y="35" text-anchor="middle" font-size="12" font-weight="bold">LOAD</text>

                        <!-- Coils -->
                        <path d="M 220 90 Q 210 80 220 70 T 220 50" fill="none" stroke="#1e293b" stroke-width="2" />
                        <path d="M 380 90 Q 370 80 380 70 T 380 50" fill="none" stroke="#1e293b" stroke-width="2" />

                        <!-- Outside Labels & Arrows -->
                        <g font-size="13" fill="#1e293b" class="pointer-events-none font-medium">
                            <text x="35" y="124" text-anchor="end">continuous supply of H<tspan baseline-shift="sub" font-size="10">2</tspan>(g)</text>
                            <line x1="45" y1="120" x2="75" y2="120" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)" />

                            <text x="565" y="124" text-anchor="start">continuous supply of O<tspan baseline-shift="sub" font-size="10">2</tspan>(g)</text>
                            <line x1="555" y1="120" x2="525" y2="120" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)" />

                            <text x="35" y="276" text-anchor="end">unreacted H<tspan baseline-shift="sub" font-size="10">2</tspan>(g)</text>
                            <text x="35" y="294" text-anchor="end">and water vapour</text>
                            <line x1="75" y1="280" x2="45" y2="280" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)" />

                            <text x="565" y="284" text-anchor="start">unreacted O<tspan baseline-shift="sub" font-size="10">2</tspan>(g)</text>
                            <line x1="525" y1="280" x2="555" y2="280" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)" />

                            <text x="40" y="174" text-anchor="end" font-weight="bold">porous platinum electrode X</text>
                            <line x1="50" y1="170" x2="205" y2="170" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arrowBlack)" />

                            <text x="560" y="174" text-anchor="start" font-weight="bold">porous platinum electrode Y</text>
                            <line x1="550" y1="170" x2="395" y2="170" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arrowBlack)" />
                            
                            <text x="220" y="340" text-anchor="middle" fill="#dc2626" font-weight="bold" font-size="16">(-)</text>
                            <text x="380" y="340" text-anchor="middle" fill="#16a34a" font-weight="bold" font-size="16">(+)</text>
                        </g>

                        <!-- Animated Components (Hidden initially) -->
                        <g id="animatedLayer" class="hidden pointer-events-none anim-running">
                            <!-- Reaction Callouts -->
                            <g class="pulse-text" transform="translate(220, 365)">
                                <text x="0" y="0" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">H<tspan baseline-shift="sub" font-size="9">2</tspan> loses e<tspan baseline-shift="super" font-size="9">-</tspan></text>
                                <text x="0" y="14" text-anchor="middle" font-size="11" fill="#dc2626">(Oxidation)</text>
                            </g>
                            <g class="pulse-text" transform="translate(380, 365)">
                                <text x="0" y="0" text-anchor="middle" font-size="12" fill="#16a34a" font-weight="bold">O<tspan baseline-shift="sub" font-size="9">2</tspan> gains e<tspan baseline-shift="super" font-size="9">-</tspan></text>
                                <text x="0" y="14" text-anchor="middle" font-size="11" fill="#16a34a">(Reduction)</text>
                            </g>

                            <!-- H2 Inlet Particles -->
                            <g transform="translate(80, 115)"><g style="animation: flowRight 2s linear 0s infinite;"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            <g transform="translate(80, 130)"><g style="animation: flowRight 2s linear 0.5s infinite;"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            <g transform="translate(80, 115)"><g style="animation: flowRight 2s linear 1s infinite;"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            <g transform="translate(80, 130)"><g style="animation: flowRight 2s linear 1.5s infinite;"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            
                            <!-- O2 Inlet Particles -->
                            <g transform="translate(520, 115)"><g style="animation: flowLeft 2s linear 0s infinite;"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>
                            <g transform="translate(520, 130)"><g style="animation: flowLeft 2s linear 0.5s infinite;"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>
                            <g transform="translate(520, 115)"><g style="animation: flowLeft 2s linear 1s infinite;"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>
                            <g transform="translate(520, 130)"><g style="animation: flowLeft 2s linear 1.5s infinite;"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>

                            <!-- H2 / H2O Out Particles -->
                            <g transform="translate(190, 270)"><g style="animation: flowOutLeft 2.5s linear 0s infinite;" opacity="0.6"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            <g transform="translate(190, 280)"><g style="animation: flowOutLeft 2.5s linear 1s infinite;" opacity="0.6"><circle cx="-4" r="5" fill="#3b82f6" /><circle cx="4" r="5" fill="#3b82f6" /></g></g>
                            <g transform="translate(190, 285)"><g style="animation: flowOutLeft 2.5s linear 0.5s infinite;"><circle cx="0" cy="0" r="5" fill="#ef4444" /><circle cx="-4" cy="-4" r="3" fill="#3b82f6" /><circle cx="4" cy="-4" r="3" fill="#3b82f6" /></g></g>
                            <g transform="translate(190, 285)"><g style="animation: flowOutLeft 2.5s linear 1.5s infinite;"><circle cx="0" cy="0" r="5" fill="#ef4444" /><circle cx="-4" cy="-4" r="3" fill="#3b82f6" /><circle cx="4" cy="-4" r="3" fill="#3b82f6" /></g></g>

                            <!-- O2 Out Particles -->
                            <g transform="translate(410, 280)"><g style="animation: flowOutRight 2.5s linear 0s infinite;" opacity="0.6"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>
                            <g transform="translate(410, 280)"><g style="animation: flowOutRight 2.5s linear 1s infinite;" opacity="0.6"><circle cx="-5" r="6" fill="#ef4444" /><circle cx="5" r="6" fill="#ef4444" /></g></g>

                            <!-- OH- flowing Y to X -->
                            <g transform="translate(360, 130)"><g style="animation: flowIon 3s linear 0s infinite;"><circle cx="0" cy="0" r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g></g>
                            <g transform="translate(360, 170)"><g style="animation: flowIon 3s linear 0.7s infinite;"><circle cx="0" cy="0" r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g></g>
                            <g transform="translate(360, 210)"><g style="animation: flowIon 3s linear 1.4s infinite;"><circle cx="0" cy="0" r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g></g>
                            <g transform="translate(360, 250)"><g style="animation: flowIon 3s linear 2.1s infinite;"><circle cx="0" cy="0" r="6" fill="#ef4444" /><circle cx="6" cy="-2" r="4" fill="#3b82f6" /><text x="-1" y="2" text-anchor="middle" font-size="9" fill="white" font-weight="bold">-</text></g></g>

                            <!-- K+ flowing X to Y -->
                            <g transform="translate(240, 145)"><g style="animation: flowIonRight 3s linear 0.3s infinite;"><circle cx="0" cy="0" r="7" fill="#a855f7" /><text x="0" y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g></g>
                            <g transform="translate(240, 180)"><g style="animation: flowIonRight 3s linear 1.0s infinite;"><circle cx="0" cy="0" r="7" fill="#a855f7" /><text x="0" y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g></g>
                            <g transform="translate(240, 215)"><g style="animation: flowIonRight 3s linear 1.7s infinite;"><circle cx="0" cy="0" r="7" fill="#a855f7" /><text x="0" y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g></g>
                            <g transform="translate(240, 250)"><g style="animation: flowIonRight 3s linear 2.4s infinite;"><circle cx="0" cy="0" r="7" fill="#a855f7" /><text x="0" y="3" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></g></g>

                            <!-- Electrons -->
                            <!-- Up -->
                            <g transform="translate(220, 80)"><g style="animation: flowElectronUp 1.2s linear 0s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(220, 80)"><g style="animation: flowElectronUp 1.2s linear 0.4s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(220, 80)"><g style="animation: flowElectronUp 1.2s linear 0.8s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <!-- Across -->
                            <g transform="translate(220, 30)"><g style="animation: flowElectronAcross 2.4s linear 0s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(220, 30)"><g style="animation: flowElectronAcross 2.4s linear 0.4s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(220, 30)"><g style="animation: flowElectronAcross 2.4s linear 0.8s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(220, 30)"><g style="animation: flowElectronAcross 2.4s linear 1.2s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <!-- Down -->
                            <g transform="translate(380, 30)"><g style="animation: flowElectronDown 1.2s linear 0s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(380, 30)"><g style="animation: flowElectronDown 1.2s linear 0.4s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                            <g transform="translate(380, 30)"><g style="animation: flowElectronDown 1.2s linear 0.8s infinite;"><circle cx="0" cy="0" r="4" fill="#eab308" /><text x="0" y="2" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></g></g>
                        </g>
                    </svg>
                </div>

                <!-- Legend -->
                <div class="mt-4 flex flex-wrap gap-4 text-sm justify-center bg-slate-100 p-3 rounded-lg border border-slate-200">
                    <div class="flex items-center gap-1"><svg viewBox="0 0 20 20" class="w-5 h-5"><circle cx="6" cy="10" r="4" fill="#3b82f6"/><circle cx="14" cy="10" r="4" fill="#3b82f6"/></svg><span class="font-semibold tracking-wide">H<sub>2</sub></span></div>
                    <div class="flex items-center gap-1"><svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="7" cy="12" r="5" fill="#ef4444"/><circle cx="17" cy="12" r="5" fill="#ef4444"/></svg><span class="font-semibold tracking-wide">O<sub>2</sub></span></div>
                    <div class="flex items-center gap-1"><svg viewBox="0 0 20 20" class="w-5 h-5"><circle cx="10" cy="12" r="5" fill="#ef4444"/><circle cx="5" cy="7" r="3" fill="#3b82f6"/><circle cx="15" cy="7" r="3" fill="#3b82f6"/></svg><span class="font-semibold tracking-wide">H<sub>2</sub>O</span></div>
                    <div class="flex items-center gap-1"><svg viewBox="0 0 20 20" class="w-5 h-5"><circle cx="8" cy="12" r="5" fill="#ef4444"/><circle cx="15" cy="9" r="3" fill="#3b82f6"/><text x="7" y="14" font-size="8" fill="white" font-weight="bold">-</text></svg><span class="font-semibold tracking-wide">OH<sup>-</sup></span></div>
                    <div class="flex items-center gap-1"><svg viewBox="0 0 20 20" class="w-5 h-5"><circle cx="10" cy="10" r="6" fill="#a855f7"/><text x="10" y="13" text-anchor="middle" font-size="9" fill="white" font-weight="bold">K⁺</text></svg><span class="font-semibold tracking-wide">K<sup>+</sup></span></div>
                    <div class="flex items-center gap-1"><svg viewBox="0 0 20 20" class="w-5 h-5"><circle cx="10" cy="10" r="5" fill="#eab308"/><text x="10" y="13" text-anchor="middle" font-size="8" fill="#1e293b" font-weight="bold">e⁻</text></svg>Electron</div>
                </div>
            </div>

            <!-- Side Panel: DSE Key Points -->
            <div class="lg:col-span-2 flex flex-col h-full">
                <div class="bg-blue-900 rounded-t-xl p-4 text-white">
                    <h3 class="font-bold text-lg flex items-center gap-2">
                        <i data-lucide="check-circle-2" class="text-blue-300 w-5 h-5"></i>
                        HKDSE Marking Scheme Guide
                    </h3>
                    <p class="text-blue-200 text-sm mt-1">Select a component to view exam points</p>
                </div>
                
                <!-- Tab Buttons -->
                <div class="flex flex-wrap border-b border-l border-r border-slate-200 bg-white">
                    <button onclick="switchTab('overall')" id="btn-overall" class="tab-btn active flex-1 py-2 px-3 text-sm font-semibold transition-colors">Overall Summary</button>
                    <button onclick="switchTab('anode')" id="btn-anode" class="tab-btn inactive flex-1 py-2 px-3 text-sm font-semibold transition-colors">Electrode X</button>
                    <button onclick="switchTab('cathode')" id="btn-cathode" class="tab-btn inactive flex-1 py-2 px-3 text-sm font-semibold transition-colors">Electrode Y</button>
                    <button onclick="switchTab('electrolyte')" id="btn-electrolyte" class="tab-btn inactive flex-1 py-2 px-3 text-sm font-semibold transition-colors">Electrolyte</button>
                </div>

                <!-- Tab Contents -->
                <div class="flex-1 bg-white border-b border-l border-r border-slate-200 rounded-b-xl p-5 shadow-sm">
                    
                    <!-- Overall Tab -->
                    <div id="tab-overall" class="tab-content space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h4 class="font-bold text-blue-900 mb-2">Overall Reaction</h4>
                            <p class="text-xl font-mono bg-white p-2 text-center rounded border border-blue-200 shadow-sm">
                                2H<sub>2</sub>(g) + O<sub>2</sub>(g) &rarr; 2H<sub>2</sub>O(l)
                            </p>
                        </div>
                        <ul class="space-y-3 text-slate-700 list-disc pl-5">
                            <li><strong class="text-slate-900">Energy Conversion:</strong> From chemical energy to electrical energy.</li>
                            <li><strong class="text-slate-900">Continuous Working:</strong> The continuous supply of hydrogen and oxygen allows the fuel cell to work continuously.</li>
                            <li><strong class="text-slate-900">Recycling:</strong> Unreacted gases (hydrogen and oxygen) are recycled to save chemicals.</li>
                            <li><strong class="text-slate-900">Clean Energy:</strong> Water is the only product, making it environmentally friendly compared to fossil fuels.</li>
                        </ul>
                    </div>

                    <!-- Anode Tab -->
                    <div id="tab-anode" class="tab-content hidden space-y-4">
                        <div class="p-4 bg-red-50 border border-red-100 rounded-lg">
                            <h4 class="font-bold text-red-900 mb-2">Electrode X Reaction</h4>
                            <p class="text-lg font-mono bg-white p-2 text-center rounded border border-red-200 shadow-sm">
                                H<sub>2</sub> + 2OH<sup>-</sup> &rarr; 2H<sub>2</sub>O + 2e<sup>-</sup>
                            </p>
                        </div>
                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Identity:</span>
                                <span>Anode / the <strong class="text-red-600">negative electrode (-)</strong></span>
                            </p>
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Reactant Role:</span>
                                <span>H<sub>2</sub>(g) is the <strong>reducing agent</strong>.</span>
                            </p>
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Process:</span>
                                <span>H<sub>2</sub>(g) undergoes <strong>oxidation</strong> / loses electrons at electrode X.</span>
                            </p>
                        </div>
                    </div>

                    <!-- Cathode Tab -->
                    <div id="tab-cathode" class="tab-content hidden space-y-4">
                        <div class="p-4 bg-green-50 border border-green-100 rounded-lg">
                            <h4 class="font-bold text-green-900 mb-2">Electrode Y Reaction</h4>
                            <p class="text-lg font-mono bg-white p-2 text-center rounded border border-green-200 shadow-sm">
                                O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>-</sup> &rarr; 4OH<sup>-</sup>
                            </p>
                        </div>
                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Identity:</span>
                                <span>Cathode / the <strong class="text-green-600">positive electrode (+)</strong></span>
                            </p>
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Reactant Role:</span>
                                <span>O<sub>2</sub>(g) is the <strong>oxidising agent</strong>.</span>
                            </p>
                            <p class="flex items-start gap-2">
                                <span class="font-bold text-slate-900 min-w-[100px]">Process:</span>
                                <span>O<sub>2</sub>(g) undergoes <strong>reduction</strong> / gains electrons at electrode Y.</span>
                            </p>
                        </div>
                    </div>

                    <!-- Electrolyte Tab -->
                    <div id="tab-electrolyte" class="tab-content hidden space-y-4">
                        <div class="border-l-4 border-cyan-500 pl-4 py-2">
                            <h4 class="font-bold text-slate-900">Function of the Electrolyte (KOH)</h4>
                            <p class="text-slate-700 mt-2">
                                The (concentrated) KOH(aq) <strong>provides mobile ions</strong> (K<sup>+</sup> and OH<sup>-</sup>) which <strong>increases the electrical conductivity</strong> of the cell and completes the circuit.
                            </p>
                            <div class="mt-3 bg-white p-3 rounded border border-slate-200 text-sm">
                                <strong class="text-blue-700">Direction of Ion Migration:</strong>
                                <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-700">
                                    <li><strong>OH<sup>-</sup> moves towards the Anode (H<sub>2</sub> side)</strong> because it is consumed in the oxidation reaction.</li>
                                    <li><strong>K<sup>+</sup> moves towards the Cathode (O<sub>2</sub> side)</strong> to balance the excess negative charge from the newly produced OH<sup>-</sup> ions.</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="border-l-4 border-slate-500 pl-4 py-2 mt-4">
                            <h4 class="font-bold text-slate-900">Function of Platinum Electrodes</h4>
                            <ul class="list-disc pl-5 mt-2 space-y-2 text-slate-700">
                                <li>Platinum acts as a <strong>catalyst</strong> / an inert electrode to increase the reaction rate.</li>
                                <li>The <strong>porous</strong> structure of the electrodes increases the surface area to speed up the reactions between the gases and the electrolyte.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </div>

    <!-- Logic Script -->
    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        let isPlaying = false;
        
        function toggleSimulation() {
            isPlaying = !isPlaying;
            const animLayer = document.getElementById('animatedLayer');
            const loadBulb = document.getElementById('loadBulb');
            const btn = document.getElementById('toggleBtn');
            const icon = document.getElementById('toggleIcon');
            const text = document.getElementById('toggleText');

            if (isPlaying) {
                animLayer.classList.remove('hidden');
                loadBulb.classList.add('bulb-glow');
                loadBulb.setAttribute('fill', '#fef08a');
                
                btn.classList.add('bg-white', 'text-blue-700', 'shadow-sm');
                btn.classList.remove('text-slate-600');
                text.innerText = "Pause";
                // Update icon to pause (requires re-rendering the lucide icon)
                icon.setAttribute('data-lucide', 'pause');
                lucide.createIcons();
            } else {
                animLayer.classList.add('hidden');
                loadBulb.classList.remove('bulb-glow');
                loadBulb.setAttribute('fill', '#f1f5f9');
                
                btn.classList.remove('bg-white', 'text-blue-700', 'shadow-sm');
                btn.classList.add('text-slate-600');
                text.innerText = "Start Simulation";
                icon.setAttribute('data-lucide', 'play');
                lucide.createIcons();
            }
        }

        function resetSimulation() {
            isPlaying = false;
            
            // Reset Animation Layer
            const animLayer = document.getElementById('animatedLayer');
            animLayer.classList.add('hidden');
            
            // To properly reset CSS animations, we remove and re-add the layer
            const clone = animLayer.cloneNode(true);
            animLayer.parentNode.replaceChild(clone, animLayer);

            // Reset Bulb
            const loadBulb = document.getElementById('loadBulb');
            loadBulb.classList.remove('bulb-glow');
            loadBulb.setAttribute('fill', '#f1f5f9');
            
            // Reset Button State
            const btn = document.getElementById('toggleBtn');
            const text = document.getElementById('toggleText');
            const icon = document.getElementById('toggleIcon');
            
            btn.classList.remove('bg-white', 'text-blue-700', 'shadow-sm');
            btn.classList.add('text-slate-600');
            text.innerText = "Start Simulation";
            icon.setAttribute('data-lucide', 'play');
            lucide.createIcons();
            
            // Reset to default tab
            switchTab('overall');
        }

        function switchTab(tabId) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            // Show targeted tab content
            document.getElementById('tab-' + tabId).classList.remove('hidden');

            // Reset all tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            // Highlight active button
            document.getElementById('btn-' + tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.remove('inactive');
        }
    </script>
</body>
</html>
