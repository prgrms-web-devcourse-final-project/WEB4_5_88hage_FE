export const monthStringFormatting = (month:number) => {
    if(month < 10) return '0' + month;
    return month.toString();
}

export const monthNumberFormatting = (month:number) => {
    if(month < 10) return '0' + month;
    return month.toString();
}