
const words = [
    // '(bc)',
    // '(c)',
    // '(de)',
    // '(hl)',
    // '(ix+DIS)',
    // '(iy+DIS)',
    // '(sp)',
    'a',
    'adc',
    'add',
    'af',
    "af'",
    'and',
    'b',
    'bc',
    'bit',
    'c',
    'call',
    'ccf',
    'cp',
    'cpd',
    'cpdr',
    'cpi',
    'cpir',
    'cpl',
    'd',
    'daa',
    'de',
    'dec',
    'di',
    'djnz',
    'e',
    'ei',
    'ex',
    'exx',
    'h',
    'halt',
    'hl',
    'i',
    'im',
    'in',
    'inc',
    'ind',
    'indr',
    'ini',
    'inir',
    'ix',
    'iy',
    'jp',
    'jr',
    'l',
    'ld',
    'ldd',
    'lddr',
    'ldi',
    'ldir',
    'm',
    'nc',
    'neg',
    'nop',
    'nz',
    'or',
    'otdr',
    'otir',
    'out',
    'outd',
    'outi',
    'p',
    'pe',
    'po',
    'pop',
    'push',
    'r',
    'res',
    'ret',
    'reti',
    'retn',
    'rl',
    'rla',
    'rlc',
    'rlca',
    'rld',
    'rr',
    'rra',
    'rrc',
    'rrca',
    'rrd',
    'rst',
    'sbc',
    'scf',
    'set',
    'sla',
    'sll',
    'sp',
    'sra',
    'srl',
    'sub',
    'xor',
    'z',
];



const code0 = '0'.charCodeAt(0);
const code9 = '9'.charCodeAt(0);
const codeA = 'A'.charCodeAt(0);
const codeZ = 'Z'.charCodeAt(0);
const codea = 'a'.charCodeAt(0);
const codez = 'z'.charCodeAt(0);
const code_ = '_'.charCodeAt(0);

const unused = 0xff; // hi byte cannot be 0xff
const tableSize = 2 ** 7; // must be a power of 2
const lsb = (n) => Math.floor(n) % 0x7f;
const msb = (n) => lsb(Math.floor(n >> 9));
const buckets = Array(tableSize * 2).fill(unused);

const table = Array(tableSize).fill(null);

let maxMissed = 0;
let wordCount = 0;
let missed = 0;
let totalMissedBy = 0;
let collisions = 0;
let rejections = 0;
let avgMissSize = 0;

const hash = (s, factor) => {
    let h = 0;
    for (var c of s) {
        let code = c.charCodeAt(0);
        h = (h * factor) ^ code;
    }
    return Math.floor(h);
}

const defineEntry = (s, factor) => {
    const h = hash(s, factor);
    const hi = msb(h);
    const lo = lsb(h) * 2;
    // console.log('add', { lo, hi });
    let lo1 = lo;
    while (buckets[lo1] !== unused) {
        if (buckets[lo1] === lo && buckets[lo1 + 1] === hi) {
            // console.log('collision');
            collisions++
            return unused
        }
        lo1 = (lo1 + 2) % 0xff;
        if (lo === lo1) {
            // console.log('rejected');
            rejections++;
            return unused
        };
    };
    buckets[lo1] = lo;
    buckets[lo1 + 1] = hi;
    table[lo1 / 2] = [s, lo1, lo, hi];
    wordCount += 1;

    let missedby = (lo1 - lo) / 2;
    if (missedby < 0) missedby += tableSize * 2;
    if (missedby > 0) missed++;
    totalMissedBy += missedby;
    if (missedby > maxMissed) maxMissed = missedby;
    avgMissSize = Math.floor(totalMissedBy / wordCount)
    return lo1;
}

const lookupEntry = (s, factor) => {
    const h = hash(s, factor);
    const hi = msb(h);
    const lo = lsb(h) * 2;
    // console.log('lookup', { lo, hi });
    if (buckets[lo] === unused) return unused;
    let lo1 = lo;
    while (buckets[lo1] !== lo || buckets[lo1 + 1] !== hi) {
        lo1 = (lo1 + 2) % 0xff;
        if (lo === lo1) {
            console.log('lookup rejected');
            return unused
        };
    }
    return lo1;
}

const tableInit2 = (wordList, factor) => {
    for (const w of wordList) {
        const index = defineEntry(w, factor);
        if (index === unused) break;
        const index1 = lookupEntry(w, factor);
        if (index !== index1) {
            console.log('lookup failed', { index, index1, w });
            table.forEach((o, i) => console.log(i * 2, o));
            console.log('----------------------------------------');
            break;
        }
    }
    // if (wordCount > 60 || factor > 30) console.log({ factor, wordCount });
}

const run = (words, factor) => {
    maxMissed = 0;
    wordCount = 0;
    missed = 0;
    totalMissedBy = 0;
    collisions = 0;
    rejections = 0;
    table.fill(['', 0, 0, 0]);
    buckets.fill(unused);
    tableInit2(words, factor);
}

let bestFactor = 0;
let bestWordCount = 0;
let bestAvgMissSize = 1000;
let lowestCollisions = 1000;

console.log('------------------------------------------------------------');
const len = 256;
const wl = Array(len).fill(0);
for (let factor = 1; factor <= len; factor++) {
    for (let i = 0; i <= 10; i++) {
        run(words, factor);
        wl[factor] += wordCount;
        // bestFactor = factor;
        // lowestCollisions = collisions;
        // bestWordCount = wordCount;
        // bestAvgMissSize = avgMissSize;
    }
}
console.log('------------------------------------------------------------');
// wl.forEach((n, i) => { if (n / 10 > 120) console.log(i, n / 10, i.toString(2))})
console.log(65, wl[65] / 10, (65).toString(2));
console.log(72, wl[72] / 10, (72).toString(2));
console.log(149, wl[49] / 10, (149).toString(2));
console.log(193, wl[193] / 10, (193).toString(2));
console.log(224, wl[224] / 10, (224).toString(2));