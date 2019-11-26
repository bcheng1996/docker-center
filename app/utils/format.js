export function formatCurrency(zestimate) {
    let amount = zestimate
    let amount_rev = amount.toString().split('').reverse()
    let res = []
    let count = 0
    for(let c of amount_rev) {
        if(count != 0 && count % 3 == 0){
            res.push(',')
        }
        count+=1
        res.push(c)
    }
    return '$'+res.reverse().join('')
}

