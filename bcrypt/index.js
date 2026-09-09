import bcrypt from "bcrypt";

const rawPass = "IchLiebeDenDeutschenMan";
const saltRounds = 12;

const hashedPass = await bcrypt.hash(rawPass,saltRounds);
console.log(`Raw Password : ${rawPass}`);
console.log(`Hashed Password : ${hashedPass}`);

async function hashPassword(password){
    console.log(`\n\nRaw Password from Function : ${password}`);
    const hash= await bcrypt.hash(password,12);
    console.log(`Hashed Password from Function : ${hashedPass}`);
    return hash
}

hashPassword("IchLiebeDenDeutschenMan");
