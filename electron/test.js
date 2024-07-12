import bcrypt from "bcryptjs";
const saltRounds = 10;
const myPlaintextPassword = "titan86";
const someOtherPlaintextPassword = "not_bacon";

bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  console.log(hash);
});
