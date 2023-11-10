const tableSize = 256;

const codes = [
    'adc',
    'add',
    'and',
    'bit',
    'call',
    'ccf',
    'cp',
    'cpd',
    'cpdr',
    'cpi',
    'cpir',
    'cpl',
    'daa',
    'dec',
    'di',
    'djnz',
    'ei',
    'ex',
    'exx',
    'halt',
    'im',
    'in',
    'inc',
    'ind',
    'indr',
    'ini',
    'inir',
    'jp',
    'jr',
    'ld',
    'ldd',
    'lddr',
    'ldi',
    'ldir',
    'neg',
    'nop',
    'or',
    'otdr',
    'otir',
    'out',
    'outd',
    'outi',
    'pop',
    'push',
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
    'sra',
    'srl',
    'sub',
    'xor',
];

const reg = [
    'a',
    'af',
    "af'",
    'b',
    'c',
    'bc',
    'd',
    'e',
    'de',
    'h',
    'hl',
    'i',
    'l',
    'ix',
    'iy',
    'r',
    'sp',
];

const cond = [
    'c',
    'nc',
    'nz',
    'z',
    'm',
    'p',
    'pe',
    'po',
]

const hash = (pearsonTable, s0) => {
    let state = 0;
    const s = s0.toLowerCase();
    for (let i = 0; i < s.length; i++) {
        const ch = s.charAt(i);
        const c = ch.charCodeAt(0);
        state = pearsonTable[state ^ c]
    }
    return state;
}

const run = (pearsonTable, table, bits) => {
    const mask = 2 ** bits - 1;
    let wordCount = 0;
    wordCount = 0;
    const result = Array(2 ** bits).fill(null);
    for (const w of table) {
        const h = hash(pearsonTable, w) & mask;
        if (result[h]) {
            return null;
        }
        result[h] = w.replace(/'/g, 'f');
    }
    return result;
}

let count = 0;
let pearsonTable;
var opcodes, registers, conditions;
while (true) {
    pearsonTable = Array.from(Array(tableSize).keys()).sort((a, b) => 0.5 - Math.random());
    opcodes = run(pearsonTable, codes, 8);
    registers = run(pearsonTable, reg, 6);//6
    conditions = run(pearsonTable, cond, 4);//4
    if (opcodes && registers && conditions) break;
    count++;
}
console.log({ count })

console.log('const pearson = ', JSON.stringify(pearsonTable));
console.log('const opcodes = [', opcodes.map(item => item === null ? 'null' : `_${item}`).join(','), ']');
console.log('const registers = [', registers.map(item => item === null ? 'null' : `_${item}`).join(','), ']');
console.log('const conditions = [', conditions.map(item => item === null ? 'null' : `_${item}`).join(','), ']');
// const reverseTable = {};
// Object.keys(opcodes).forEach((key) => { reverseTable[opcodes[key]] = Number(key) });
// Object.keys(registers).forEach((key) => { reverseTable[registers[key]] = Number(key) });
// Object.keys(conditions).forEach((key) => { reverseTable[conditions[key]] = Number(key) });
// console.log('const reverse = ', JSON.stringify(reverseTable));
// console.log('-----------------------------------------------------------------------');
// console.log('pearson: db ' + pearsonTable.join(','));
// Object.keys(opcodes).forEach((key) => { console.log(`${opcodes[key]} .equ ${key}`) });
// Object.keys(registers).forEach((key) => { console.log(`${registers[key]} .equ ${key}`) });
// Object.keys(conditions).forEach((key) => { console.log(`${conditions[key]} .equ ${key}`) });
