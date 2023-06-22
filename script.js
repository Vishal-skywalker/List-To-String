function convert(){
    const sperator = document.getElementById('sperator');
    const wholeEnclosure = document.getElementById('wholeEnclosure');
    const eachEnclosure = document.getElementById('eachEnclosure');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const split = document.getElementById('split');
    let type = '';
    const regexMap = {
        "all":/\s/,
        "line":/\n/
    };
    document.getElementsByName('type').forEach(el => {
        if (el.checked) {
            type = el.value;
        }
    });
    const regex = new RegExp(regexMap[split.value], 'ig');
    let data = input.value;
    data = data.split(regex).filter(function(el) {
        if(!el.match(regex)){
            return el.trim();
        } 
    });
    if(type === 'set'){
        data = [... new Set(data)];
    }
    data = enclose(eachEnclosure.value, true, data);
    data = enclose(wholeEnclosure.value, false, data.join(sperator.value));
    output.value = data;
}

function enclose(enclosure, isEach, data) {
    switch(enclosure) {
        case 'single':
            if (isEach) {
                return each(`'****'`, data);
            }
            return whole(`'****'`, data);
        case 'double':
            if (isEach) {
                return each(`"****"`, data);
            }
            return whole(`"****"`, data);
        case '()':
            if (isEach) {
                return each(`(****)`, data);
            }
            return whole(`(****)`, data);
        case '{}':
            if (isEach) {
                return each(`{****}`, data);
            }
            return whole(`{****}`, data);
        case '[]':
            if (isEach) {
                return each(`[****]`, data);
            }
            return whole(`[****]`, data);
        case 'none':
        default : 
            return data;
    }
}

function each(enclosure, data) {
    const returnData = [];
     data.forEach(element => {
        returnData.push( enclosure.replace('****', element));
    });
    return returnData;
}
function whole(enclosure, data) {
    return enclosure.replace('****', data);
}
