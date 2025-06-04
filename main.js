const cartes = document.getElementById("carte")
const input = document.getElementById("pkmn")
async function pokemon(pkdexId) {
    pkdexId = removeAccents(pkdexId)
    if (pkdexId === "nidoran♀") {
    pkdexId = "29"
    }
    if (pkdexId === "nidoran♂") {
    pkdexId = "32"
    }
    const pkmn = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${pkdexId}`)
    const pkmn2 = await pkmn.json()
    if(pkmn2.status == 404) {
        alert("Ce pokémon ou ce numéro n'est pas enregistré dans le pokédex !")}
    cartes.innerHTML = `
    <div class="flex-column carte justify-content-center" id="fondCarte">
        <h5 class="titre text-center mb-0">${pkmn2.pokedex_id + ". " + pkmn2.name.fr}</h5>
        <div class="d-flex  flex-sm-column flex-md-row cont">
            <div class="d-flex flex-column w-50 align-items-center h-100">
                <div id="imgContenair">
                    <img id="imgPok" src=${pkmn2.sprites.regular} class="imgPok" alt="...">
                </div>
                <button id="shiny" class="bouton">Version shiny</button>
            </div>
            
            <div class="d-flex flex-column justify-content-around h-100 w-50 text align-items-center">                
                    <div class="evolDiv">
                        ${(pkmn2.evolution === null)?
                        `<p class="card-text text text-center">N'évolue pas</p>`:
                                (pkmn2.evolution.next !== null)? `
                                <div>
                                    <p class="card-text  text-center">Evolue en</p>
                                </div> 
                                <div>
                                    <p id = "evol" class="text-center"> ${pkmn2.evolution.next[0].name}</p>
                                </div>`:
                                    `<p class="card-text text text-center">N'évolue pas</p>
                                `}
                    </div>                    
                    <button class="bouton" id="stats">Statistiques !</button>                     
                    <div class="d-flex justify-content-around w-100 mb-3">
                        ${(pkmn2.types.length == 2)? `<img class="type" src = "${pkmn2.types[0].image}"> <img class="type" src = "${pkmn2.types[1].image}">` : 
                        `<img class="type" src = "${pkmn2.types[0].image}">`}
                    </div>
                
            </div>
        </div>
    </div>
    `
    const carte = document.getElementById("fondCarte")
    carte.style.backgroundImage= `url(${getLink(pkmn2.types[0].name)})`
    carte.style.backgroundRepeat = 'no-repeat'
    carte.style.backgroundSize ='cover'
    carte.style.backgroundPosition ='cover'
    carte.style.color=(pkmn2.types.length == 2)? getColor(pkmn2.types[1].name) :`white`
    const evol = document.getElementById("evol")
    if (evol !== null) {
    evol.addEventListener("click",(e)=>{
        pokemon(pkmn2.evolution.next[0].name)
    })}
    
    const shiny = document.getElementById("shiny")
    const imgPok = document.getElementById("imgPok")
    shiny.addEventListener("click",(e)=>{
        if(shiny.textContent === "Version shiny"){
            imgPok.src = `${pkmn2.sprites.shiny}`
            shiny.textContent = "Version normale"
        }
        else{
            imgPok.src = `${pkmn2.sprites.regular}`
            shiny.textContent = "Version shiny"
        }
    })
}

input.addEventListener("keyup",(e)=>{
    if (e.key == "Enter") {
        let valeur = input.value.toLowerCase()
        valeur = removeAccents(valeur)
        pokemon(valeur)
        input.value = ""
        autoComp.style.display="none"
        n = 0
        div.className = "fleches"
    }
})
function getLink (type) {
let lien 
switch (type) {
            case "Plante": lien = "https://cdna.artstation.com/p/assets/images/images/044/985/138/large/orisve-taku-bg-plante.jpg?1641648235"
                break;
            case "Eau": lien = "https://previews.123rf.com/images/tupungato/tupungato1502/tupungato150200441/37120055-m%C3%A9diterran%C3%A9e-eau-fond-abstraite-de-l-eau-turquoise.jpg"
                break;
            case "Feu": lien = "https://img.freepik.com/photos-gratuite/illustration-numerique-du-volcan_23-2151778793.jpg?semt=ais_hybrid&w=740"
                break;
            case "Poison": lien = "https://thumbs.dreamstime.com/b/abstrait-purple-poison-nuage-fond-couleur-violet-effet-tunnel-225858765.jpg"
                break;
            case "Vol": lien = "https://thumbs.dreamstime.com/b/fond-a%C3%A9rien-de-ciel-et-de-nuages-93477773.jpg"
                break;
            case "Normal": lien = "https://media.istockphoto.com/id/821760914/fr/vectoriel/pastel-multi-color-gradient-vector-background-forme-simple-et-m%C3%A9lange-avec-copie-espace.jpg?s=612x612&w=0&k=20&c=Vtam973IESNBy8AnQ-EEy_EuyuP2RpzgbisahgGCFS0="
                break;
            case "Glace": lien = "https://thumbs.dreamstime.com/b/gla%C3%A7ons-fond-cube-de-glace-texture-ou-il-me-fait-sentir-frais-et-se-bien-dans-la-d-%C3%A9t%C3%A9-les-boissons-froides-nous-fera-d%C3%A9tendu-267871902.jpg"
                break;
            case "Psy": lien = "https://thumbs.dreamstime.com/b/fractale-visionnaire-psych%C3%A9d%C3%A9lique-art-poster-ou-couverture-d-album-l-de-fractales-psych%C3%A9d%C3%A9liques-technologie-est-grand-fond-142501717.jpg"
                break;
            case "Insecte": lien = "https://www.sylvamap.fr/sylvamap-new/wp-content/uploads/2017/09/fond-foret-sylvamap-v2.jpg"
                break;
            case "Acier": lien = "https://lh5.googleusercontent.com/proxy/HUteosvvBg8sjBn8Ls6-joNQeXa481PqLAhS0IvKce9BEH4ZHbk53ds_0p5-9Sg7dF2Jo0S3kpM3qz3yTVbXMUhMGo40dik"
                break;
            case "Électrik": lien = "https://img.freepik.com/photos-premium/fond-electrique-eclair-bleu-fond-noir_973064-722.jpg?w=360"
                break;
            case "Ténèbres": lien = "https://st5.depositphotos.com/60509676/76439/i/450/depositphotos_764395412-stock-photo-grunge-texture-background-png-transparent.jpg"
                break;
            case "Dragon": lien = "https://bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/4u/4UINC9ZS62CK1657746310179.jpg"
                break;
            case "Fée": lien = "https://img.freepik.com/vecteurs-libre/fond-paillettes-arc-ciel-degrade_23-2149750534.jpg?semt=ais_hybrid&w=740"
                break;
            case "Spectre": lien = "https://esthero.fr/cdn/shop/files/M9-53_cbfac906-568b-4e49-8d23-57d17b432367.jpg?v=1695367353&width=580"
                break;
            case "Combat": lien = "https://t3.ftcdn.net/jpg/05/22/88/84/360_F_522888463_ONwZjSFkdZomOo4BCHCH2FGc0sE7y40H.jpg"
                break;
            case "Roche": lien = "https://as1.ftcdn.net/jpg/01/67/96/84/1000_F_167968480_zPNoDRWpdWbu2tfxjYSAzQvBTR8fqsqf.jpg"
                break;
            case "Sol": lien = "https://m.media-amazon.com/images/I/71unSoCb+CL.jpg"
                break;
            default:""
                break;
        }
        return lien }
function getColor (type2) {
let color
switch (type2) {
            case "Plante": color = "rgba(51, 153, 66, 0.921)"
                break;
            case "Eau": color = "rgba(19, 96, 138, 0.921)"
                break;
            case "Feu": color = "rgba(196, 18, 15, 0.89)"
                break;
            case "Poison": color = "rgb(113, 32, 82)"
                break;
            case "Vol": color = "rgba(187, 231, 255, 0.921)"
                break;
            case "Normal": color = "rgba(255, 255, 255, 0.92)"
                break;
            case "Glace": color ="rgba(94, 170, 211, 0.921)"
                break;
            case "Psy": color = "rgba(182, 76, 152, 0.92)"
                break;
            case "Insecte": color = "rgba(12, 51, 25, 0.921)"
                break;
            case "Acier": color = "rgba(163, 163, 163, 0.921)"
                break;
            case "Électrik": color = "rgba(241, 238, 85, 0.921)"
                break;
            case "Ténèbres": color = "rgba(14, 18, 20, 0.92)"
                break;
            case "Dragon": color = "rgba(108, 111, 52, 0.92)"
                break;
            case "Fée": color = "rgba(255, 137, 220, 0.92)"
                break;
            case "Spectre": color = "rgba(38, 6, 24, 0.92)"
                break;
            case "Combat": color = "rgba(140, 86, 36, 0.92)"
                break;
            case "Roche": color =" rgb(84, 78, 65)"
                break;
            case "Sol": color =" rgb(212, 180, 110)"
                break;
            default:""
                break;
        }
        return color }

const section = document.getElementById("champ")
const autoComp = document.createElement("div")
autoComp.classList.add("autocompletion")
section.append(autoComp)
const poke = await pokeAll()

let m 
input.addEventListener("input",(e)=>{
    autoComp.textContent=""
    let x = input.value.toLowerCase()
    m = 0
    n = 0
    poke.forEach( (poke) => {
        let poké = poke.toLowerCase()
        poke = removeAccents(poké)
        if (x == poke.substring(0,x.length) & m < 5 & x.length>0){
            m++
            const auto = document.createElement("div")
            auto.textContent = `${poké}`
            auto.id = m
            autoComp.append(auto)
            autoComp.style.display="block"
            auto.classList.add("auto")
            auto.addEventListener("click",async (e)=>{
                input.value = auto.textContent
                pokemon(input.value)
                input.value = ""
                autoComp.style.display="none"
            })
        }
    })
    
})
let n = 0
let div = document.createElement("div")
input.addEventListener("keydown",async (e)=>{
    if (e.key === "ArrowDown" & n >= 0 & n < m){
        e.preventDefault()
    n++
    div = document.getElementById(`${n}`)
    div.className = "flechesSelec"
    input.value = div.textContent
        if(n!==1){
            let divMoins = document.getElementById(`${n - 1}`)
            divMoins.className = "fleches"}
        }
    if (e.key === "ArrowUp" & n > 1 & n <= m){
        e.preventDefault()
    n--
    div = document.getElementById(`${n}`)
    div.className = "flechesSelec"
    input.value = div.textContent
        if(n!==5){
            let divPlus = document.getElementById(`${n + 1}`)
            divPlus.className = "fleches"}
        }
})

async function pokeAll() {
    const pkmn = await fetch(`https://tyradex.vercel.app/api/v1/pokemon`)
    const pkmn2 = await pkmn.json()
    return pkmn2.map(x=>x.name.fr)
}
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

