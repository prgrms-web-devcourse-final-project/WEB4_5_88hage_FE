export const monthStringFormatting = (month:number) => {
    if(month < 10) return '0' + month;
    return month.toString();
}