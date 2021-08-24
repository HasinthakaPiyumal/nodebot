num = ['94710442946@s.whatsapp.net','94769876712@s.whatsapp.net','94763215389@s.whatsapp.net']
res =[
    'morning',
    'gm'
]
module.exports = function (id, msg,conn) {
    console.log(msg)
    if(num.includes(id) && msg){
        console.log('msg')
        msg = msg.toLowerCase()
        c=0
        let mm = msg.split(" ")
        mm.forEach((el)=>{
            if(res.includes(el)){
                c++;
            }
        })
        if(c>0){
            return 'Good Morning';
        }
    }
    else{
        return 'noreply'
    }
}
