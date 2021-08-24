const fs = require('fs');
const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const reply = require('./chat.js');


let conn;

async function ConnectOld() {
    conn = new WAConnection();
    conn.logger.level = 'warn'
    let isOld = false;
    process.argv.forEach((i) => {
        if ('old' === i) {
            conn.loadAuthInfo('auth.json')
            isOld = true
            return false
        }
    })

    //1629462084.--0,["admin","init",[2,2132,6],["Windows","Firefox","10"],"L1r3/R80IsV83rtm1GqcOw==",true]
    conn.on('connecting', async () => {
        console.log('Connecting');
    });


    conn.on('open', async () => {

        if (!isOld) {
            fs.writeFileSync('auth.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
        }

    }
    )

    conn.on('chat-update', chatUpdate => {
        // `chatUpdate` is a partial object, containing the updated properties of the chat
        // received a new message
        if (chatUpdate.messages && chatUpdate.count) {
            const message = chatUpdate.messages.all()[0]
            console.log(message)
            let rpl = reply(message['key']['remoteJid'], message['message']['conversation'],conn);
            if (!(rpl ==='noreply')){
                conn.sendMessage(message['key']['remoteJid'],rpl,MessageType.text);
            }
        } else console.log(chatUpdate) // see updates (can be archived, pinned etc.)
    })

    await conn.connect();
}

ConnectOld()