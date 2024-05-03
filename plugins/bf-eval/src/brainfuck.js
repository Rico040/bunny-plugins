// https://github.com/dimdenGD/brainfuck.js
export class Brainfuck {
	constructor(program, input = "", size = 30000) {
		if(!program) throw new Error("No program to interpret.");
		this.program = program;
		this.input = input;
		this.size = size;
		this.array = new Array(size).fill(0);
		this.p = 0;
		this.i = 0;
		this.done = false;
		this.events = {};
		this.loops = {};
		this.mod = (a, b) => {
			b += 1;
			return ((a % b) + b) % b;
		};
	}
	on(name, fn) {
		if(!this.events[name]) this.events[name] = [];
		this.events[name].push(fn);
	};
	emit(name, ...args) {
		if(!this.events[name]) return;
		for(let i in this.events[name]) this.events[name][i](...args);
	};
	step() {
		let program = this.program;
		let invalid = false;
		if(this.done || program[this.i] === undefined) {
			if(!this.done) this.emit("done");
			this.done = true;
			return;
		};
		switch(program[this.i]) {
			case ">": this.p++; this.p = this.mod(this.p, this.size); break;
			case "<": this.p--; this.p = this.mod(this.p, this.size); break;
			case "+": this.array[this.p] = (this.array[this.p]+1) & 255; break;
			case "-": this.array[this.p] = (this.array[this.p]-1) & 255; break;
			case ".": 
				if(!String.fromCharCode(this.array[this.p])) break;
				this.emit("out", String.fromCharCode(this.array[this.p]));
				break;
			case ",":
				this.emit("in");
				if(this.input[this.char] === undefined) {
					this.array[this.p] = 0;
					break;
				};	
				this.array[this.p] = this.input[this.char++].charCodeAt(0);
				break;
			case "[":
				let temp_i = this.i;
				let ignore = 0;

				while(1) {
					temp_i++;
					if(!program[temp_i]) throw new Error("Out of bounds.");
					if(program[temp_i] === "[") ignore++;
					if(this.program[temp_i] === "]") {
						if(ignore === 0) {
							if(this.array[this.p] === 0) this.i = temp_i;
							else this.loops[temp_i] = this.i;
							break;
					   } else ignore--;
					}
				}
				break;
			case "]":
				if(this.array[this.p] !== 0) this.i = this.loops[this.i];
				else this.loops[this.i];
				break;
			default: invalid = true;
		};
		if(!invalid) this.emit("tick");
		this.i++;
	};
	init(speed = 1000) {
	    const fn = () => {
		    for(let i = 0; i < speed; i++) this.step();
	      	if(!this.done) requestAnimationFrame(fn);
	    };
	    fn();
	}
};
