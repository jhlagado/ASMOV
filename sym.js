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

let key = 0;
while (key < 100) {
    let result = [];
    let flag = true;
    tries = 0;
    for (sym of words) {
        let hash = 0;
        for (ch of sym) {
            const a = ch.charCodeAt(0)-'a'.charCodeAt(0);
            hash = (hash * key) - hash + a;
            hash = hash & 0xFFFF; // Prevent overflow from happening.
            console.log(a, ch, hash)
        }
        let idx = hash & 0x03FF;
        if (result[idx]) {
            console.log('clash', tries, key, sym, idx, result.length, result)
            flag = false;
            break;
        }
        result[idx] = sym;
        console.log(idx, sym)
        tries++;
    }
    if (flag) {
        console.log('Success!', key, key.toString(16), result.length);
        for (let j = 0; j < 16; j++) {
            let line = "db ";
            for (let i = 0; i < 16; i++) {
                const idx = j * 16 + i;
                const sym = result[idx];
                if (sym === undefined) line += 0
                else if (sym === "") line += `lsb(div_)`;
                else line += `lsb(${sym}_)`;
                if (i < 15) line += ','
            }
            console.log(line);
        }
        break;
    }
    key++;
}
