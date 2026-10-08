'use strict';

const CATEGORIES = [
  { id: 'processors', label: 'Processors' },
  { id: 'motherboards', label: 'Motherboards' },
  { id: 'graphics', label: 'Graphics Cards' },
  { id: 'ram', label: 'RAM' },
  { id: 'storage', label: 'Storage' },
  { id: 'psu', label: 'Power Supplies' },
  { id: 'cases', label: 'PC Cases' },
  { id: 'cooling', label: 'CPU Cooling' },
  { id: 'fans', label: 'Case Fans' },
  { id: 'monitors', label: 'Monitors' },
  { id: 'keyboards', label: 'Keyboards' },
  { id: 'mice', label: 'Mice' },
  { id: 'headsets', label: 'Headsets' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'printers', label: 'Printers' },
  { id: 'networking', label: 'Networking' }
];

const TAGS = {
  budget: 'Budget',
  gaming: 'Gaming',
  office: 'Office',
  student: 'Student',
  content: 'Content Creation',
  performance: 'High Performance'
};

// Mirrors tools/image-sources.json -> categoryFolders
const IMAGE_FOLDERS = {
  processors: 'cpu',
  motherboards: 'motherboard',
  graphics: 'gpu',
  ram: 'ram',
  storage: 'storage',
  psu: 'psu',
  cases: 'cases',
  cooling: 'cooling',
  fans: 'fans',
  monitors: 'monitors',
  keyboards: 'keyboards',
  mice: 'mice',
  headsets: 'headsets',
  laptops: 'laptops',
  printers: 'printers',
  networking: 'networking'
};

const IMAGE_BRAND_PREFIXES = ['intel core', 'intel', 'amd', 'nvidia geforce', 'nvidia', 'geforce', 'radeon'];
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp'];

function productSlug(name) {
  let s = String(name).toLowerCase().trim();
  for (const p of IMAGE_BRAND_PREFIXES) {
    if (s.startsWith(p + ' ')) {
      s = s.slice(p.length).trim();
      break;
    }
  }
  return s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function productImagePaths(c) {
  const mapReady = window.PRODUCT_IMAGES && typeof window.PRODUCT_IMAGES === 'object' && Object.keys(window.PRODUCT_IMAGES).length > 0;
  const explicit = mapReady && window.PRODUCT_IMAGES[c.id];
  if (typeof explicit === 'string' && explicit) return [explicit.replace(/^\.?\//, '')];
  // Auto-calculate from category + name only as a last resort (e.g. when the
  // generated images.js mapping is not present at all), so we do not fire
  // repeated 404 requests for every un-mapped product in normal operation.
  if (mapReady) return [];
  const folder = IMAGE_FOLDERS[c.cat] || c.cat;
  const slug = productSlug(c.name);
  if (!slug) return [];
  return IMAGE_EXTS.map(ext => 'assets/products/' + folder + '/' + slug + '.' + ext);
}

const VISUALS = {
  cpu: '<svg viewBox="0 0 100 100"><rect x="18" y="18" width="64" height="64" rx="8" fill="#1a2130" stroke="#8ea3c4" stroke-width="2"/><rect x="32" y="32" width="36" height="36" rx="5" fill="#0f1522" stroke="#38bdf8" stroke-width="1.8"/><path d="M28 8v10M42 8v10M56 8v10M70 8v10M28 82v10M42 82v10M56 82v10M70 82v10M8 28h10M8 42h10M8 56h10M8 70h10M82 28h10M82 42h10M82 56h10M82 70h10" stroke="#63b3ed" stroke-width="2.4" stroke-linecap="round"/><path d="M40 50h20M50 40v20" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg>',
  motherboard: '<svg viewBox="0 0 120 110"><rect x="6" y="6" width="108" height="98" rx="7" fill="#0e1a16" stroke="#2f6f57" stroke-width="2"/><rect x="20" y="20" width="30" height="30" rx="4" fill="#12241d" stroke="#48d59a" stroke-width="1.6"/><rect x="60" y="18" width="8" height="42" rx="2" fill="#48d59a" opacity=".8"/><rect x="72" y="18" width="8" height="42" rx="2" fill="#48d59a" opacity=".6"/><rect x="20" y="66" width="52" height="8" rx="2" fill="#2a4a3d"/><rect x="20" y="80" width="36" height="8" rx="2" fill="#2a4a3d"/><rect x="84" y="66" width="22" height="28" rx="3" fill="#12241d" stroke="#2f6f57" stroke-width="1.4"/><circle cx="95" cy="40" r="7" fill="#0c1512" stroke="#48d59a" stroke-width="1.4"/></svg>',
  gpu: '<svg viewBox="0 0 180 86"><rect x="6" y="14" width="160" height="56" rx="8" fill="#141b2b" stroke="#48577d" stroke-width="2"/><circle cx="50" cy="42" r="20" fill="#0d1320" stroke="#38bdf8" stroke-width="1.8"/><circle cx="112" cy="42" r="20" fill="#0d1320" stroke="#38bdf8" stroke-width="1.8"/><g stroke="#38bdf8" stroke-width="1.4" opacity=".7"><path d="M50 24v36M32 42h36M38 30l24 24M62 30 38 54"/><path d="M112 24v36M94 42h36M100 30l24 24M124 30l-24 24"/></g><rect x="166" y="24" width="8" height="36" rx="2" fill="#48577d"/><rect x="14" y="66" width="60" height="6" rx="3" fill="#38bdf8" opacity=".55"/></svg>',
  ram: '<svg viewBox="0 0 150 62"><rect x="6" y="12" width="138" height="38" rx="5" fill="#111a2b" stroke="#4a6ba8" stroke-width="2"/><g fill="#1b2b47" stroke="#38bdf8" stroke-width="1.3"><rect x="16" y="20" width="20" height="22" rx="2"/><rect x="44" y="20" width="20" height="22" rx="2"/><rect x="72" y="20" width="20" height="22" rx="2"/><rect x="100" y="20" width="20" height="22" rx="2"/></g><path d="M62 50v6M96 50v6" stroke="#4a6ba8" stroke-width="3"/><path d="M6 16h138" stroke="#38bdf8" stroke-width="1.4" opacity=".6"/></svg>',
  ssd: '<svg viewBox="0 0 140 60"><rect x="8" y="14" width="124" height="32" rx="6" fill="#101827" stroke="#41b8e0" stroke-width="2"/><rect x="22" y="22" width="24" height="16" rx="3" fill="#17263c" stroke="#38bdf8" stroke-width="1.3"/><rect x="54" y="22" width="24" height="16" rx="3" fill="#17263c" stroke="#38bdf8" stroke-width="1.3"/><rect x="86" y="22" width="24" height="16" rx="3" fill="#17263c" stroke="#38bdf8" stroke-width="1.3"/><path d="M8 40h124" stroke="#38bdf8" stroke-width="1.2" opacity=".5"/><circle cx="124" cy="30" r="3" fill="#34d399"/></svg>',
  hdd: '<svg viewBox="0 0 140 80"><rect x="8" y="10" width="124" height="60" rx="8" fill="#141a26" stroke="#54617c" stroke-width="2"/><circle cx="62" cy="40" r="22" fill="#0d111a" stroke="#38bdf8" stroke-width="1.6"/><circle cx="62" cy="40" r="7" fill="#1c2a3f" stroke="#38bdf8" stroke-width="1.3"/><path d="M62 40 96 24" stroke="#8ea3c4" stroke-width="3" stroke-linecap="round"/><circle cx="104" cy="54" r="8" fill="#1c2a3f" stroke="#54617c" stroke-width="1.3"/><path d="M14 66h112" stroke="#38bdf8" stroke-width="1.2" opacity=".4"/></svg>',
  psu: '<svg viewBox="0 0 130 96"><rect x="8" y="10" width="114" height="76" rx="8" fill="#161c27" stroke="#54617c" stroke-width="2"/><circle cx="58" cy="48" r="28" fill="#0d111a" stroke="#38bdf8" stroke-width="1.8" opacity=".9"/><g stroke="#38bdf8" stroke-width="1.3" opacity=".7"><path d="M58 22v52M32 48h52M40 30l36 36M76 30 40 66"/></g><rect x="96" y="24" width="18" height="48" rx="4" fill="#1f2838" stroke="#54617c" stroke-width="1.4"/><path d="M122 40c8 2 10 10 4 18" stroke="#7c8db0" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  case: '<svg viewBox="0 0 120 130"><rect x="18" y="8" width="84" height="114" rx="8" fill="#141b28" stroke="#3a4b66" stroke-width="2"/><rect x="26" y="16" width="40" height="98" rx="5" fill="#0c111b" stroke="#2b3850" stroke-width="1.5"/><circle cx="84" cy="36" r="10" fill="none" stroke="#38bdf8" stroke-width="2" opacity=".75"/><circle cx="84" cy="70" r="10" fill="none" stroke="#38bdf8" stroke-width="2" opacity=".55"/><path d="M34 30h24M34 44h24M34 58h24" stroke="#2b3850" stroke-width="2" stroke-linecap="round"/><rect x="76" y="96" width="18" height="6" rx="3" fill="#38bdf8" opacity=".7"/></svg>',
  cooler: '<svg viewBox="0 0 110 110"><rect x="16" y="14" width="78" height="78" rx="8" fill="#151c2a" stroke="#4b5f80" stroke-width="2"/><path d="M24 24h62M24 36h62M24 48h62M24 60h62M24 72h62" stroke="#334561" stroke-width="3" stroke-linecap="round"/><circle cx="55" cy="53" r="30" fill="#0e1420" stroke="#38bdf8" stroke-width="2" opacity=".9"/><g fill="#1c2a3f" stroke="#38bdf8" stroke-width="1.4" opacity=".85"><path d="M55 25c8 6 10 16 4 24-6-6-6-16-4-24z"/><path d="M83 53c-6 8-16 10-24 4 6-6 16-6 24-4z"/><path d="M55 81c-8-6-10-16-4-24 6 6 6 16 4 24z"/><path d="M27 53c6-8 16-10 24-4-6 6-16 6-24 4z"/></g><circle cx="55" cy="53" r="6" fill="#38bdf8"/></svg>',
  fan: '<svg viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="10" fill="#121826" stroke="#445472" stroke-width="2"/><circle cx="50" cy="50" r="34" fill="#0c111c" stroke="#38bdf8" stroke-width="1.8"/><g fill="#1b2740" stroke="#38bdf8" stroke-width="1.3" opacity=".85"><path d="M50 18c10 8 12 20 4 30-8-8-8-20-4-30z"/><path d="M82 50c-8 10-20 12-30 4 8-8 20-8 30-4z"/><path d="M50 82c-10-8-12-20-4-30 8 8 8 20 4 30z"/><path d="M18 50c8-10 20-12 30-4-8 8-20 8-30 4z"/></g><circle cx="50" cy="50" r="7" fill="#38bdf8"/><circle cx="14" cy="14" r="3" fill="#445472"/><circle cx="86" cy="14" r="3" fill="#445472"/><circle cx="14" cy="86" r="3" fill="#445472"/><circle cx="86" cy="86" r="3" fill="#445472"/></svg>',
  monitor: '<svg viewBox="0 0 160 120"><rect x="8" y="10" width="144" height="88" rx="8" fill="#0f1622" stroke="#3a4b66" stroke-width="2"/><rect x="17" y="19" width="126" height="66" rx="4" fill="#061020" stroke="#38bdf8" stroke-width="1.4" opacity=".9"/><path d="M28 72l24-28 18 20 16-24 46 36" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><circle cx="134" cy="30" r="4" fill="#34d399"/><rect x="72" y="98" width="16" height="12" fill="#1a2333"/><rect x="52" y="110" width="56" height="7" rx="3.5" fill="#26324a"/></svg>',
  keyboard: '<svg viewBox="0 0 160 70"><rect x="6" y="12" width="148" height="46" rx="7" fill="#121826" stroke="#445472" stroke-width="2"/><g fill="#1d2740" stroke="#38bdf8" stroke-width="1" opacity=".8"><rect x="16" y="22" width="14" height="11" rx="2"/><rect x="34" y="22" width="14" height="11" rx="2"/><rect x="52" y="22" width="14" height="11" rx="2"/><rect x="70" y="22" width="14" height="11" rx="2"/><rect x="88" y="22" width="14" height="11" rx="2"/><rect x="106" y="22" width="14" height="11" rx="2"/><rect x="124" y="22" width="20" height="11" rx="2"/><rect x="16" y="37" width="20" height="11" rx="2"/><rect x="40" y="37" width="14" height="11" rx="2"/><rect x="58" y="37" width="14" height="11" rx="2"/><rect x="76" y="37" width="14" height="11" rx="2"/><rect x="94" y="37" width="14" height="11" rx="2"/><rect x="112" y="37" width="32" height="11" rx="2"/><rect x="46" y="50" width="66" height="6" rx="2"/></g></svg>',
  mouse: '<svg viewBox="0 0 90 120"><path d="M45 8c22 0 34 17 34 40v40c0 22-14 34-34 34s-34-12-34-34V48C11 25 23 8 45 8z" fill="#121826" stroke="#445472" stroke-width="2"/><path d="M45 10v34" stroke="#445472" stroke-width="2"/><rect x="41" y="20" width="8" height="18" rx="4" fill="#0c111c" stroke="#38bdf8" stroke-width="1.6"/><path d="M24 56c4-14 12-22 21-24" fill="none" stroke="#38bdf8" stroke-width="2" opacity=".6"/></svg>',
  headset: '<svg viewBox="0 0 140 110"><path d="M24 66V54a46 46 0 0 1 92 0v12" fill="none" stroke="#445472" stroke-width="7" stroke-linecap="round"/><rect x="12" y="60" width="26" height="40" rx="10" fill="#141b2b" stroke="#38bdf8" stroke-width="2"/><rect x="102" y="60" width="26" height="40" rx="10" fill="#141b2b" stroke="#38bdf8" stroke-width="2"/><rect x="18" y="68" width="14" height="24" rx="7" fill="#0c111c"/><path d="M114 100c0 8-8 10-16 10" fill="none" stroke="#445472" stroke-width="4" stroke-linecap="round"/><circle cx="94" cy="110" r="5" fill="#38bdf8"/></svg>',
  laptop: '<svg viewBox="0 0 170 110"><rect x="24" y="10" width="122" height="76" rx="7" fill="#0f1622" stroke="#3a4b66" stroke-width="2"/><rect x="32" y="18" width="106" height="56" rx="3" fill="#071426" stroke="#38bdf8" stroke-width="1.4"/><path d="M40 64l22-26 16 18 14-20 46 32" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><path d="M8 92h154l-6 10H14z" fill="#1a2333" stroke="#445472" stroke-width="2" stroke-linejoin="round"/><rect x="70" y="95" width="30" height="4" rx="2" fill="#0c111c"/></svg>',
  printer: '<svg viewBox="0 0 150 110"><rect x="24" y="42" width="102" height="48" rx="8" fill="#141b28" stroke="#445472" stroke-width="2"/><rect x="44" y="10" width="62" height="36" rx="4" fill="#f1f5f9" opacity=".92"/><path d="M54 22h42M54 30h42M54 38h30" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/><rect x="52" y="70" width="46" height="30" rx="3" fill="#e2e8f0"/><path d="M60 80h30M60 88h30M60 96h18" stroke="#64748b" stroke-width="3" stroke-linecap="round"/><circle cx="112" cy="56" r="4" fill="#38bdf8"/><circle cx="98" cy="56" r="4" fill="#34d399"/></svg>',
  network: '<svg viewBox="0 0 160 90"><rect x="10" y="44" width="140" height="34" rx="8" fill="#141b28" stroke="#445472" stroke-width="2"/><path d="M36 44V20M80 44V12M124 44V24" stroke="#445472" stroke-width="4" stroke-linecap="round"/><circle cx="36" cy="16" r="5" fill="#38bdf8"/><circle cx="80" cy="8" r="5" fill="#38bdf8"/><circle cx="124" cy="20" r="5" fill="#38bdf8"/><g fill="#0c111c" stroke="#38bdf8" stroke-width="1.4"><rect x="24" y="56" width="16" height="10" rx="2"/><rect x="46" y="56" width="16" height="10" rx="2"/><rect x="68" y="56" width="16" height="10" rx="2"/></g><circle cx="132" cy="61" r="5" fill="#34d399"/></svg>',
  cable: '<svg viewBox="0 0 150 70"><path d="M14 52C40 12 74 62 104 26" fill="none" stroke="#64748b" stroke-width="7" stroke-linecap="round"/><path d="M14 52C40 12 74 62 104 26" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/><rect x="4" y="44" width="18" height="16" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/><rect x="100" y="16" width="26" height="20" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.6"/></svg>'
};

const EDU = {
  cpu: {
    title: 'WHAT IS A CPU?',
    what: 'The Central Processing Unit (CPU) is the main processor of a computer — the part that executes instructions from the operating system and every program you run.',
    does: 'It performs calculations, runs applications, handles background tasks and coordinates the work of other components. For everyday use the CPU decides how fast the system feels; in games and renders it works together with the graphics card.',
    specs: [
      '<strong>Cores</strong> — more cores let the CPU work on more tasks at once (editing, streaming, compiling).',
      '<strong>Threads</strong> — each thread is a processing lane; more threads improve multitasking.',
      '<strong>Clock speed</strong> — base and boost frequency in GHz; higher clocks mean snappier responses.',
      '<strong>Socket</strong> — the physical connection (AM4, AM5, LGA1700); it must match the motherboard.',
      '<strong>Generation / platform</strong> — newer generations add features, efficiency and support for faster memory.'
    ],
    who: 'Everyone needs a CPU. Gamers benefit from strong single-core speed, editors and streamers from more cores, and students/office users from a balanced, efficient chip.',
    check: [
      'Socket matches the motherboard you plan to buy.',
      'The motherboard BIOS supports the CPU generation.',
      'Memory generation matches the platform (DDR4 vs DDR5).',
      'A suitable cooler is included or budgeted separately.',
      'Balance with the graphics card so one does not limit the other.',
      'Whether you need integrated graphics or a dedicated GPU.'
    ]
  },
  gpu: {
    title: 'WHAT IS A GPU?',
    what: 'The Graphics Processing Unit (GPU) renders images, video, 3D scenes and effects, and sends them to your monitor.',
    does: 'It accelerates display output, games, video playback and GPU-assisted work such as video encoding, 3D rendering, CAD and AI tools. Modern GPUs also drive high-resolution and multi-monitor setups.',
    specs: [
      '<strong>VRAM</strong> — video memory (4GB to 16GB+); higher resolutions and textures need more.',
      '<strong>Performance tier</strong> — entry, mid-range or high-end determines the detail levels you can run.',
      '<strong>Power requirement</strong> — typical board power and the power connectors it needs.',
      '<strong>Physical size</strong> — length and slot thickness must fit inside the case.',
      '<strong>Display outputs</strong> — HDMI / DisplayPort versions and the maximum supported resolution.'
    ],
    who: 'Gamers, video editors, 3D designers, CAD users and anyone driving high-refresh or 4K displays. Office and study users can use the CPU integrated graphics instead.',
    check: [
      'GPU length fits your case clearance.',
      'Power supply wattage and connectors are sufficient.',
      'Your monitor resolution and refresh rate suit the card.',
      'Enough physical space — many cards take 2 to 3 slots.',
      'The CPU is fast enough to avoid holding the GPU back.'
    ]
  },
  ram: {
    title: 'WHAT IS RAM?',
    what: 'RAM (Random Access Memory) is the computer short-term working area. Programs and files you are actively using are loaded here so the CPU can reach them instantly.',
    does: 'It holds open applications, browser tabs, game assets and documents while you work. More RAM lets you keep more things open without slowdown. RAM is temporary — it forgets everything when power is switched off.',
    specs: [
      '<strong>Capacity</strong> — 8GB is the practical minimum, 16GB suits most users, 32GB+ for editing and heavy multitasking.',
      '<strong>Type</strong> — DDR4 or DDR5; they are not interchangeable and depend on the motherboard.',
      '<strong>Speed</strong> — MHz rating; faster memory helps in CPU-bound games and applications.',
      '<strong>Channel configuration</strong> — two sticks (dual channel) give noticeably better performance than one.',
      '<strong>Form factor</strong> — DIMM for desktops, SO-DIMM for laptops and small PCs.'
    ],
    who: 'Everyone. Office and student PCs run well on 16GB, games like 16 to 32GB, while video editing, virtual machines and large projects benefit from 32GB or more.',
    check: [
      'DDR4/DDR5 matches the motherboard memory type.',
      'Buy a matched kit of two sticks for dual channel.',
      'The motherboard supports the rated speed (XMP/EXPO profile).',
      'Module height fits under a tall CPU cooler.',
      'Total capacity leaves room for future upgrades.'
    ]
  },
  ssd: {
    title: 'WHAT IS AN SSD?',
    what: 'A Solid State Drive (SSD) is fast permanent storage built from flash memory, with no moving parts.',
    does: 'It stores Windows, programs and your files, and is the single biggest everyday speed upgrade for a PC: quick boot times, near-instant app launches and short game loading screens.',
    specs: [
      '<strong>Capacity</strong> — 256GB is entry level, 500GB to 1TB is the practical sweet spot, 2TB+ for large libraries.',
      '<strong>Interface</strong> — SATA (2.5 inch) is budget-friendly; NVMe (M.2) is much faster.',
      '<strong>PCIe generation</strong> — Gen3 / Gen4 / Gen5 change the maximum transfer speed.',
      '<strong>Endurance</strong> — rated terabytes written (TBW) indicates expected lifetime.',
      '<strong>Form factor</strong> — M.2 sticks plug directly into the motherboard; 2.5 inch drives need a bay and cable.'
    ],
    who: 'Everyone — an SSD makes any PC feel newer. A common approach: a fast NVMe SSD for Windows and programs, plus a large HDD for archives if needed.',
    check: [
      'Your motherboard has an M.2 slot and supports the PCIe generation.',
      'Enough capacity for your operating system, programs and active files.',
      'Physical clearance for the drive or heatsink under the graphics card.',
      'Buy from a reputable brand with a proper warranty.'
    ]
  },
  hdd: {
    title: 'WHAT IS AN HDD?',
    what: 'A Hard Disk Drive (HDD) stores data on spinning magnetic platters that are read and written by a moving head.',
    does: 'It provides large amounts of storage at a low cost per gigabyte — ideal for documents, photos, videos, game archives and backups. It is slower and more sensitive to shock than an SSD.',
    specs: [
      '<strong>Capacity</strong> — 1TB to 4TB+ for everyday storage needs.',
      '<strong>Spindle speed</strong> — 5400rpm is quieter, 7200rpm is faster.',
      '<strong>Interface</strong> — SATA III connects to the motherboard and power supply.',
      '<strong>Form factor</strong> — 3.5 inch for desktops, 2.5 inch for laptops.',
      '<strong>Workload rating</strong> — important for drives used continuously, such as in NAS or servers.'
    ],
    who: 'Anyone who needs lots of affordable storage for files and backups. Best used alongside a small SSD that holds the operating system.',
    check: [
      'Capacity matches what you actually store.',
      'Use an SSD as the system drive — an HDD slows the whole PC.',
      'Avoid mechanical drives in portable or vibration-prone setups.',
      'Check health status regularly if the drive holds important data, and keep separate backups.'
    ]
  },
  motherboard: {
    title: 'WHAT IS A MOTHERBOARD?',
    what: 'The motherboard is the main circuit board that connects the CPU, RAM, storage, graphics card, power supply and all peripherals.',
    does: 'It carries data and power between components, provides the slots and ports you use, and controls basic functions such as booting, firmware (BIOS/UEFI) and power delivery.',
    specs: [
      '<strong>Socket</strong> — must exactly match the CPU (AM4, AM5, LGA1700).',
      '<strong>Chipset</strong> — determines features such as USB ports, PCIe lanes and overclocking support.',
      '<strong>Form factor</strong> — ATX, Micro-ATX or Mini-ITX; it must fit the case.',
      '<strong>Memory support</strong> — DDR4 or DDR5, supported speeds and maximum capacity.',
      '<strong>Expansion</strong> — PCIe slots, M.2 slots, SATA ports and rear I/O.',
      '<strong>VRM quality</strong> — power delivery that matters for powerful or overclockable CPUs.'
    ],
    who: 'Every PC builder. Choose the socket first, then the size, connectivity and upgrade options that fit your plans and budget.',
    check: [
      'Socket matches the CPU and the BIOS generation supports it.',
      'Memory type (DDR4/DDR5) matches the RAM you plan to buy.',
      'The case supports the board form factor.',
      'Enough M.2 and SATA ports for your storage.',
      'Enough USB and display ports for your devices.'
    ]
  },
  psu: {
    title: 'WHAT IS A PSU?',
    what: 'The Power Supply Unit converts mains electricity into the stable low-voltage DC power that PC components need.',
    does: 'It powers every component and protects the system from unstable input. A reliable PSU with enough headroom keeps the PC stable and gives room for future upgrades.',
    specs: [
      '<strong>Wattage</strong> — total output; size it above your estimated system draw.',
      '<strong>Efficiency rating</strong> — 80 PLUS Bronze/Gold means less wasted energy and heat.',
      '<strong>Modularity</strong> — non-modular, semi or fully modular cables make building easier.',
      '<strong>Protections</strong> — over-voltage, over-current and short-circuit protection.',
      '<strong>Warranty and brand</strong> — a long warranty usually signals build quality.',
      '<strong>Connectors</strong> — CPU, motherboard, GPU and SATA power connectors.'
    ],
    who: 'Every PC. Never save on the PSU — it is the part that feeds everything else. Aim for roughly 40 to 50 percent headroom above your estimated draw.',
    check: [
      'Wattage covers CPU and GPU peaks with room to spare.',
      'The exact GPU connectors are included (8-pin, 16-pin, etc.).',
      'Cable length suits your case and cable management.',
      'ATX or SFX size matches your case.',
      'Quality brand with documented protections and warranty.'
    ]
  },
  cooler: {
    title: 'WHAT IS A CPU COOLER?',
    what: 'The CPU cooler removes heat from the processor — either with air (heatsink plus fan) or with liquid flowing to a radiator.',
    does: 'It keeps CPU temperatures within safe limits so the processor can maintain its boost speeds without throttling, and it controls fan noise.',
    specs: [
      '<strong>Type</strong> — air tower, stock/basic air, or AIO liquid cooler.',
      '<strong>Height</strong> — tower coolers are typically 120 to 165mm tall; the case must have room.',
      '<strong>Thermal rating</strong> — the heat it can dissipate (watts), which should meet or exceed the CPU output.',
      '<strong>Socket support</strong> — mounting hardware for AM4/AM5/LGA1700.',
      '<strong>Noise</strong> — fan size and speed determine how audible it is under load.',
      '<strong>Radiator size</strong> — 120/240/360mm for liquid coolers.'
    ],
    who: 'Everyone. Stock coolers are fine for basic and office use; gamers, editors and quiet-PC builders get lower temperatures and noise from better tower or liquid coolers.',
    check: [
      'Case clearance for cooler height or radiator size.',
      'Mounting hardware supports your CPU socket.',
      'Thermal capacity is enough for your CPU heat output.',
      'Tall heatsinks do not collide with high RAM modules.'
    ]
  },
  case: {
    title: 'WHAT IS A PC CASE?',
    what: 'The PC case (chassis) houses and protects all components, and shapes airflow, noise and appearance.',
    does: 'It mounts every part, directs airflow from the intake and exhaust fans, reduces noise and provides front-panel ports. The case also decides how large your GPU and CPU cooler can be.',
    specs: [
      '<strong>Supported form factors</strong> — ATX, Micro-ATX, Mini-ITX motherboard support.',
      '<strong>Maximum GPU length</strong> — the most important limit for gaming builds.',
      '<strong>Maximum cooler height</strong> — clearance for tall air coolers.',
      '<strong>Fan and radiator mounts</strong> — how much cooling you can install.',
      '<strong>Build quality</strong> — panel materials, dust filters and cable-management space.',
      '<strong>Front I/O</strong> — USB ports, audio jacks and power/reset buttons.'
    ],
    who: 'Every build. Larger cases are easier to build in, cool better and support more hardware; compact cases save space but restrict part sizes.',
    check: [
      'Motherboard form factor fits the case.',
      'GPU length and cooler height clearances are sufficient.',
      'Enough fan mounts for good airflow through the case.',
      'Dust filters and easy cleaning access.',
      'Room behind the panel for cable management.'
    ]
  },
  monitor: {
    title: 'WHAT IS A MONITOR?',
    what: 'The monitor is the display you look at — a panel connected to the graphics card video outputs.',
    does: 'It shows everything the GPU renders. Its size, resolution, panel type, refresh rate and response time decide image clarity, motion smoothness and colour quality.',
    specs: [
      '<strong>Size</strong> — 24 inch is a versatile default, 27 inch gives more immersion and workspace.',
      '<strong>Resolution</strong> — Full HD (1920x1080), QHD (2560x1440) or 4K (3840x2160).',
      '<strong>Panel type</strong> — IPS for colour and viewing angles, VA for contrast, TN for fast response.',
      '<strong>Refresh rate</strong> — 60 to 75Hz for general use, 120 to 240Hz for smooth gaming.',
      '<strong>Response time</strong> — lower values reduce visible blur in fast motion.',
      '<strong>Inputs and sync</strong> — HDMI/DisplayPort versions and FreeSync/G-Sync support.'
    ],
    who: 'Everyone. Office users value sharp text and adjustability, gamers want high refresh rates, and creators want accurate colour and higher resolution.',
    check: [
      'Your graphics card can drive the chosen resolution and refresh rate.',
      'The monitor has the ports your PC provides, and the right cable.',
      'Panel type suits your use (colour, contrast or speed).',
      'Stand adjustability for comfortable posture.',
      'Sync compatibility with your GPU (FreeSync/G-Sync).'
    ]
  },
  keyboard: {
    title: 'WHAT IS A KEYBOARD?',
    what: 'A keyboard is your main input device for typing, shortcuts and in-game controls.',
    does: 'It registers every key press and sends it to the PC. The switch type, layout and build quality decide how comfortable it feels during long typing or gaming sessions.',
    specs: [
      '<strong>Switch type</strong> — membrane keys are quiet and affordable; mechanical switches are tactile, faster and more durable.',
      '<strong>Layout</strong> — full size, TKL (tenkeyless) or compact, depending on desk space.',
      '<strong>Connectivity</strong> — wired USB for zero latency, or wireless for a clean desk.',
      '<strong>Features</strong> — backlight, macro keys, wrist rest and build material.',
      '<strong>Compatibility</strong> — works with Windows; check software support for macros.'
    ],
    who: 'Everyone. Writers and office users value comfort and quiet keys, while gamers often prefer mechanical switches with fast, distinct actuation.',
    check: [
      'Switch type matches your typing or gaming preference.',
      'Layout fits your desk and language needs.',
      'Wired or wireless suits your setup.',
      'Build quality and key durability rating.'
    ]
  },
  mouse: {
    title: 'WHAT IS A MOUSE?',
    what: 'A mouse is a pointing device that moves the cursor and handles clicks, scrolls and shortcuts.',
    does: 'It translates your hand movement into pointer movement. Sensor quality, weight and shape affect precision and comfort — especially in games and design work.',
    specs: [
      '<strong>Sensor</strong> — DPI range and tracking accuracy; more DPI is not automatically better.',
      '<strong>Shape and weight</strong> — ergonomic for long work sessions, lightweight for fast gaming.',
      '<strong>Buttons</strong> — standard clicks plus side buttons and adjustable DPI levels.',
      '<strong>Connectivity</strong> — wired for reliability, wireless with very low latency nowadays.',
      '<strong>Switch durability</strong> — rated clicks before wear (often 20 to 80 million).'
    ],
    who: 'Everyone. Office users benefit from an ergonomic shape, gamers from a precise sensor and fast buttons, designers from adjustable sensitivity.',
    check: [
      'Shape and size fit your hand and grip style.',
      'Sensor performance suits your tasks.',
      'Wired or wireless preference.',
      'Software support for button and DPI configuration.'
    ]
  },
  headset: {
    title: 'WHAT IS A HEADSET?',
    what: 'A headset combines headphones and a microphone, so you can hear audio and communicate at the same time.',
    does: 'It delivers game, call and media sound to your ears and captures your voice for meetings, calls and in-game chat.',
    specs: [
      '<strong>Driver size</strong> — 40 to 50mm drivers are common in gaming headsets.',
      '<strong>Connection</strong> — 3.5mm jack, USB, or wireless (2.4GHz/Bluetooth).',
      '<strong>Microphone</strong> — boom mic quality and noise-cancelling behaviour.',
      '<strong>Comfort</strong> — ear cushion material, clamping force and weight.',
      '<strong>Battery life</strong> — important for wireless models.'
    ],
    who: 'Anyone who takes calls, attends online classes, plays games or watches movies without disturbing others.',
    check: [
      'Connection type works with your PC or phone.',
      'Comfort for long sessions (padding and weight).',
      'Microphone quality if you attend meetings or play online.',
      'Battery life for wireless models.'
    ]
  },
  laptop: {
    title: 'WHAT IS A LAPTOP?',
    what: 'A laptop is a complete computer with screen, keyboard, battery and components built into one portable body.',
    does: 'It performs the same tasks as a desktop PC while running on battery power. Performance depends on the processor, graphics, cooling and power limits chosen by the manufacturer.',
    specs: [
      '<strong>Processor and graphics</strong> — determine overall performance and gaming capability.',
      '<strong>Memory and storage</strong> — 8GB is entry level, 16GB+ recommended; SSD storage is essential.',
      '<strong>Display</strong> — size, resolution, refresh rate and colour quality.',
      '<strong>Battery and charging</strong> — capacity and charger wattage.',
      '<strong>Weight and build</strong> — portability versus cooling performance.',
      '<strong>Ports and upgrade options</strong> — USB, HDMI, and whether RAM/SSD can be replaced.'
    ],
    who: 'Students, office workers, travellers and gamers who need computing away from a fixed desk. Choose thin-and-light for portability or a gaming model for performance.',
    check: [
      'Processor and GPU suit your typical workload.',
      'Enough RAM and a fast SSD — avoid slow hard-drive-only models.',
      'Screen size and quality for long work sessions.',
      'Battery life matches how often you work away from a socket.',
      'Keyboard comfort and available ports for your devices.'
    ]
  },
  printer: {
    title: 'WHAT IS A PRINTER?',
    what: 'A printer produces paper copies of documents and photos, usually with scanning and copying functions built in.',
    does: 'It turns digital files into printed pages. Inkjet printers handle colour and photos well, while laser printers are faster and cheaper per page for text.',
    specs: [
      '<strong>Print technology</strong> — inkjet for colour/photos, laser for speed and text volume.',
      '<strong>Functions</strong> — print, scan, copy, fax combinations.',
      '<strong>Print speed</strong> — pages per minute for mono and colour.',
      '<strong>Resolution</strong> — dots per inch affects detail in photos.',
      '<strong>Connectivity</strong> — USB, Wi-Fi and mobile printing support.',
      '<strong>Running cost</strong> — cartridge/toner price versus page yield.'
    ],
    who: 'Homes that print occasionally, students who submit assignments and offices with regular document needs.',
    check: [
      'Monthly print volume suits the technology chosen.',
      'Cartridge cost and local availability.',
      'Wi-Fi/mobile printing if you print from phones.',
      'ADF and duplex features if you scan or print double-sided often.'
    ]
  },
  network: {
    title: 'WHAT IS NETWORKING HARDWARE?',
    what: 'Networking hardware connects your devices to each other and to the internet — routers, switches, access points and cables.',
    does: 'A router directs traffic between your home network and the internet, while switches and cabling link devices together for stable, fast connections.',
    specs: [
      '<strong>Wi-Fi standard</strong> — Wi-Fi 5 (AC), Wi-Fi 6 (AX) and newer affect speed and capacity.',
      '<strong>Bands</strong> — dual band (2.4GHz + 5GHz) balances range and speed.',
      '<strong>Wired ports</strong> — Fast Ethernet (100Mbps) or Gigabit (1000Mbps).',
      '<strong>Coverage</strong> — antenna design and house size determine dead zones.',
      '<strong>Security</strong> — WPA3 support and easy firmware updates.'
    ],
    who: 'Every home and office. Gamers and video-call users benefit most from a wired Gigabit connection and a modern router.',
    check: [
      'Internet plan speed versus router capability.',
      'House size and layout for Wi-Fi coverage.',
      'Number of wired devices needing LAN ports.',
      'Support for the latest security standards.'
    ]
  },
  fan: {
    title: 'WHAT IS A CASE FAN?',
    what: 'Case fans move air through the PC case so heat is pulled away from components and pushed out.',
    does: 'They create airflow and static pressure: intake fans bring cool air in, exhaust fans carry warm air out. Good airflow keeps the GPU and CPU cooler and quieter.',
    specs: [
      '<strong>Size</strong> — 120mm and 140mm are the standard desktop sizes.',
      '<strong>Airflow vs pressure</strong> — airflow fans suit open vents, pressure fans suit filters and radiators.',
      '<strong>Noise</strong> — dBA rating and blade design decide how loud they get.',
      '<strong>Connection</strong> — 3-pin (DC) or 4-pin (PWM) for automatic speed control.',
      '<strong>Lighting</strong> — RGB is optional and does not improve cooling.'
    ],
    who: 'Every PC builder. Stock case fans are often enough, while high-performance builds benefit from extra intake fans and better filters.',
    check: [
      'Fan mounts and sizes supported by your case.',
      'Airflow direction — intake at the front, exhaust at the rear/top.',
      'PWM control for quiet automatic speed adjustment.',
      'Clearance around large graphics cards and coolers.'
    ]
  }
};

const COMPONENTS = [
  { id: 'cpu-i3-12100f', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'Intel Core i3-12100F', brand: 'Intel', spec: '4 cores / 8 threads · up to 4.3 GHz · LGA1700', price: 42000, use: 'An affordable entry-level processor that handles schoolwork, office applications and light gaming with a dedicated graphics card.', useCase: 'Budget PC · Student PC · Entry gaming', tags: ['budget', 'student', 'gaming'], socket: 'LGA1700', tdp: 89, igpu: false },
  { id: 'cpu-i5-12400f', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'Intel Core i5-12400F', brand: 'Intel', spec: '6 cores / 12 threads · up to 4.4 GHz · LGA1700', price: 68000, use: 'A balanced mid-range CPU for gaming, study and everyday work — strong value without overspending.', useCase: 'Mainstream gaming · Office · Content work', tags: ['gaming', 'budget', 'content'], socket: 'LGA1700', tdp: 117, igpu: false },
  { id: 'cpu-i5-14400f', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'Intel Core i5-14400F', brand: 'Intel', spec: '10 cores / 16 threads · up to 4.7 GHz · LGA1700', price: 105000, use: 'A modern mid-to-high CPU that comfortably handles demanding games, multitasking and creative workloads.', useCase: 'Gaming · Streaming · Content creation', tags: ['gaming', 'content', 'performance'], socket: 'LGA1700', tdp: 148, igpu: false },
  { id: 'cpu-i7-14700f', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'Intel Core i7-14700F', brand: 'Intel', spec: '20 cores / 28 threads · up to 5.6 GHz · LGA1700', price: 198000, use: 'A high-core-count processor for heavy multitasking, video editing, rendering and streaming at the same time.', useCase: 'Content creation · Enthusiast gaming', tags: ['content', 'performance', 'gaming'], socket: 'LGA1700', tdp: 210, igpu: false },
  { id: 'cpu-r5-5600', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'AMD Ryzen 5 5600', brand: 'AMD', spec: '6 cores / 12 threads · up to 4.4 GHz · AM4', price: 56000, use: 'A popular six-core CPU offering excellent gaming and productivity value on the mature AM4 platform.', useCase: 'Budget gaming · Student PC · Home PC', tags: ['gaming', 'budget', 'student'], socket: 'AM4', tdp: 65, igpu: false },
  { id: 'cpu-r5-5600g', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'AMD Ryzen 5 5600G', brand: 'AMD', spec: '6 cores / 12 threads · Radeon graphics · AM4', price: 68000, use: 'A six-core processor with built-in graphics, so a PC can run without a dedicated graphics card.', useCase: 'Office PC · Student PC · Home PC', tags: ['budget', 'office', 'student'], socket: 'AM4', tdp: 65, igpu: true },
  { id: 'cpu-r7-5700x', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'AMD Ryzen 7 5700X', brand: 'AMD', spec: '8 cores / 16 threads · up to 4.6 GHz · AM4', price: 92000, use: 'An eight-core AM4 CPU that suits editing, streaming and smooth high-refresh gaming.', useCase: 'Content creation · Gaming', tags: ['content', 'gaming'], socket: 'AM4', tdp: 65, igpu: false },
  { id: 'cpu-r5-7600', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'AMD Ryzen 5 7600', brand: 'AMD', spec: '6 cores / 12 threads · up to 5.1 GHz · AM5', price: 118000, use: 'A fast modern six-core on the AM5 platform, with an upgrade path to future Ryzen generations.', useCase: 'Gaming · Mainstream workstation', tags: ['gaming', 'performance', 'content'], socket: 'AM5', tdp: 88, igpu: true },
  { id: 'cpu-r7-7700x', cat: 'processors', edu: 'cpu', visual: 'cpu', slot: 'cpu', name: 'AMD Ryzen 7 7700X', brand: 'AMD', spec: '8 cores / 16 threads · up to 5.4 GHz · AM5', price: 168000, use: 'A high-performance eight-core CPU for enthusiast gaming, 3D work, compiling and video production.', useCase: 'High-end gaming · Content creation', tags: ['content', 'performance', 'gaming'], socket: 'AM5', tdp: 105, igpu: true },

  { id: 'mb-a520m', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'A520M Micro-ATX', brand: 'ASUS', spec: 'Micro-ATX · AM4 · DDR4 · PCIe 3.0', price: 26500, use: 'A basic, low-cost AM4 board for office and home PCs that do not need overclocking features.', useCase: 'Office PC · Student PC', tags: ['budget', 'office', 'student'], socket: 'AM4', memory: 'DDR4', form: 'Micro-ATX' },
  { id: 'mb-b550m', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'B550M Micro-ATX', brand: 'Gigabyte', spec: 'Micro-ATX · AM4 · DDR4 · PCIe 4.0', price: 44000, use: 'A well-rounded AM4 board with PCIe 4.0 support — a great match for Ryzen 5000 gaming builds.', useCase: 'Budget gaming · Mainstream PC', tags: ['gaming', 'budget'], socket: 'AM4', memory: 'DDR4', form: 'Micro-ATX' },
  { id: 'mb-b660m', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'B660M Micro-ATX', brand: 'MSI', spec: 'Micro-ATX · LGA1700 · DDR4', price: 54000, use: 'A practical Intel board for 12th to 14th gen CPUs, using DDR4 memory for better value.', useCase: 'Gaming · Office · Student', tags: ['gaming', 'budget', 'office'], socket: 'LGA1700', memory: 'DDR4', form: 'Micro-ATX' },
  { id: 'mb-b760m-d5', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'B760M DDR5', brand: 'MSI', spec: 'Micro-ATX · LGA1700 · DDR5', price: 76000, use: 'A modern Intel board supporting faster DDR5 memory and the latest storage options.', useCase: 'Gaming · Content creation', tags: ['gaming', 'content'], socket: 'LGA1700', memory: 'DDR5', form: 'Micro-ATX' },
  { id: 'mb-b650m', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'B650M Micro-ATX', brand: 'ASUS', spec: 'Micro-ATX · AM5 · DDR5', price: 79000, use: 'An affordable entry into the AM5 platform with DDR5 memory and future CPU upgrade support.', useCase: 'Gaming · Mainstream workstation', tags: ['gaming', 'content', 'performance'], socket: 'AM5', memory: 'DDR5', form: 'Micro-ATX' },
  { id: 'mb-b650-atx', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'B650 ATX', brand: 'Gigabyte', spec: 'ATX · AM5 · DDR5 · PCIe 5.0', price: 108000, use: 'A full-size AM5 board with strong power delivery, plenty of ports and expansion for demanding builds.', useCase: 'High-end gaming · Content creation', tags: ['content', 'performance'], socket: 'AM5', memory: 'DDR5', form: 'ATX' },
  { id: 'mb-z790', cat: 'motherboards', edu: 'motherboard', visual: 'motherboard', slot: 'motherboard', name: 'Z790 ATX', brand: 'MSI', spec: 'ATX · LGA1700 · DDR5', price: 138000, use: 'A premium Intel board with extensive connectivity, strong VRMs and a full feature set for enthusiast PCs.', useCase: 'Content creation · High-end gaming', tags: ['content', 'performance', 'gaming'], socket: 'LGA1700', memory: 'DDR5', form: 'ATX' },

  { id: 'ram-8-d4', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '8GB DDR4 Kit', brand: 'Kingston', spec: '8GB (1x8) · DDR4 · 3200MHz', price: 12000, use: 'The minimum practical memory for basic browsing, documents and light office work.', useCase: 'Office · Student · Basic home PC', tags: ['budget', 'office', 'student'], type: 'DDR4' },
  { id: 'ram-16-d4', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '16GB DDR4 Kit', brand: 'Corsair', spec: '16GB (2x8) · DDR4 · 3200MHz', price: 23500, use: 'The sweet spot for gaming, study and office multitasking — two sticks enable dual-channel speed.', useCase: 'Gaming · Office · Student', tags: ['gaming', 'budget', 'office', 'student'], type: 'DDR4' },
  { id: 'ram-32-d4', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '32GB DDR4 Kit', brand: 'Kingston', spec: '32GB (2x16) · DDR4 · 3600MHz', price: 47000, use: 'Plenty of memory for editing, many browser tabs and running virtual machines on AM4 systems.', useCase: 'Content creation · Multitasking', tags: ['content', 'gaming'], type: 'DDR4' },
  { id: 'ram-16-d5', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '16GB DDR5 Kit', brand: 'Corsair', spec: '16GB (2x8) · DDR5 · 5600MHz', price: 36000, use: 'Entry DDR5 memory for modern Intel and AMD platforms with higher bandwidth.', useCase: 'Gaming · Content creation', tags: ['gaming', 'content'], type: 'DDR5' },
  { id: 'ram-32-d5', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '32GB DDR5 Kit', brand: 'Kingston', spec: '32GB (2x16) · DDR5 · 6000MHz', price: 68000, use: 'A fast, roomy kit for gaming, streaming and creative applications on current platforms.', useCase: 'Content creation · High performance', tags: ['content', 'performance', 'gaming'], type: 'DDR5' },
  { id: 'ram-64-d5', cat: 'ram', edu: 'ram', visual: 'ram', slot: 'ram', name: '64GB DDR5 Kit', brand: 'Corsair', spec: '64GB (2x32) · DDR5 · 6000MHz', price: 138000, use: 'Large memory for heavy rendering, 3D scenes, virtual machines and huge project files.', useCase: 'Professional content creation', tags: ['content', 'performance'], type: 'DDR5' },

  { id: 'gpu-gt1030', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce GT 1030', brand: 'ASUS', spec: '2GB GDDR6 · low profile · 30W · no external power', price: 34000, use: 'A tiny display card that adds video output and light graphics capability to office PCs.', useCase: 'Office · Media PC · Multi-monitor setup', tags: ['office', 'budget'], tdp: 30, length: 150 },
  { id: 'gpu-gtx1650', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce GTX 1650', brand: 'Gigabyte', spec: '4GB GDDR6 · 75W · no external power', price: 66000, use: 'An entry gaming card that runs popular esports titles at 1080p without needing PSU upgrades.', useCase: 'Entry gaming · Student PC', tags: ['budget', 'gaming', 'student'], tdp: 75, length: 170 },
  { id: 'gpu-rtx3060', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce RTX 3060 12GB', brand: 'MSI', spec: '12GB GDDR6 · 170W · 8-pin power', price: 118000, use: 'A versatile mid-range card with plenty of VRAM for 1080p and 1440p gaming and creative apps.', useCase: '1080p/1440p gaming · Content creation', tags: ['gaming', 'content', 'budget'], tdp: 170, length: 245 },
  { id: 'gpu-rx7600', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'Radeon RX 7600', brand: 'Sapphire', spec: '8GB GDDR6 · 165W · 8-pin power', price: 128000, use: 'A modern mid-range card delivering smooth 1080p gaming with efficient power use.', useCase: '1080p gaming · Mainstream PC', tags: ['gaming', 'content'], tdp: 165, length: 245 },
  { id: 'gpu-rtx4060', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce RTX 4060', brand: 'ASUS', spec: '8GB GDDR6 · 115W · 8-pin power', price: 148000, use: 'An efficient current-generation card with ray tracing and AI features for smooth 1080p to 1440p gaming.', useCase: 'Gaming · Content creation', tags: ['gaming', 'content', 'performance'], tdp: 115, length: 245 },
  { id: 'gpu-rtx4070', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce RTX 4070', brand: 'MSI', spec: '12GB GDDR6X · 200W · 8-pin power', price: 248000, use: 'A strong high-end card for high-refresh 1440p gaming, 3D work and video production.', useCase: 'High-end gaming · Content creation', tags: ['gaming', 'content', 'performance'], tdp: 200, length: 300 },
  { id: 'gpu-rtx4080s', cat: 'graphics', edu: 'gpu', visual: 'gpu', slot: 'gpu', name: 'GeForce RTX 4080 SUPER', brand: 'Gigabyte', spec: '16GB GDDR6X · 320W · 16-pin power', price: 475000, use: 'An enthusiast-class card for 4K gaming, heavy rendering and demanding GPU workloads.', useCase: '4K gaming · Professional content', tags: ['performance', 'gaming', 'content'], tdp: 320, length: 340 },

  { id: 'ssd-256-sata', cat: 'storage', edu: 'ssd', visual: 'ssd', slot: 'storage', name: '256GB SATA SSD', brand: 'Samsung', spec: '256GB · 2.5 inch · SATA III', price: 11500, use: 'A low-cost way to replace a slow hard drive and make an old or budget PC feel much faster.', useCase: 'Budget PC · Office · Upgrading older PCs', tags: ['budget', 'office', 'student'] },
  { id: 'ssd-500-nvme', cat: 'storage', edu: 'ssd', visual: 'ssd', slot: 'storage', name: '500GB NVMe SSD', brand: 'Kingston', spec: '500GB · M.2 NVMe PCIe 3.0', price: 21500, use: 'A fast boot drive with enough space for Windows, programs and a decent set of games or files.', useCase: 'Budget builds · Student PC · Office', tags: ['budget', 'gaming', 'student', 'office'] },
  { id: 'ssd-1tb-nvme', cat: 'storage', edu: 'ssd', visual: 'ssd', slot: 'storage', name: '1TB NVMe SSD', brand: 'Samsung', spec: '1TB · M.2 NVMe PCIe 4.0', price: 42000, use: 'The recommended size for most builds — room for the OS, applications, games and active projects.', useCase: 'Gaming · Content creation · Mainstream', tags: ['gaming', 'content', 'performance', 'office'] },
  { id: 'ssd-2tb-nvme', cat: 'storage', edu: 'ssd', visual: 'ssd', slot: 'storage', name: '2TB NVMe SSD', brand: 'Kingston', spec: '2TB · M.2 NVMe PCIe 4.0', price: 88000, use: 'Large, fast storage for big game libraries, video projects and raw photo collections.', useCase: 'Content creation · Enthusiast gaming', tags: ['content', 'performance', 'gaming'] },
  { id: 'hdd-1tb', cat: 'storage', edu: 'hdd', visual: 'hdd', slot: 'storage', name: '1TB Hard Disk Drive', brand: 'Seagate', spec: '1TB · 7200rpm · 3.5 inch SATA', price: 14500, use: 'Affordable bulk storage for documents, photos and backups alongside a smaller SSD.', useCase: 'Office · Budget storage · Backups', tags: ['budget', 'office'] },
  { id: 'hdd-2tb', cat: 'storage', edu: 'hdd', visual: 'hdd', slot: 'storage', name: '2TB Hard Disk Drive', brand: 'Western Digital', spec: '2TB · 7200rpm · 3.5 inch SATA', price: 27500, use: 'Cheap high-capacity storage for media collections, archives and backup sets.', useCase: 'Storage · Backups · Home media', tags: ['budget', 'office', 'content'] },

  { id: 'psu-450', cat: 'psu', edu: 'psu', visual: 'psu', slot: 'psu', name: '450W 80+ Bronze', brand: 'Cooler Master', spec: '450W · 80+ Bronze · non-modular', price: 11500, use: 'Sufficient for basic PCs and office systems without a powerful graphics card.', useCase: 'Office PC · Student PC', tags: ['budget', 'office', 'student'], watt: 450 },
  { id: 'psu-550', cat: 'psu', edu: 'psu', visual: 'psu', slot: 'psu', name: '550W 80+ Bronze', brand: 'Cooler Master', spec: '550W · 80+ Bronze · non-modular', price: 16500, use: 'A good match for entry and mid-range gaming PCs with a single graphics card.', useCase: 'Budget gaming · Mainstream PC', tags: ['budget', 'gaming'], watt: 550 },
  { id: 'psu-650', cat: 'psu', edu: 'psu', visual: 'psu', slot: 'psu', name: '650W 80+ Gold', brand: 'Corsair', spec: '650W · 80+ Gold · semi-modular', price: 28500, use: 'Efficient, reliable power with headroom for mid-range gaming and upgrade plans.', useCase: 'Gaming · Content creation', tags: ['gaming', 'content'], watt: 650 },
  { id: 'psu-750', cat: 'psu', edu: 'psu', visual: 'psu', slot: 'psu', name: '750W 80+ Gold', brand: 'Corsair', spec: '750W · 80+ Gold · fully modular', price: 38500, use: 'Clean, modular power suited to high-end GPUs and quiet, well-managed builds.', useCase: 'High-end gaming · Content creation', tags: ['gaming', 'content', 'performance'], watt: 750 },
  { id: 'psu-850', cat: 'psu', edu: 'psu', visual: 'psu', slot: 'psu', name: '850W 80+ Gold', brand: 'Seasonic', spec: '850W · 80+ Gold · fully modular', price: 52000, use: 'Plenty of clean power for enthusiast graphics cards, workstations and future upgrades.', useCase: 'High performance · Workstation', tags: ['performance', 'content'], watt: 850 },

  { id: 'case-nova', cat: 'cases', edu: 'case', visual: 'case', slot: 'case', name: 'Nova Micro-ATX Case', brand: 'Deepcool', spec: 'Micro-ATX · 320mm GPU clearance · 155mm cooler clearance', price: 12500, use: 'A compact, affordable chassis for office and student builds where space matters.', useCase: 'Office · Student · Budget PC', tags: ['budget', 'office', 'student'], forms: ['Micro-ATX', 'Mini-ITX'], maxGpu: 320, maxCooler: 155 },
  { id: 'case-vector', cat: 'cases', edu: 'case', visual: 'case', slot: 'case', name: 'Vector ATX Mid Tower', brand: 'Cooler Master', spec: 'ATX · 350mm GPU clearance · 170mm cooler clearance', price: 24000, use: 'A versatile mid tower with good airflow and room for most gaming components.', useCase: 'Gaming · Mainstream builds', tags: ['gaming', 'budget'], forms: ['ATX', 'Micro-ATX', 'Mini-ITX'], maxGpu: 350, maxCooler: 170 },
  { id: 'case-aether', cat: 'cases', edu: 'case', visual: 'case', slot: 'case', name: 'Aether Airflow ATX', brand: 'Antec', spec: 'ATX · high airflow · 400mm GPU clearance · 185mm cooler clearance', price: 39000, use: 'A high-airflow case for powerful builds — supports large GPUs, tall coolers and radiators.', useCase: 'High-end gaming · Content creation', tags: ['gaming', 'performance', 'content'], forms: ['ATX', 'Micro-ATX', 'Mini-ITX'], maxGpu: 400, maxCooler: 185 },
  { id: 'case-nano', cat: 'cases', edu: 'case', visual: 'case', slot: 'case', name: 'Nano Mini-ITX Cube', brand: 'SilverStone', spec: 'Mini-ITX · 210mm GPU clearance · 70mm cooler clearance', price: 15500, use: 'A small-form-factor case for a tidy compact PC — part choices must be carefully checked.', useCase: 'Compact PC · Student PC', tags: ['budget', 'student', 'office'], forms: ['Mini-ITX'], maxGpu: 210, maxCooler: 70 },

  { id: 'cooler-stock', cat: 'cooling', edu: 'cooler', visual: 'cooler', slot: 'cooler', name: 'Boxed Stock Cooler', brand: 'Bundled', spec: 'Air · for 65W CPUs · AM4 / AM5 / LGA1700', price: 3500, use: 'The basic cooler included with many CPUs — enough for office work and light use.', useCase: 'Office · Student · Budget PC', tags: ['budget', 'office', 'student'], sockets: ['AM4', 'AM5', 'LGA1700'], height: 55, coolTdp: 100 },
  { id: 'cooler-tower', cat: 'cooling', edu: 'cooler', visual: 'cooler', slot: 'cooler', name: 'Aura Tower Air Cooler', brand: 'Deepcool', spec: '120mm tower air · 158mm height · 200W rating', price: 12500, use: 'A quiet tower cooler that keeps mainstream CPUs cool under sustained gaming or work loads.', useCase: 'Gaming · Quiet PC · Mainstream', tags: ['gaming', 'budget', 'student'], sockets: ['AM4', 'AM5', 'LGA1700'], height: 158, coolTdp: 200 },
  { id: 'cooler-dual', cat: 'cooling', edu: 'cooler', visual: 'cooler', slot: 'cooler', name: 'Dual Tower Air Cooler', brand: 'Deepcool', spec: 'Dual-tower air · 165mm height · 250W rating', price: 24500, use: 'A large air cooler for hot, powerful CPUs — strong performance without pump noise.', useCase: 'High-end gaming · Content creation', tags: ['gaming', 'performance', 'content'], sockets: ['AM4', 'AM5', 'LGA1700'], height: 165, coolTdp: 250 },
  { id: 'cooler-aio240', cat: 'cooling', edu: 'cooler', visual: 'cooler', slot: 'cooler', name: 'AIO Liquid Cooler 240', brand: 'Cooler Master', spec: '240mm liquid cooler · 280W rating', price: 34500, use: 'A liquid cooler with a 240mm radiator — good temperatures and a clean look inside the case.', useCase: 'Gaming · Content creation · Enthusiast', tags: ['gaming', 'content', 'performance'], sockets: ['AM4', 'AM5', 'LGA1700'], height: 60, coolTdp: 280, aio: true },
  { id: 'cooler-aio360', cat: 'cooling', edu: 'cooler', visual: 'cooler', slot: 'cooler', name: 'AIO Liquid Cooler 360', brand: 'Cooler Master', spec: '360mm liquid cooler · 320W rating', price: 52000, use: 'A large triple-fan liquid cooler for the hottest CPUs and near-silent heavy workloads.', useCase: 'High performance · Content creation', tags: ['performance', 'content'], sockets: ['AM4', 'AM5', 'LGA1700'], height: 60, coolTdp: 320, aio: true },

  { id: 'fan-120', cat: 'fans', edu: 'fan', visual: 'fan', slot: 'fans', name: '120mm Case Fan', brand: 'Deepcool', spec: '120mm · PWM · high airflow', price: 3200, use: 'A single replacement or extra fan to improve airflow through the case.', useCase: 'Budget · Office · Home PC', tags: ['budget', 'office', 'student'] },
  { id: 'fan-3x120', cat: 'fans', edu: 'fan', visual: 'fan', slot: 'fans', name: '3x 120mm Fan Pack', brand: 'Deepcool', spec: '3-pack · PWM · dust-filter compatible', price: 9500, use: 'A set of three fans for proper front-to-rear airflow in most mid towers.', useCase: 'Gaming · Content creation · Airflow upgrade', tags: ['gaming', 'budget', 'content'] },
  { id: 'fan-3x140', cat: 'fans', edu: 'fan', visual: 'fan', slot: 'fans', name: '3x 140mm Airflow Fans', brand: 'be quiet!', spec: '3-pack · 140mm · quiet airflow', price: 14500, use: 'Larger, slower fans that move more air at lower noise — ideal for quiet high-performance builds.', useCase: 'High-end gaming · Silent PC', tags: ['gaming', 'performance', 'content'] },

  { id: 'mon-24-75', cat: 'monitors', edu: 'monitor', visual: 'monitor', name: '24 inch FHD IPS', brand: 'LG', spec: '23.8 inch · 1920x1080 · IPS · 75Hz', price: 45000, use: 'A versatile full HD monitor with accurate colours for office work, study and everyday use.', useCase: 'Office · Student · Home', tags: ['office', 'student', 'budget'] },
  { id: 'mon-24-180', cat: 'monitors', edu: 'monitor', visual: 'monitor', name: '24 inch FHD 180Hz', brand: 'AOC', spec: '23.8 inch · 1920x1080 · IPS · 180Hz', price: 62000, use: 'A fast, high-refresh monitor that makes games feel smoother and more responsive.', useCase: 'Gaming · Student', tags: ['gaming', 'budget', 'student'] },
  { id: 'mon-27-165', cat: 'monitors', edu: 'monitor', visual: 'monitor', name: '27 inch QHD 165Hz', brand: 'Gigabyte', spec: '27 inch · 2560x1440 · IPS · 165Hz', price: 92000, use: 'A sharp, fast 1440p display — an excellent balance of clarity and smooth gameplay.', useCase: 'Gaming · Content creation', tags: ['gaming', 'content', 'performance'] },
  { id: 'mon-27-4k', cat: 'monitors', edu: 'monitor', visual: 'monitor', name: '27 inch 4K IPS', brand: 'LG', spec: '27 inch · 3840x2160 · IPS · 60Hz', price: 158000, use: 'A high-resolution display for detailed photo work, video editing and crisp text.', useCase: 'Content creation · Professional', tags: ['content', 'performance'] },

  { id: 'kb-office', cat: 'keyboards', edu: 'keyboard', visual: 'keyboard', name: 'USB Office Keyboard', brand: 'Logitech', spec: 'Wired · full size · membrane keys', price: 4500, use: 'A simple, reliable keyboard for typing documents, schoolwork and everyday tasks.', useCase: 'Office · Student · Budget', tags: ['office', 'student', 'budget'] },
  { id: 'kb-mech', cat: 'keyboards', edu: 'keyboard', visual: 'keyboard', name: 'Mechanical Keyboard', brand: 'Keychron', spec: 'TKL · hot-swappable · mechanical switches', price: 18500, use: 'A tactile mechanical keyboard with durable switches — pleasant for long typing and gaming sessions.', useCase: 'Gaming · Content creation · Enthusiast', tags: ['gaming', 'content', 'student'] },
  { id: 'kb-wireless', cat: 'keyboards', edu: 'keyboard', visual: 'keyboard', name: 'Wireless Keyboard', brand: 'Logitech', spec: '2.4GHz + Bluetooth · slim profile', price: 12500, use: 'A clean wireless keyboard for minimal desks and laptops used in tablet-style setups.', useCase: 'Office · Student', tags: ['office', 'student'] },

  { id: 'ms-office', cat: 'mice', edu: 'mouse', visual: 'mouse', name: 'Office Mouse', brand: 'Logitech', spec: 'Wired · 1000 DPI · silent clicks', price: 3500, use: 'An affordable, quiet mouse for everyday work and study.', useCase: 'Office · Student · Budget', tags: ['office', 'student', 'budget'] },
  { id: 'ms-gaming', cat: 'mice', edu: 'mouse', visual: 'mouse', name: 'Gaming Mouse', brand: 'Logitech', spec: 'Wired · lightweight · 12000 DPI sensor', price: 12500, use: 'A precise, responsive mouse with a quality sensor for competitive and casual gaming.', useCase: 'Gaming · Student', tags: ['gaming', 'student'] },
  { id: 'ms-ergo', cat: 'mice', edu: 'mouse', visual: 'mouse', name: 'Ergonomic Mouse', brand: 'Logitech', spec: 'Vertical grip · wireless · multi-device', price: 15500, use: 'A vertical mouse that keeps the wrist in a natural position during long work hours.', useCase: 'Office · Content creation', tags: ['office', 'content'] },

  { id: 'hs-stereo', cat: 'headsets', edu: 'headset', visual: 'headset', name: 'Stereo Headset', brand: 'JBL', spec: 'Wired · 3.5mm · stereo with mic', price: 8500, use: 'An affordable headset for online classes, calls and casual media listening.', useCase: 'Student · Office · Casual', tags: ['student', 'budget', 'office'] },
  { id: 'hs-gaming', cat: 'headsets', edu: 'headset', visual: 'headset', name: 'Gaming Headset', brand: 'HyperX', spec: 'Wired · surround sound · noise-cancelling mic', price: 22000, use: 'A comfortable gaming headset with a clear microphone for team communication.', useCase: 'Gaming · Streaming', tags: ['gaming', 'content'] },
  { id: 'hs-wireless', cat: 'headsets', edu: 'headset', visual: 'headset', name: 'Wireless Headset', brand: 'Logitech', spec: '2.4GHz · 20h battery · Bluetooth', price: 28500, use: 'A wireless headset for moving between calls, music and games without cables.', useCase: 'Office · Content creation · Gaming', tags: ['office', 'content', 'gaming'] },

  { id: 'lap-student', cat: 'laptops', edu: 'laptop', visual: 'laptop', name: 'Student Laptop', brand: 'Lenovo', spec: 'Ryzen 5 · 8GB · 512GB SSD · 14 inch FHD', price: 148000, use: 'A light, affordable laptop for notes, research, documents and online classes.', useCase: 'Student · Everyday use', tags: ['student', 'office', 'budget'] },
  { id: 'lap-office', cat: 'laptops', edu: 'laptop', visual: 'laptop', name: 'Office Laptop', brand: 'HP', spec: 'Core i5 · 16GB · 512GB SSD · 15.6 inch FHD', price: 225000, use: 'A productive business laptop that handles spreadsheets, video calls and heavy multitasking.', useCase: 'Office · Business', tags: ['office', 'content', 'student'] },
  { id: 'lap-gaming', cat: 'laptops', edu: 'laptop', visual: 'laptop', name: 'Gaming Laptop', brand: 'ASUS', spec: 'Core i7 · RTX 4060 · 16GB · 144Hz display', price: 485000, use: 'A portable gaming machine with a dedicated GPU and high-refresh screen.', useCase: 'Gaming · High performance', tags: ['gaming', 'performance'] },
  { id: 'lap-creator', cat: 'laptops', edu: 'laptop', visual: 'laptop', name: 'Creator Laptop', brand: 'ASUS', spec: 'Core i7 · RTX 4070 · 32GB · 2.8K OLED', price: 720000, use: 'A powerful laptop with an accurate OLED display for editing, design and rendering on the move.', useCase: 'Content creation · Professional', tags: ['content', 'performance'] },

  { id: 'prt-inkjet', cat: 'printers', edu: 'printer', visual: 'printer', name: 'Colour Inkjet Printer', brand: 'Epson', spec: 'Print / scan / copy · Wi-Fi · colour', price: 32000, use: 'A compact all-in-one for school assignments, photos and everyday home printing.', useCase: 'Home · Student', tags: ['student', 'office', 'budget'] },
  { id: 'prt-laser', cat: 'printers', edu: 'printer', visual: 'printer', name: 'Mono Laser Printer', brand: 'Canon', spec: 'Mono laser · print / scan · USB', price: 56000, use: 'A fast, economical text printer for offices with regular document printing.', useCase: 'Office · Business', tags: ['office'] },
  { id: 'prt-mfp', cat: 'printers', edu: 'printer', visual: 'printer', name: 'Multifunction Inkjet', brand: 'Epson', spec: 'Print / scan / copy / fax · ADF', price: 68000, use: 'A full-featured office printer with an automatic document feeder for scanning stacks of pages.', useCase: 'Office · Small business', tags: ['office', 'content'] },

  { id: 'net-ac1200', cat: 'networking', edu: 'network', visual: 'network', name: 'Dual-Band Wi-Fi Router', brand: 'TP-Link', spec: 'AC1200 · dual band · 4 LAN ports', price: 12500, use: 'A standard home router that covers everyday browsing, streaming and video calls.', useCase: 'Home · Student · Office', tags: ['budget', 'office', 'student'] },
  { id: 'net-ax1800', cat: 'networking', edu: 'network', visual: 'network', name: 'Wi-Fi 6 Router', brand: 'TP-Link', spec: 'AX1800 · Wi-Fi 6 · gigabit ports', price: 26500, use: 'A modern router that handles many connected devices with lower latency and better efficiency.', useCase: 'Gaming · Busy home · Office', tags: ['gaming', 'performance', 'office'] },
  { id: 'net-switch8', cat: 'networking', edu: 'network', visual: 'network', name: '8-Port Gigabit Switch', brand: 'TP-Link', spec: '8x gigabit Ethernet · plug and play', price: 9500, use: 'Adds fast wired ports so PCs, consoles and printers can use stable LAN connections.', useCase: 'Office · Home network', tags: ['office', 'budget'] }
];

const BUILDS = [
  {
    id: 'office', name: 'BUDGET OFFICE PC', badge: 'OFFICE / STUDENT',
    use: 'Documents, browsing, online classes, video streaming and light multitasking. The processor built-in graphics remove the need for a dedicated graphics card.',
    parts: { cpu: 'cpu-r5-5600g', motherboard: 'mb-a520m', ram: 'ram-16-d4', gpu: null, storage: 'ssd-500-nvme', psu: 'psu-450', case: 'case-nova', cooler: 'cooler-stock', fans: null }
  },
  {
    id: 'student', name: 'STUDENT PC', badge: 'STUDY + LIGHT GAMING',
    use: 'Assignments, research, coding practice, media and occasional esports titles — a balanced machine that stays useful for years.',
    parts: { cpu: 'cpu-i3-12100f', motherboard: 'mb-b660m', ram: 'ram-16-d4', gpu: 'gpu-gtx1650', storage: 'ssd-500-nvme', psu: 'psu-450', case: 'case-nova', cooler: 'cooler-stock', fans: 'fan-120' }
  },
  {
    id: 'entry', name: 'ENTRY GAMING PC', badge: '1080P GAMING',
    use: 'A first gaming PC for popular competitive titles and everyday use at 1080p, with room to upgrade later.',
    parts: { cpu: 'cpu-r5-5600', motherboard: 'mb-b550m', ram: 'ram-16-d4', gpu: 'gpu-rtx3060', storage: 'ssd-1tb-nvme', psu: 'psu-550', case: 'case-nova', cooler: 'cooler-stock', fans: 'fan-3x120' }
  },
  {
    id: 'mid', name: 'MID-RANGE GAMING PC', badge: '1080P / 1440P GAMING',
    use: 'Smooth gaming at high settings, streaming and day-to-day work — the popular sweet spot for most gamers.',
    parts: { cpu: 'cpu-i5-12400f', motherboard: 'mb-b660m', ram: 'ram-16-d4', gpu: 'gpu-rtx4060', storage: 'ssd-1tb-nvme', psu: 'psu-650', case: 'case-vector', cooler: 'cooler-tower', fans: 'fan-3x120' }
  },
  {
    id: 'high', name: 'HIGH-PERFORMANCE GAMING PC', badge: 'HIGH-END GAMING',
    use: 'High-refresh 1440p and 4K gaming with heavy settings enabled, plus strong performance in modern multi-threaded games.',
    parts: { cpu: 'cpu-r7-7700x', motherboard: 'mb-b650-atx', ram: 'ram-32-d5', gpu: 'gpu-rtx4080s', storage: 'ssd-1tb-nvme', psu: 'psu-750', case: 'case-aether', cooler: 'cooler-dual', fans: 'fan-3x140' }
  },
  {
    id: 'creator', name: 'CONTENT CREATION PC', badge: 'EDITING / RENDERING',
    use: 'Video editing, streaming, 3D work and heavy multitasking — many cores, lots of fast memory and large project storage.',
    parts: { cpu: 'cpu-i7-14700f', motherboard: 'mb-z790', ram: 'ram-32-d5', gpu: 'gpu-rtx4070', storage: 'ssd-2tb-nvme', psu: 'psu-750', case: 'case-aether', cooler: 'cooler-aio240', fans: 'fan-3x140' }
  }
];

const PRESETS = {
  office: { cpu: 'cpu-r5-5600g', motherboard: 'mb-a520m', ram: 'ram-16-d4', gpu: '', storage: 'ssd-500-nvme', psu: 'psu-450', case: 'case-nova', cooler: 'cooler-stock', fans: '' },
  budget: { cpu: 'cpu-r5-5600', motherboard: 'mb-b550m', ram: 'ram-16-d4', gpu: 'gpu-gtx1650', storage: 'ssd-500-nvme', psu: 'psu-550', case: 'case-nova', cooler: 'cooler-stock', fans: 'fan-3x120' },
  mid: { cpu: 'cpu-i5-12400f', motherboard: 'mb-b660m', ram: 'ram-16-d4', gpu: 'gpu-rtx4060', storage: 'ssd-1tb-nvme', psu: 'psu-650', case: 'case-vector', cooler: 'cooler-tower', fans: 'fan-3x120' },
  high: { cpu: 'cpu-r7-7700x', motherboard: 'mb-b650-atx', ram: 'ram-32-d5', gpu: 'gpu-rtx4080s', storage: 'ssd-1tb-nvme', psu: 'psu-750', case: 'case-aether', cooler: 'cooler-dual', fans: 'fan-3x140' },
  creator: { cpu: 'cpu-i7-14700f', motherboard: 'mb-z790', ram: 'ram-32-d5', gpu: 'gpu-rtx4070', storage: 'ssd-2tb-nvme', psu: 'psu-750', case: 'case-aether', cooler: 'cooler-aio240', fans: 'fan-3x140' }
};

const SLOTS = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'psu', 'case', 'cooler', 'fans'];

const AudioFX = (() => {
  let ctx = null;
  let master = null;
  let muted = false;
  try { muted = localStorage.getItem('st_sound') === 'off'; } catch (e) {}

  function ensure() {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.8;
      master.connect(ctx.destination);
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  function unlock() {
    const c = ensure();
    if (c && c.state === 'suspended') c.resume();
  }

  function isMuted() { return muted; }

  function setMuted(v) {
    muted = !!v;
    try { localStorage.setItem('st_sound', muted ? 'off' : 'on'); } catch (e) {}
    if (master) master.gain.value = muted ? 0 : 0.8;
  }

  function tone(f, dur, o) {
    o = o || {};
    const c = ensure();
    if (!c || muted) return;
    const t0 = c.currentTime + (o.delay || 0);
    const osc = c.createOscillator();
    const g = c.createGain();
    const atk = o.atk || 0.012;
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(f, t0);
    if (o.f2) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.f2), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(o.g || 0.15, t0 + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.06);
  }

  function noise(dur, o) {
    o = o || {};
    const c = ensure();
    if (!c || muted) return;
    const t0 = c.currentTime + (o.delay || 0);
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const flt = c.createBiquadFilter();
    flt.type = o.filter || 'lowpass';
    flt.frequency.setValueAtTime(o.freq || 800, t0);
    if (o.freq2) flt.frequency.exponentialRampToValueAtTime(Math.max(40, o.freq2), t0 + dur);
    flt.Q.value = o.q || 1;
    const g = c.createGain();
    const atk = o.atk || 0.02;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(o.g || 0.12, t0 + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(flt);
    flt.connect(g);
    g.connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  return {
    unlock,
    isMuted,
    setMuted,
    click() { tone(680, 0.07, { f2: 440, type: 'triangle', g: 0.1 }); },
    tick() { tone(1700, 0.03, { type: 'square', g: 0.045 }); },
    whoosh() { noise(0.55, { freq: 320, freq2: 2600, g: 0.1, atk: 0.12 }); },
    soft() { tone(340, 0.18, { f2: 520, g: 0.06 }); },
    thunk() { tone(110, 0.16, { f2: 52, type: 'sine', g: 0.2 }); noise(0.1, { freq: 1400, freq2: 240, g: 0.07 }); },
    fan() { noise(1.3, { filter: 'bandpass', freq: 700, freq2: 1150, q: 1.6, g: 0.075, atk: 0.3 }); },
    power() { tone(130, 0.7, { f2: 880, type: 'sawtooth', g: 0.08, atk: 0.06 }); noise(0.6, { freq: 260, freq2: 1900, g: 0.07, atk: 0.1 }); },
    beep() { tone(880, 0.13, { type: 'square', g: 0.06 }); tone(1320, 0.18, { type: 'square', g: 0.05, delay: 0.13 }); },
    chord() { tone(523.25, 1.7, { g: 0.07, atk: 0.3 }); tone(659.25, 1.7, { g: 0.06, atk: 0.35 }); tone(783.99, 1.7, { g: 0.055, atk: 0.4 }); },
    swell() { noise(1.4, { freq: 240, freq2: 4200, g: 0.1, atk: 0.5 }); tone(196, 1.4, { f2: 392, g: 0.05, atk: 0.5 }); }
  };
})();

const Intro = (() => {
  const el = {
    intro: document.getElementById('intro'),
    enter: document.getElementById('introEnter'),
    enterBtn: document.getElementById('enterBtn'),
    enterSkip: document.getElementById('enterSkipBtn'),
    stage: document.getElementById('introStage'),
    scene: document.getElementById('scene'),
    tower: document.getElementById('tower'),
    monitor: document.getElementById('monitor'),
    screen: document.getElementById('monitorScreen'),
    name: document.getElementById('monitorName'),
    sub: document.getElementById('monitorSub'),
    caption: document.getElementById('introCaption'),
    soundBtn: document.getElementById('soundBtn'),
    skipBtn: document.getElementById('skipIntroBtn'),
    flash: document.getElementById('sceneFlash'),
    cable: document.getElementById('cableLink'),
    cablePath: document.getElementById('cablePath'),
    soundToggle: document.getElementById('soundToggle')
  };

  const STAGES = ['arrive', 'build', 'fan', 'power', 'cable', 'screen', 'brand', 'zoom'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];
  let running = false;

  const LAYOUT = {
    desktop: {
      tower: [315, 350],
      parts: {
        case: [24, 20], motherboard: [24, 190], cpu: [24, 340], cooler: [24, 470],
        gpu: [40, 595], ram: [250, 610], fan: [440, 585], ssd: [560, 610],
        psu: [730, 585], cable: [870, 600]
      }
    },
    mobile: {
      tower: [205, 760],
      parts: {
        case: [16, 40], motherboard: [16, 200], cpu: [16, 340], ram: [16, 440],
        fan: [16, 960], ssd: [600, 60], psu: [605, 175], cable: [590, 300],
        gpu: [560, 400], cooler: [600, 560]
      }
    }
  };

  function isMobile() { return el.scene.offsetWidth <= 800; }

  function measure(fn) {
    const wasOn = el.stage.classList.contains('is-on');
    if (!wasOn) el.stage.style.display = 'block';
    try { fn(); } finally {
      if (!wasOn) el.stage.style.display = '';
    }
  }

  function fit() {
    measure(() => {
      const W = el.scene.offsetWidth || 1040;
      const H = el.scene.offsetHeight || 700;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min((vw - 16) / W, (vh - 110) / H, 1.15);
      el.scene.style.setProperty('--fit', String(Math.max(0.2, s)));
    });
  }

  function layout() {
    measure(() => {
      const conf = isMobile() ? LAYOUT.mobile : LAYOUT.desktop;
    const W = el.scene.offsetWidth;
    const H = el.scene.offsetHeight;
    const parts = el.stage.querySelectorAll('.part');
    parts.forEach((p, i) => {
      const key = p.dataset.part;
      const pos = conf.parts[key];
      if (!pos) return;
      p.style.setProperty('--px', pos[0] + 'px');
      p.style.setProperty('--py', pos[1] + 'px');
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      const cx = pos[0] + w / 2;
      const cy = pos[1] + h / 2;
      p.style.setProperty('--dx', (conf.tower[0] - cx) + 'px');
      p.style.setProperty('--dy', (conf.tower[1] - cy) + 'px');
      const leftward = cx < W / 2;
      const upward = cy < H / 2;
      const sx = leftward ? -(pos[0] + 220) : (W - pos[0] + 220);
      const sy = upward ? -(pos[1] + 200) : (H - pos[1] + 200);
      p.style.setProperty('--sx', sx + 'px');
      p.style.setProperty('--sy', sy + 'px');
      p.style.setProperty('--r', ((i % 2 ? -1 : 1) * (2 + (i % 5) * 1.6)) + 'deg');
      p.style.setProperty('--d', (i * 0.09) + 's');
    });
      drawCable();
    });
  }

  function drawCable() {
    const W = el.scene.offsetWidth;
    const H = el.scene.offsetHeight;
    const mobile = isMobile();
    const p1 = mobile ? [205, 560] : [430, 500];
    const p2 = mobile ? [380, 415] : [612, 492];
    const c1 = mobile ? [252, 508] : [502, 566];
    const c2 = mobile ? [324, 470] : [556, 550];
    const ux = 260 / W;
    const uy = 240 / H;
    const d = 'M' + (p1[0] * ux).toFixed(1) + ' ' + (p1[1] * uy).toFixed(1) +
      ' C' + (c1[0] * ux).toFixed(1) + ' ' + (c1[1] * uy).toFixed(1) +
      ', ' + (c2[0] * ux).toFixed(1) + ' ' + (c2[1] * uy).toFixed(1) +
      ', ' + (p2[0] * ux).toFixed(1) + ' ' + (p2[1] * uy).toFixed(1);
    const paths = el.cable.querySelectorAll('.cable-link__path, .cable-link__core');
    paths.forEach(pt => pt.setAttribute('d', d));
    try {
      const len = Math.ceil(el.cablePath.getTotalLength()) || 600;
      el.cable.style.setProperty('--len', len);
    } catch (e) {
      el.cable.style.setProperty('--len', 600);
    }
    const plugA = el.cable.querySelector('.cable-link__plug--a');
    const plugB = el.cable.querySelector('.cable-link__plug--b');
    if (plugA) { plugA.style.left = p1[0] + 'px'; plugA.style.top = p1[1] + 'px'; }
    if (plugB) { plugB.style.left = p2[0] + 'px'; plugB.style.top = p2[1] + 'px'; }
  }

  function caption(text) {
    if (!text) {
      el.caption.classList.remove('is-on');
      return;
    }
    el.caption.classList.remove('is-on');
    window.setTimeout(() => {
      el.caption.textContent = text;
      el.caption.classList.add('is-on');
    }, 180);
  }

  function stage(name) {
    el.stage.classList.add('stage-' + name);
  }

  function at(ms, fn) {
    timers.push(window.setTimeout(fn, ms));
  }

  function clearTimers() {
    timers.forEach(id => window.clearTimeout(id));
    timers = [];
  }

  function zoom(on) {
    const W = el.scene.offsetWidth;
    const H = el.scene.offsetHeight;
    if (!on) {
      el.scene.style.transform = '';
      return;
    }
    const mobile = isMobile();
    const M = mobile ? [178 + 202, 60 + 140] : [598 + 202, 150 + 140];
    const C = [W / 2, H / 2];
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const S = Math.max(vw / 384, vh / 240);
    el.scene.style.transform = 'scale(' + S.toFixed(3) + ') translate(' +
      (C[0] - M[0]) + 'px, ' + (C[1] - M[1]) + 'px)';
  }

  function letters() {
    'SAHANA'.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ml';
      s.style.setProperty('--i', String(i));
      s.textContent = ch;
      el.name.appendChild(s);
    });
    el.sub.textContent = 'TECHNOLOGIES';
  }

  function buildTimeline() {
    at(0, () => {
      stage('arrive');
      AudioFX.whoosh();
      caption('WELCOME TO SAHANA TECHNOLOGIES');
    });
    at(2100, () => {
      stage('build');
      caption('ASSEMBLING YOUR PC, PART BY PART');
      AudioFX.whoosh();
    });
    [2500, 3000, 3500, 3900].forEach(t => at(t, () => AudioFX.thunk()));
    at(4000, () => {
      stage('fan');
      caption('COOLING KEEPS EVERYTHING STABLE');
      AudioFX.fan();
    });
    at(5600, () => {
      stage('power');
      caption('POWER ON — THE SYSTEM COMES TO LIFE');
      AudioFX.power();
    });
    at(7000, () => {
      stage('cable');
      caption('EVERY CABLE HAS A PURPOSE');
      AudioFX.tick();
      AudioFX.tick();
      AudioFX.tick();
    });
    at(8350, () => {
      stage('screen');
      caption('BOOTING UP');
      AudioFX.beep();
    });
    at(9400, () => {
      stage('brand');
      caption('COMPUTER HARDWARE & IT SOLUTIONS');
      AudioFX.chord();
    });
    at(12000, () => {
      stage('zoom');
      zoom(true);
      AudioFX.swell();
    });
    at(13600, () => el.flash.classList.add('is-on'));
    at(14300, finish);
  }

  function start() {
    if (running) return;
    running = true;
    el.enter.classList.add('is-hidden');
    el.stage.classList.add('is-on');
    document.body.classList.add('intro-active');
    fit();
    layout();
    if (reduced) {
      STAGES.filter(s => s !== 'zoom').forEach(stage);
      caption('SAHANA TECHNOLOGIES');
      AudioFX.chord();
      at(2200, finish);
      return;
    }
    buildTimeline();
  }

  function finish() {
    if (el.intro.hidden) return;
    clearTimers();
    running = false;
    try { localStorage.setItem('st_intro_played', '1'); } catch (e) {}
    window.setTimeout(() => {
      el.intro.classList.add('is-leaving');
      window.setTimeout(() => {
        el.intro.hidden = true;
        el.intro.classList.remove('is-leaving');
        el.flash.classList.remove('is-on');
        document.body.classList.remove('intro-active');
        STAGES.forEach(s => el.stage.classList.remove('stage-' + s));
        zoom(false);
        el.caption.classList.remove('is-on');
        el.stage.classList.remove('is-on');
      }, 600);
    }, 260);
  }

  function skip() {
    AudioFX.click();
    if (!running) { finish(); return; }
    clearTimers();
    finish();
  }

  function replay() {
    clearTimers();
    running = false;
    el.intro.hidden = false;
    el.stage.classList.add('is-on');
    STAGES.forEach(s => el.stage.classList.remove('stage-' + s));
    el.scene.style.transform = '';
    el.name.innerHTML = '';
    letters();
    document.body.classList.add('intro-active');
    fit();
    layout();
    if (reduced) {
      STAGES.filter(s => s !== 'zoom').forEach(stage);
      at(2000, finish);
      running = true;
      return;
    }
    running = true;
    buildTimeline();
  }

  function syncSound() {
    const on = !AudioFX.isMuted();
    el.soundBtn.textContent = on ? '🔊 Sound On' : '🔈 Sound Off';
    el.soundBtn.setAttribute('aria-pressed', String(on));
    if (el.soundToggle) {
      el.soundToggle.textContent = on ? '🔊' : '🔇';
      el.soundToggle.setAttribute('aria-pressed', String(on));
      el.soundToggle.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
    }
  }

  function toggleSound() {
    AudioFX.unlock();
    AudioFX.setMuted(!AudioFX.isMuted());
    if (!AudioFX.isMuted()) AudioFX.click();
    syncSound();
  }

  function init() {
    let played = false;
    try { played = localStorage.getItem('st_intro_played') === '1'; } catch (e) {}
    letters();
    fit();
    layout();
    syncSound();
    el.enterSkip.hidden = false;
    if (reduced) el.skipBtn.textContent = 'Skip Intro ›';
    el.enterBtn.addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.click();
      start();
    });
    el.enterSkip.addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.click();
      finish();
    });
    el.skipBtn.addEventListener('click', skip);
    el.soundBtn.addEventListener('click', toggleSound);
    if (el.soundToggle) el.soundToggle.addEventListener('click', toggleSound);
    window.addEventListener('resize', () => {
      if (el.intro.hidden) return;
      fit();
      layout();
      if (el.stage.classList.contains('stage-zoom')) zoom(true);
    });
    if (played) {
      el.intro.hidden = true;
      document.body.classList.remove('intro-active');
      return { replay };
    }
    document.body.classList.add('intro-active');
    return { replay };
  }

  return { init, replay };
})();

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

const money = n => 'LKR ' + Number(n || 0).toLocaleString('en-LK');
const byId = id => COMPONENTS.find(c => c.id === id);
const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || id;

function onProductImgError(img) {
  const paths = (img.getAttribute('data-paths') || '').split('|').filter(Boolean);
  const cur = (img.getAttribute('src') || '').split('/').pop();
  const idx = paths.findIndex(p => p.split('/').pop() === cur);
  const next = idx >= 0 ? paths[idx + 1] : paths[0] && paths[0] !== cur ? paths[0] : null;
  if (next) {
    img.src = next;
  } else {
    img.remove();
  }
}

function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  t.classList.add('is-visible');
  window.clearTimeout(toast._id);
  toast._id = window.setTimeout(() => {
    t.classList.remove('is-visible');
    window.setTimeout(() => { t.hidden = true; }, 320);
  }, 2600);
}

function initNav() {
  const toggle = $('#navToggle');
  const menu = $('#navMenu');
  const header = $('#header');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    menu.addEventListener('click', e => {
      if (e.target.closest('.nav__link')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const links = $$('.nav__link');
  const sections = links
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
      const y = window.scrollY + 140;
      let current = sections[0];
      sections.forEach(s => { if (s.offsetTop <= y) current = s; });
      links.forEach(a => {
        a.classList.toggle('is-active',
          !!current && a.getAttribute('href') === '#' + current.id);
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(i => io.observe(i));
}

const Catalog = (() => {
  let q = '';
  let tag = 'all';
  let cat = 'all';

  function matches(c) {
    if (cat !== 'all' && c.cat !== cat) return false;
    if (tag !== 'all' && !c.tags.includes(tag)) return false;
    if (q) {
      const hay = (c.name + ' ' + c.brand + ' ' + c.spec + ' ' + c.use + ' ' +
        c.useCase + ' ' + catLabel(c.cat)).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function cardHTML(c) {
    const tagChips = c.tags.slice(0, 2)
      .map(t => '<span class="badge badge--tag">' + TAGS[t] + '</span>').join('');
    const paths = productImagePaths(c);
    const img = paths.length
      ? '<img class="comp-card__img" alt="" loading="lazy" data-paths="' +
        paths.map(p => p.replace(/"/g, '&quot;')).join('|') +
        '" src="' + paths[0].replace(/"/g, '&quot;') + '" onerror="onProductImgError(this)">'
      : '';
    return '<article class="card comp-card reveal" tabindex="0" role="button" data-id="' + c.id +
      '" aria-label="Learn more about ' + c.name + '">' +
      '<div class="comp-card__visual">' + (VISUALS[c.visual] || '') + img + '</div>' +
      '<div class="comp-card__body">' +
      '<span class="badge">' + catLabel(c.cat) + '</span>' + tagChips +
      '<h3>' + c.name + '</h3>' +
      '<p class="comp-card__brand">' + c.brand + '</p>' +
      '<p class="comp-card__spec">' + c.spec + '</p>' +
      '<p class="comp-card__price"><strong>' + money(c.price) + '</strong><span>approx. reference price</span></p>' +
      '<p class="comp-card__use">' + c.use + '</p>' +
      '<span class="comp-card__more">Learn more</span>' +
      '</div></article>';
  }

  function render() {
    const grid = $('#compGrid');
    const empty = $('#compEmpty');
    const count = $('#compCount');
    const list = COMPONENTS.filter(matches);
    grid.innerHTML = list.map(cardHTML).join('');
    empty.hidden = list.length > 0;
    count.textContent = 'Showing ' + list.length + ' of ' + COMPONENTS.length + ' components';
    $$('.reveal', grid).forEach(el => el.classList.add('is-visible'));
  }

  function buildChips() {
    const wrap = $('#catChips');
    const all = '<button class="chip is-active" type="button" data-cat="all">All Categories</button>';
    wrap.innerHTML = all + CATEGORIES.map(c =>
      '<button class="chip" type="button" data-cat="' + c.id + '">' + c.label + '</button>').join('');
    wrap.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', wrap).forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      cat = chip.dataset.cat;
      AudioFX.click();
      render();
    });
    const tagWrap = $('#tagChips');
    tagWrap.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', tagWrap).forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      tag = chip.dataset.tag;
      AudioFX.click();
      render();
    });
    const input = $('#compSearch');
    const clear = $('#compSearchClear');
    input.addEventListener('input', () => {
      q = input.value.trim().toLowerCase();
      clear.hidden = !q;
      render();
    });
    clear.addEventListener('click', () => {
      input.value = '';
      q = '';
      clear.hidden = true;
      input.focus();
      render();
    });
  }

  function init() {
    buildChips();
    render();
    const grid = $('#compGrid');
    grid.addEventListener('click', e => {
      const card = e.target.closest('.comp-card');
      if (card) Modal.open(card.dataset.id);
    });
    grid.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.comp-card');
      if (card) { e.preventDefault(); Modal.open(card.dataset.id); }
    });
  }

  return { init, render };
})();

const Modal = (() => {
  let lastFocus = null;
  let current = null;

  function eduHTML(key) {
    const e = EDU[key];
    if (!e) return '';
    const specs = e.specs && e.specs.length
      ? '<div class="edu-block"><h4>Key specifications explained</h4><ul>' +
        e.specs.map(s => '<li>' + s + '</li>').join('') + '</ul></div>'
      : '';
    const check = e.check && e.check.length
      ? '<div class="edu-block"><h4>What to check before buying</h4><ul>' +
        e.check.map(s => '<li>' + s + '</li>').join('') + '</ul></div>'
      : '';
    return '<div class="edu-block"><h4>What is it?</h4><p>' + e.what + '</p></div>' +
      '<div class="edu-block"><h4>What does it do?</h4><p>' + e.does + '</p></div>' +
      specs +
      (e.who ? '<div class="edu-block"><h4>Who needs it?</h4><p>' + e.who + '</p></div>' : '') +
      check;
  }

  function open(id) {
    const c = byId(id);
    if (!c) return;
    current = c;
    lastFocus = document.activeElement;
    $('#modalVisual').innerHTML = VISUALS[c.visual] || '';
    $('#modalCat').textContent = catLabel(c.cat);
    $('#modalTitle').textContent = c.name;
    $('#modalBrand').textContent = c.brand + ' · ' + c.spec;
    $('#modalPrice').innerHTML = '<strong>' + money(c.price) + '</strong><span>approx. reference price</span>';
    $('#modalMeta').innerHTML =
      '<div class="meta-box"><h4>Best for</h4><p>' + c.useCase + '</p></div>' +
      '<div class="meta-box"><h4>Category</h4><p>' + catLabel(c.cat) + '</p></div>' +
      '<div class="meta-box"><h4>Why it matters</h4><p>' + c.use + '</p></div>';
    $('#modalEdu').innerHTML = eduHTML(c.edu);
    const cfg = $('#modalConfigure');
    cfg.hidden = !c.slot;
    const modal = $('#eduModal');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    AudioFX.soft();
    $('.modal__close', modal).focus();
  }

  function close() {
    const modal = $('#eduModal');
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    current = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function init() {
    const modal = $('#eduModal');
    modal.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
    $('#modalConfigure').addEventListener('click', () => {
      if (!current || !current.slot) return;
      Builder.select(current.slot, current.id);
      close();
      const b = $('#builder');
      if (b) b.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast(current.name + ' added to your build.');
    });
  }

  return { open, close, init };
})();

const Builder = (() => {
  const state = {};
  const SLOT_LABELS = {
    cpu: 'Processor', motherboard: 'Motherboard', ram: 'Memory', gpu: 'Graphics Card',
    storage: 'Storage', psu: 'Power Supply', case: 'Case', cooler: 'CPU Cooler', fans: 'Case Fans'
  };

  function slotEls() {
    return $$('#builderSlots select[data-slot]');
  }

  function fillSelects() {
    slotEls().forEach(sel => {
      const slot = sel.dataset.slot;
      const opts = COMPONENTS.filter(c => c.slot === slot);
      sel.innerHTML = '<option value="">— Select ' + SLOT_LABELS[slot] + ' —</option>' +
        opts.map(c => '<option value="' + c.id + '">' + c.name + ' · ' + money(c.price) + '</option>').join('');
      sel.value = state[slot] || '';
    });
  }

  function setPriceBadges() {
    $$('#builderSlots [data-price]').forEach(span => {
      const c = state[span.dataset.price];
      span.textContent = c ? money(c.price) : '';
      const slot = span.closest('.b-slot');
      if (slot) slot.classList.toggle('is-filled', !!c);
    });
  }

  function check(s) {
    const warn = [];
    const bad = [];
    const cpu = s.cpu, mb = s.motherboard, ram = s.ram, gpu = s.gpu;
    const psu = s.psu, box = s.case, cooler = s.cooler;

    if (cpu && mb) {
      if (cpu.socket !== mb.socket) {
        bad.push('CPU socket ' + cpu.socket + ' does not match the motherboard socket ' + mb.socket + '.');
      }
      if (cpu.socket === 'LGA1700' && cpu.tdp >= 200 && mb.name.indexOf('Z790') === -1) {
        warn.push('A Z790 board is recommended to unlock this CPU full potential.');
      }
    }
    if (cpu && ram && mb) {
      if (ram.type !== mb.memory) {
        bad.push(ram.type + ' memory does not fit this ' + mb.memory + ' motherboard.');
      }
    }
    if (cpu && !cpu.igpu && !gpu) {
      warn.push('This processor has no built-in graphics — a graphics card is required for display output.');
    }
    if (gpu && psu) {
      const need = Math.ceil(((cpu ? cpu.tdp : 65) + gpu.tdp + 120) / 50) * 50;
      if (psu.watt < need) {
        bad.push('Power supply is too small — around ' + need + 'W recommended for this CPU and GPU combination.');
      } else if (psu.watt < need + 50) {
        warn.push('Power supply works, but ' + need + 'W or more leaves safer upgrade headroom.');
      }
      if (psu.watt < 500 && gpu.tdp >= 150) {
        warn.push('A higher-wattage 80+ rated PSU is advised for this graphics card.');
      }
    }
    if (gpu && box && gpu.length > box.maxGpu) {
      bad.push('Graphics card (' + gpu.length + 'mm) does not fit — case clearance is ' + box.maxGpu + 'mm.');
    }
    if (mb && box && box.forms.indexOf(mb.form) === -1) {
      bad.push(mb.form + ' motherboard does not fit this case (' + box.forms.join('/') + ' supported).');
    }
    if (cpu && cooler) {
      if (cooler.sockets && cooler.sockets.indexOf(cpu.socket) === -1) {
        bad.push('This cooler does not support the ' + cpu.socket + ' socket.');
      }
      if (box && !cooler.aio && cooler.height > box.maxCooler) {
        bad.push('Cooler is ' + cooler.height + 'mm tall but the case allows ' + box.maxCooler + 'mm.');
      }
      if (cooler.coolTdp < cpu.tdp) {
        warn.push('This cooler may run warm under load — consider a stronger cooler for ' + cpu.name + '.');
      }
      if (cpu.tdp <= 65 && cooler.id === 'cooler-stock') {
        warn.push('The stock cooler is adequate for light use; a tower cooler keeps things quieter.');
      }
    }
    if (cpu && box && !cooler && cpu.tdp > 100) {
      warn.push('A CPU cooler is required — this processor does not include an adequate one.');
    }
    if (!s.storage) {
      warn.push('No storage selected — the PC needs at least one drive for the operating system.');
    }
    return { warn, bad };
  }

  function update() {
    setPriceBadges();
    const s = {};
    SLOTS.forEach(k => { s[k] = state[k] ? byId(state[k]) : null; });

    const rows = SLOTS.filter(k => s[k]).map(k =>
      '<div class="summary__row"><span>' + SLOT_LABELS[k] + '</span>' +
      '<strong>' + s[k].name + '</strong>' +
      '<em class="row-price">' + money(s[k].price) + '</em></div>');
    if (!rows.length) {
      rows.push('<div class="summary__row"><span>Build</span><strong class="is-empty">No parts selected yet — choose parts or pick a preset above.</strong></div>');
    }
    $('#buildList').innerHTML = rows.join('');

    const tdp = (s.cpu ? s.cpu.tdp : 0) + (s.gpu ? s.gpu.tdp : 0) + 120;
    const psuW = s.psu ? s.psu.watt : 0;
    $('#buildPower').textContent = psuW
      ? 'Estimated draw ≈ ' + tdp + 'W of ' + psuW + 'W available'
      : 'Estimated draw ≈ ' + tdp + 'W (select a PSU)';

    const res = check(s);
    const msgs = res.bad.map(m => ({ level: 'bad', label: 'Incompatible', text: m }))
      .concat(res.warn.map(m => ({ level: 'warn', label: 'Note', text: m })));
    $('#buildWarnings').innerHTML = msgs.map(m =>
      '<p class="warn-item warn-item--' + m.level + '"><b>' + m.label + '</b><span>' + m.text + '</span></p>').join('');

    const total = SLOTS.reduce((sum, k) => sum + (s[k] ? s[k].price : 0), 0);
    $('#buildTotal').textContent = money(total);
  }

  function select(slot, id) {
    state[slot] = id || '';
    const sel = $('select[data-slot="' + slot + '"]');
    if (sel) sel.value = state[slot];
    update();
  }

  function applyPreset(name) {
    if (name === 'reset') {
      SLOTS.forEach(k => { state[k] = ''; });
      fillSelects();
      update();
      toast('Builder reset — start a fresh configuration.');
      return;
    }
    const p = PRESETS[name];
    if (!p) return;
    SLOTS.forEach(k => { state[k] = p[k] || ''; });
    fillSelects();
    update();
    const build = BUILDS.find(b => b.id === name);
    toast((build ? build.name : 'Preset') + ' loaded into the builder.');
  }

  function init() {
    fillSelects();
    slotEls().forEach(sel => {
      sel.addEventListener('change', () => {
        state[sel.dataset.slot] = sel.value;
        AudioFX.click();
        update();
      });
    });
    $$('.chip--preset').forEach(btn => {
      btn.addEventListener('click', () => {
        AudioFX.click();
        applyPreset(btn.dataset.preset);
      });
    });
    update();
    return { select, applyPreset };
  }

  return { init, select, applyPreset };
})();

const Builds = (() => {
  function cardHTML(b) {
    const parts = SLOTS.filter(k => b.parts[k]).map(k => {
      const c = byId(b.parts[k]);
      return c ? '<div class="build-card__part"><span>' + SLOT_LABELS_LOCAL[k] + '</span><strong>' + c.name + '</strong></div>' : '';
    }).join('');
    const total = SLOTS.reduce((sum, k) => {
      const c = b.parts[k] ? byId(b.parts[k]) : null;
      return sum + (c ? c.price : 0);
    }, 0);
    return '<article class="build-card reveal" data-build="' + b.id + '">' +
      '<div class="build-card__top"><h3>' + b.name + '</h3><span class="badge">' + b.badge + '</span></div>' +
      '<p class="build-card__use">' + b.use + '</p>' +
      '<div class="build-card__parts">' + parts + '</div>' +
      '<div class="build-card__total"><span>Approx. total</span><strong>' + money(total) + '</strong></div>' +
      '</article>';
  }

  const SLOT_LABELS_LOCAL = {
    cpu: 'Processor', motherboard: 'Motherboard', ram: 'Memory', gpu: 'Graphics',
    storage: 'Storage', psu: 'PSU', case: 'Case', cooler: 'Cooling', fans: 'Fans'
  };

  function init() {
    const grid = $('#buildsGrid');
    if (grid) {
      grid.innerHTML = BUILDS.map(cardHTML).join('');
      $$('.reveal', grid).forEach(el => el.classList.add('is-visible'));
      grid.addEventListener('click', e => {
        const card = e.target.closest('.build-card');
        if (!card) return;
        AudioFX.click();
        Builder.applyPreset(card.dataset.build);
        const b = $('#builder');
        if (b) b.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  return { init };
})();

function initMisc() {
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const replay = $('#replayIntro');
  if (replay) replay.addEventListener('click', () => {
    AudioFX.unlock();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => Intro.replay(), 420);
  });
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const introApi = Intro.init();
  initNav();
  initReveal();
  Catalog.init();
  Modal.init();
  const builderApi = Builder.init();
  Builds.init();
  initMisc();
  window.Sahana = { Builder: builderApi, Intro: introApi, Catalog, Modal };
  window.productSlug = productSlug;
  window.onProductImgError = onProductImgError;
});
