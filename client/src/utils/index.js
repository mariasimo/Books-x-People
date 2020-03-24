    
export const randomHeight = () => Math.floor(Math.random() * (95 - 80)) + 80 + '%'; 
export const randomWidth = () => Math.floor(Math.random() * (3.75- 1.75)) + 1.75 + "em"; 

export const addBookSize = () => ({
    width: randomWidth(),
    height: randomHeight(),
})

export const shuffle = (o) => {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
