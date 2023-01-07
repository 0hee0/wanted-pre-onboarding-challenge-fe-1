export const checkFinalConsonant = (word) => {
    const charCode = word.charCodeAt(word.length - 1);
    
    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인 (영어인 경우는 제외)
    const consonantCode = (charCode - 44032) % 28;
    
    if(consonantCode === 0){
        return "를";
    }
    return "을";
}
