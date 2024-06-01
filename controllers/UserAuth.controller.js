
const bcrypt = require("bcrypt");
const { Users } = require("../models"); 
const { sign } = require("jsonwebtoken");
const crypto = require('crypto');
const errorHandler = require("../middlewares/error")


// Register function
const register = async (req, res , next) => {
 
  try {
    const { firstname, lastname, email, phoneNumber, password, confirmPassword } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    //const hashedPassword2 = await bcrypt.hash(confirmPassword, 10)

     // Generate unique token for password reset using crypto
     const confirmationToken = crypto.randomBytes(20).toString("hex");


     // Set the expiry time for the reset token (e.g., 1 hour from now)
     const confirmationTokenExpire = new Date(Date.now() + 3600000); // 1 hour
 
    const user = await Users.create({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword,
      token: confirmationToken,
      tokenExpire: confirmationTokenExpire
    });

    res.status(200).json({
      success: true,
      result: user,
  });
  //res.send(" Welcome register successfully");
    
  } catch (error) {
    next(error);
  }
  
}

// login function
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userQuery = await Users.findOne({
      where: { email: email},
    });

    if (!userQuery) {
      return next(errorHandler(401, "User not found"));
    }

    // Compare the password from user input and password in the table
    bcrypt.compare(password, userQuery.password)
    .then(async (isMatch) => {
      if (!isMatch) {
        return next(errorHandler(401, "Wrong email and password"));
      }

      // generate web token for user after successful login

      const accessToken = sign(
        { user_id: userQuery.userId },
        process.env.JWT_TOKEN
      ); //using the id of the user to generate web token

      const { password: pass, confirmPassword: confirm, ...restInfo } = userQuery._previousDataValues;

      // Set the access token as a cookie
      res
        .cookie("access_token", accessToken, {
          httpOnly: true, // Cookie cannot be accessed via client-side scripts
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'none', // CSRF protection
          maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours (optional)
        })
        .status(200)
        .json({
          result: restInfo,  //send response without password
          success: true,
          //token: accessToken // token already saved in cookie just for testing

        }); 
    })
    .catch(err => {
      console.error(err);
      return next(errorHandler(500, "Internal Server Error")); // Handle bcrypt errors
    });
  } catch (error) {
   next(error)
  }
};

const forgotPassword = async (req, res, next) => {

  try {
    const {email} = req.body

    const userQuery = await Users.findOne({
      where: { email: email},
    });

    if(!userQuery) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 
    
    // Generate unique token for password reset using crypto
    const resetToken = crypto.randomBytes(20).toString("hex");


    // Set the expiry time for the reset token (e.g., 1 hour from now)
    const resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour


    // Save the reset token and its expiry time in the database
    const userPass = await Users.update({
      token : resetToken,
      tokenExpire: resetPasswordExpire
   },
   {
       where: {
          id: userQuery.userId,
       }
   });

   // Send password reset email with token
   await forgotPassword(email, req.headers.host, resetToken)

   //
   res.status(200).json({
    success: true,
    result: userPass,
    message: "Password reset email sent successfully"
});

  } catch (error) {
    next(error) // errorhandling from index.js
  }
}

const resetPassword =async (req, res, next) => {

  const {id, token} = req.params
  
  try {
    const date = Date.now();

    const oldUser = await Users.findOne({
    where: { userId: id},
  });

    if(!oldUser) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 

    if(token !== oldUser.token || date > oldUser.tokenExpire)  return res.json({message: "Not Verified"})

      console.log(date)
      console.log(oldUser.tokenExp)
      res.render("resetPassword", { email: oldUser.email, status: "not verified"}); //render views- resetPassword.ejs
  } catch (error) {
    //console.log(error)
    next(error);
  }
}

const resetPasswordPost =async (req, res, next) => {

  const {id, token} = req.params
  const {password} = req.body;
  const bcSalt = bcrypt.genSaltSync(10)

  try {
    const date = Date.now();

    const oldUser = await Users.findOne({
    where: { userId: id},
  });

    if(!oldUser) return next(errorHandler(404, "user not found!")); //using the error handler from middleware 

    if(token !== oldUser.token || date > oldUser.tokenExpire)  return res.json({message: "Not Verified"})

      console.log(date)
      console.log(oldUser.tokenExp)
      res.render("resetPassword", { email: oldUser.email, status: "not verified"}); //render views- resetPassword.ejs

      const savedPassword = bcrypt.hashSync(password, bcSalt)

      await Users.update({
        password: savedPassword
        },{
          where: {
            userId: id
          }
        })

        res.render("resetPassword", { email: oldUser.email, status: "verified"});  //render views- resetPassword.ejs

  } catch (error) {
    //console.log(error)
    next(error);
  }
}

//log out
const logout = async (req, res, next) => {
  try {
    const { userId }= req.body
    const user = Users.findOne({
      where: { userId: userId }
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found ser' });
    }
    //Clear the access token cookie
    res.clearCookie('access_token');
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    // Handle errors
    console.error('Error logging out:', error.message);
    next(error);
  }
};


module.exports = { login, register , forgotPassword, resetPassword, resetPasswordPost, logout};     

