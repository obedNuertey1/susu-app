
function checkPasswordStrength(password:string):string {
    const passReg1 = /[A-Z]/;
    const passReg2 = /[a-z]/;
    const passReg3 = /[0-9]/;
    const passReg4 = /[^A-Za-z0-9\s]/;
    
    const regArr = [passReg1, passReg2, passReg3, passReg4];
    
    let strength = 0;

    regArr.forEach(regex => {
        if (regex.test(password)) {
            strength++;
        }
    });

    const passwordLen = password.length;

    if (passwordLen >= 8) {
        strength++;
    } 

    let strengthText = '';

    if(strength === 0){
        strengthText = '';
    }else if(strength === 1){
        strengthText = 'Very Weak';
    }else if(strength === 2){
        strengthText = 'Weak';
    }else if(strength === 3){
        strengthText = 'Moderate';
    }else if(strength == 4){
        strengthText = 'Strong';
    }else if(strength > 4){
        strengthText = 'Very Strong';
    }

    return strengthText;
}

export default checkPasswordStrength;