// publishing this code in npm website
// terminal command ->
// npm login
// npm publish --access public
// and the package name should be unique
// use @keyword name/package name


function generateOtp(length) {
    try {
        let otp = "";
        for (let i=0; i<length; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }
    catch (error) {
        throw error;
    }
}

function verifyOtp(userOtp) {
    try {
        if (otp == userOtp) {
            otp = "";
            return true;
        }
        throw new Error("otp not matched");
    }
    catch (error) {
        throw error;
    }
}

module.exports = { generateOtp, verifyOtp };
