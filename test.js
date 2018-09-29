const futs1 = ()=>new Promise((res,rej)=>{
    setTimeout(()=>{
        res()
    },3000)
})
const futs2 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res()
    },3000)
})
const futs3 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res()
    },3000)
})
const f1 = async ()=>{
    console.log('in f1');
    await futs1();
    console.log(1)
    await futs1();
    console.log(2)
    await futs1();
    console.log('out f1');
}
const f2 = async ()=>{
    console.log('in f2');
    await f1();
    console.log('out f2')
}
f2();