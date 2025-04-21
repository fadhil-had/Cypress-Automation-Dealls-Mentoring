class CommonFunction {
    generateRandom62PhoneNumber() {
        const prefix = '628';
        const remainingLength = 10;
        let randomNumber = '';
      
        for (let i = 0; i < remainingLength; i++) {
          randomNumber += Math.floor(Math.random() * 10);
        }
      
        return prefix + randomNumber;
    }
}
export default CommonFunction;