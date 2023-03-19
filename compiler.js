//MAPPER OBJECT
charset = {}

//GENERATE ANY DIGIT USING ZERO AND ONE
const zero = "+[]"
const one = "+!![]"

function number(n) {
	if (n === 0) return zero
	return Array.from({ length: n }, () => one).join(" + ")
}

//HELPER FUNCTION FOR UTILIZING MAPPER
function string(s) {
	return s
		.split("")
		.map((x) => {
			if (!(x in charset)) {
				const charCode = x.charCodeAt(0)
				return `([]+[])[${string("constructor")}][${string("fromCharCode")}](${number(
					charCode
				)})`
			}
			return charset[x]
		})
		.join("+")
}

//UTILIZING NAN HACK
charset.a = `(+{}+[])[${number(1)}]`

//UTILIZING OBJECT STRING HACK
charset.b = `({}+[])[${number(2)}]`
charset.o = `({}+[])[${number(1)}]`
charset.e = `({}+[])[${number(4)}]`
charset.c = `({}+[])[${number(5)}]`
charset.t = `({}+[])[${number(6)}]`
charset[" "] = `({}+[])[${number(7)}]`

//UTILIZING TRUE AND FALSE STRING HACK
charset.f = `(![]+[])[${number(0)}]`
charset.s = `(![]+[])[${number(3)}]`
charset.r = `(!![]+[])[${number(1)}]`
charset.u = `(!![]+[])[${number(2)}]`

//UTILITIZING INFINITY HACK
charset.i = `((+!![]/+[])+[])[${number(3)}]`
charset.n = `((+!![]/+[])+[])[${number(4)}]`

//UTILIZING THE CONSTRUCTOR FUNCTION HACK
charset.S = `([]+([]+[])[${string("constructor")}])[${number(9)}]`
charset.g = `([]+([]+[])[${string("constructor")}])[${number(14)}]`

//UTILIZING REGEX HACK
charset.p = `([]+(/!/)[${string("constructor")}])[${number(14)}]`
charset["\\"] = `(/\\\\/+[])[${number(1)}]`

//UTILIZING THE STRING FUNCTION HEXADECIMAL HACK
charset.d = `(${number(13)})[${string("toString")}](${number(14)})`
charset.h = `(${number(17)})[${string("toString")}](${number(18)})`
charset.m = `(${number(22)})[${string("toString")}](${number(23)})`

//UTILIZING ESCAPE FUNCTION FROM CONSTRUCTOR FUNCTION ASCII VALUE HACK
charset.C = `((()=>{})[${string("constructor")}](${string("return escape")})()(${
	charset["\\"]
}))[${number(2)}]`

//COMPILER
function compile(code) {
	return `(()=>{})[${string("constructor")}](${string(code)})()`
}

console.log(compile("console.log('Hello World!')"))
