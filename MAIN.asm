; *************************************************************************
;
;  ASMOV programming language for the Z80 
;
;  by John Hardy 2023
;
;  GNU GENERAL PUBLIC LICENSE    Version 3, 29 June 2007
;
;  see the LICENSE file in this repo for more information 
;
;  Incorporating code from the MINT project by Ken Boak and Craig Jones.
;
; *****************************************************************************

TRUE        equ     -1		    ; C-style true
FALSE       equ     0
NUL         equ     0           ; exit code
DQ          equ     $22         ; " double quote char
CTRL_C      equ     3
CTRL_E      equ     5
CTRL_H      equ     8
CTRL_J      equ     10
CTRL_L      equ     12
CTRL_P      equ     16
CTRL_S      equ     19
ESC         equ     27          

; macros for inlining a onty function in assembly
; follow immediately with a null terminated block of ASMOV code
.macro FUNC,name,numLocals,argsStr
name:
    call go
    dw NUL                      ; NUL closure
    dw name%%M                      
    dw $+2
    db numLocals                ; num_locals
    .pstr argsStr
name%%M:
.endm

.macro PERFORM,name
    ld ix,perform%%M
    jp name
perform%%M:
.endm

.org ROMSTART + $180		    ; 0+180 put ASMOV code from here	

;********************** PAGE 1 BEGIN *********************************************


;********************** PAGE 1 END *********************************************

; ***********************************************************************
; Initial values for system vars		
; ***********************************************************************		
isysVars:			            
    dw TIB                      ; vTIBPtr pointer into TIB
    dw BUFFER                   ; vBufPtr pointer into BUF
    dw HEAP                     ; vHeapPtr start of the free mem
    dw NAMES                    ; vNamesPtr
    dw NUL                      ; vRecurPtr
    db 2                        ; vDataWidth in bytes of array operations (default 1 byte) 
    db 10                       ; vNumBase = 10
    db "$"                      ; vHexPrefix
    db TRUE                     ; vEcho
    db FALSE                    ; vStrMode
    db 0
    db 0                         
    db 0                         

; **********************************************************************			 
; title string (also used by warm boot) 
; **********************************************************************

titleStr:
    .cstr ESC,"[2JASMOV V0.1\r\n",0,0,0

;********************** PAGE 2 BEGIN ***********************************
    .align $100

pearson:

    db 206,0,115,22,1,64,111,47,87,78,65,13,45,46,21,2,100,126,11,83,32,4,114,71,57,8,38,51,56,61,84,27
    db 30,113,26,122,72,74,50,24,49,93,73,33,43,228,212,215,102,76,189,178,95,39,66,239,182,221,12,107,172,103,245,195
    db 190,62,109,180,36,121,184,88,70,157,14,10,68,163,175,198,229,194,18,92,133,168,165,59,144,127,235,25,141,85,197,242
    db 136,250,67,41,29,82,177,223,7,9,211,151,17,91,34,123,90,31,69,220,201,60,132,44,219,254,213,3,181,203,234,15
    db 80,230,52,108,240,118,98,208,124,216,6,97,53,222,16,101,28,105,232,116,131,77,54,58,233,75,20,104,35,207,96,188
    db 63,200,48,191,152,86,139,89,140,247,204,40,79,125,23,255,19,106,199,5,81,55,112,119,187,117,99,110,167,37,193,42
    db 148,120,166,94,246,253,202,142,249,159,128,209,143,214,196,192,251,129,218,205,162,150,161,210,237,130,236,244,248,135,138,224
    db 252,238,231,186,225,160,226,176,149,154,243,227,217,146,170,241,173,155,171,164,134,183,153,158,169,174,147,145,185,156,137,179

opcodes:

    db set_,add_,0,srl_,0,0,0,ccf_,0,0,0,0,0,0,0,sll_,rra_,0,0,0,0,0,adc_,0,0,0,0,0,0,im_,0,0
    db 0,0,0,0,0,retn_,0,0,0,0,0,0,0,0,0,0,sbc_,0,0,cpd_,0,rrc_,0,0,indr_,0,0,pop_,ld_,0,cpdr_,0
    db 0,0,rst_,0,scf_,sla_,0,djnz_,0,ex_,call_,0,exx_,sub_,or_,0,0,0,0,cpl_,0,0,0,0,0,0,0,res_,0,rl_,otdr_,0
    db outd_,rrd_,0,reti_,0,0,0,bit_,0,0,0,ei_,0,0,ind_,0,ini_,0,cpi_,inir_,outi_,0,0,0,0,0,xor_,0,0,0,0,cp_
    db 0,0,0,rlca_,sra_,rrca_,0,0,0,0,0,0,0,0,0,0,ldd_,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    db otir_,0,daa_,0,halt_,0,0,inc_,ldi_,0,0,0,rla_,push_,0,0,and_,0,0,0,0,0,0,0,0,0,0,dec_,0,0,0,jp_
    db 0,0,0,neg_,0,0,0,0,jr_,di_,0,0,0,nop_,cpir_,0,0,0,0,ret_,0,0,0,0,0,0,0,0,0,rld_,0,in_
    db 0,0,0,0,0,0,0,lddr_,0,0,0,0,ldir_,0,0,rr_,0,0,0,0,0,rlc_,0,0,0,0,out_,0,0,0,0,0

    .align $100

page4:

rla_:
outi_:
indr_:
ind_:
rl_:
cp_:
ex_:
in_:
ei_:
inc_:
ldir_:
dec_:
add_:
sla_:
exx_:
rrc_:
or_:
im_:
otdr_:
di_:
jr_:
sra_:
neg_:
ccf_:
and_:
res_:
cpdr_:
scf_:
rst_:
pop_:
reti_:
ldd_:
outd_:
rrd_:
adc_:
retn_:
rlc_:
sub_:
cpi_:
call_:
out_:
xor_:
rld_:
djnz_:
cpir_:
set_:
push_:
ini_:
rra_:
bit_:
lddr_:
sll_:
daa_:
otir_:
cpd_:
rrca_:
inir_:
cpl_:
rr_:
jp_:
halt_:
sbc_:
nop_:
rlca_:
ret_:
srl_:
ldi_:
    ret

ld_:
    ret

    

;********************** PAGE 2 END *********************************************
.align $100
;********************** PAGE 3 BEGIN *********************************************



;********************** PAGE 3 END *********************************************
.align $100
;********************** PAGE 4 BEGIN *********************************************

; ;                               67
; dot:
; print:
;     inc bc
;     ld a,(bc)
;     cp "a"                      ; .a print array
;     jr z,printArray
;     cp "c"                      ; .c print char
;     jr z,printChar
;     cp "s"                      ; .s print string
;     jr z,printString
;     dec bc
;     jr printNumber              ; .  print number, fall through

; printArray:                     ; TODO
;     jp dotNext
    
; ; .c print char             
; ; char -- 
; printChar:
;     pop hl                      ; a = char
;     ld a,l
;     ld de,(vBufPtr)             ; de = buffer*
;     ld (de),a
;     inc de
;     ld (vBufPtr),de             ; save buffer*'
;     jp dotNext

; ; .s print string             
; ; string* --
; printString:
;     pop hl                      ; hl = string*
;     ld de,(vBufPtr)             ; de = buffer*
;     jr printString1
; printString0:
;     ld (de),a                   ; a -> buffer*
;     inc de                      ; string*++, 
;     inc hl
; printString1:
;     ld a,(hl)                   ; a <- string*
;     or a                        ; if NUL exit loop
;     jr nz,printString0
;     ld (vBufPtr),de             ; save buffer*' in pointer
;     jp dotNext

; ; . print decimal
; ; value --                      
; printNumber:        
;     ld a,(vNumBase)
;     cp 16
;     jp z,printHex              ; else falls through
;     jp printDec

; ; print decimal                 ; 70
; ; value --                      
; printDec:        
;     ld de,(vBufPtr)             ; de'= buffer* bc' = IP
;     exx                          
;     pop hl                      ; hl = value
;     ld a,(vDataWidth)
;     dec a
;     jr nz,printDec1
;     ld h,0
; printDec1:    
;     call formatDec
;     exx                         ; de = buffer*' bc = IP
;     ld a," "                    ; append space to buffer
;     ld (de),a
;     inc de                      ; string*++, 
;     ld (vBufPtr),de             ; update buffer* with buffer*'
;     jp dotNext

; ; buffer hex                    37
; ; value --                      

; printHex:                      
;     ld de,(vBufPtr)
;     ld a,(vHexPrefix)           ; "$"
;     or a                        ; skip if null
;     jr z,printHex1
;     ld (de),a
;     inc de                      ; string*++, 
; printHex1:
;     pop hl                      ; hl = value
;     ld a,(vDataWidth)
;     dec a
;     jr z,printHex2
;     ld a,h
;     call printHex3
; printHex2:
;     ld a,l
;     call printHex3
;     ld a," "                    ; append space to buffer
;     ld (de),a
;     inc de                      ; string*++, 
;     ld (vBufPtr),de
;     jp dotNext

; printHex3:		     
;     push af
; 	rra 
; 	rra 
; 	rra 
; 	rra 
;     call printHex4
;     pop af
; printHex4:		
;     and	0x0F
; 	add	a,0x90
; 	daa
; 	adc	a,0x40
; 	daa
; 	ld (de),a
;     inc de                      ; string*++, 
; 	ret

;********************** PAGE 4 END *********************************************

.align $100
;********************** PAGE 5 BEGIN *********************************************

;********************** PAGE 5 END *********************************************
;********************** PAGE 6 BEGIN *********************************************


;********************** PAGE 6 END *********************************************
.align $100
;********************** PAGE 7 BEGIN *********************************************


; 0..9 number                   37
num:
	ld hl,$0000				    ; Clear hl to accept the number
	ld a,(bc)				    ; Get numeral or -
    cp '-'
    jr nz,num0
    inc bc                      ; move to next char, no flags affected
num0:
    ex af,af'                   ; save zero flag = 0 for later
num1:
    ld a,(bc)                   ; read digit    
    sub "0"                     ; less than 0?
    jr c, num2                  ; not a digit, exit loop 
    cp 10                       ; greater that 9?
    jr nc, num2                 ; not a digit, exit loop
    inc bc                      ; inc IP
    ld de,hl                    ; multiply hl * 10
    add hl,hl    
    add hl,hl    
    add hl,de    
    add hl,hl    
    add a,l                     ; add digit in a to hl
    ld l,a
    ld a,0
    adc a,h
    ld h,a
    jr num1 
num2:
    dec bc
    ex af,af'                   ; restore zero flag
    jr nz, num3
    ex de,hl                    ; negate the value of hl
    ld hl,0
    or a                        ; jump to sub2
    sbc hl,de    
num3:
    push hl                     ; Put the number on the stack
    jp (ix)                     ; and process the next character


;*******************************************************************
; general routines
;*******************************************************************


putstr0:
    call putchar
    inc hl
putstr:
    ld a,(hl)
    or a
    jr nz,putstr0
    ret

; hl = value
; de = buffer*
; a, bc, de, hl destroyed
formatDec0:    
    push hl
    exx
    pop hl
; hl = value
; de' = buffer*
; a, bc, de, hl destroyed
formatDec:    
    bit 7,h
    jr z,formatDec2
    exx
    ld a,'-'
    ld (de),a
    inc de
    exx
    xor a  
    sub l  
    ld l,a
    sbc a,a  
    sub h  
    ld h,a
formatDec2:        
    ld c,0                      ; leading zeros flag = false
    ld de,-10000
    call formatDec4
    ld de,-1000
    call formatDec4
    ld de,-100
    call formatDec4
    ld e,-10
    call formatDec4
    inc c                       ; flag = true for at least digit
    ld e,-1
    call formatDec4
    ret
formatDec4:	     
    ld b,'0'-1
formatDec5:	    
    inc b
    add hl,de
    jr c,formatDec5
    sbc hl,de
    ld a,'0'
    cp b
    jr nz,formatDec6
    xor a
    or c
    ret z
    jr formatDec7
formatDec6:	    
    inc c
formatDec7:	    
    ld a,b
    exx
    ld (de),a
    inc de
    exx
    ret

; **************************************************************************    
; calculate nesting value
; a is char to be tested, 
; e is the nesting value (initially 0)
; e is increased by ( and [ 
; e is decreased by ) and ]
; e has its bit 7 toggled by `
; limited to 127 levels
; **************************************************************************    

nesting:    
    cp "'"                      ; quote char
    jr z,nesting0
    cp DQ                       ; double quote char
    jr z,nesting0
    cp "`"                      ; grave char
    jr z,nesting0
    jr nesting1
nesting0:
    bit 7,e
    jr z,nesting1a
    res 7,e
    ret
nesting1a: 
    set 7,e
    ret
nesting1:
    bit 7,e    
    ret nz    
    cp '{'
    jr z,nesting2
    cp '['
    jr z,nesting2
    cp '('
    jr nz,nesting3
nesting2:
    inc e
    ret
nesting3:
    cp '}'
    jr z,nesting4
    cp ']'
    jr z,nesting4
    cp ')'
    ret nz
nesting4:
    dec e
    ret 
 
prompt:          
    call printStr
    .cstr "\r\n> "
    ret

crlf:       
    call printStr
    .cstr "\r\n"
    ret

; prints a null teminated string
; the string should be immediately following the call
printStr:        
    ex (sp),hl		            ; swap			
    call putstr		
    inc hl			            ; inc past NUL
    ex (sp),hl		            ; put it back	
    ret

; hl = number to print in decimal
printNum:
    ld de,(vBufPtr)             ; de' = buffer* 
    call formatDec0
    exx                         ; restore de = buffer*
    ld a,0                      ; append NUL to buffer
    ld (de),a
    inc de                      ; string*++, 
    ld (vBufPtr),de             ; update buffer* with buffer*'
    ld hl,BUFFER
    ld (vBufPtr),hl             ; reset vBufPtr to vHeapPtr
    jp putstr

; Compares two null terminated strings.
; de = string1* hl = string2* -- bool
; returns: hl = bool
stringCompare:
stringCompare1:
    ld a,(de)
    cp (hl)
    jr nz,stringCompare2
    or a
    jr z,stringCompare3
    inc de
    inc hl
    jr stringCompare1
stringCompare2:
    ld hl,FALSE
    jr stringCompare4
stringCompare3:
    ld hl,TRUE
stringCompare4:
    push hl
    ret

; string length
; de = string*
; returns: hl = length
stringLength:
    ld hl,0
    jr stringLength2
stringLength1:
    inc de
    inc hl
stringLength2:
    ld a,(de)
    or a
    jr nz,stringLength1
stringLength3:
    ret

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; ASMOV interpreter
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

init:
    ld hl,titleStr
    ld de,titleBuf
    ld b,20
init1:
    ld a,(de)
    cp (hl)
    jr nz,coldBoot0
    inc de
    inc hl
    djnz init1

warmInit:
    ld bc,(vSavedIP)            ; restore IP
    ld sp,(vSavedDSP)           ; restore Data SP
    ld iy,(vSavedRSP)           ; restore Return SP
    ld ix,(vSavedNext)          ; restore Next
    jp start1

coldBoot0:    
    ld hl,titleStr              ; copy titleStr to titleBuf
    ld de,titleBuf
    ld b,20
    ldir

coldInit:    
    ld hl,isysVars
    ld de,sysVars
    ld bc,4 * 2 + 10
    ldir

    ld hl,vars                  ; 52 vars LO HI 
    ld b,26*2                       
    xor a
coldBoot1:
    ld (hl),a
    inc hl
    djnz coldBoot1

    ld ix,NEXT
    ld iy,STACK
    ret

coldStart:
    ld sp,STACK
    call coldBoot0
    jp start1
start:
    ld sp,STACK		            ; start ASMOV
    call init		            ; setups
start1:
    ld hl,titleBuf
    call putstr 		        ; prog count to stack, put code line 235 on stack then call print

interpret:

    call prompt

    ld bc,0                     ; load TIB length, decide char into tib or execute or control    
    ld hl,TIB
    ld (vTIBPtr),hl             ; no chars in TIB so set end pointer to beginning           

interpret2:                     ; calculate nesting 

    ld e,0                      ; initilize nesting value
    push bc                     ; save offset into TIB, 
                                ; bc is also the count of chars in TIB
    ld hl,TIB                   ; hl is start of TIB
    jr interpret4

interpret3:
    ld a,(hl)                   ; a = char in TIB
    inc hl                      ; inc pointer into TIB
    dec bc                      ; dec count of chars in TIB
    call nesting                ; update nesting value

interpret4:

    ld a,c                      ; is count zero?
    or b
    jr nz, interpret3           ; if not loop
    pop bc                      ; restore offset into TIB
    
interpret5:    

    call getchar                ; loop around waiting for character from serial port
    cp $20			            ; compare to space
    jr nc,interpret6		        ; if >= space, if below 20 set cary flag
    cp NUL                      ; is it end of string? NUL end of string
    jr z,interpret8
    cp '\r'                     ; carriage return? ascii 13
    jr z,interpret7		        ; if anything else its macro/control 

    cp CTRL_H
    jp z,backSpace_
    cp CTRL_J
    jp z,reEdit_

interpret5a:    
    jr interpret2

interpret6:

    ld hl,TIB
    add hl,bc
    ld (hl),a                   ; store the character in textbuf
    inc bc
    call putchar                ; echo character to screen
    call nesting
    jr  interpret5                ; wait for next character

interpret7:

    ld hl,TIB
    add hl,bc
    ld (hl),"\r"                ; store the crlf in textbuf
    inc hl
    ld (hl),"\n"  
    inc hl    
    inc bc
    inc bc
    call crlf                   ; echo character to screen
    ld a,e                      ; if zero nesting append and ETX after \r
    or a
    jr nz,interpret5

interpret8:

    ld hl,TIB
    add hl,bc
    ld (vTIBPtr),hl
    ld bc,TIB                   

    ld (vSavedIP),bc            ; save IP
    ld (vSavedDSP),sp           ; save Data SP
    ld (vSavedRSP),iy           ; save Return SP
    ld (vSavedNext),ix          ; save Next

    dec bc
NEXT:        
    inc bc                      ; Increment the IP
    ld a,(bc)                   ; Get the next character and dispatch
    cp " "                      ; whitespace?
    jr z,next                   ; space? ignore
    jr c,next1
    ld de,bc                    ; de = token start
next0:
    inc bc                      ; bc = first char
    ld a,(bc)
    cp " "+1
    jr nc,next0
    ld hl,bc
    or a
    sbc hl,de
    ex de,hl                    ; hl = tok, de = len
    push bc
    ld b,e
    call hash
    pop bc
    ld l,a                      ; index into table
    ld h,msb(opcodes)           ; start address of jump table    
    ld l,(hl)                   ; get low jump address
    ld h,msb(page4)             ; implementations are on page4
    jp (hl)                     ; Jump to routine
next1:
    cp NUL                      ; end of input string?
    jr z,exit
    jp interpret                ; no, other whitespace, macros?

exit:
    inc bc
    ld hl,bc
    jp (hl)

run:
    pop bc
    dec bc
    jp (ix)

error:
    push hl
    call run
    db "`Error ` .",0
    jp interpret

backSpace_:
    ld a,c
    or b
    jp z, interpret2
    dec bc
    call printStr
    .cstr "\b \b"
    jp interpret2

reEdit_:
    call printStr
    .cstr "\r> "
    ld hl,TIB
    jr reEdit1
reEdit0:
    call putchar
    inc hl
reEdit1:
    ld a,(hl)
    cp "\r"
    jr nz,reEdit0
    ld de,TIB
    or a
    sbc hl,de
    ld bc,hl
    jp interpret2

; hash
; hl = str
; de = len
; returns a = hash
hash:
    xor a                   ; hash = zero
    cp b                    ; does b == zero ?
    ret z                   ; yes execute with hash = 0
    ld d,msb(pearson)       ; page aligned pearson table
hash1:
    ld c,(hl)               ; c = str[hl++]
    inc hl
    xor c                   ; hash = pearson[hash ^ c]
    ld e,a                   
    ld a,(de)               
    djnz hash1              ; loop
    ret

    
