"use strict";var charmap=function(r,t){return t=t||{},r.split("").forEach(function(r,a){r in t||(t[r]=a)}),t},rfc4648={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",charmap:{0:14,1:8}};rfc4648.charmap=charmap(rfc4648.alphabet,rfc4648.charmap);var crockford={alphabet:"0123456789ABCDEFGHJKMNPQRSTVWXYZ",charmap:{O:0,I:1,L:1}};crockford.charmap=charmap(crockford.alphabet,crockford.charmap);var base32hex={alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV",charmap:{}};function Decoder(r){if(this.buf=[],this.shift=8,this.carry=0,r){switch(r.type){case"rfc4648":this.charmap=exports.rfc4648.charmap;break;case"crockford":this.charmap=exports.crockford.charmap;break;case"base32hex":this.charmap=exports.base32hex.charmap;break;default:throw new Error("invalid type")}r.charmap&&(this.charmap=r.charmap)}}function Encoder(r){if(this.buf="",this.shift=3,this.carry=0,r){switch(r.type){case"rfc4648":this.alphabet=exports.rfc4648.alphabet;break;case"crockford":this.alphabet=exports.crockford.alphabet;break;case"base32hex":this.alphabet=exports.base32hex.alphabet;break;default:throw new Error("invalid type")}r.alphabet?this.alphabet=r.alphabet:r.lc&&(this.alphabet=this.alphabet.toLowerCase())}}base32hex.charmap=charmap(base32hex.alphabet,base32hex.charmap),Decoder.prototype.charmap=rfc4648.charmap,Decoder.prototype.write=function(r){var t=this.charmap,e=this.buf,h=this.shift,c=this.carry;return r.toUpperCase().split("").forEach(function(r){if("="!=r){var a=255&t[r];0<(h-=5)?c|=a<<h:c=h<0?(e.push(c|a>>-h),a<<(h+=8)&255):(e.push(c|a),h=8,0)}}),this.shift=h,this.carry=c,this},Decoder.prototype.finalize=function(r){return r&&this.write(r),8!==this.shift&&0!==this.carry&&(this.buf.push(this.carry),this.shift=8,this.carry=0),this.buf},Encoder.prototype.alphabet=rfc4648.alphabet,Encoder.prototype.write=function(r){var a,t,e,h=this.shift,c=this.carry;for(e=0;e<r.length;e++)a=c|(t=r[e])>>h,this.buf+=this.alphabet[31&a],5<h&&(a=t>>(h-=5),this.buf+=this.alphabet[31&a]),c=t<<(h=5-h),h=8-h;return this.shift=h,this.carry=c,this},Encoder.prototype.finalize=function(r){return r&&this.write(r),3!==this.shift&&(this.buf+=this.alphabet[31&this.carry],this.shift=3,this.carry=0),this.buf},exports.encode=function(r,a){return new Encoder(a).finalize(r)},exports.decode=function(r,a){return new Decoder(a).finalize(r)},exports.Decoder=Decoder,exports.Encoder=Encoder,exports.charmap=charmap,exports.crockford=crockford,exports.rfc4648=rfc4648,exports.base32hex=base32hex;