const indexCtrl = {};

//render index template
indexCtrl.GetIndex = (req,res)=>{
    res.render('index-about/index');
}

//render Aboute Template
indexCtrl.GetAbout = (req,res)=>{
    res.render('index-about/about');
}

module.exports = indexCtrl;