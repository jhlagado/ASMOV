const g05 = () => { };
const g06 = () => { };
const g07 = () => { };
const g08 = () => { };
const g09 = () => { };
const g10 = () => { };
const g11 = () => { };
const g12 = () => { };
const g13 = () => { };
const g14 = () => { };
const g15 = () => { };
const g16 = () => { };
const g18 = () => { };

const _ld = (a1, a2) => { console.log('ld', a1, a2) };
const _push = () => { };
const _pop = () => { };
const _ex = () => { };
const _exx = () => { };
const _ldi = () => { };
const _ldir = () => { };
const _ldd = () => { };
const _lddr = () => { };
const _cpi = () => { };
const _cpir = () => { };
const _cpd = () => { };
const _cpdr = () => { };

const _add = g05(0);
const _adc = g05(1);
const _sbc = g05(3);

const _sub = g06(2);
const _and = g06(4);
const _xor = g06(5);
const _or = g06(6);
const _cp = g06(7);

const _inc = g07(4);
const _dec = g07(5);

const _daa = () => { };
const _cpl = () => { };
const _neg = () => { };
const _ccf = () => { };
const _scf = () => { };
const _nop = () => { };
const _halt = () => { };
const _di = () => { };
const _ei = () => { };
const _im = () => { };

const _rlca = g12(0);
const _rrca = g12(1);
const _rla = g12(2);
const _rra = g12(3);

const _rlc = g13(0);
const _rrc = g13(1);
const _rl = g13(2);
const _rr = g13(3);
const _sla = g13(4);
const _sra = g13(5);
const _sll = g13(6);
const _srl = g13(7);

const _rld = () => { };
const _rrd = () => { };

const _bit = g18(1);
const _res = g18(2);
const _set = g18(3);

const _jp = () => { };
const _jr = () => { };
const _djnz = () => { };
const _call = () => { };
const _ret = () => { };
const _reti = () => { };
const _retn = () => { };
const _rst = () => { };
const _in = () => { };
const _ini = () => { };
const _inir = () => { };
const _ind = () => { };
const _indr = () => { };
const _out = () => { };
const _outi = () => { };
const _otir = () => { };
const _outd = () => { };
const _otdr = () => { };

const pearson = [36, 255, 19, 7, 3, 160, 129, 31, 149, 139, 16, 175, 23, 113, 66, 145, 142, 26, 180, 178, 39, 177, 141, 65, 135, 158, 168, 42, 155, 14, 1, 21, 35, 170, 153, 189, 144, 82, 96, 118, 119, 150, 157, 171, 25, 33, 94, 116, 79, 183, 190, 114, 134, 56, 13, 151, 8, 147, 41, 77, 55, 166, 10, 137, 186, 61, 154, 84, 15, 125, 196, 161, 146, 123, 63, 204, 97, 58, 195, 210, 217, 198, 192, 68, 216, 143, 128, 44, 22, 223, 197, 242, 181, 126, 202, 87, 133, 179, 148, 106, 237, 47, 239, 222, 201, 78, 193, 233, 89, 20, 64, 122, 17, 93, 11, 108, 101, 5, 226, 103, 219, 131, 0, 53, 130, 185, 30, 140, 132, 81, 24, 54, 253, 208, 115, 187, 224, 152, 46, 227, 73, 218, 51, 28, 184, 159, 207, 228, 124, 69, 232, 238, 136, 18, 252, 110, 138, 38, 62, 34, 212, 211, 2, 165, 12, 235, 199, 250, 50, 43, 169, 206, 48, 40, 188, 60, 29, 67, 6, 174, 213, 172, 164, 71, 70, 182, 4, 59, 83, 9, 247, 45, 100, 32, 173, 109, 49, 244, 251, 85, 37, 176, 220, 167, 191, 200, 162, 214, 52, 90, 57, 163, 91, 248, 225, 92, 245, 102, 95, 75, 205, 246, 111, 156, 99, 72, 231, 243, 117, 209, 121, 215, 203, 74, 86, 236, 254, 194, 221, 241, 229, 230, 80, 234, 240, 105, 249, 98, 120, 112, 76, 107, 27, 88, 127, 104]
const opcodes = [null, null, null, _nop, _rld, null, null, null, _add, _rlc, null, null, _ldir, null, null, null, null, null, null, _rrca, _srl, null, null, null, _djnz, _bit, null, _sub, null, null, null, null, _cpi, null, null, _in, null, null, null, null, null, null, null, null, _ex, _rla, null, null, null, _cpl, null, null, null, null, _dec, null, _neg, null, _inir, null, _rst, null, null, _ini, _pop, null, null, _jp, null, null, _outi, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, _scf, _rrc, null, null, _otir, null, _set, null, null, null, null, null, null, null, null, null, _res, null, null, null, null, _daa, null, null, null, null, null, _sla, null, null, _push, null, null, _rr, null, _sra, _ret, null, null, _adc, null, null, null, null, null, null, null, null, _sll, null, null, _or, null, null, null, null, null, null, _lddr, null, null, null, null, _ind, null, _indr, null, null, _ld, null, _cp, null, _sbc, null, _outd, _ldd, _jr, null, null, null, null, null, _otdr, null, null, null, null, null, _inc, null, null, _im, null, _cpd, _cpir, null, _ccf, null, _ei, null, null, null, _cpdr, _rlca, null, _retn, null, null, null, _and, null, _out, null, null, null, null, _ldi, _rrd, _exx, null, null, null, null, null, _rl, null, null, null, null, null, null, null, null, _rra, null, null, null, null, null, null, null, null, null, _reti, null, null, null, null, null, _halt, null, null, _xor, null, null, _di, null, _call]
// const registers = [ null,null,null,null,null,null,null,null,null,_h,null,_r,null,_ix,_i,null,null,null,null,null,_b,null,null,_iy,null,_l,null,_sp,_aff,null,null,null,_de,null,_bc,null,null,null,null,null,null,null,_c,_hl,null,_d,null,_e,null,null,null,_a,null,null,null,null,_af,null,null,null,null,null,null,null ]
// const conditions = [ _z,_p,null,null,_m,_pe,null,null,null,_nz,_c,null,null,_nc,_po,null ]
const regs = [_a, _b, _c, _d, _e, _h, _l, _i, _r, _bc, _de, _hl, _sp, _af, _ix, _iy];

const hash = (s) => {
    let state = 0;
    for (let i = 0; i < s.length; i++) {
        const ch = s.charAt(i);
        const c = ch.charCodeAt(0);
        state = pearson[state ^ c]
    }
    return state;
}

const parseLine = (line) => {
    const p1 = line.toLowerCase().split(';');
    const p2 = (p1.length) ? p1[0] : '';
    const p3 = p2.split(' ');
    const p4 = (p3.length) ? p3[0] : '';
    const p5 = (p3.length > 1) ? p3[1] : '';
    const p6 = p5.split(',');
    const p7 = (p6.length) ? p6[0] : '';
    const p8 = (p6.length > 1) ? p6[1] : '';
    return [p4.trim(), p7.trim(), p8.trim()];
}

const parseReg = (arg) => {
}

const parseArg = (arg) => {
    if (arg.length === 0) return []
    const ch = arg.charAt(0);
    if (ch === '(')
        return parseRef(arg)
    if (ch === '$' || (ch >= '0' && ch <= '9'))
        return parseNum(arg)
    const reg = regs.indexOf(arg)
    if (reg !== -1)
        return [`reg`, reg, false]
    else
        return ['label', arg, false]
}

const test = (line, array) => {
    const pline = parseLine(line);
    ptr = 0;
    const [op, a1, a2] = pline;
    const opHash = hash(op);
    const opcode = opcodes[opHash];
    if (opcode) opcode(a1, a2)
}

test('ld a,b', [0]);

// const _ld = reverseTable['ld']
// const _a = reverseTable['a']
// const _b = reverseTable['b']

// const line = ['ld', 'a', 'b']
// const opcode = line[0].toLowerCase();
// const arg1 = line[1].toLowerCase();
// const arg2 = line[2].toLowerCase();

// const opHash = hash(pearson, opcode);
// const arg1Hash = hash(pearson, arg1);
// const arg2Hash = hash(pearson, arg2);

// if (opHash === _ld) {
//     console.log('hit!')
// }
// if (arg1Hash === _a) {
//     console.log('hit!')
// }
// if (arg2Hash === _b) {
//     console.log('hit!')
// }
// console.log(_ld, opHash, typeof _ld, typeof opHash, _ld === opHash)

