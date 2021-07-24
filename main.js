const { WAConnection, MessageType, Mimetype, Presence, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { success, start, getBuffer, sleep } = require('./lib/myfunc')
const fs = require("fs-extra")
const { uncache, nocache } = require('./lib/loader')
const figlet = require('figlet')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
let welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
            
baterai = 'unknown'
charging = 'unknown'

        require('./nino.js')
        nocache('../nino.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
        nocache('../message/help.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
         
        const starts = async (nino = new WAConnection()) => {
        nino.version = [2, 2119, 6];
        nino.logger.level = 'warn'
        console.log(color(figlet.textSync('NinoBot', { font: 'Standard', horizontalLayout: 'default', vertivalLayout: 'default', width: 80, whitespaceBreak: false }), 'cyan'))
        console.log(color('[NINO]', 'cyan'), color('Owner is online now!', 'green'))
        console.log(color('[NINO]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'green'))
        nino.browserDescription = ["NINO - BOT", "Firefox", "3.0.0"];
        nino.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
})

        fs.existsSync(`./${setting.sessionName}.json`) && nino.loadAuthInfo(`./${setting.sessionName}.json`)
        nino.on('connecting', () => {
        start('2', 'Connecting...')
})
        nino.on('open', () => {
        success('2', 'Connect, Welcome Owner')
})
        await nino.connect({timeoutMs: 30*1000})
        fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(nino.base64EncodedAuthInfo(), null, '\t'))
        
        nino.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
	    global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
        if (json[2][0][1].live == 'true') charging = true
        if (json[2][0][1].live == 'false') charging = false
        console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel+'%')
})
	    global.batrei = global.batrei ? global.batrei : []
		nino.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
})
		nino.on('CB:action,,call', async json => {
        const callerId = json[2][0][1].from;
        console.log("call dari "+ callerId)
        nino.sendMessage(callerId, "Telpon = BLOCK!!\nTq Autoresblock!!", MessageType.text)
        await sleep(3000)
        await nino.blockUser(callerId, "add") // Block user
   })
  
 nino.on('group-participants-update', async (anu) => {
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await nino.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await nino.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(nino.user.jid)) {
            nino.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(nino.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await nino.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                anu_user = nino.contacts[mem]
                teks = `Halo @${num.split('@')[0]}!\nWelcome in ${encodeURI(mdata.subject)}\n\nNama : \nUmur :\nGender : \nAsal :\n\nSemoga Betah dan jangan lupa isi`
	            buff = await getBuffer(`https://api.lolhuman.xyz/api/base/welcome?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/9c41931cada0cfe68b8b7.jpg&username=Member&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
		        nino.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
            if (anu.action == 'remove' && !mem.includes(nino.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await nino.groupMetadata(anu.jid)
            	num = anu.participants[0]
                anu_user = nino.contacts[mem]
                memeg = mdata.participants.length
                out = `Kenapa tuh? kok bisa keluar? \nSayonara @${num.split('@')[0]} we will miss you`
                buff = await getBuffer(`https://api.lolhuman.xyz/api/base/leave?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/9c41931cada0cfe68b8b7.jpg&username=Member&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
                nino.sendMessage(mdata.id, buff, MessageType.image, {caption: out, contextInfo: {"mentionedJid": [num]}})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
        nino.on('chat-update', async (message) => {
        require('./nino.js')(nino, message)
})
}

        starts()