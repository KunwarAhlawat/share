//This controller is use for Dashboard
const { MasterEmployeeModel } =  require("../Models/index");
// Home Page
exports.dashboard= (req, res) => {
    try {
        res.render('dashboard/mainDashboard',{
            title:'dashboard',
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.profile= async(req, res) => {

    try {
    const {id} = req.params;

         const user = await MasterEmployeeModel.findOne({where:{empId:id}});

         if(!user){
            console.log("user Not Founds")
         }
       
         console.log("User form Dashboard Controller", user)
        res.render('dashboard/profile/profile.ejs',{
            title:'Profile Name',
            user: user
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};